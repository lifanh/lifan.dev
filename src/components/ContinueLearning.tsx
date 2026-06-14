import { ArrowRight, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  pickResumeTool,
  summarizeProgress,
  type ToolProgressSummary,
} from '../lib/learning/progressSummary';

function readLocalStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export default function ContinueLearning() {
  const [summaries, setSummaries] = useState<ToolProgressSummary[] | null>(null);

  useEffect(() => {
    setSummaries(summarizeProgress(readLocalStorage));
  }, []);

  if (!summaries) return null;

  const resume = pickResumeTool(summaries);
  if (!resume) return null;

  const others = summaries.filter((s) => s.started && s.key !== resume.key);

  return (
    <section
      aria-label="Continue learning"
      className="mb-10 text-left rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
        <BookOpen className="h-4 w-4" />
        Continue where you left off
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">
            {resume.label}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Module {resume.currentModule} of {resume.totalModules}
            {resume.completedModules > 0 && ` · ${resume.completedModules} completed`}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${resume.percentComplete}%` }}
                role="progressbar"
                aria-valuenow={resume.percentComplete}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${resume.label} progress: ${resume.percentComplete}%`}
              />
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 tabular-nums">
              {resume.percentComplete}%
            </span>
          </div>
        </div>

        <a
          href={resume.href}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 min-h-[44px] text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
        >
          Resume
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {others.length > 0 && (
        <div className="mt-5 border-t border-slate-200 dark:border-slate-700 pt-4">
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {others.map((tool) => (
              <li key={tool.key} className="min-w-0 sm:flex-1">
                <a
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-700 group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400">
                      {tool.label}
                    </p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-full rounded-full bg-blue-400"
                        style={{ width: `${tool.percentComplete}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                    {tool.percentComplete}%
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
