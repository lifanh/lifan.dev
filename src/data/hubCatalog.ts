export interface HubCatalogItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly href: string;
  readonly action: string;
  readonly external: boolean;
  readonly highlights: readonly string[];
}

export interface HubCatalogSection {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly HubCatalogItem[];
}

export const hubCatalogSections = [
  {
    id: 'apps',
    eyebrow: 'Across Lifan.dev',
    title: 'Standalone apps',
    description: 'Focused products with their own workspace, data, and pace.',
    items: [
      {
        id: 'grow-wise',
        name: 'GrowWise',
        description:
          'Turn a question into a guided learning path, then work through sourced lessons one step at a time.',
        href: 'https://grow-wise.lifan.dev/',
        action: 'Open GrowWise',
        external: true,
        highlights: ['Learning paths', 'Guided practice'],
      },
      {
        id: 'another-podcast',
        name: 'Another Podcast',
        description:
          'Find thoughtful shows, keep a listening library, and return to the conversations worth following.',
        href: 'https://podcasts.lifan.dev/',
        action: 'Open podcasts',
        external: true,
        highlights: ['Discovery', 'Listening library'],
      },
    ],
  },
  {
    id: 'learning',
    eyebrow: 'Learn by doing',
    title: 'Guided courses',
    description: 'Long-form introductions built around active recall and practical exercises.',
    items: [
      {
        id: 'accounting-intro',
        name: 'Accounting Fundamentals',
        description:
          'Learn the language of business through twelve modules, interactive statements, and practical calculators.',
        href: '/tools/accounting-intro',
        action: 'Start accounting',
        external: false,
        highlights: ['12 modules', 'Calculators'],
      },
      {
        id: 'philosophy-intro',
        name: 'Introduction to Philosophy',
        description:
          'Follow the questions that shaped Western philosophy, from the Pre-Socratics to contemporary thought.',
        href: '/tools/philosophy-intro',
        action: 'Start philosophy',
        external: false,
        highlights: ['12 modules', 'Active recall'],
      },
    ],
  },
  {
    id: 'labs',
    eyebrow: 'Inspect the system',
    title: 'Labs and simulations',
    description: 'Smaller environments for understanding how technical and economic systems behave.',
    items: [
      {
        id: 'agent-lab',
        name: 'Agent Engineering Lab',
        description:
          'Explore schemas, tools, retrieval, evaluations, policy gates, and human approval across twelve focused labs.',
        href: '/tools/agent-lab/labs',
        action: 'Browse the labs',
        external: false,
        highlights: ['12 labs', 'Deterministic by default'],
      },
      {
        id: 'economic-sim',
        name: 'Economic Concept Visualizer',
        description:
          'Move supply and demand directly, then watch price, quantity, and equilibrium respond.',
        href: '/tools/economic-sim',
        action: 'Run the model',
        external: false,
        highlights: ['Interactive model', 'Supply and demand'],
      },
    ],
  },
] as const satisfies readonly HubCatalogSection[];
