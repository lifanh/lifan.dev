import { CheckCircle2, CircleDashed, GitBranch, Pause, Play, Workflow, XCircle } from 'lucide-react';
import { useState } from 'react';
import { scenarios } from '../../data/agent-lab/scenarios';
import { runAgentLabScenario } from '../../lib/agent-lab/agentRunner';
import {
  runWorkflow,
  type WorkflowResult,
  type WorkflowStepRecord,
  type WorkflowStepStatus,
} from '../../lib/agent-lab/workflow';
import type { AgentRunResult, ApprovalDecision } from '../../lib/agent-lab/types';
import { ErrorBoundary } from './ErrorBoundary';

const STATUS_ICON: Record<WorkflowStepStatus, { Icon: typeof CheckCircle2; tone: string; label: string }> = {
  ok: { Icon: CheckCircle2, tone: 'text-emerald-600 dark:text-emerald-400', label: 'completed' },
  skipped: { Icon: CircleDashed, tone: 'text-slate-400 dark:text-slate-500', label: 'skipped' },
  awaiting_approval: { Icon: Pause, tone: 'text-amber-600 dark:text-amber-400', label: 'awaiting approval' },
  error: { Icon: XCircle, tone: 'text-rose-600 dark:text-rose-400', label: 'error' },
};

