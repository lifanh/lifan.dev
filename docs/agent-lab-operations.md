# Agent Lab — Operations and Deployment

> **Lab 12** in the [12-lab Agent Engineering Lab](../src/pages/tools/agent-lab/labs.astro)
> series. Unlike Labs 1–11 this one is documentation, not a visual playground:
> production observability and deployment are infrastructure topics, not a single
> demo surface.

This document captures what the lab would look like in production: what to
observe, what to budget, where to deploy, how to replay failures, and which
of these the current codebase already supports.

---

## What "production" means for an Agent Lab

An agent in production has the same operating shape as any distributed system,
plus three things that are uniquely agent-shaped:

1. Every iteration is a network call — observability latency is observability cost.
2. The model is non-deterministic — replay must be exact down to inputs and the
   client identity, not approximate.
3. Tools are side-effecting — audit logs are not optional.

The Agent Lab already produces the data each of these requires. The artefact this
doc is about is everything *around* the runner: telemetry, dashboards, replay
tooling, deployment topology, and cost guardrails.

---

## What the lab already exposes

| Signal | Where it lives | How to consume it |
|--------|----------------|-------------------|
| Trace events | `AgentRunResult.events` (`src/lib/agent-lab/types.ts`) | Already rendered in the Trace Viewer lens; same shape would feed an OTel exporter. |
| Token usage / cost (simulated) | `AgentRunResult.metrics` | Lab marks every metric `simulated: true`; production wiring would replace these from the provider response. |
| Latency per event | `TraceEvent.durationMs` | Sum or distribute as needed; Trace Viewer shows totals. |
| Tool-call count / iterations | `AgentRunResult.metrics.{toolCalls,iterations}` | Cardinality is bounded by `MAX_ITERATIONS = 12`. |
| Model-client identity | `AgentRunResult.metrics.modelClientId` | `'fake' \| 'real'` — never trust client-side claims; the server endpoint should also stamp this. |
| Validation errors | `validation_error` trace events | Production should emit a counter per `path` and a histogram per `toolName`. |
| Approval-gate transitions | `approval_required` + `error` events | Maps cleanly to a "human-pending → approved/rejected/timed-out" state machine. |

