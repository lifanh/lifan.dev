import { ArrowRight } from 'lucide-react';
import {
  LABS_BY_THEME,
  LAB_THEMES,
  type LabEntry,
  type LabHrefKind,
} from '../../lib/agent-lab/labCatalog';

export default function LabsIndex() {
  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <header className="space-y-3 py-6">
        <p className="text-sm font-medium uppercase tracking-normal text-slate-500 dark:text-slate-400">
          Agent Engineering Lab · 12 modules
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
          Twelve labs, one engineering story
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Each lab is a focused playground for one concept in production AI agent engineering.
          Seven share the canonical credit-order-eligibility scenario at <code>/tools/agent-lab</code>{' '}
          (rendered as different lenses, deep-linked from the cards below); four are dedicated routes
          for material that needed its own surface area. One is documentation only because the topic
          is operational, not visual.
        </p>
      </header>

      <ol
        className="space-y-10"
        aria-label="Agent Lab modules"
      >
        {LABS_BY_THEME.map(({ theme, labs }) => (
          <li key={theme} className="space-y-4">
            <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-2 dark:border-slate-700">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  {LAB_THEMES[theme].label}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {LAB_THEMES[theme].description}
                </p>
              </div>
              <span className="text-xs font-mono uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {labs.length} {labs.length === 1 ? 'lab' : 'labs'}
              </span>
            </header>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {labs.map((lab) => (
                <li key={lab.number}>
                  <LabCard lab={lab} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <strong className="font-medium text-slate-900 dark:text-slate-50">Why this layout:</strong>{' '}
        Labs 2 / 3 / 4 / 5 / 9 / 10 / 11 are different lenses on a single, complete agent run, so
        they share one route and the canonical scenario — each card deep-links to the right lens
        via a query parameter. Labs 1 / 6 / 7 / 8 introduce concepts the canonical run does not
        exercise (the bare LLM protocol, alternative retrieval signals, the MCP tool manifest, and
        a deterministic-workflow comparison) so they live as siblings. Lab 12 is a short operations
        doc because production observability and deployment are infrastructure topics, not a single
        visual demo.
      </section>
    </div>
  );
}

function LabCard({ lab }: { lab: LabEntry }) {
  return (
    <a
      href={lab.href}
      target={lab.external ? '_blank' : undefined}
      rel={lab.external ? 'noreferrer' : undefined}
      className="group block h-full rounded-lg border border-slate-200 bg-white p-5 transition-colors motion-reduce:transition-none hover:border-blue-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-slate-700"
    >
      <header className="flex items-baseline justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Lab {String(lab.number).padStart(2, '0')}
        </span>
        <KindBadge kind={lab.hrefKind} />
      </header>
      <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-50">{lab.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{lab.goal}</p>
      <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{lab.highlight}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-700 dark:text-blue-300">
        Open
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform motion-reduce:transition-none group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

function KindBadge({ kind }: { kind: LabHrefKind }) {
  if (kind === 'doc') {
    return (
      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-700 dark:bg-slate-700 dark:text-slate-200">
        docs
      </span>
    );
  }
  if (kind === 'canonical') {
    return (
      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
        canonical lab
      </span>
    );
  }
  return (
    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-blue-900 dark:bg-blue-900/40 dark:text-blue-100">
      dedicated
    </span>
  );
}
