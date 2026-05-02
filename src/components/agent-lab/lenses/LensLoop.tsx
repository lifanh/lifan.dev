import { ArrowDown, ShieldCheck, Terminal } from 'lucide-react';
import type { TraceEvent } from '../../../lib/agent-lab/types';

type LensLoopProps = {
  events: TraceEvent[];
  iterations?: number;
};

type Iteration = {
  index: number;
  modelResponse: TraceEvent;
  permissionCheck?: TraceEvent;
  approval?: TraceEvent;
  toolCall?: TraceEvent;
  toolResult?: TraceEvent;
  validation?: TraceEvent;
  retry?: TraceEvent;
};

/**
 * Agent Loop lens: groups events into iteration-shaped cards so the visitor
 * can see the actual loop. Each iteration starts with a model_response and
 * optionally produces a tool call, validation, approval gate, and result.
 * The final iteration ends in final_answer.
 */
export function LensLoop({ events, iterations }: LensLoopProps) {
  const grouped = groupByIteration(events);
  const finalAnswer = events.find((event) => event.type === 'final_answer');

  if (grouped.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
        Run a scenario to watch the loop iterate.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {grouped.length} iteration{grouped.length === 1 ? '' : 's'}
        {typeof iterations === 'number' && iterations !== grouped.length
          ? ` (model called ${iterations} times)`
          : ''}
      </p>
      {grouped.map((iteration, idx) => (
        <div key={iteration.modelResponse.id} className="space-y-2">
          <article className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <header className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <span className="rounded bg-slate-200 px-1.5 py-0.5 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                Iter {String(iteration.index).padStart(2, '0')}
              </span>
              <span>Model</span>
            </header>
            <p className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-50">
              {iteration.modelResponse.title}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {readRationale(iteration.modelResponse.payload)}
            </p>

            {iteration.validation && (
              <p className="mt-2 rounded bg-amber-50 p-2 text-xs text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                Validation rejected the output.
              </p>
            )}

            {iteration.permissionCheck && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                {iteration.permissionCheck.title}
              </p>
            )}

            {iteration.approval && (
              <p className="mt-2 rounded bg-slate-100 p-2 text-xs text-slate-700 dark:bg-slate-700/60 dark:text-slate-200">
                Approval gate reached — runner pauses for a human decision.
              </p>
            )}

            {iteration.toolCall && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-200">
                <Terminal className="h-3 w-3" aria-hidden="true" />
                <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-700">
                  {(iteration.toolCall.payload as { name: string }).name}
                </code>
                <span>→</span>
                <span>{iteration.toolResult?.title ?? '...'}</span>
              </div>
            )}
          </article>
          {idx < grouped.length - 1 && (
            <ArrowDown className="mx-auto h-4 w-4 text-slate-400" aria-hidden="true" />
          )}
        </div>
      ))}

      {finalAnswer && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Final answer
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {String(finalAnswer.payload)}
          </p>
        </div>
      )}
    </div>
  );
}

function groupByIteration(events: TraceEvent[]): Iteration[] {
  const result: Iteration[] = [];
  let current: Iteration | null = null;
  let counter = 0;

  for (const event of events) {
    if (event.type === 'model_response') {
      if (current) {
        result.push(current);
      }
      counter += 1;
      current = { index: counter, modelResponse: event };
      continue;
    }

    if (!current) {
      continue;
    }

    if (event.type === 'permission_check') {
      current.permissionCheck = event;
    } else if (event.type === 'approval_required') {
      current.approval = event;
    } else if (event.type === 'tool_call') {
      current.toolCall = event;
    } else if (event.type === 'tool_result') {
      current.toolResult = event;
    } else if (event.type === 'validation_error') {
      current.validation = event;
    } else if (event.type === 'model_retry') {
      current.retry = event;
    }
  }

  if (current) {
    result.push(current);
  }

  return result;
}

function readRationale(payload: unknown): string {
  if (payload && typeof payload === 'object' && 'rationale' in payload) {
    const rationale = (payload as { rationale: unknown }).rationale;
    if (typeof rationale === 'string') {
      return rationale;
    }
  }

  return '';
}
