import { Network, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  buildManifest,
  simulateMcpHandshake,
  type McpToolDescriptor,
} from '../../lib/agent-lab/mcpManifest';
import type { ToolName } from '../../lib/agent-lab/schemas';
import { ErrorBoundary } from './ErrorBoundary';
import { LabChrome } from './LabChrome';

const PERMISSION_BADGE: Record<McpToolDescriptor['permission']['level'], { label: string; tone: string }> = {
  read_only: {
    label: 'read-only',
    tone: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100',
  },
  requires_approval: {
    label: 'requires approval',
    tone: 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100',
  },
  requires_approval_when: {
    label: 'conditional approval',
    tone: 'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100',
  },
  denied: {
    label: 'denied',
    tone: 'bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-100',
  },
};

const SAMPLE_ARGS: Record<ToolName, Record<string, unknown>> = {
  getCustomer: { customerNameOrId: 'ACME' },
  getCreditStatus: { customerId: 'cus_acme' },
  getOpenInvoices: { customerId: 'cus_acme' },
  checkOrderEligibility: { customerId: 'cus_acme', orderAmount: 20000 },
  createCreditReviewTicket: { customerId: 'cus_acme', reason: 'Projected exposure exceeds credit limit.' },
};

export default function McpToolsApp() {
  const manifest = useMemo(() => buildManifest(), []);
  const [selectedToolName, setSelectedToolName] = useState<ToolName>(manifest.tools[0].name);
  const selectedTool = manifest.tools.find((tool) => tool.name === selectedToolName) ?? manifest.tools[0];
  const handshake = useMemo(
    () => simulateMcpHandshake(selectedTool.name, SAMPLE_ARGS[selectedTool.name]),
    [selectedTool.name],
  );

  return (
    <ErrorBoundary>
      <div className="space-y-6">
      <LabChrome current={7} />
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-3 py-2">
          <p className="text-sm font-medium uppercase tracking-normal text-slate-500 dark:text-slate-400">
            Lab 7 · MCP-style tool protocol
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            Tool discovery via a manifest
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            The Agent Lab already has tool implementations, Zod arg schemas, and a permission policy
            in three separate modules. Model Context Protocol takes those and renders them as one
            machine-readable manifest so any compatible client can discover what is available, what
            it requires, and what it costs in approval.
          </p>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <strong className="font-medium text-slate-900 dark:text-slate-50">Why this lab matters:</strong>{' '}
            Tools need descriptions, schemas, and permission metadata to be discoverable. MCP is about
            tool interoperability, not magic intelligence — the same five tools below could be served
            from any MCP-compatible host and consumed by any MCP-compatible client.
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside aria-label="Available tools" className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Tool registry</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Server: <span className="font-mono">{manifest.serverInfo.name}@{manifest.serverInfo.version}</span>
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Protocol: <span className="font-mono">{manifest.protocolVersion}</span>
            </p>
            <ul className="mt-4 space-y-2">
              {manifest.tools.map((tool) => {
                const selected = tool.name === selectedToolName;
                const badge = PERMISSION_BADGE[tool.permission.level];
                return (
                  <li key={tool.name}>
                    <button
                      type="button"
                      onClick={() => setSelectedToolName(tool.name)}
                      aria-pressed={selected}
                      className={`min-h-[44px] w-full rounded-lg border p-3 text-left transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        selected
                          ? 'border-blue-400 bg-blue-50 dark:border-blue-400 dark:bg-slate-700'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="block font-mono text-xs text-slate-700 dark:text-slate-200">
                        {tool.name}
                      </span>
                      <span
                        className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${badge.tone}`}
                      >
                        {badge.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="space-y-6">
            <ToolDetail tool={selectedTool} />
            <HandshakePanel handshake={handshake} />
          </div>
        </section>
      </div>
      </div>
    </ErrorBoundary>
  );
}

function ToolDetail({ tool }: { tool: McpToolDescriptor }) {
  const badge = PERMISSION_BADGE[tool.permission.level];
  return (
    <section
      aria-label={`Tool descriptor for ${tool.name}`}
      className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
    >
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-mono text-lg font-bold text-slate-900 dark:text-slate-50">{tool.name}</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{tool.description}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${badge.tone}`}>
          {badge.label}
        </span>
      </header>
      <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs leading-5 dark:border-slate-700 dark:bg-slate-900/40">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium">Permission</span>
        </div>
        <p className="mt-1 text-slate-600 dark:text-slate-400">{tool.permission.explanation}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">Input schema</h3>
        <pre
          className="mt-2 max-h-72 overflow-auto rounded-md border border-slate-200 bg-slate-900 p-3 font-mono text-xs leading-5 text-slate-100 dark:border-slate-700"
          aria-label={`Input schema JSON for ${tool.name}`}
        >
          {JSON.stringify(tool.inputSchema, null, 2)}
        </pre>
      </div>
    </section>
  );
}

function HandshakePanel({ handshake }: { handshake: ReturnType<typeof simulateMcpHandshake> }) {
  return (
    <section
      aria-label="Simulated MCP handshake"
      className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
    >
      <header className="flex items-start gap-3">
        <Network className="mt-1 h-5 w-5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Simulated MCP handshake</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            What an agent would send and receive on first contact: <code>initialize</code> →{' '}
            <code>tools/list</code> → <code>tools/call</code>. No real socket; the lab generates the
            envelopes from the same manifest the runner already uses.
          </p>
        </div>
      </header>
      <ol className="mt-4 space-y-3">
        {handshake.map((step) => (
          <li
            key={step.step}
            className="rounded-md border border-slate-200 p-3 text-xs leading-5 dark:border-slate-700"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-slate-700 dark:text-slate-200">
                {step.step}. {step.method}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {step.direction}
              </span>
            </div>
            <pre className="mt-2 max-h-60 overflow-auto rounded bg-slate-900 p-2 font-mono text-[11px] leading-5 text-slate-100">
              {JSON.stringify(step.payload, null, 2)}
            </pre>
          </li>
        ))}
      </ol>
    </section>
  );
}
