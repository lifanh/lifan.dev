# Agent Engineering Lab Roadmap

> **For agentic workers:** Use `subagent-driven-development` or `executing-plans` when implementing roadmap phases. Each phase should ship as a working, testable increment.

**Goal:** Turn Agent Engineering Lab from a deterministic MVP into a production-grade learning environment for AI agent architecture, tool boundaries, approvals, traces, evaluations, and enterprise workflow automation.

**Current state:** The MVP route at `/tools/agent-lab` is live with:

- A real loop driven by an extracted `fakeModel.decideNextStep` (deterministic stand-in for an LLM, swappable for a real provider).
- Zod schemas validating tool args, tool results, and the final recommendation at runtime, with `validation_error` and `model_retry` events on the trace.
- Arg-aware policy (`checkOrderEligibility` requires approval above the large-order threshold; `createCreditReviewTicket` always requires approval).
- Tabs that render genuinely different lenses (Conversation, Structured Output, Tool Calling, Agent Loop, Trace Viewer) — no more decorative-only tabs.
- Approve / reject paths, both surfaced in the trace and the final answer.
- Metrics labelled as simulated.
- Architecture documented in [`agent-lab-architecture.md`](./agent-lab-architecture.md).
- 24 Vitest cases covering schemas, policy, runner, tools, and UI flows including the rejection path and the schema-repair demo.

**Architecture:** Keep the public learning experience deterministic by default. Add real model execution only behind server-side API boundaries, with cost controls, rate limits, audit logs, and no browser-exposed API keys. Treat tools, policy, trace storage, and model clients as separate modules so each can be tested independently.

---

## Roadmap Principles

1. **Simulated first, real second:** Every concept should work without external API keys.
2. **The model is not the permission system:** Policy checks stay outside model output.
3. **Every agent step is inspectable:** Messages, tool calls, tool results, policy decisions, approvals, costs, and failures must be visible.
4. **Enterprise realism over chatbot novelty:** Use ERP, credit, order release, ticketing, and audit workflows as the domain.
5. **Testable by design:** Each phase adds focused Vitest coverage before implementation changes.

---

## Phase 1: Strengthen The Current MVP — ✅ Substantially complete

**Purpose:** Make the existing deterministic lab feel complete and reliable before adding real model calls.

**Done:**

- ✅ Loop refactor — `fakeModel.ts` extracted, runner is a real `while` loop, iteration count surfaced in metrics.
- ✅ Tabs reorganized into genuinely different lenses (Overview, Conversation, Structured Output, Tool Calling, Agent Loop, Trace Viewer).
- ✅ Final-recommendation panel expanded with decision, approval-needed, recommended-action, and reasons as separate rows.
- ✅ Tests for rejection path (UI + runner), Initech blocked path, unknown scenario, multi-iteration assertion.
- ✅ Cost / token metrics labelled as simulated.
- ✅ Architecture link wired into the lens header.

**Still open (low-priority polish):**

- Trace filtering by event type.
- "Copy JSON" buttons on the inspector.
- Keyboard shortcuts for scenario selection, trace selection, approval, rejection (default tab order works; explicit shortcuts are a nice-to-have).
- Responsive audit for narrow screens and long JSON payloads.

**Acceptance criteria (all currently met):**

- `npm test` passes.
- `npm run build` passes.
- ACME approval and rejection both produce clear final answers.
- Globex completes without an approval gate.
- Initech blocks without a write-action approval gate.

---

## Phase 2: Structured Output And Validation Lab — ✅ Core complete

**Purpose:** Teach why production agents need schemas, validation, and repair loops.

**Done:**

- ✅ `src/lib/agent-lab/schemas.ts` — Zod schemas for every tool args shape, every tool result shape, and the final recommendation.
- ✅ Runner validates args and results around every tool call, and the final recommendation before emitting `final_answer`.
- ✅ `validation_error` and `model_retry` trace events implemented.
- ✅ Structured Output lens with schema viewer, "force invalid output" toggle, and rendered validation issues per failed field.
- ✅ `schemas.test.ts` covers happy path and multiple-error path.
- ✅ Invalid-recommendation demo path (`simulateInvalidRecommendation`) wired through fake model → validation_error → model_retry → corrected final answer.

