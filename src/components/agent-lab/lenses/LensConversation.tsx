import { GitBranch, MessageSquare } from 'lucide-react';
import type { TraceEvent } from '../../../lib/agent-lab/types';

type LensConversationProps = {
  events: TraceEvent[];
};

/**
 * Conversation lens: shows only user_message and model_response events,
 * stripping the tool/policy/trace machinery so the visitor can see what
 * the "model" said vs. what the user said.
 */
export function LensConversation({ events }: LensConversationProps) {
  const conversation = events.filter(
    (event) => event.type === 'user_message' || event.type === 'model_response',
  );

  if (conversation.length === 0) {
    return (
      <EmptyState message="Run a scenario to see the user's request and the model's reasoning." />
    );
  }

  return (
    <ol className="space-y-3">
      {conversation.map((event) => {
        const isUser = event.type === 'user_message';
        const payload = event.payload as Record<string, unknown> | string;
        const text = renderText(payload, isUser);

        return (
          <li
            key={event.id}
            className={`rounded-lg border p-4 ${
              isUser
                ? 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
                : 'border-blue-200 bg-blue-50/60 dark:border-slate-700 dark:bg-slate-800/70'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {isUser ? (
                <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>{isUser ? 'User' : 'Model (simulated)'}</span>
              <span className="text-slate-400 dark:text-slate-500">· {event.title}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">{text}</p>
          </li>
        );
      })}
    </ol>
  );
}

function renderText(payload: Record<string, unknown> | string, isUser: boolean): string {
  if (typeof payload === 'string') {
    return payload;
  }

  if (isUser && typeof payload.content === 'string') {
    return payload.content;
  }

  if (typeof payload.rationale === 'string') {
    return payload.rationale;
  }

  return JSON.stringify(payload, null, 2);
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
      {message}
    </div>
  );
}
