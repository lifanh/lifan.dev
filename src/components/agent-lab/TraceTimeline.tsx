import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  GitBranch,
  RotateCw,
  ShieldCheck,
  Terminal,
  XCircle,
} from 'lucide-react';
import type { TraceEvent, TraceEventType } from '../../lib/agent-lab/types';

type TraceTimelineProps = {
  events: TraceEvent[];
  selectedEventId?: string;
  onSelectEvent: (eventId: string) => void;
};

const EVENT_LABELS: Record<TraceEventType, string> = {
  user_message: 'User',
  model_response: 'Model',
  tool_call: 'Tool call',
  permission_check: 'Policy',
  tool_result: 'Tool result',
  approval_required: 'Approval',
  validation_error: 'Validation',
  model_retry: 'Retry',
  final_answer: 'Final',
  error: 'Error',
};

function EventIcon({ type }: { type: TraceEventType }) {
  const className = 'h-4 w-4';

  switch (type) {
    case 'user_message':
      return <FileText className={className} aria-hidden="true" />;
    case 'model_response':
      return <GitBranch className={className} aria-hidden="true" />;
    case 'tool_call':
      return <Terminal className={className} aria-hidden="true" />;
    case 'permission_check':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'tool_result':
      return <CheckCircle2 className={className} aria-hidden="true" />;
    case 'approval_required':
      return <Clock className={className} aria-hidden="true" />;
    case 'validation_error':
      return <AlertTriangle className={className} aria-hidden="true" />;
    case 'model_retry':
      return <RotateCw className={className} aria-hidden="true" />;
    case 'final_answer':
      return <CheckCircle2 className={className} aria-hidden="true" />;
    case 'error':
      return <XCircle className={className} aria-hidden="true" />;
    default:
      return <FileText className={className} aria-hidden="true" />;
  }
}

export function TraceTimeline({ events, selectedEventId, onSelectEvent }: TraceTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
        Run a scenario to see the agent loop unfold step by step.
      </div>
    );
  }

  return (
    <ol className="space-y-2">
      {events.map((event, index) => {
        const selected = event.id === selectedEventId;

        return (
          <li key={event.id}>
            <button
              type="button"
              onClick={() => onSelectEvent(event.id)}
              className={`min-h-[44px] w-full rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                selected
                  ? 'border-blue-400 bg-blue-50 text-slate-900 dark:border-blue-400 dark:bg-slate-800 dark:text-slate-50'
                  : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  <EventIcon type={event.type} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {String(index + 1).padStart(2, '0')} · {EVENT_LABELS[event.type]}
                    </span>
                    {typeof event.durationMs === 'number' && (
                      <span className="text-xs text-slate-400 dark:text-slate-500">{event.durationMs}ms</span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm font-medium">{event.title}</span>
                </span>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
