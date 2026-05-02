import type { TraceEvent } from '../../lib/agent-lab/types';

type Props = { event?: TraceEvent };

export default function ToolCallPanel({ event }: Props) {
  if (!event) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">Run a scenario to inspect tool calls.</p>;
  }

  return (
    <pre className="text-xs overflow-x-auto p-3 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700">
      {JSON.stringify(event.payload, null, 2)}
    </pre>
  );
}
