import { Loader2, Maximize2, Menu, Minimize2, X } from 'lucide-react';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useProgressStore } from '../store';
import { MODULES } from '../types/module';
import { useSectionTracker } from './hooks/useSectionTracker';
import { ModuleHeader, ModuleNavigation, ProgressBar, SectionRail } from './layout';

const Module1Content = lazy(() => import('../content/Module1Content').then(m => ({ default: m.Module1Content })));
const Module2Content = lazy(() => import('../content/Module2Content').then(m => ({ default: m.Module2Content })));
const Module3Content = lazy(() => import('../content/Module3Content').then(m => ({ default: m.Module3Content })));
const Module4Content = lazy(() => import('../content/Module4Content').then(m => ({ default: m.Module4Content })));
const Module5Content = lazy(() => import('../content/Module5Content').then(m => ({ default: m.Module5Content })));
const Module6Content = lazy(() => import('../content/Module6Content').then(m => ({ default: m.Module6Content })));
const Module7Content = lazy(() => import('../content/Module7Content').then(m => ({ default: m.Module7Content })));
const Module8Content = lazy(() => import('../content/Module8Content').then(m => ({ default: m.Module8Content })));
const Module9Content = lazy(() => import('../content/Module9Content').then(m => ({ default: m.Module9Content })));
const Module10Content = lazy(() => import('../content/Module10Content').then(m => ({ default: m.Module10Content })));
const Module11Content = lazy(() => import('../content/Module11Content').then(m => ({ default: m.Module11Content })));
const Module12Content = lazy(() => import('../content/Module12Content').then(m => ({ default: m.Module12Content })));

function ModuleLoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <span className="ml-3 text-slate-600 dark:text-slate-400">Loading module...</span>
    </div>
  );
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

