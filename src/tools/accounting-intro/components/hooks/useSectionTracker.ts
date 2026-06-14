import { useCallback, useEffect, useRef, useState } from 'react';
import { playStepSound, playUnlockSound } from '../../lib/audio';
import { useProgressStore } from '../../store';

export interface TrackedSection {
  id: string;
  title: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  hasCheck?: boolean;
  checkCompleted?: boolean;
}

export interface UseSectionTrackerResult {
  sections: TrackedSection[];
  activeId: string | null;
  activeIndex: number;
  viewedIds: string[];
  scrollToSection: (id: string) => void;
  goToAdjacent: (dir: 1 | -1) => void;
}

const EMPTY: string[] = [];

function sameSections(a: TrackedSection[], b: TrackedSection[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (
      a[i].id !== b[i].id ||
      a[i].title !== b[i].title ||
      a[i].isCompleted !== b[i].isCompleted ||
      a[i].isLocked !== b[i].isLocked ||
      a[i].hasCheck !== b[i].hasCheck ||
      a[i].checkCompleted !== b[i].checkCompleted
    ) {
      return false;
    }
  }
  return true;
}

/** Clamp an adjacent move within the bounds of the section list. */
export function nextSectionIndex(current: number, dir: 1 | -1, length: number): number {
  if (length === 0) return -1;
  const base = current === -1 ? 0 : current;
  return Math.min(length - 1, Math.max(0, base + dir));
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

/**
 * Tracks the `<section id="...">` beats rendered inside `containerRef`, exposing
 * the active section (scroll-spy), marking sections as viewed in the progress
 * store, and providing keyboard / click navigation between beats.
 */
export function useSectionTracker(
  moduleId: number,
  containerRef: React.RefObject<HTMLElement | null>,
): UseSectionTrackerResult {
  const [sections, setSections] = useState<TrackedSection[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const updateModuleProgress = useProgressStore((s) => s.updateModuleProgress);
  const viewedIds = useProgressStore(
    (s) => s.progress.moduleProgress[moduleId]?.sectionsCompleted ?? EMPTY,
  );

  const sectionsRef = useRef<TrackedSection[]>([]);
  const activeIdRef = useRef<string | null>(null);
  sectionsRef.current = sections;

  const setActive = useCallback(
    (id: string) => {
      if (activeIdRef.current === id) return;

      const currentList = sectionsRef.current;
      const targetSect = currentList.find((s) => s.id === id);
      if (targetSect && targetSect.isLocked) {
        // Prevent scroll spy from locking on a future section if it is locked
        return;
      }

      activeIdRef.current = id;
      setActiveId(id);

      const current =
        useProgressStore.getState().progress.moduleProgress[moduleId]?.sectionsCompleted ?? [];
      const hasIncompleteCheck = targetSect?.hasCheck && !targetSect?.checkCompleted;

      if (!current.includes(id) && !hasIncompleteCheck) {
        updateModuleProgress(moduleId, id);
      }
    },
    [moduleId, updateModuleProgress],
  );

  const scan = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const els = Array.from(container.querySelectorAll<HTMLElement>('section[id]'));

    const completedList =
      useProgressStore.getState().progress.moduleProgress[moduleId]?.sectionsCompleted ?? [];

    const rawSections = els.map((el) => {
      const checkEl = el.querySelector('[data-inline-check]');
      const hasCheck = !!checkEl;
      const checkCompleted = hasCheck && checkEl.getAttribute('data-completed') === 'true';

      return {
        id: el.id,
        title: el.querySelector('h1, h2, h3')?.textContent?.trim() || el.id,
        hasCheck,
        checkCompleted,
      };
    });

    const processedSections: TrackedSection[] = rawSections.map((sect, index) => {
      const selfCompleted = sect.hasCheck
        ? sect.checkCompleted || completedList.includes(sect.id)
        : completedList.includes(sect.id);

      let isLocked = false;
      for (let j = 0; j < index; j += 1) {
        const prevSect = rawSections[j];
        const prevSelfCompleted = prevSect.hasCheck
          ? prevSect.checkCompleted || completedList.includes(prevSect.id)
          : completedList.includes(prevSect.id);
        if (!prevSelfCompleted) {
          isLocked = true;
          break;
        }
      }

      return {
        ...sect,
        isCompleted: selfCompleted,
        isLocked,
      };
    });

    setSections((prev) => {
      // Find if any section became unlocked and play unlock sound
      const hasUnlock = prev.some((s, i) =>
        s.isLocked && processedSections[i]?.isLocked === false
      );
      if (hasUnlock) playUnlockSound();

      return sameSections(prev, processedSections) ? prev : processedSections;
    });
  }, [containerRef, moduleId]);

  const scrollToSection = useCallback(
    (id: string) => {
      const container = containerRef.current;
      if (!container || typeof CSS === 'undefined' || !CSS.escape) return;
      const el = container.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (!el) return;

      const targetSect = sectionsRef.current.find((s) => s.id === id);
      if (targetSect && targetSect.isLocked) return;

      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      setActive(id);
    },
    [containerRef, setActive],
  );

  const goToAdjacent = useCallback(
    (dir: 1 | -1) => {
      const list = sectionsRef.current;
      const idx = list.findIndex((s) => s.id === activeIdRef.current);
      const nextIdx = nextSectionIndex(idx, dir, list.length);
      const target = list[nextIdx];
      if (target && (!target.isLocked || dir === -1)) {
        scrollToSection(target.id);
        playStepSound();
      }
    },
    [scrollToSection],
  );

  // Re-scan whenever the module changes or the lazy content mounts/changes.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    activeIdRef.current = null;
    setActiveId(null);
    scan();

    if (typeof MutationObserver === 'undefined') return;
    let raf = 0;
    const mo = new MutationObserver(() => {
      if (typeof requestAnimationFrame === 'function') {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(scan);
      } else {
        scan();
      }
    });
    mo.observe(container, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-completed'] });
    return () => {
      mo.disconnect();
      if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(raf);
    };
  }, [scan, moduleId, containerRef]);

  // Scroll-spy: highlight the beat nearest the top of the reading area.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') return;
    const els = Array.from(container.querySelectorAll<HTMLElement>('section[id]'));
    if (els.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const el of els) {
          const ratio = ratios.get(el.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = el.id;
          }
        }
        if (bestId) setActive(bestId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-10% 0px -55% 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, containerRef, setActive]);

  // Keyboard navigation between beats (vim-style J / K + Space / Enter).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      const list = sectionsRef.current;
      const idx = list.findIndex((s) => s.id === activeIdRef.current);
      const activeSection = list[idx];

      if (event.key === 'j' || event.key === 'J') {
        event.preventDefault();
        goToAdjacent(1);
      } else if (event.key === 'k' || event.key === 'K') {
        event.preventDefault();
        goToAdjacent(-1);
      } else if (event.key === ' ' || event.key === 'Enter') {
        // Space or Enter progresses ONLY if current section has no incomplete check
        if (activeSection && !activeSection.isLocked && activeSection.isCompleted) {
          event.preventDefault();
          goToAdjacent(1);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goToAdjacent]);

  const activeIndex = sections.findIndex((s) => s.id === activeId);

  return { sections, activeId, activeIndex, viewedIds, scrollToSection, goToAdjacent };
}
