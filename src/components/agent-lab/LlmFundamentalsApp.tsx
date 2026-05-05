import { Clock3, CircleDollarSign, Cpu, MessageSquare, Send } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { callSimulatedLlm, type LlmRequest, type LlmResponse } from '../../lib/agent-lab/llmSimulator';
import { ErrorBoundary } from './ErrorBoundary';
import { LabChrome } from './LabChrome';

const DEFAULT_SYSTEM = 'You are a careful credit-risk analyst. Respond with concrete next actions.';
const DEFAULT_USER = 'Summarise how blocked accounts and overdue invoices interact for order eligibility.';
const COMPARE_USER = 'Summarise how blocked accounts and overdue invoices interact for order eligibility.';

type SidePanelState = {
  system: string;
  user: string;
  temperature: number;
  maxTokens: number;
};

export default function LlmFundamentalsApp() {
  const [a, setA] = useState<SidePanelState>({
    system: DEFAULT_SYSTEM,
    user: DEFAULT_USER,
    temperature: 0,
    maxTokens: 256,
  });
  const [b, setB] = useState<SidePanelState>({
    system: 'You are a terse credit-risk analyst. One short paragraph.',
    user: COMPARE_USER,
    temperature: 1.2,
    maxTokens: 256,
  });
  const [result, setResult] = useState<{ a: LlmResponse; b: LlmResponse } | null>(null);

  function run() {
    setResult({
      a: callSimulatedLlm(buildRequest(a)),
      b: callSimulatedLlm(buildRequest(b)),
    });
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
      <LabChrome current={1} />
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-3 py-2">
          <p className="text-sm font-medium uppercase tracking-normal text-slate-500 dark:text-slate-400">
            Lab 1 · LLM API fundamentals
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            Messages, parameters, latency, cost
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            The chat box hides the protocol. This lab makes the request and response shape visible:
            roles, parameters, token usage, simulated latency, and cost. The provider is a
            deterministic simulator so the lesson focuses on the wire-level contract.
          </p>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100">
            <strong className="font-medium">Simulated provider.</strong> The model output is generated
            by a small deterministic function so the lab works without API keys. Token counts use the
            ~4-chars-per-token heuristic; cost uses mock per-million rates. Real-provider wiring
            would slot in behind the same interface — see <code>/api/agent-lab/decide.ts</code> for
            the existing extension point.
          </div>
        </header>

        <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <header className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Two prompt configurations</h2>
          </header>
          <div className="grid gap-6 lg:grid-cols-2">
            <SidePanel label="A" value={a} onChange={setA} />
            <SidePanel label="B" value={b} onChange={setB} />
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={run}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors motion-reduce:transition-none hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Send both requests
            </button>
          </div>
        </section>

        {result && (
          <section className="grid gap-6 lg:grid-cols-2" aria-label="Comparison results">
            <ResponseColumn label="A" response={result.a} />
            <ResponseColumn label="B" response={result.b} />
          </section>
        )}

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <strong className="font-medium text-slate-900 dark:text-slate-50">What this lab teaches:</strong>{' '}
          messages are the real interface (the chat box hides this); the system message changes the
          response without changing the user's intent; temperature and max-tokens are part of the
          contract, not afterthoughts; latency, cost, and output variance are visible from day one,
          not surfaced only when something breaks in production.
        </section>
      </div>
      </div>
    </ErrorBoundary>
  );
}

function buildRequest(panel: SidePanelState): LlmRequest {
  return {
    messages: [
      { role: 'system', content: panel.system },
      { role: 'user', content: panel.user },
    ],
    temperature: panel.temperature,
    maxTokens: panel.maxTokens,
  };
}