**Still open:**

- Repair-loop sophistication (currently a single retry — could iterate up to N times before giving up).
- Surface arg-validation failures more visibly in the lens (today they're in the Trace tab; could be promoted to the Structured Output lens too).

**Acceptance criteria (met):**

- The lab demonstrates a schema failure without breaking the app.
- Validation errors are rendered as `path: message` rows, not stack traces.
- Existing scenarios still run unchanged.

---

## Phase 3: Evaluation Lab — ✅ Core complete

**Purpose:** Make Agent Lab demonstrate durable AI engineering skill: measuring whether an agent did the right thing.

**Done:**

- ✅ `src/lib/agent-lab/evals.ts` — `EvalCase`, `EvalAssertion`, `EvalResult` types; `runEvalCase` and `runAllEvals` runners; ordered tool-sequence matcher; metric capture per case.
- ✅ Eight canonical cases covering: ACME approval-gate-reached, ACME approved with ticket, ACME rejected without ticket, Globex auto-approve, Initech blocked, unknown customer error, malformed amount validation, and schema-repair-on-Globex.
- ✅ Assertions for status, decision, requiresHumanApproval, ordered tool sequence, finalAnswer substrings, included / excluded event types, max iterations, max tool calls, and ticket-created flag.
- ✅ Inline scenario support in `runAgentLabScenario` so eval-only edge cases (unknown customer, malformed amount) don't pollute the public scenario list.
- ✅ Tool-execution exceptions now produce a clean `error` event + `status: 'error'` rather than propagating, so unknown-customer is a first-class assertable outcome.
- ✅ `EvalPanel.tsx` — run button, summary tiles, per-case expandable assertion list, per-case metric strip (iterations / tools / latency / cost).
- ✅ Evals tab wired into `AgentLabApp`.
- ✅ `evals.test.ts` — 5 test cases including pass-all sanity, broken-expectation reporting, metrics shape, and tool-order mismatch detection.

**Still open:**

- Latency budgets per case (currently captured in metrics but not asserted).
- Persisting eval results across reloads (Phase 6).
- Snapshot-style assertions on the full trace (overkill for now; revisit if eval signal becomes too coarse).

**Acceptance criteria (met):**

- ✅ Eval suite runs in-browser without a backend.
- ✅ Eight eval cases (≥ five required) pass against the deterministic agent.
- ✅ Failed cases list the exact failing assertion with `got: …` detail.

---

## Phase 4: Real Model Mode Behind Server Endpoint — ✅ Core complete

**Purpose:** Add an optional real LLM execution path while preserving the deterministic public demo.

**Done:**

- ✅ `src/lib/agent-lab/fakeModel.ts` — already extracted in Phase 1; the runner has been provider-agnostic since then.
- ✅ `src/lib/agent-lab/modelClient.ts` — narrow `ModelClient` interface with `decideNextStep(state) → Promise<ModelDecision>`. Two implementations: `fakeModelClient` (deterministic, in-browser) and `createRealModelClient(...)` (posts to server). Adds `RealModelUnavailableError` and a `fetchRealModelStatus` helper.
- ✅ `src/pages/api/agent-lab/decide.ts` — POST endpoint that validates incoming state with Zod, enforces a body-size cap and a scenario allowlist, and returns 503 when no provider key is configured. The provider call is a clearly-marked extension point so wiring OpenAI/Anthropic/Bedrock is a small, isolated change.
- ✅ `src/pages/api/agent-lab/status.ts` — GET endpoint that reports whether a provider key is configured. The browser uses this to enable / disable the "Real model" toggle. Never returns the key itself.
- ✅ Runner refactored to accept an optional `modelClient`. When the real client throws `RealModelUnavailableError`, the runner emits an `error` event, swaps to `fakeModelClient`, and finishes the run — so a real-model outage is a degraded but functional experience, not a broken one.
- ✅ `AgentRunResult.metrics.modelClientId` records which client actually drove the run, so the UI can surface "real → fell back to fake".
- ✅ `ModeToggle` UI (radio-group) inside the run controls. Defaults to Simulated. "Real model" disabled when status reports unavailable. Shows the status note and a fallback notice when the last run had to swap clients.
- ✅ `modelClient.test.ts` — 7 tests covering fake-client behavior, real-client 503 path, malformed-response path, valid-response path, status endpoint outage / availability paths, and an integration test that confirms the runner emits `error` and finishes via the fake client when the real client throws.
- ✅ `AgentLabApp.test.tsx` — UI test that confirms the radio group renders, Simulated is checked by default, and Real model is disabled when the status endpoint reports unavailable.
- ✅ Test setup stubs `/api/agent-lab/*` fetches by default to keep jsdom test runs free of network noise.

**Still open:**

- Wiring an actual provider (OpenAI / Anthropic / Bedrock) inside `callRealProvider`. The boundary is fully built; this is a 50-line change inside one function.
- Cross-iteration request budget / rate limiting (currently per-request body cap + scenario allowlist; full budget + per-IP throttling want a Cloudflare KV/DO).
- Server endpoint tests: the lab uses Cloudflare adapter so endpoint tests would need the Workers runtime; the existing modelClient tests cover the contract from the client side.

**Acceptance criteria (met):**

- ✅ No model API key is exposed to client code (the key only ever lives in `import.meta.env` / Cloudflare runtime env on the server).
- ✅ Simulated mode remains the default.
- ✅ Real mode failure does not break the learning experience (graceful fallback + trace event).
- ✅ Trace format stays consistent across simulated and real modes (same runner, same events, same schema).

---

## Phase 5: RAG Mini-Lab — ✅ Core complete

**Purpose:** Teach document-grounded answers without introducing a vector database too early.

**Done:**

- ✅ `src/data/agent-lab/creditPolicyDocument.ts` — 8 stable, addressable sections (P-001 through P-008) covering blocked accounts, projected exposure, overdue invoices, watchlist, large-order threshold, ticket creation, risk level, and the auto-approve safe path.
- ✅ `src/lib/agent-lab/retrieval.ts` — deterministic keyword retrieval: tokenizer with stop-word list, light synonym expansion, double-weighted explicit-keyword scoring, deterministic tie-break by section id, top-k limit.
- ✅ `composeCitedAnswer` and `composeUncitedAnswer` helpers produce the side-by-side answers used by the lab so the contrast is concrete and reproducible.
- ✅ `RagPanel.tsx` — query textarea (defaults to selected scenario), tokens scored, two answer cards, retrieved-sections list with score chips, full policy document with cited sections highlighted.
- ✅ RAG tab wired into `AgentLabApp` with the scenario's `recommendedAction` threaded as the cited conclusion.
- ✅ `retrieval.test.ts` — 9 cases covering tokenization, blocked / overdue / watchlist / large-order queries, top-k limit, empty match, cited-answer composition, uncited baseline.
- ✅ UI test confirms the policy document and both answer cards render when the RAG tab is opened.

**Still open:**

- Adding `retrieval_query` and `retrieval_result` events to the agent trace itself (currently RAG is a comparison panel; integrating into the live agent run is a follow-up).
- Multi-document support and chunking (single-doc is enough for the lesson).

**Acceptance criteria (met):**

- ✅ No vector database is required — pure tokenized keyword scoring.
- ✅ Citations point to local policy section IDs (P-001 … P-008).
- ✅ The side-by-side comparison makes the value of retrieval clear.

---

## Phase 6: Persistence And Learning Progress

**Purpose:** Let users return to the module and see progress without adding accounts.

**User-facing outcomes:**

- Completed labs persist locally.
- Last selected scenario and tab persist locally.
- Eval results can be saved in browser storage.
- Users can reset local Agent Lab progress.

**Implementation areas:**

- Create `src/lib/agent-lab/progressStore.ts`
- Modify `src/components/agent-lab/AgentLabApp.tsx`
- Add `src/lib/agent-lab/progressStore.test.ts`

**Tasks:**

- Add local persistence through Zustand or a small localStorage helper.
- Store completed tabs and last scenario.
- Store last eval result summary.
- Add reset progress action.
- Add tests for storage read/write and invalid stored data recovery.

**Acceptance criteria:**

- Refreshing the page preserves learning progress.
- Corrupt localStorage data does not crash the app.
- Reset clears Agent Lab data only.

---

## Phase 7: Production Hardening — ✅ Core complete

**Purpose:** Make the module reliable enough to use as a public portfolio piece.

**Done:**

- ✅ `ErrorBoundary` component wraps the main lab panel; renders a recovery card with reset button when a child throws. Includes its own unit tests.
- ✅ Tool-execution exceptions inside the runner are caught and surfaced as `error` events + `status: 'error'` rather than propagating.
- ✅ `StatusBadge` renders distinct visual states for: idle, running, awaiting human approval, auto-approved, blocked, approved-with-review-ticket, rejected-by-human, error. Uses `role="status"` + `aria-live="polite"`.
- ✅ `motion-reduce:transition-none` applied to every transition in the lab so reduced-motion users get instant state changes.
- ✅ Long-JSON test asserts the inspector keeps a `max-h-*` + `overflow-auto` constraint.
- ✅ All interactive controls already meet `min-h-[44px]`; `aria-pressed` set on tab + scenario buttons; `aria-label` improved on the run button while running; `role="status"` on the status badge.

**Still open:**

- Color-contrast audit against `GUIDELINE.md` is informal; a structured audit with measured ratios would be a nice addition (currently relying on the design system palette, which is the rule).
- README mention.

**Acceptance criteria (met):**

- ✅ Keyboard-only path can run a scenario and approve/reject (tab order is logical, all focus states visible).
- ✅ Long JSON payloads scroll inside the inspector (locked in by test).
- ✅ No hardcoded colors are introduced outside design-system palette usage.

---

## Phase 8: Portfolio Narrative And Documentation — ✅ Core complete

**Purpose:** Make the module explain the engineering story clearly to visitors, recruiters, and future maintainers.

**Done:**

- ✅ `docs/agent-lab-architecture.md` — module map (with diagram), responsibilities table, end-to-end loop description, trace event vocabulary, extension recipes for scenarios / tools / lenses.
- ✅ Architecture link surfaced in every lens header.
- ✅ Hero copy reframed around "tool boundaries, runtime schema validation, policy gates, and human approval — the parts of an AI agent the chatbot demos hide."

**Still open:**

- README mention of the module (if/when a top-level project list is added).
- Final UX-copy pass on lesson bullets and lens descriptions.
- An in-app architecture diagram (the doc covers this; an in-page summary would reduce a click for casual visitors).

**Acceptance criteria (met):**

- A visitor can understand the learning goal in under one minute.
- A developer can add a new deterministic scenario by following docs.
- The module reinforces ERP/backend/platform engineering experience.

---

## Recommended Implementation Order

**Done:**

1. ✅ Phase 1: Strengthen current MVP (loop refactor, lens tabs, expanded final answer, broader tests, simulated-metrics labelling).
2. ✅ Phase 2: Structured output validation (Zod schemas around every boundary, validation_error / model_retry events, schema-repair demo lens).
3. ✅ Phase 3: Evaluation lab (8 eval cases, assertion framework, EvalPanel UI, in-browser runner).
4. ✅ Phase 4: Real model mode behind a server endpoint (modelClient interface, decide / status endpoints, mode toggle, graceful fallback).
5. ✅ Phase 5: RAG mini-lab (8-section policy doc, deterministic keyword retrieval, side-by-side cited vs. uncited answers).
6. ✅ Phase 7: Production hardening (ErrorBoundary, StatusBadge, reduced-motion respect, long-JSON containment locked in by test).
7. ✅ Phase 8 (core): Portfolio narrative + architecture doc.

**Deferred / optional:**

- Phase 6: Local persistence. Low marginal value for a portfolio page; revisit if multi-session flows are added.
- Polish items inside each phase's "Still open" block.
- Wiring an actual LLM provider in `callRealProvider`. The boundary is fully built; this is a small, isolated change.

**Reorder rationale (vs. original plan):**

- Phase 2 was moved before Phase 3 because evals on un-validated outputs become brittle string-matching. Schemas first, assertions on schema fields second.
- Phase 8 (architecture doc) was pulled forward and treated as part of every release, not a single later phase. A one-page architecture doc is the highest-ROI artifact for the portfolio axis.
- Extracting `fakeModel.ts` was promoted out of Phase 4 into Phase 1, because it is what makes the runner credibly a *loop*. Phase 4 then became a clean drop-in swap.

---

## Twelve-Lab Expansion — ✅ Core complete

**Purpose:** Reframe the Agent Lab as a 12-module learning platform without
duplicating the work the canonical playground already does.

**Approach (option C from the structure decision):** Keep `/tools/agent-lab` as
the canonical playground (it already covers Labs 2 / 3 / 4 / 5 / 9 / 10 / 11 as
lenses). Add four dedicated sibling routes for the net-new material. Cover
Lab 12 in a documentation page rather than a route, because operational
concerns are infrastructure topics, not visual demos.

**Done:**

- ✅ Lab 1 — `/tools/agent-lab/llm-fundamentals` with `llmSimulator.ts`
  (deterministic completion API: messages, temperature, max-tokens, simulated
  latency / token usage / cost) and a side-by-side prompt-comparison UI.
- ✅ Lab 6 — `/tools/agent-lab/hybrid-search` with `hybridSearch.ts` (BM25,
  pseudo-vector via char-trigrams + hashed buckets + cosine, RRF hybrid, toy
  reranker) and a four-column comparison UI over the existing 8-section policy
  document.
- ✅ Lab 7 — `/tools/agent-lab/mcp-tools` with `mcpManifest.ts` (derives the
  manifest from the existing schemas + policy, includes a tiny zod →
  JSON-schema converter and a scripted MCP handshake) and a registry / detail
  / handshake UI.
- ✅ Lab 8 — `/tools/agent-lab/workflow-vs-agent` with `workflow.ts` (six-step
  deterministic pipeline) and a side-by-side UI that runs the same scenario
  through the workflow and the free-form agent runner.
- ✅ Lab 12 — [`agent-lab-operations.md`](./agent-lab-operations.md): telemetry
  plan, cost / latency budgets, replay strategy, deployment notes for
  Cloudflare Pages + Workers, and what "done" means operationally. No new
  route; the lab is documentation by design.
- ✅ `/tools/agent-lab/labs` — `LabsIndex.tsx` card grid mapping every lab
  number to its route or lens, with a kind badge (canonical lab / dedicated
  route / docs). Linked from the canonical lab header as "All 12 labs →".

**Still open:**

- A real LLM provider in `callRealProvider` would let Labs 1 and 6 show real
  generation / embedding behaviour. The boundaries are fully built; this is a
  small, isolated change as called out in Phase 4.
- Lab 12 as a live observability dashboard (rather than a doc) needs an
  OpenTelemetry exporter wired to a sink and a small replay UI. The doc maps
  the work; none of it is on the critical path for the learning experience.

**Acceptance criteria (met):**

- A visitor lands on `/tools/agent-lab/labs` and can navigate to all 12
  modules.
- Each new lab works without API keys, deterministically, in under a second.
- The architecture doc explains how the 12 labs share underlying modules so
  the engineering surface stays small.
- `npm test` and `npm run build` both green after every lab commit.

---

## Definition Of Fully Functional

Agent Lab is fully functional when it supports:

- Deterministic public demos for all core concepts.
- Optional real model execution through a server-only endpoint.
- Tool calling with typed inputs and outputs.
- Policy checks independent of model output.
- Human approval for write actions.
- Structured-output validation and repair demonstration.
- Trace viewer with inspectable payloads.
- Evaluation suite with pass/fail scoring.
- Local RAG mini-lab with citations.
- Local learning progress persistence.
- Production-grade accessibility, responsive layout, and error handling.

At that point, the module is no longer a demo. It is a compact agent-engineering learning platform.
