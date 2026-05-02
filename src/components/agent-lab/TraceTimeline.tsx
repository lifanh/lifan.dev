import type { TraceEvent } from '../../lib/agent-lab/types';

type Props = { trace: TraceEvent[] };

export default function TraceTimeline({ trace }: Props) {
  return (
    <ol className="space-y-3">
      {trace.map(event => (
        <li key={event.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-white dark:bg-slate-900">
          <p className="font-medium text-slate-900 dark:text-slate-100">{event.title}</p>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{event.type}</p>
        </li>
      ))}
    </ol>
  );
}