export function PhilosophyPlatform() {
  const { progress, setCurrentModule } = useProgressStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [zenMode, setZenMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('philosophy_zen_mode') === 'true';
    }
    return false;
  });
  const [headerVisible, setHeaderVisible] = useState(true);

  const sidebarRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  const currentModule = MODULES.find((m) => m.id === progress.currentModule);

  const { sections, activeId, activeIndex, viewedIds, scrollToSection } = useSectionTracker(
    progress.currentModule,
    mainRef,
  );

  const handleModuleSelect = (moduleId: number) => {
    setCurrentModule(moduleId);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      const firstFocusable = sidebarRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [sidebarOpen]);

  // Save Zen mode preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('philosophy_zen_mode', zenMode ? 'true' : 'false');
    }
  }, [zenMode]);

  // Float-away sticky header when scrolling down in Zen Focus mode
  useEffect(() => {
    if (!zenMode) {
      setHeaderVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 60) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setHeaderVisible(false); // Scrolling down
      } else {
        setHeaderVisible(true); // Scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [zenMode]);

  // Bind keyboard 'f' to toggle Zen Focus Mode
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setZenMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, []);

  // Dynamically inject stylesheet rules for progressive disclosure section locking/blurring
  const dynamicLockStyles = useMemo(() => {
    if (sections.length < 2) return null;
    return (
      <style dangerouslySetInnerHTML={{
        __html: sections
          .map((sect) => {
            const isLocked = sect.isLocked;
            const isActive = sect.id === activeId;
            const escapedId = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(sect.id) : sect.id;
            return `
              #${escapedId} {
                transition: opacity 500ms ease, filter 500ms ease, transform 500ms ease;
                scroll-margin-top: 25vh;
                padding-top: ${zenMode ? '16vh' : '4vh'};
                padding-bottom: ${zenMode ? '16vh' : '4vh'};
              }
              ${isLocked ? `
                #${escapedId} {
                  opacity: 0.12 !important;
                  filter: blur(1.5px) !important;
                  pointer-events: none !important;
                  user-select: none !important;
                }
              ` : ''}
              ${isActive ? `
                #${escapedId} {
                  opacity: 1 !important;
                  filter: none !important;
                  transform: scale(1.002);
                }
              ` : `
                #${escapedId}:not(.locked) {
                  opacity: 0.65;
                }
              `}
            `;
          })
          .join('\n'),
      }} />
    );
  }, [sections, activeId, zenMode]);

  const moduleContent = useMemo(() => {
    switch (progress.currentModule) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Resources & Further Reading
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Explore additional resources to deepen your understanding of philosophy.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recommended Books</h2>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li>Sophie's World by Jostein Gaarder</li>
                <li>A History of Western Philosophy by Bertrand Russell</li>
                <li>The Story of Philosophy by Will Durant</li>
                <li>Philosophy: The Basics by Nigel Warburton</li>
              </ul>
            </div>
          </div>
        );
      case 1:
        return <Module1Content />;
      case 2:
        return <Module2Content />;
      case 3:
        return <Module3Content />;
      case 4:
        return <Module4Content />;
      case 5:
        return <Module5Content />;
      case 6:
        return <Module6Content />;
      case 7:
        return <Module7Content />;
      case 8:
        return <Module8Content />;
      case 9:
        return <Module9Content />;
      case 10:
        return <Module10Content />;
      case 11:
        return <Module11Content />;
      case 12:
        return <Module12Content />;
      default:
        return (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <p className="text-lg">This module is coming soon!</p>
            <p className="mt-2">Check back later for more content.</p>
          </div>
        );
    }
  }, [progress.currentModule]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {dynamicLockStyles}

      {/* Floating Sticky Top Header */}
      <div
        className={`sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 transition-transform duration-300 shadow-sm ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            ref={toggleButtonRef}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            disabled={zenMode}
            className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-opacity ${
              zenMode ? 'opacity-0 pointer-events-none lg:hidden' : 'lg:hidden'
            }`}
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-1">
            <ProgressBar />
          </div>

          {sections.length > 1 && (
            <span
              className="hidden sm:inline text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap tabular-nums"
              aria-live="polite"
            >
              Section {Math.max(activeIndex, 0) + 1} / {sections.length}
            </span>
          )}

          {/* Zen Mode Toggle Button */}
          <button
            type="button"
            onClick={() => setZenMode(!zenMode)}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
            title={zenMode ? 'Exit Focus Mode [F]' : 'Enter Focus Mode [F]'}
            aria-label={zenMode ? 'Exit Zen Focus Mode' : 'Enter Zen Focus Mode'}
          >
            {zenMode ? <Minimize2 className="w-4 h-4 text-blue-500" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className={`mx-auto px-4 py-6 transition-all duration-300 ${zenMode ? 'max-w-prose py-12 lg:py-20' : 'max-w-7xl'}`}>
        <div className={zenMode ? 'block' : 'lg:grid lg:grid-cols-[280px_1fr] lg:gap-8'}>

          {/* Collapsible Sidebar */}
          <aside
            ref={sidebarRef}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSidebarOpen(false);
                toggleButtonRef.current?.focus();
              }
            }}
            className={`
              fixed inset-y-0 left-0 z-30 w-72 max-w-[75vw] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700
              transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 lg:w-auto lg:border-0 lg:bg-transparent
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              ${zenMode ? 'lg:hidden' : ''}
              pt-20 lg:pt-0 px-4 lg:px-0 overflow-y-auto
            `}
          >
            <div className="lg:sticky lg:top-20">
              <ModuleNavigation
                currentModule={progress.currentModule}
                onModuleSelect={handleModuleSelect}
              />
            </div>
          </aside>

          {sidebarOpen && !zenMode && (
            <button
              type="button"
              tabIndex={-1}
              className="fixed inset-0 z-20 bg-black/50 lg:hidden cursor-default"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={(e) => e.key === 'Escape' && setSidebarOpen(false)}
              aria-label="Close navigation"
            />
          )}

          {/* Main Reading Panel */}
          <main ref={mainRef} className="min-w-0">
            {currentModule && <ModuleHeader module={currentModule} />}

            <div key={progress.currentModule} className="prose prose-slate dark:prose-invert max-w-none animate-fade-in">
              <Suspense fallback={<ModuleLoadingFallback />}>
                {moduleContent}
              </Suspense>
            </div>

            {sections.length > 1 && !zenMode && (
              <p className="mt-8 hidden text-xs text-slate-400 dark:text-slate-500 lg:block">
                Tip: press <kbd className="rounded border border-slate-300 px-1 font-sans dark:border-slate-600">J</kbd> / <kbd className="rounded border border-slate-300 px-1 font-sans dark:border-slate-600">K</kbd> to move between sections.
              </p>
            )}

            {/* Pagination Controls */}
            <div className={`flex justify-between items-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 ${zenMode ? 'px-2' : ''}`}>
              <button
                onClick={() => handleModuleSelect(Math.max(1, progress.currentModule - 1))}
                disabled={progress.currentModule === 1}
                className="px-4 py-3 min-h-[44px] text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous Module
              </button>
              <button
                onClick={() => handleModuleSelect(Math.min(MODULES.length, progress.currentModule + 1))}
                disabled={progress.currentModule === MODULES.length}
                className="px-4 py-3 min-h-[44px] text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next Module
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Keyboard Hint pill at bottom center */}
      {activeIndex >= 0 && activeIndex < sections.length - 1 && sections[activeIndex]?.isCompleted && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 animate-fade-in pointer-events-none">
          <div className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/90 px-3.5 py-1.5 text-xs font-medium text-blue-700 shadow-sm backdrop-blur-sm dark:border-blue-900/50 dark:bg-blue-950/90 dark:text-blue-300 transition-all">
            <span>Completed</span>
            <span className="h-1 w-1 rounded-full bg-blue-300 dark:bg-blue-700" />
            <span>Press <kbd className="rounded border border-blue-300 bg-white px-1 py-0.5 font-sans dark:border-blue-800 dark:bg-slate-900">Space</kbd> or <kbd className="rounded border border-blue-300 bg-white px-1 py-0.5 font-sans dark:border-blue-800 dark:bg-slate-900">Enter</kbd> to continue</span>
          </div>
        </div>
      )}

      {/* Custom Right Dots Section Navigation Rail */}
      <SectionRail
        sections={sections}
        activeId={activeId}
        viewedIds={viewedIds}
        onSelect={scrollToSection}
      />
    </div>
  );
}
