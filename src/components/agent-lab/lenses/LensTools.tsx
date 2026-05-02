import { ShieldCheck, Terminal } from 'lucide-react';
import type { TraceEvent } from '../../../lib/agent-lab/types';

type LensToolsProps = {
  events: TraceEvent[];
};

const TOOL_REGISTRY: Array<{
  name: string;
  kind: 'read' | 'write';
  args: string;
  description: string;
  policy: string;
}> = [
  {
    name: 'getCustomer',
    kind: 'read',
    args: '{ customerNameOrId: string }',
    description: 'Resolve a customer record by name or id from the mock ERP.',
    policy: 'Always allowed.',
  },
  {
    name: 'getCreditStatus',
    kind: 'read',
    args: '{ customerId: string }',
    description: 'Fetch credit limit, current exposure, available credit, and account status.',
    policy: 'Always allowed.',
  },
  {
    name: 'getOpenInvoices',
    kind: 'read',
    args: '{ customerId: string }',
    description: 'List open and overdue invoices for a customer.',
    policy: 'Always allowed.',
  },
  {
    name: 'checkOrderEligibility',
    kind: 'read',
    args: '{ customerId: string, orderAmount: number }',
    description:
      'Combine credit and invoice signals into a structured decision: approve, review_required, or block.',
    policy: 'Allowed under $1,000,000; requires approval above that threshold.',
  },
  {
    name: 'createCreditReviewTicket',
    kind: 'write',
    args: '{ customerId: string, reason: string (>= 8 chars) }',
    description: 'Persist a credit review ticket so the credit team can act on it.',
    policy: 'Always requires human approval — this is a write action.',
  },
];

/**
 * Tool Calling lens: shows the typed tool registry on the left and the
 * actual tool calls + results from this run on the right, so the visitor
 * can see how typed tools constrain what the model is allowed to do.
 */
export function LensTools({ events }: LensToolsProps) {
  const toolCalls = events.filter((event) => event.type === 'tool_call');
  const toolResults = events.filter((event) => event.type === 'tool_result');

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Tool registry</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
          The agent can only invoke tools defined here, with arguments that match each tool's schema.
        </p>
        <ul className="mt-3 space-y-3">
          {TOOL_REGISTRY.map((tool) => (
            <li
              key={tool.name}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/40"
            >
              <div className="flex items-center gap-2">
                <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-700 dark:text-slate-100">
                  {tool.name}
                </code>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                    tool.kind === 'write'
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                  }`}
                >
                  {tool.kind}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-slate-600 dark:text-slate-400">{tool.args}</p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">{tool.description}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                {tool.policy}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
          Tool calls in this run
        </h3>
        {toolCalls.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Run a scenario to see typed tool calls and results.
          </p>
        ) : (
          <ol className="mt-3 space-y-3">
            {toolCalls.map((call, index) => {
              const callPayload = call.payload as { name: string; arguments: unknown };
              const result = toolResults[index];

              return (
                <li
                  key={call.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/40"
                >
                  <div className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                    <code className="text-xs font-medium text-slate-800 dark:text-slate-100">
                      {callPayload.name}
                    </code>
                  </div>
                  <details className="mt-2 text-xs">
                    <summary className="cursor-pointer text-slate-600 dark:text-slate-400">
                      arguments
                    </summary>
                    <pre className="mt-1 overflow-auto rounded bg-slate-950 p-2 leading-5 text-slate-100">
                      {JSON.stringify(callPayload.arguments, null, 2)}
                    </pre>
                  </details>
                  {result && (
                    <details className="mt-2 text-xs">
                      <summary className="cursor-pointer text-slate-600 dark:text-slate-400">
                        result
                      </summary>
                      <pre className="mt-1 max-h-48 overflow-auto rounded bg-slate-950 p-2 leading-5 text-slate-100">
                        {JSON.stringify(result.payload, null, 2)}
                      </pre>
                    </details>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}
