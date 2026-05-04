import { ArrowRight } from 'lucide-react';

type LabEntry = {
  number: number;
  title: string;
  goal: string;
  href: string;
  hrefKind: 'route' | 'tab' | 'doc';
  status: 'live' | 'docs-only';
  /** What concrete artifact a visitor sees when they land. */
  highlight: string;
};

const LABS: LabEntry[] = [
  {
    number: 1,
    title: 'LLM API fundamentals',
    goal: 'See the request/response loop the chat box hides.',
    href: '/tools/agent-lab/llm-fundamentals',
    hrefKind: 'route',
    status: 'live',
    highlight: 'Two side-by-side prompt configs with token usage, latency, and cost.',
  },
  {
    number: 2,
    title: 'Structured outputs',
    goal: 'Make model output machine-readable and validate it.',
    href: '/tools/agent-lab',
    hrefKind: 'tab',
    status: 'live',
    highlight: 'Structured Output lens: Zod schemas, validation errors, force-invalid toggle.',
  },
  {
    number: 3,
    title: 'Tool calling',
    goal: 'See typed tool boundaries and runtime calls.',
    href: '/tools/agent-lab',
    hrefKind: 'tab',
    status: 'live',
    highlight: 'Tool Calling lens: registry, args, results, all schema-validated.',
  },
  {
    number: 4,
    title: 'Agent loop',
    goal: 'Watch a loop iterate, decide, and stop.',
    href: '/tools/agent-lab',
    hrefKind: 'tab',
    status: 'live',
    highlight: 'Agent Loop lens: per-iteration view of the runner over the credit scenario.',
  },
  {
    number: 5,
    title: 'RAG',
    goal: 'Compare uncited vs. retrieval-grounded answers.',
    href: '/tools/agent-lab',
    hrefKind: 'tab',
    status: 'live',
    highlight: 'RAG lens: 8-section policy doc, deterministic keyword retrieval, citations.',
  },
  {
    number: 6,
    title: 'Hybrid search and reranking',
    goal: 'See why a single retrieval signal is not enough.',
    href: '/tools/agent-lab/hybrid-search',
    hrefKind: 'route',
    status: 'live',
    highlight: 'BM25, pseudo-vector, RRF hybrid, and a toy reranker side by side.',
  },
  {
    number: 7,
    title: 'MCP-style tool protocol',
    goal: 'Discover tools through a standard manifest.',
    href: '/tools/agent-lab/mcp-tools',
    hrefKind: 'route',
    status: 'live',
    highlight: 'Tool registry, JSON-schema inputs, permission badges, simulated handshake.',
  },
  {
    number: 8,
    title: 'Workflow vs free-form agent',
    goal: 'Compare a fixed pipeline to an autonomous loop.',
    href: '/tools/agent-lab/workflow-vs-agent',
    hrefKind: 'route',
    status: 'live',
    highlight: 'Six-step deterministic workflow next to the free-form agent runner.',
  },
  {
    number: 9,
    title: 'Evaluation harness',
    goal: 'Replay every case and score the agent.',
    href: '/tools/agent-lab',
    hrefKind: 'tab',
    status: 'live',
    highlight: 'Evals lens: 8 canonical cases, per-assertion drill-down, metric strip.',
  },
  {
    number: 10,
    title: 'Human-in-the-loop',
    goal: 'Classify actions by risk and approve / reject.',
    href: '/tools/agent-lab',
    hrefKind: 'tab',
    status: 'live',
    highlight: 'Built into every run: write actions pause at the approval gate; rejection is first-class.',
  },
  {
    number: 11,
    title: 'Permissions and audit trails',
    goal: 'Keep policy outside the model and log every decision.',
    href: '/tools/agent-lab',
    hrefKind: 'tab',
    status: 'live',
    highlight: 'Policy module + trace timeline: every iteration is a typed, inspectable event.',
  },
  {
    number: 12,
    title: 'Observability and deployment',
    goal: 'Understand what production operation looks like.',
    href: 'https://github.com/divinerapierh/lifan.dev/blob/main/docs/agent-lab-operations.md',
    hrefKind: 'doc',
    status: 'docs-only',
    highlight: 'Operations doc: trace replay, cost / latency budgets, Cloudflare deployment notes.',
  },
];

export default function LabsIndex() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="space-y-3 py-6">
        <p className="text-sm font-medium uppercase tracking-normal text-slate-500 dark:text-slate-400">
          Agent Engineering Lab · 12 modules
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
          Twelve labs, one engineering story
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Each lab is a focused playground for one concept in production AI agent engineering.
          Eight share the canonical credit-order-eligibility scenario at <code>/tools/agent-lab</code>{' '}
          (rendered as different lenses); four are dedicated routes for material that needed its
          own surface area. One is documentation only because the topic is operational, not visual.
        </p>
      </header>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Agent Lab modules">
        {LABS.map((lab) => (
          <li key={lab.number}>
            <a
              href={lab.href}
              target={lab.hrefKind === 'doc' ? '_blank' : undefined}
              rel={lab.hrefKind === 'doc' ? 'noreferrer' : undefined}
              className="group block h-full rounded-lg border border-slate-200 bg-white p-5 transition-colors motion-reduce:transition-none hover:border-blue-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:bg-slate-700"
            >
              <header className="flex items-baseline justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Lab {String(lab.number).padStart(2, '0')}
                </span>
                <KindBadge kind={lab.hrefKind} status={lab.status} />
              </header>
              <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-50">{lab.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{lab.goal}</p>
              <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{lab.highlight}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                Open
                <ArrowRight className="h-3.5 w-3.5 transition-transform motion-reduce:transition-none group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ol>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <strong className="font-medium text-slate-900 dark:text-slate-50">Why this layout:</strong>{' '}
        Labs 2 / 3 / 4 / 5 / 9 / 10 / 11 are different lenses on a single, complete agent run, so they
        share one route and the canonical scenario. Labs 1 / 6 / 7 / 8 introduce concepts the canonical
        run does not exercise (the bare LLM protocol, alternative retrieval signals, the MCP tool
        manifest, and a deterministic-workflow comparison) so they live as siblings. Lab 12 is a short
        operations doc because production observability and deployment are infrastructure topics, not
        a single visual demo.
      </section>
    </div>
  );
}

function KindBadge({ kind, status }: { kind: LabEntry['hrefKind']; status: LabEntry['status'] }) {
  if (status === 'docs-only') {
    return (
      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-700 dark:bg-slate-700 dark:text-slate-200">
        docs
      </span>
    );
  }
  if (kind === 'tab') {
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
