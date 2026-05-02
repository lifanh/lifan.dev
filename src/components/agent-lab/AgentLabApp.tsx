import {
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Cpu,
  Database,
  Play,
  Repeat,
  ShieldCheck,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { customers } from '../../data/agent-lab/customers';
import { invoices } from '../../data/agent-lab/invoices';
import { scenarios } from '../../data/agent-lab/scenarios';
import { runAgentLabScenario } from '../../lib/agent-lab/agentRunner';
import type { AgentRunResult, ApprovalDecision, TraceEvent } from '../../lib/agent-lab/types';
import { ApprovalGate } from './ApprovalGate';
import { EvalPanel } from './EvalPanel';
import { LensConversation } from './lenses/LensConversation';
import { LensLoop } from './lenses/LensLoop';
import { LensSchema } from './lenses/LensSchema';
import { LensTools } from './lenses/LensTools';
import { ToolCallPanel } from './ToolCallPanel';
import { TraceTimeline } from './TraceTimeline';

type AgentLabAppProps = {
  simulationLatencyMs?: number;
};

type LabTab = 'overview' | 'llm' | 'structured' | 'tools' | 'loop' | 'trace' | 'evals';

const tabs: Array<{ id: LabTab; label: string; description: string }> = [
  { id: 'overview', label: 'Overview', description: 'Lesson summary and run controls' },
  { id: 'llm', label: 'Conversation', description: 'User and model messages, no machinery' },
  { id: 'structured', label: 'Structured Output', description: 'Schemas, validation, repair' },
  { id: 'tools', label: 'Tool Calling', description: 'Typed tool registry and runtime calls' },
  { id: 'loop', label: 'Agent Loop', description: 'Iteration-by-iteration view' },
  { id: 'trace', label: 'Trace Viewer', description: 'Full event timeline + JSON inspector' },
  { id: 'evals', label: 'Evals', description: 'Replay every case and score the agent' },
];

const overviewLesson = {
  title: 'Make the hidden loop visible',
  body: 'Agent Lab is a deterministic learning environment for the moving parts behind production AI agents. The model is simulated so the lab works without API keys; the loop, tools, schemas, policy, and approval gate are real.',
  bullets: [
    'Messages between user and model are visible',
    'Tools have typed arguments and runtime-validated results',
    'Policy is separate from the model and is consulted before every tool call',
    'Write actions pass through a human-in-the-loop approval gate',
    'Final recommendations are validated against a Zod schema before they are shown',
  ],
};

function formatMoney(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

function findInspectableEvent(events: TraceEvent[], selectedEventId?: string) {
  const selected = events.find((event) => event.id === selectedEventId);

  if (selected) {
    return selected;
  }

  return [...events].reverse().find((event) => {
    return (
      event.type === 'tool_call' ||
      event.type === 'tool_result' ||
      event.type === 'permission_check' ||
      event.type === 'validation_error'
    );
  });
}

export default function AgentLabApp({ simulationLatencyMs = 320 }: AgentLabAppProps) {
  const [activeTab, setActiveTab] = useState<LabTab>('overview');
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0].id);
  const [result, setResult] = useState<AgentRunResult | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const [simulateInvalidOutput, setSimulateInvalidOutput] = useState(false);

  const selectedScenario = scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0];
  const selectedEvent = useMemo(
    () => findInspectableEvent(result?.events ?? [], selectedEventId),
    [result, selectedEventId],
  );

  async function runScenario(approvalDecision?: ApprovalDecision) {
    setIsRunning(true);
    const nextResult = await runAgentLabScenario({
      scenarioId: selectedScenarioId,
      approvalDecision,
      latencyMs: simulationLatencyMs,
      simulateInvalidRecommendation: simulateInvalidOutput,
    });
    setResult(nextResult);
    setSelectedEventId(findInspectableEvent(nextResult.events)?.id);
    setIsRunning(false);
  }

  function selectScenario(scenarioId: string) {
    setSelectedScenarioId(scenarioId);
    setResult(null);
    setSelectedEventId(undefined);
  }

  const events = result?.events ?? [];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="grid gap-8 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-normal text-slate-500 dark:text-slate-400">
            Production agents, inspected
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            Agent Engineering Lab
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A deterministic learning environment for tool boundaries, runtime schema validation,
            policy gates, and human approval — the parts of an AI agent the chatbot demos hide.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              <Database className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Credit order eligibility</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                The first workflow asks whether a customer can place a new order, then shows the
                messages, tools, policy checks, schema validation, and final recommendation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="Agent Lab sections"
        className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-2 dark:border-slate-700"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
            className={`min-h-[44px] shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">{overviewLesson.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{overviewLesson.body}</p>
            <ul className="mt-5 space-y-3">
              {overviewLesson.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Scenario</h2>
            <div className="mt-4 space-y-3">
              {scenarios.map((scenario) => {
                const selected = scenario.id === selectedScenarioId;

                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => selectScenario(scenario.id)}
                    aria-pressed={selected}
                    className={`min-h-[44px] w-full rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      selected
                        ? 'border-blue-400 bg-blue-50 dark:border-blue-400 dark:bg-slate-700'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                      {scenario.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {scenario.userRequest}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Mock data</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <h3 className="font-medium text-slate-700 dark:text-slate-200">Customers</h3>
                <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                  {customers.map((customer) => (
                    <li key={customer.id}>
                      {customer.name}: {formatMoney(customer.currentExposure)} /{' '}
                      {formatMoney(customer.creditLimit)}, {customer.accountStatus}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-slate-700 dark:text-slate-200">Open invoice signals</h3>
                <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                  {invoices
                    .filter((invoice) => invoice.status !== 'paid')
                    .map((invoice) => (
                      <li key={invoice.id}>
                        {invoice.id}: {formatMoney(invoice.amount)}, {invoice.status}
                        {invoice.daysPastDue > 0 ? `, ${invoice.daysPastDue} days past due` : ''}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </section>
        </aside>

        <main className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Interactive lab</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {selectedScenario.lesson}
                </p>
                <blockquote className="mt-4 border-l-2 border-slate-300 pl-4 text-sm text-slate-700 dark:border-slate-600 dark:text-slate-300">
                  {selectedScenario.userRequest}
                </blockquote>
              </div>
              <button
                type="button"
                onClick={() => runScenario()}
                disabled={isRunning}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:focus-visible:ring-offset-slate-900"
              >
                <Play className="h-4 w-4" aria-hidden="true" />
                {isRunning ? 'Running...' : 'Run simulation'}
              </button>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-5">
            <Metric
              label="Latency"
              value={result ? `${result.metrics.latencyMs}ms` : '0ms'}
              icon={<Clock3 className="h-4 w-4" aria-hidden="true" />}
            />
            <Metric
              label="Tool calls"
              value={result ? String(result.metrics.toolCalls) : '0'}
              icon={<Cpu className="h-4 w-4" aria-hidden="true" />}
            />
            <Metric
              label="Iterations"
              value={result ? String(result.metrics.iterations) : '0'}
              icon={<Repeat className="h-4 w-4" aria-hidden="true" />}
            />
            <Metric
              label="Tokens"
              value={
                result
                  ? String(result.metrics.estimatedInputTokens + result.metrics.estimatedOutputTokens)
                  : '0'
              }
              icon={<Database className="h-4 w-4" aria-hidden="true" />}
              hint="simulated"
            />
            <Metric
              label="Cost"
              value={result ? `$${result.metrics.estimatedCostUsd.toFixed(6)}` : '$0.000000'}
              icon={<CircleDollarSign className="h-4 w-4" aria-hidden="true" />}
              hint="simulated"
            />
          </div>

          <ApprovalGate
            pendingApproval={result?.pendingApproval}
            isRunning={isRunning}
            onApprove={() => runScenario('approved')}
            onReject={() => runScenario('rejected')}
          />

          {result?.finalAnswer && (
            <section className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Final recommendation</h2>
                  <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Decision
                      </dt>
                      <dd className="mt-1 font-medium text-slate-900 dark:text-slate-50">
                        {result.recommendation.decision}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Approval needed
                      </dt>
                      <dd className="mt-1 font-medium text-slate-900 dark:text-slate-50">
                        {result.recommendation.requiresHumanApproval ? 'Yes' : 'No'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Recommended action
                      </dt>
                      <dd className="mt-1 font-medium text-slate-900 dark:text-slate-50">
                        {result.recommendation.recommendedAction}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {result.finalAnswer}
                  </p>
                  {result.recommendation.reasons.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-600 dark:text-slate-400">
                      {result.recommendation.reasons.map((reason) => (
                        <li key={reason}>{reason}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          )}

          <section
            className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
            aria-label="Active lens"
          >
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">
                  {tabs.find((tab) => tab.id === activeTab)?.label}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {tabs.find((tab) => tab.id === activeTab)?.description}
                </p>
              </div>
              <a
                href="https://github.com/divinerapierh/lifan.dev/blob/main/docs/agent-lab-architecture.md"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-300"
              >
                Architecture →
              </a>
            </header>

            {activeTab === 'overview' && (
              <OverviewLensBody hasResult={Boolean(result)} eventCount={events.length} />
            )}

            {activeTab === 'llm' && <LensConversation events={events} />}

            {activeTab === 'structured' && (
              <LensSchema
                events={events}
                simulateInvalidOutput={simulateInvalidOutput}
                onToggleInvalidOutput={setSimulateInvalidOutput}
                hasResult={Boolean(result)}
              />
            )}

            {activeTab === 'tools' && <LensTools events={events} />}

            {activeTab === 'loop' && <LensLoop events={events} iterations={result?.iterations} />}

            {activeTab === 'trace' && (
              <div className="grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
                <TraceTimeline
                  events={events}
                  selectedEventId={selectedEvent?.id}
                  onSelectEvent={setSelectedEventId}
                />
                <ToolCallPanel event={selectedEvent} />
              </div>
            )}

            {activeTab === 'evals' && <EvalPanel simulationLatencyMs={simulationLatencyMs} />}
          </section>
        </main>
      </div>
    </div>
  );
}

function OverviewLensBody({ hasResult, eventCount }: { hasResult: boolean; eventCount: number }) {
  if (!hasResult) {
    return (
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        Pick a scenario, run the simulation, then explore the other tabs to see the same run from
        different angles: messages, schemas, tool calls, the loop itself, or the full trace.
      </p>
    );
  }

  return (
    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
      The run produced {eventCount} trace events. Each tab above is a different lens onto the same
      run — start with <strong>Conversation</strong> to see what the model said, then
      <strong> Tool Calling</strong> to see typed boundaries, then <strong>Agent Loop</strong> to
      see how iterations chain together.
    </p>
  );
}

function Metric({
  label,
  value,
  icon,
  hint,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-50">{value}</p>
      {hint && (
        <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}
