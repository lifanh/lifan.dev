import { Braces, Database, ShieldCheck } from 'lucide-react';
import type { TraceEvent } from '../../lib/agent-lab/types';

type ToolCallPanelProps = {
  event?: TraceEvent;
};

function panelTitle(type?: TraceEvent['type']) {
  if (type === 'tool_call') {
    return 'Tool call JSON';
  }

  if (type === 'tool_result') {
    return 'Tool result';
  }

  if (type === 'permission_check') {
    return 'Permission check';
  }

  return 'Selected event';
}

function PanelIcon({ type }: { type?: TraceEvent['type'] }) {
  if (type === 'tool_result') {
    return <Database className="h-4 w-4" aria-hidden="true" />;
  }

  if (type === 'permission_check') {
    return <ShieldCheck className="h-4 w-4" aria-hidden="true" />;
  }

  return <Braces className="h-4 w-4" aria-hidden="true" />;
}

export function ToolCallPanel({ event }: ToolCallPanelProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-100">
        <PanelIcon type={event?.type} />
        <h3>{panelTitle(event?.type)}</h3>
      </div>
      {event ? (
        <pre className="max-h-80 overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
          {JSON.stringify(event.payload, null, 2)}
        </pre>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
          Select a trace event to inspect its payload.
        </div>
      )}
    </section>
  );
}
