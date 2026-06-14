import { Check } from 'lucide-react';
import type { TrackedSection } from '../hooks/useSectionTracker';

interface SectionRailProps {
  sections: TrackedSection[];
  activeId: string | null;
  viewedIds: string[];
  onSelect: (id: string) => void;
}

export function SectionRail({ sections, activeId, viewedIds, onSelect }: SectionRailProps) {
  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex"
    >
      {sections.map((section) => {
        const isActive = section.id === activeId;
        const isViewed = viewedIds.includes(section.id);

        const dotClass = isActive
          ? 'h-3 w-3 rounded-full bg-blue-500 ring-2 ring-blue-200 dark:ring-blue-900 transition-all duration-200'
          : 'h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600 transition-all duration-200';

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            title={section.title}
            aria-label={`Go to section: ${section.title}`}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center justify-end gap-2 rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span
              className={`pointer-events-none max-w-[220px] truncate rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 ${
                isActive ? 'opacity-100' : ''
              }`}
            >
              {section.title}
            </span>
            {isViewed && !isActive ? (
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-400/80 text-white">
                <Check className="h-2 w-2" strokeWidth={3} />
              </span>
            ) : (
              <span className={dotClass} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
