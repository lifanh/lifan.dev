import { CheckCircle2, ChevronDown, ChevronRight, Play, XCircle } from 'lucide-react';
import { useState } from 'react';
import { evalCases, runAllEvals, type EvalResult } from '../../lib/agent-lab/evals';

type EvalPanelProps = {
  simulationLatencyMs?: number;
};

/**
 * Eval lens: in-browser harness that replays each eval case against the
 * deterministic agent and shows pass / fail per assertion. This is the
 * "did the agent do the right thing?" layer — what production AI systems
 * use to keep regressions out of an agent that touches business data.
 */
export function EvalPanel({ simulationLatencyMs = 0 }: EvalPanelProps) {
  const [results, setResults] = useState<EvalResult[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  async function run() {
    setIsRunning(true);
    const next = await runAllEvals(evalCases, simulationLatencyMs);
    setResults(next);
    setIsRunning(false);
  }

  function toggle(id: string) {
    setExpanded((current) => ({ ...current, [id]: !current[id] }));
  }

  const summary = results
    ? {
        total: results.length,
        passed: results.filter((result) => result.passed).length,
        failed: results.filter((result) => !result.passed).length,
        toolCalls: results.reduce((sum, result) => sum + (result.metrics?.toolCalls ?? 0), 0),
        cost: results.reduce((sum, result) => sum + (result.metrics?.estimatedCostUsd ?? 0), 0),
      }
    : null;

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
              Evaluation suite
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {evalCases.length} eval case{evalCases.length === 1 ? '' : 's'} replay the
              deterministic agent and assert on tool sequence, decision, approval shape, trace
              events, and final-answer facts. Runs entirely in-browser; no backend.
            </p>
          </div>
          <button
            type="button"
            onClick={run}
            disabled={isRunning}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors motion-reduce:transition-none hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:focus-visible:ring-offset-slate-900"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            {isRunning ? 'Running...' : 'Run evals'}
          </button>
        </div>

        {summary && (
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-4">
            <Stat label="Cases" value={String(summary.total)} />
            <Stat
              label="Passed"
              value={String(summary.passed)}
              tone={summary.passed === summary.total ? 'good' : 'neutral'}
            />
            <Stat
              label="Failed"
              value={String(summary.failed)}
              tone={summary.failed === 0 ? 'good' : 'bad'}
            />
            <Stat label="Tool calls" value={String(summary.toolCalls)} hint="across all cases" />
          </dl>
        )}
      </section>

      {!results && !isRunning && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Click "Run evals" to replay every case and see which assertions pass or fail.
        </p>
      )}

      {results && (
        <ul className="space-y-2">
          {results.map((entry) => {
            const open = expanded[entry.case.id] ?? !entry.passed;

            return (
              <li
                key={entry.case.id}
                className={`rounded-lg border ${
                  entry.passed
                    ? 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
                    : 'border-amber-300 bg-amber-50 dark:border-amber-700/50 dark:bg-amber-950/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(entry.case.id)}
                  aria-expanded={open}
                  className="flex min-h-[44px] w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {open ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                  )}
                  {entry.passed ? (
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircle
                      className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400"
                      aria-hidden="true"
                    />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                      {entry.case.id}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-slate-600 dark:text-slate-300">
                      {entry.case.description}
                    </span>
                  </span>
                  {entry.metrics && (
                    <span className="hidden shrink-0 gap-3 text-[11px] text-slate-500 dark:text-slate-400 md:flex">
                      <span>{entry.metrics.iterations} iters</span>
                      <span>{entry.metrics.toolCalls} tools</span>
                      <span>{entry.metrics.latencyMs}ms</span>
                      <span>${entry.metrics.estimatedCostUsd.toFixed(6)}</span>
                    </span>
                  )}
                </button>

                {open && (
                  <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-700">
                    <ul className="space-y-1 text-sm">
                      {entry.assertions.map((assertion, index) => (
                        <li
                          key={`${entry.case.id}-${index}`}
                          className="flex items-start gap-2"
                        >
                          {assertion.passed ? (
                            <CheckCircle2
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircle
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-400"
                              aria-hidden="true"
                            />
                          )}
                          <span className="min-w-0 flex-1">
                            <span
                              className={`block ${
                                assertion.passed
                                  ? 'text-slate-700 dark:text-slate-300'
                                  : 'text-amber-900 dark:text-amber-200'
                              }`}
                            >
                              {assertion.label}
                            </span>
                            {assertion.detail && (
                              <span className="mt-0.5 block font-mono text-xs text-slate-500 dark:text-slate-400">
                                {assertion.detail}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                      {entry.error && (
                        <li className="font-mono text-xs text-amber-900 dark:text-amber-200">
                          Error: {entry.error}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  tone = 'neutral',
  hint,
}: {
  label: string;
  value: string;
  tone?: 'good' | 'bad' | 'neutral';
  hint?: string;
}) {
  const toneClass =
    tone === 'good'
      ? 'text-emerald-700 dark:text-emerald-400'
      : tone === 'bad'
        ? 'text-amber-800 dark:text-amber-300'
        : 'text-slate-900 dark:text-slate-50';

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/40">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </dt>
      <dd className={`mt-1 text-lg font-bold ${toneClass}`}>{value}</dd>
      {hint && <p className="text-[10px] text-slate-400 dark:text-slate-500">{hint}</p>}
    </div>
  );
}
