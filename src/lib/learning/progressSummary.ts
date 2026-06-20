export interface LearningTool {
  /** localStorage key used by the tool's zustand `persist` store. */
  key: string;
  label: string;
  href: string;
  totalModules: number;
}

export interface ToolProgressSummary extends LearningTool {
  completedModules: number;
  currentModule: number;
  percentComplete: number;
  /** Epoch milliseconds of the last visit, or 0 when unknown. */
  lastVisited: number;
  started: boolean;
}

export const LEARNING_TOOLS: LearningTool[] = [
  {
    key: 'philosophy-intro:progress',
    label: 'Introduction to Philosophy',
    href: '/tools/philosophy-intro',
    totalModules: 12,
  },
  {
    key: 'accounting-intro:progress',
    label: 'Accounting Fundamentals',
    href: '/tools/accounting-intro',
    totalModules: 12,
  },
];

/** Parse a tool's persisted progress blob (zustand persist shape) into a summary. */
export function parseToolProgress(tool: LearningTool, raw: string | null): ToolProgressSummary {
  const base: ToolProgressSummary = {
    ...tool,
    completedModules: 0,
    currentModule: 1,
    percentComplete: 0,
    lastVisited: 0,
    started: false,
  };

  if (!raw) return base;

  try {
    const parsed = JSON.parse(raw);
    const progress = parsed?.state?.progress ?? parsed?.progress ?? null;
    if (!progress || typeof progress !== 'object') return base;

    const completedModules = Array.isArray(progress.completedModules)
      ? progress.completedModules.length
      : 0;
    const currentModule =
      typeof progress.currentModule === 'number' ? progress.currentModule : 1;
    const moduleProgress =
      progress.moduleProgress && typeof progress.moduleProgress === 'object'
        ? progress.moduleProgress
        : {};
    const hasSectionProgress = Object.keys(moduleProgress).length > 0;

    const parsedLastVisited = progress.lastVisited ? Date.parse(progress.lastVisited) : 0;
    const lastVisited = Number.isNaN(parsedLastVisited) ? 0 : parsedLastVisited;

    const percentComplete =
      tool.totalModules > 0 ? Math.round((completedModules / tool.totalModules) * 100) : 0;
    const started = completedModules > 0 || currentModule > 1 || hasSectionProgress;

    return {
      ...tool,
      completedModules,
      currentModule,
      percentComplete,
      lastVisited,
      started,
    };
  } catch {
    return base;
  }
}

export function summarizeProgress(
  read: (key: string) => string | null,
  tools: LearningTool[] = LEARNING_TOOLS,
): ToolProgressSummary[] {
  return tools.map((tool) => parseToolProgress(tool, read(tool.key)));
}

/** Choose the most recently visited started tool, or null when nothing started. */
export function pickResumeTool(summaries: ToolProgressSummary[]): ToolProgressSummary | null {
  const started = summaries.filter((s) => s.started);
  if (started.length === 0) return null;
  return started.reduce((best, candidate) =>
    candidate.lastVisited > best.lastVisited ? candidate : best,
  );
}