The full event vocabulary is documented in [`agent-lab-architecture.md`](./agent-lab-architecture.md#trace-event-vocabulary).

---

## Telemetry plan

### Event taxonomy

Map each existing trace event to an OpenTelemetry span:

```diagram
╭───────────────╮      ╭────────────────╮      ╭────────────────╮
│ user_message  │─────▶│   agent.run    │─────▶│  tool.execute  │
╰───────────────╯      │   (root span)  │      │  (per call)    │
                       ╰───────┬────────╯      ╰────────────────╯
                               │
                               ▼
                       ╭────────────────╮
                       │ model.decide   │
                       │ (per iter)     │
                       ╰────────────────╯
```

Span attributes worth capturing:

- `agent.run`: `scenario.id`, `model.client.id`, `iterations`, `tool_calls`, `status`, `cost.usd`.
- `model.decide`: `temperature`, `prompt.tokens`, `completion.tokens`, `latency.ms`.
- `tool.execute`: `tool.name`, `permission.decision`, `args.size_bytes`, `result.size_bytes`.

### Metrics worth emitting

| Metric | Type | Why |
|--------|------|-----|
| `agent.iterations` | histogram | Detect runaway loops before MAX_ITERATIONS bites. |
| `agent.tool_calls` | histogram | Spot scenarios that are unexpectedly tool-heavy. |
| `agent.validation_error` | counter (by `path`) | Schema drift surfaces here first. |
| `agent.approval_decision` | counter (by `decision`) | Watch the human-loop rate; if it's near zero, the gate may be a no-op. |
| `agent.cost_usd` | histogram (by `scenario.id`) | Budget enforcement. |
| `agent.latency_ms` | histogram (per span) | p50 / p95 per scenario. |
| `agent.model_client_fallback` | counter | Increments on `RealModelUnavailableError`. |

### Logging contract

Every log line that contains tool input or output **must** be redacted at the
boundary that produced it. The lab today logs nothing; production should log:

- Run id, scenario id, model client id, status — every run.
- Tool name + permission decision — every tool call.
- Approval-gate transitions — every transition.
- Validation error path + message (never the full payload) — every failure.

Customer ids are already opaque tokens (`cust_acme`); real production data
needs a separate redaction pass or a hashing layer at the edge.

---

## Cost and latency budgets

Latency:

- p50 per agent run: ≤ 3s for the canonical scenarios.
- p95 per agent run: ≤ 8s. Anything beyond is a model timeout, not a slow tool.
- Hard ceiling: `MAX_ITERATIONS = 12` × per-decision timeout (recommend 6s) =
  72s ceiling per run before the runner is allowed to terminate.

Cost:

- Per-scenario budget should be set on the scenario, not the user. The lab
  defaults are tiny because no model is wired; the moment a real provider lands
  in `callRealProvider`, set a per-scenario cap (e.g. 8k input + 1k output
  tokens) and reject runs that would exceed it before the request goes out.

Fallback policy:

- `RealModelUnavailableError` is already handled — the runner swaps to the
  fake client and stamps `metrics.modelClientId = 'fake'`. Production should
  also: emit a `agent.model_client_fallback` counter, mark the run as degraded
  in the UI badge, and *never* silently retry against a different provider on
  the same run.

---

## Failed-task replay

A replay is exact when, given the same inputs, it reproduces the same trace
event sequence.

What the lab supports today:

- The fake model is **fully deterministic**. Replay = re-run the scenario with
  the same id and the same approval decision; events match byte-for-byte.
- The real model client is **not deterministic** by design. Replay needs to:
  1. Capture every `model.decide` request body and response payload at the
     server endpoint (`/api/agent-lab/decide.ts`).
  2. Store a tuple of `(run_id, iteration, request_hash, response_hash)`.
  3. Provide a "replay this run" mode that injects the recorded responses
     instead of calling the provider — the runner is already provider-agnostic
     via `ModelClient`, so this is a stub adapter rather than a refactor.

Suggested storage shape: append-only newline-delimited JSON in object
storage (R2 / S3), one run per file, keyed by `run_id`. Cheap to write,
trivial to scan, retention is a lifecycle policy.

---

## Deployment

### Today

The lab deploys via the Astro Cloudflare adapter (`@astrojs/cloudflare`) to
Cloudflare Pages. Server-rendered output, server endpoints under
`/src/pages/api/agent-lab/*` run as Workers. No background jobs, no queues,
no provider keys configured.

### When a real provider is wired

| Concern | Recommendation |
|---------|---------------|
| Provider key | Cloudflare Workers env binding (`PROVIDER_API_KEY`); never expose to client. The status endpoint already returns `{ realModelAvailable }` without leaking the key. |
| Per-IP rate limit | Cloudflare Rate Limiting rule on `/api/agent-lab/decide`; secondary in-app token bucket via Durable Object if KV is too coarse. |
| Per-run cost cap | Server-side check in `decide.ts` before forwarding; reject early on token budget overrun. |
| Idempotency | Hash `(scenario_id, iteration, observations)` and cache the response in KV for ~5 minutes; re-runs of identical decisions are free. |
| Background work | Cloudflare Queues for any async write (e.g. ticket creation in a real ERP). The lab's `createCreditReviewTicket` is synchronous because it's mock; production should enqueue and return a ticket-pending state. |
| Container fallback | If a workload doesn't fit Workers (long-running scrape, heavy SDK), Fly.io or Cloud Run with a Docker image. The Astro build output already supports a Node adapter as an alternative. |

### Local-only operation

For development the lab is offline-clean: no API keys, no network calls,
deterministic everywhere. `npm run dev` produces the full experience. This is
the correct default for a learning environment and should remain the default
even after a real provider is wired in production — toggling to real mode is
explicit, not implicit.

---

## What "done" looks like for Lab 12

The lab is operationally complete when:

- A run produces an OTel trace that opens in any compatible viewer.
- A failed run can be replayed deterministically from stored payloads.
- A budget violation aborts a run with a structured error event, not a 500.
- Provider fallback is observable as a counter, not just a UI badge.
- The deployment story above is one merged PR away — config, not code.

Today the data shape is right and the boundaries are right. What is missing is
plumbing, not architecture, and that is exactly what this doc is meant to
capture so the next person to wire it up has the map.

---

See also:

- [`agent-lab-architecture.md`](./agent-lab-architecture.md) — module map and
  the trace event vocabulary referenced throughout this doc.
- [`agent-lab-roadmap.md`](./agent-lab-roadmap.md) — phase-by-phase status of
  the playground itself.
