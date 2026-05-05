/**
 * Single source of truth for the 12 Agent Lab modules.
 *
 * Consumed by LabsIndex (the card grid) and LabChrome (the breadcrumb /
 * prev-next strip rendered on every lab page) so that lab metadata,
 * theme grouping, and deep-link targets stay in sync.
 */

export type LabTheme =
  | 'foundations'
  | 'retrieval'
  | 'tooling'
  | 'quality'
  | 'safety'
  | 'operations';

export type LabHrefKind = 'route' | 'canonical' | 'doc';

/**
 * A canonical-lab entry deep-links into a specific lens of the canonical
 * /tools/agent-lab playground. We model the lens as a query parameter
 * (?lens=...) consumed by AgentLabApp.
 */
export type LabEntry = {
  number: number;
  title: string;
  goal: string;
  /** Concrete artifact a visitor sees when they land. */
  highlight: string;
  theme: LabTheme;
  hrefKind: LabHrefKind;
  /** Final URL a visitor follows. Includes ?lens=... for canonical labs. */
  href: string;
  /** True if `href` should open in a new tab. */
  external?: boolean;
};

export const LAB_THEMES: Record<LabTheme, { label: string; description: string }> = {
  foundations: {
    label: 'Foundations',
    description: 'Messages, schemas, tools, the loop itself, and retrieval.',
  },
  retrieval: {
    label: 'Retrieval',
    description: 'Why a single retrieval signal is rarely enough.',
  },
  tooling: {
    label: 'Tooling',
    description: 'Tool discovery and the workflow / agent boundary.',
  },
  quality: {
    label: 'Quality',
    description: 'Replay, score, and regression-test agent behavior.',
  },
  safety: {
    label: 'Safety',
    description: 'Human approval and policy outside the model.',
  },
  operations: {
    label: 'Operations',
    description: 'What production deployment and observability look like.',
  },
};

export const LABS: LabEntry[] = [
  {
    number: 1,
    title: 'LLM API fundamentals',
    goal: 'See the request/response loop the chat box hides.',
    highlight: 'Two side-by-side prompt configs with token usage, latency, and cost.',
    theme: 'foundations',
    hrefKind: 'route',
    href: '/tools/agent-lab/llm-fundamentals',
  },
  {
    number: 2,
    title: 'Structured outputs',
    goal: 'Make model output machine-readable and validate it.',
    highlight: 'Structured Output lens: Zod schemas, validation errors, force-invalid toggle.',
    theme: 'foundations',
    hrefKind: 'canonical',
    href: '/tools/agent-lab?lens=structured',
  },
  {
    number: 3,
    title: 'Tool calling',
    goal: 'See typed tool boundaries and runtime calls.',
    highlight: 'Tool Calling lens: registry, args, results, all schema-validated.',
    theme: 'foundations',
    hrefKind: 'canonical',
    href: '/tools/agent-lab?lens=tools',
  },
  {
    number: 4,
    title: 'Agent loop',
    goal: 'Watch a loop iterate, decide, and stop.',
    highlight: 'Agent Loop lens: per-iteration view of the runner over the credit scenario.',
    theme: 'foundations',
    hrefKind: 'canonical',
    href: '/tools/agent-lab?lens=loop',
  },
  {
    number: 5,
    title: 'RAG',
    goal: 'Compare uncited vs. retrieval-grounded answers.',
    highlight: 'RAG lens: 8-section policy doc, deterministic keyword retrieval, citations.',
    theme: 'foundations',
    hrefKind: 'canonical',
    href: '/tools/agent-lab?lens=rag',
  },
  {
    number: 6,
    title: 'Hybrid search and reranking',
    goal: 'See why a single retrieval signal is not enough.',
    highlight: 'BM25, pseudo-vector, RRF hybrid, and a toy reranker side by side.',
    theme: 'retrieval',
    hrefKind: 'route',
    href: '/tools/agent-lab/hybrid-search',
  },
  {
    number: 7,
    title: 'MCP-style tool protocol',
    goal: 'Discover tools through a standard manifest.',
    highlight: 'Tool registry, JSON-schema inputs, permission badges, simulated handshake.',
    theme: 'tooling',
    hrefKind: 'route',
    href: '/tools/agent-lab/mcp-tools',
  },
  {
    number: 8,
    title: 'Workflow vs free-form agent',
    goal: 'Compare a fixed pipeline to an autonomous loop.',
    highlight: 'Six-step deterministic workflow next to the free-form agent runner.',
    theme: 'tooling',
    hrefKind: 'route',
    href: '/tools/agent-lab/workflow-vs-agent',
  },
  {
    number: 9,
    title: 'Evaluation harness',
    goal: 'Replay every case and score the agent.',
    highlight: 'Evals lens: 8 canonical cases, per-assertion drill-down, metric strip.',
    theme: 'quality',
    hrefKind: 'canonical',
    href: '/tools/agent-lab?lens=evals',
  },
  {
    number: 10,
    title: 'Human-in-the-loop',
    goal: 'Classify actions by risk and approve / reject.',
    highlight: 'Built into every run: write actions pause at the approval gate; rejection is first-class.',
    theme: 'safety',
    hrefKind: 'canonical',
    href: '/tools/agent-lab?lens=overview',
  },
  {
    number: 11,
    title: 'Permissions and audit trails',
    goal: 'Keep policy outside the model and log every decision.',
    highlight: 'Policy module + trace timeline: every iteration is a typed, inspectable event.',
    theme: 'safety',
    hrefKind: 'canonical',
    href: '/tools/agent-lab?lens=trace',
  },
  {
    number: 12,
    title: 'Observability and deployment',
    goal: 'Understand what production operation looks like.',
    highlight: 'Operations doc: trace replay, cost / latency budgets, Cloudflare deployment notes.',
    theme: 'operations',
    hrefKind: 'doc',
    href: 'https://github.com/lifanh/lifan.dev/blob/main/docs/agent-lab-operations.md',
    external: true,
  },
];

/** Ordered list of (theme, labs) for grouped rendering on the labs index. */
export const LABS_BY_THEME: Array<{ theme: LabTheme; labs: LabEntry[] }> = (
  Object.keys(LAB_THEMES) as LabTheme[]
).map((theme) => ({
  theme,
  labs: LABS.filter((lab) => lab.theme === theme),
}));

export function getLabByNumber(n: number): LabEntry | undefined {
  return LABS.find((lab) => lab.number === n);
}

/**
 * Find the lab entry that owns a given pathname (ignoring query/hash).
 * Canonical entries collapse to the single /tools/agent-lab pathname; in
 * that case the *first* canonical entry is returned and callers that need
 * a more specific position must pass an explicit lab number.
 */
export function getLabByPath(pathname: string): LabEntry | undefined {
  const stripped = pathname.replace(/\/+$/, '');
  return LABS.find((lab) => {
    if (lab.external) return false;
    const labPath = lab.href.split('?')[0].replace(/\/+$/, '');
    return labPath === stripped;
  });
}