function SidePanel({
  label,
  value,
  onChange,
}: {
  label: 'A' | 'B';
  value: SidePanelState;
  onChange: (next: SidePanelState) => void;
}) {
  const promptPreview = useMemo(
    () =>
      [
        { role: 'system', content: value.system },
        { role: 'user', content: value.user },
      ],
    [value.system, value.user],
  );

  return (
    <article aria-label={`Prompt configuration ${label}`} className="space-y-4">
      <header className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">Configuration {label}</h3>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          {label}
        </span>
      </header>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400" htmlFor={`system-${label}`}>
          System message
        </label>
        <textarea
          id={`system-${label}`}
          value={value.system}
          onChange={(event) => onChange({ ...value, system: event.target.value })}
          className="mt-1 min-h-[88px] w-full rounded-md border border-slate-300 bg-white p-2 font-mono text-xs text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
        />
      </div>

      <div>
        <label className="block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400" htmlFor={`user-${label}`}>
          User message
        </label>
        <textarea
          id={`user-${label}`}
          value={value.user}
          onChange={(event) => onChange({ ...value, user: event.target.value })}
          className="mt-1 min-h-[120px] w-full rounded-md border border-slate-300 bg-white p-2 font-mono text-xs text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label
            className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
            htmlFor={`temperature-${label}`}
          >
            <span>Temperature</span>
            <span className="font-mono normal-case text-slate-700 dark:text-slate-200">{value.temperature.toFixed(1)}</span>
          </label>
          <input
            id={`temperature-${label}`}
            type="range"
            min={0}
            max={2}
            step={0.1}
            value={value.temperature}
            onChange={(event) => onChange({ ...value, temperature: Number(event.target.value) })}
            className="mt-1 w-full"
            aria-valuemin={0}
            aria-valuemax={2}
            aria-valuenow={value.temperature}
          />
        </div>
        <div>
          <label
            className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
            htmlFor={`max-tokens-${label}`}
          >
            <span>Max tokens</span>
            <span className="font-mono normal-case text-slate-700 dark:text-slate-200">{value.maxTokens}</span>
          </label>
          <input
            id={`max-tokens-${label}`}
            type="range"
            min={16}
            max={1024}
            step={16}
            value={value.maxTokens}
            onChange={(event) => onChange({ ...value, maxTokens: Number(event.target.value) })}
            className="mt-1 w-full"
            aria-valuemin={16}
            aria-valuemax={1024}
            aria-valuenow={value.maxTokens}
          />
        </div>
      </div>

      <div>
        <h4 className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Wire payload preview</h4>
        <pre className="mt-1 max-h-44 overflow-auto rounded-md bg-slate-900 p-2 font-mono text-[11px] text-slate-100">
          {JSON.stringify({ messages: promptPreview, temperature: value.temperature, maxTokens: value.maxTokens }, null, 2)}
        </pre>
      </div>
    </article>
  );
}

function ResponseColumn({ label, response }: { label: 'A' | 'B'; response: LlmResponse }) {
  return (
    <article
      aria-label={`Response ${label}`}
      className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
    >
      <header className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">Response {label}</h3>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
            response.finishReason === 'length'
              ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100'
              : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100'
          }`}
        >
          finish: {response.finishReason}
        </span>
      </header>

      <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
        <Stat icon={<Cpu className="h-3 w-3" aria-hidden="true" />} label="Total tokens" value={`${response.usage.total} (${response.usage.prompt}+${response.usage.completion})`} />
        <Stat icon={<Clock3 className="h-3 w-3" aria-hidden="true" />} label="Latency" value={`${response.latencyMs}ms`} />
        <Stat icon={<CircleDollarSign className="h-3 w-3" aria-hidden="true" />} label="Cost" value={`$${response.costUsd.toFixed(6)}`} />
      </dl>

      <div className="mt-4">
        <h4 className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Assistant message</h4>
        <pre className="mt-1 max-h-72 overflow-auto whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-800 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100">
          {response.message.content}
        </pre>
      </div>
    </article>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 p-2 dark:border-slate-700">
      <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {icon}
        <span>{label}</span>
      </dt>
      <dd className="mt-1 font-mono text-sm text-slate-900 dark:text-slate-50">{value}</dd>
    </div>
  );
}
