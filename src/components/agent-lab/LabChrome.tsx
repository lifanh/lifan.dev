import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { LABS, LAB_THEMES, getLabByNumber, type LabEntry } from '../../lib/agent-lab/labCatalog';

type LabChromeProps = {
  /**
   * The 1-based lab number this page represents. For the canonical lab
   * playground, callers should pass the lab number that matches the
   * currently active lens (defaults to 2 — Structured outputs — when no
   * lens is selected because that is the first canonical-lab card).
   */
  current: number;
};

/**
 * Shared header strip rendered at the top of every lab page.
 *
 * Provides:
 *  - a back-link to the 12-lab index
 *  - the current position ("Lab 02 / 12")
 *  - the theme tag
 *  - prev / next navigation across the catalog
 *
 * Order is the canonical 1..12 sequence from labCatalog. External
 * (docs-only) entries are skipped from prev/next so the strip never
 * navigates the user away to GitHub by accident.
 */
export function LabChrome({ current }: LabChromeProps) {
  const lab = getLabByNumber(current) ?? LABS[0];
  const internalLabs = LABS.filter((entry) => !entry.external);
  const indexInInternal = internalLabs.findIndex((entry) => entry.number === lab.number);

  const prev = indexInInternal > 0 ? internalLabs[indexInInternal - 1] : undefined;
  const next =
    indexInInternal >= 0 && indexInInternal < internalLabs.length - 1
      ? internalLabs[indexInInternal + 1]
      : undefined;

  const theme = LAB_THEMES[lab.theme];
  const positionLabel = `Lab ${String(lab.number).padStart(2, '0')} / 12`;

  return (
    <nav
      aria-label="Agent Lab navigation"
      className="border-b border-slate-200 bg-white/80 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <a
            href="/tools/agent-lab/labs"
            className="inline-flex min-h-[36px] items-center gap-1 rounded-md px-2 py-1 font-medium text-slate-700 transition-colors motion-reduce:transition-none hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-50"
          >
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
            All 12 labs
          </a>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-slate-700 dark:text-slate-200">{positionLabel}</span>
          <span aria-hidden="true">·</span>
          <span
            className="rounded-full bg-slate-100 px-2 py-0.5 font-medium uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            title={theme.description}
          >
            {theme.label}
          </span>
        </div>

        <div className="flex items-center gap-2" aria-label="Lab pagination">
          <PrevNextLink lab={prev} direction="prev" />
          <PrevNextLink lab={next} direction="next" />
        </div>
      </div>
    </nav>
  );
}

function PrevNextLink({
  lab,
  direction,
}: {
  lab: LabEntry | undefined;
  direction: 'prev' | 'next';
}) {
  const ariaLabel =
    direction === 'prev'
      ? lab
        ? `Previous lab: ${lab.title}`
        : 'No previous lab'
      : lab
        ? `Next lab: ${lab.title}`
        : 'No next lab';

  const baseClass =
    'inline-flex min-h-[36px] items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

  if (!lab) {
    return (
      <span
        aria-label={ariaLabel}
        aria-disabled="true"
        className={`${baseClass} cursor-not-allowed border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-600`}
      >
        {direction === 'prev' ? (
          <>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Prev
          </>
        ) : (
          <>
            Next
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </>
        )}
      </span>
    );
  }

  return (
    <a
      href={lab.href}
      aria-label={ariaLabel}
      title={lab.title}
      className={`${baseClass} border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-slate-800 dark:hover:text-slate-50`}
    >
      {direction === 'prev' ? (
        <>
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Lab {String(lab.number).padStart(2, '0')}
        </>
      ) : (
        <>
          Lab {String(lab.number).padStart(2, '0')}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </>
      )}
    </a>
  );
}