export default function WorkflowApp() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0].id);
  const [workflowResult, setWorkflowResult] = useState<WorkflowResult | null>(null);
  const [agentResult, setAgentResult] = useState<AgentRunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId) ?? scenarios[0];

  async function runBoth(approvalDecision?: ApprovalDecision) {
    setIsRunning(true);
    try {
      const [workflow, agent] = await Promise.all([
        runWorkflow({
          customerNameOrId: selectedScenario.customerNameOrId,
          orderAmount: selectedScenario.orderAmount,
          userRequest: selectedScenario.userRequest,
          approvalDecision,
        }),
        runAgentLabScenario({
          scenarioId: selectedScenario.id,
          approvalDecision,
          latencyMs: 0,
        }),
      ]);
      setWorkflowResult(workflow);
      setAgentResult(agent);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-3 py-6">
          <p className="text-sm font-medium uppercase tracking-normal text-slate-500 dark:text-slate-400">
            Lab 8 · Workflow vs free-form agent
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            Deterministic pipeline next to a free-form loop
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Many production "agents" are actually a fixed workflow with one or two LLM-shaped
            steps embedded inside. Run the same scenario through both pipelines and compare the
            shape of what runs: a six-step workflow on the left, a free-form agent loop on the right.
          </p>
        </header>

        <section
          aria-label="Scenario controls"
          className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Scenario</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {scenarios.map((scenario) => {
              const selected = scenario.id === selectedScenarioId;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => {
                    setSelectedScenarioId(scenario.id);
                    setWorkflowResult(null);
                    setAgentResult(null);
                  }}
                  aria-pressed={selected}
                  className={`min-h-[44px] rounded-lg border p-3 text-left text-sm transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    selected
                      ? 'border-blue-400 bg-blue-50 dark:border-blue-400 dark:bg-slate-700'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="block font-medium text-slate-900 dark:text-slate-50">{scenario.title}</span>
                  <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                    {scenario.userRequest}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => runBoth()}
              disabled={isRunning}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors motion-reduce:transition-none hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              {isRunning ? 'Running both…' : 'Run both pipelines'}
            </button>
            {workflowResult?.finalAction.kind === 'awaiting_approval' && (
              <>
                <button
                  type="button"
                  onClick={() => runBoth('approved')}
                  disabled={isRunning}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900 transition-colors motion-reduce:transition-none hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-100"
                >
                  Approve and re-run
                </button>
                <button
                  type="button"
                  onClick={() => runBoth('rejected')}
                  disabled={isRunning}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-900 transition-colors motion-reduce:transition-none hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-100"
                >
                  Reject and re-run
                </button>
              </>
            )}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <WorkflowColumn result={workflowResult} />
          <AgentColumn result={agentResult} />
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <strong className="font-medium text-slate-900 dark:text-slate-50">What this comparison shows:</strong>{' '}
          The workflow always runs the same six steps in the same order; the free-form agent re-decides
          on every iteration what to do next. The workflow is auditable, evaluable, and cheap to test.
          The free-form agent is flexible but unpredictable — useful when the task shape is genuinely
          unknown, costly when the task shape is known up front. Most production "agents" are a hybrid:
          deterministic outer loop, model-shaped inner steps.
        </section>
      </div>
    </ErrorBoundary>
  );
}

function WorkflowColumn({ result }: { result: WorkflowResult | null }) {
  return (
    <article
      aria-label="Workflow pipeline"
      className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
    >
      <header className="flex items-center gap-2">
        <Workflow className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Workflow (deterministic)</h2>
      </header>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Six fixed steps, same order every time. The pipeline knows what to call before the run starts.
      </p>

      {!result && (
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Click <em>Run both pipelines</em> to see the workflow trace.</p>
      )}

      {result && (
        <>
          <ol className="mt-4 space-y-2" aria-label="Workflow steps">
            {result.steps.map((step, index) => (
              <WorkflowStep key={step.id + index} step={step} index={index + 1} />
            ))}
          </ol>
          <FinalActionPill kind={result.finalAction.kind} detail={result.finalAction.detail} />
        </>
      )}
    </article>
  );
}

function WorkflowStep({ step, index }: { step: WorkflowStepRecord; index: number }) {
  const meta = STATUS_ICON[step.status];
  const Icon = meta.Icon;
  return (
    <li className="rounded-md border border-slate-200 p-3 text-xs leading-5 dark:border-slate-700">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-slate-700 dark:text-slate-200">
          {index}. {step.label}
        </span>
        <span className={`inline-flex items-center gap-1 ${meta.tone}`} aria-label={meta.label}>
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-wide">{meta.label}</span>
        </span>
      </div>
      <p className="mt-1 text-slate-500 dark:text-slate-400">{step.description}</p>
      {step.data !== undefined && (
        <pre className="mt-2 max-h-40 overflow-auto rounded bg-slate-900 p-2 font-mono text-[11px] text-slate-100">
          {JSON.stringify(step.data, null, 2)}
        </pre>
      )}
      {step.error && (
        <p className="mt-2 rounded bg-rose-50 p-2 font-mono text-[11px] text-rose-900 dark:bg-rose-900/40 dark:text-rose-100">
          {step.error}
        </p>
      )}
    </li>
  );
}

function AgentColumn({ result }: { result: AgentRunResult | null }) {
  return (
    <article
      aria-label="Free-form agent loop"
      className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
    >
      <header className="flex items-center gap-2">
        <GitBranch className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Free-form agent (LLM-driven)</h2>
      </header>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Each iteration the model decides the next tool. Tool order, count, and stopping condition are
        emergent rather than declared up front.
      </p>

      {!result && (
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Click <em>Run both pipelines</em> to see the agent trace.</p>
      )}

      {result && (
        <>
          <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
            <Stat label="Iterations" value={String(result.iterations)} />
            <Stat label="Tool calls" value={String(result.metrics.toolCalls)} />
            <Stat label="Status" value={result.status} />
          </dl>
          <ol className="mt-4 space-y-2" aria-label="Agent trace events">
            {result.events.map((event, index) => (
              <li
                key={event.id}
                className="rounded-md border border-slate-200 p-3 text-xs leading-5 dark:border-slate-700"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-slate-700 dark:text-slate-200">
                    {index + 1}. {event.title}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    {event.type}
                  </span>
                </div>
              </li>
            ))}
          </ol>
          <FinalActionPill kind={result.status} detail={result.finalAnswer} />
        </>
      )}
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 p-2 dark:border-slate-700">
      <dt className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 font-mono text-sm text-slate-900 dark:text-slate-50">{value}</dd>
    </div>
  );
}

function FinalActionPill({ kind, detail }: { kind: string; detail: string }) {
  return (
    <div
      className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs leading-5 dark:border-slate-700 dark:bg-slate-900/40"
      role="status"
      aria-live="polite"
    >
      <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Final action
      </span>
      <p className="mt-1 font-mono text-slate-700 dark:text-slate-200">{kind}</p>
      <p className="mt-1 text-slate-600 dark:text-slate-300">{detail}</p>
    </div>
  );
}
