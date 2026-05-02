import { AlertTriangle, CheckCircle2, RotateCw } from 'lucide-react';
import type { TraceEvent } from '../../../lib/agent-lab/types';

type LensSchemaProps = {
  events: TraceEvent[];
  simulateInvalidOutput: boolean;
  onToggleInvalidOutput: (value: boolean) => void;
  hasResult: boolean;
};

const RECOMMENDATION_SCHEMA = `OrderEligibility {
  customerId:           string
  orderAmount:          number > 0
  currency:             "USD"
  decision:             "approve" | "review_required" | "block"
  creditLimit:          number
  currentExposure:      number
  projectedExposure:    number
  availableCredit:      number >= 0
  overLimitBy:          number >= 0
  overdueInvoiceCount:  integer >= 0
  maxDaysPastDue:       integer >= 0
  requiresHumanApproval: boolean
  reasons:              string[] (>= 1)
  recommendedAction:    string (>= 8 chars)
}`;

/**
 * Structured Output lens: shows the recommendation schema, lets the user
 * intentionally make the model produce invalid output, and renders the
 * resulting validation_error / model_retry events from the trace.
 */
export function LensSchema({
  events,
  simulateInvalidOutput,
  onToggleInvalidOutput,
  hasResult,
}: LensSchemaProps) {
  const validationErrors = events.filter((event) => event.type === 'validation_error');
  const retries = events.filter((event) => event.type === 'model_retry');
  const finalAnswer = events.find((event) => event.type === 'final_answer');

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
          Final recommendation schema
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          The agent's final output must match this Zod schema. Anything else is rejected at
          runtime — the model is not trusted to produce valid structured data.
        </p>
        <pre className="mt-3 max-h-72 overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
          {RECOMMENDATION_SCHEMA}
        </pre>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
              Simulate an invalid recommendation
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              When enabled, the model produces a malformed payload first. Validation rejects it,
              the trace records the failed fields, and the model retries with a corrected output.
            </p>
          </div>
          <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700">
            <input
              type="checkbox"
              checked={simulateInvalidOutput}
              onChange={(event) => onToggleInvalidOutput(event.target.checked)}
              className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:ring-blue-500"
            />
            <span>Force invalid output on next run</span>
          </label>
        </div>
      </section>

      {!hasResult && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Run a scenario to see validation results.
        </p>
      )}

      {validationErrors.length > 0 && (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-700/50 dark:bg-amber-950/30">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                Validation rejected the model's output
              </h3>
              {validationErrors.map((event) => {
                const payload = event.payload as {
                  schema?: string;
                  issues?: Array<{ path: string; message: string }>;
                };
                return (
                  <div key={event.id} className="mt-2">
                    <p className="text-xs font-medium text-amber-900 dark:text-amber-200">
                      Schema: {payload.schema ?? 'unknown'}
                    </p>
                    <ul className="mt-1 space-y-1 text-sm text-amber-900 dark:text-amber-200">
                      {(payload.issues ?? []).map((issue, index) => (
                        <li key={`${event.id}-${index}`}>
                          <code className="rounded bg-amber-100 px-1 py-0.5 text-xs dark:bg-amber-900/60">
                            {issue.path}
                          </code>{' '}
                          {issue.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {retries.length > 0 && (
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-start gap-2">
            <RotateCw className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 dark:text-slate-300" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">
                Model repaired its output
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                After validation failure, the runner asked the model to repair its recommendation
                so it conforms to the schema before the answer is shown to the user.
              </p>
            </div>
          </div>
        </section>
      )}

      {hasResult && validationErrors.length === 0 && finalAnswer && (
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 dark:text-slate-300" aria-hidden="true" />
            <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
              The recommendation passed schema validation on the first attempt.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
