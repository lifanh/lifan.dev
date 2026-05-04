# Agent Engineering Lab — Architecture

A short tour of how the lab is wired together and why each module exists.

## One-line thesis

The model is a single, replaceable component inside a larger system. The system — not the
model — owns the loop, the tools, the policy, the validation, and the approval gate.

## Twelve labs, one engineering story

The Lab is structured as 12 focused modules. Eight share the canonical credit-order-eligibility
playground at `/tools/agent-lab` (rendered as different lenses); four live as dedicated sibling
routes for material the canonical playground does not exercise; one is documentation only because
the topic is operational, not visual. The full index is at `/tools/agent-lab/labs`.

| # | Title | Where |
|---|-------|-------|
| 1 | LLM API fundamentals | `/tools/agent-lab/llm-fundamentals` |
| 2 | Structured outputs | `/tools/agent-lab` (Structured Output lens) |
| 3 | Tool calling | `/tools/agent-lab` (Tool Calling lens) |
| 4 | Agent loop | `/tools/agent-lab` (Agent Loop lens) |
| 5 | RAG | `/tools/agent-lab` (RAG lens) |
| 6 | Hybrid search and reranking | `/tools/agent-lab/hybrid-search` |
| 7 | MCP-style tool protocol | `/tools/agent-lab/mcp-tools` |
| 8 | Workflow vs free-form agent | `/tools/agent-lab/workflow-vs-agent` |
| 9 | Evaluation harness | `/tools/agent-lab` (Evals lens) |
| 10 | Human-in-the-loop | `/tools/agent-lab` (built into every run) |
| 11 | Permissions and audit trails | `/tools/agent-lab` (policy module + Trace Viewer) |
| 12 | Observability and deployment | [`agent-lab-operations.md`](./agent-lab-operations.md) |

The dedicated routes (Labs 1, 6, 7, 8) reuse the same data, schemas, and policy modules as the
canonical playground; they only swap the lens or the runner. That keeps the engineering surface
small even as the learning surface grows.

## Module map

```diagram
                    ╭──────────────────────────╮
                    │  AgentLabApp.tsx (UI)    │
                    │  • scenario picker       │
                    │  • run button            │
                    │  • lens tabs             │
                    │  • approval gate UI      │
                    ╰────────────┬─────────────╯
                                 │ runAgentLabScenario(input)
                                 ▼
                    ╭──────────────────────────╮
                    │   agentRunner.ts (loop)  │
                    │                          │
                    │  while (iters < MAX) {   │
                    │    decision = model      │
                    │    validate args (Zod)   │
                    │    policy check          │
                    │    [approval gate]       │
                    │    execute tool          │
                    │    validate result (Zod) │
                    │    record observation    │
                    │  }                       │
                    ╰─┬──┬──────────┬─────┬────╯
                      │  │          │     │
       ┌──────────────┘  │          │     └──────────────┐
       ▼                 ▼          ▼                    ▼
  ╭─────────╮     ╭──────────╮ ╭──────────╮      ╭─────────────╮
  │fakeModel│     │ schemas  │ │  policy  │      │  mockTools  │
  │decide   │     │ Zod args │ │ rules    │      │ ERP / credit │
  │NextStep │     │ + results│ │ + gates  │      │ + invoices   │
  ╰─────────╯     ╰──────────╯ ╰──────────╯      ╰─────────────╯
```

## Files and responsibilities

| File | Owns |
|------|------|
| `src/lib/agent-lab/types.ts` | Domain types (Customer, Invoice, OrderEligibility), trace event shape, run result. |
| `src/lib/agent-lab/schemas.ts` | Zod schemas for tool arguments, tool results, and final recommendation. The runtime contract for every boundary. |
| `src/lib/agent-lab/fakeModel.ts` | Deterministic stand-in for an LLM. Pure function: `decideNextStep(state) → ToolCall \| FinalAnswer \| InvalidRecommendation`. |
| `src/lib/agent-lab/modelClient.ts` | Provider-agnostic model interface. `fakeModelClient` (in-browser deterministic) and `createRealModelClient(...)` (posts to a server endpoint). Adds `RealModelUnavailableError` for graceful fallback and `fetchRealModelStatus` for the UI toggle. |
| `src/pages/api/agent-lab/decide.ts` | Server-side decision endpoint. Validates state with Zod, enforces a body-size cap and scenario allowlist, returns 503 when no provider key is configured. The provider call is a marked extension point. |
| `src/pages/api/agent-lab/status.ts` | Reports whether a provider key is configured, without ever returning the key. |
| `src/lib/agent-lab/policy.ts` | Tool-permission rules, independent of the model. Reads tool name and args; returns `allow` / `requires_approval` / `deny`. |
| `src/lib/agent-lab/mockTools.ts` | The ERP/credit "system." Resolves customers, returns credit status, lists invoices, computes eligibility, persists credit-review tickets. |
| `src/lib/agent-lab/agentRunner.ts` | The actual loop. Asks the model, validates args, checks policy, gates writes, executes tools, validates results, builds the trace, returns a structured result. |
| `src/lib/agent-lab/evals.ts` | Evaluation harness. `EvalCase`, `EvalAssertion`, `runEvalCase`, `runAllEvals`. Replays each case against the deterministic agent and asserts on tool sequence, decision, approval shape, trace events, and final-answer facts. |
| `src/lib/agent-lab/retrieval.ts` | Deterministic keyword retrieval over the credit policy document. Tokenizer with stop-word list, light synonym expansion, double-weighted explicit-keyword scoring, top-k selection. Also exports `composeCitedAnswer` and `composeUncitedAnswer` for the RAG comparison. |
| `src/lib/agent-lab/hybridSearch.ts` | Lab 6. Four ranked-retrieval methods over the same policy document: BM25 (k1=1.2, b=0.75), a deterministic pseudo-vector built from char-trigrams + hashed buckets + cosine, RRF hybrid (k=60), and a toy reranker that boosts title-overlap candidates. |
| `src/lib/agent-lab/mcpManifest.ts` | Lab 7. Derives an MCP-shaped tool manifest from the existing `toolArgsSchemas` + `policy` modules. Includes a tiny zod → JSON-schema converter and a scripted `simulateMcpHandshake` (initialize → tools/list → tools/call) so the lab can show the wire envelopes without standing up a real MCP server. |
| `src/lib/agent-lab/workflow.ts` | Lab 8. A six-step deterministic pipeline (classifyRequest → retrievePolicy → checkCustomerAccount → generateRecommendation → requestApproval → executeFinalAction) over the same mock ERP. Used by the workflow-vs-agent comparison. |
| `src/lib/agent-lab/llmSimulator.ts` | Lab 1. Deterministic stand-in for an LLM completion API: messages by role, temperature, max-tokens, simulated latency, ~4-chars-per-token usage estimate, mock per-million-token pricing. Marks every response `simulated: true`. |
| `src/data/agent-lab/creditPolicyDocument.ts` | Eight stable policy sections (P-001 … P-008) addressed by id so citations point to a paragraph, not a vague "the policy." |
| `src/data/agent-lab/*` | Mock customers, invoices, scenarios. |
| `src/components/agent-lab/AgentLabApp.tsx` | UI shell. Tab switcher, scenario picker, run controls, metrics, approval gate, final recommendation, and lenses. |
| `src/components/agent-lab/lenses/*` | Tab views: Conversation, Structured Output, Tool Calling, Agent Loop. Each is a different lens onto the same run. |
| `src/components/agent-lab/TraceTimeline.tsx` | Full trace timeline used by the Trace Viewer tab. |
| `src/components/agent-lab/ToolCallPanel.tsx` | JSON inspector for the selected trace event. |
| `src/components/agent-lab/ApprovalGate.tsx` | The human-in-the-loop UI for write actions. |
| `src/components/agent-lab/EvalPanel.tsx` | Evals tab UI: run button, summary tiles, per-case expandable assertion list, per-case metrics. |
| `src/components/agent-lab/RagPanel.tsx` | RAG tab UI: query input, side-by-side uncited vs. cited answers, retrieved-sections list with score chips, full policy document with cited sections highlighted. |
| `src/components/agent-lab/StatusBadge.tsx` | A single-source-of-truth status indicator (idle / running / awaiting approval / auto-approved / blocked / approved-with-ticket / rejected / error). Uses `role="status"` + `aria-live`. |
| `src/components/agent-lab/ErrorBoundary.tsx` | Render-time error boundary with a recovery card; safety net for unexpected component errors. |
| `src/components/agent-lab/HybridSearchApp.tsx` | Lab 6 UI. Query input, four method columns (BM25 / pseudo-vector / RRF hybrid / rerank), full source-policy panel. |
| `src/components/agent-lab/McpToolsApp.tsx` | Lab 7 UI. Tool registry sidebar with permission badges, JSON-schema viewer, simulated five-step MCP handshake. |
| `src/components/agent-lab/WorkflowApp.tsx` | Lab 8 UI. Side-by-side six-step deterministic workflow next to the free-form agent runner trace. |
| `src/components/agent-lab/LlmFundamentalsApp.tsx` | Lab 1 UI. Two prompt configurations (system / user / temperature / max-tokens), wire-payload preview, response columns with token / latency / cost stats. |
| `src/components/agent-lab/LabsIndex.tsx` | The 12-card index at `/tools/agent-lab/labs`. Maps every lab number to its route or lens, with a kind badge (canonical lab / dedicated route / docs). |

## The loop, end to end

1. UI calls `runAgentLabScenario({ scenarioId, approvalDecision?, simulateInvalidRecommendation? })`.
2. Runner builds initial state with the user request as the first trace event.
3. Loop iteration:
   1. `fakeModel.decideNextStep(state)` returns one of three decisions.
   2. **Tool call.** The runner:
      1. Validates args against the matching schema in `schemas.ts`. Failure → `validation_error` + abort.
      2. Calls `policy.evaluateToolPermission(toolName, args)`.
      3. If `deny` → `error` event + abort.
      4. If `requires_approval` → emit `approval_required`. If no approval is in state, return with status `waiting_for_approval`. If rejected, set `gatedActionRejected` and skip execution. If approved, fall through.
      5. Execute the corresponding mock tool.
      6. Validate the result against the matching schema. Failure → `validation_error` + abort.
      7. Emit `tool_result` and write the observation onto state.
   3. **Final answer.** Validate the recommendation against `orderEligibilitySchema`, build the human-readable answer, emit `final_answer`, return.
   4. **Invalid recommendation** (Structured Output demo path). Emit `validation_error` + `model_retry`, mark attempt, loop continues; the next iteration produces a valid final answer.
4. Loop hard-stops at `MAX_ITERATIONS = 12` to prevent runaway runs.

## Trace event vocabulary

| Type | Meaning |
|------|---------|
| `user_message` | The original user request. |
| `model_response` | The model's reasoning / decision for this iteration. |
| `permission_check` | Output of the policy function for a proposed tool call. |
| `approval_required` | A write action reached the human-approval gate. |
| `tool_call` | The runner is about to execute a tool with these args. |
| `tool_result` | The tool returned validated data. |
| `validation_error` | A schema check rejected args, a result, or a final recommendation. |
| `model_retry` | The model is being asked to repair an invalid output. |
| `final_answer` | The final, validated recommendation shown to the user. |
| `error` | Run aborted (denied tool, validation failure, max iterations). |

## Why split these modules

- **fakeModel ≠ runner.** Today the model is deterministic. Tomorrow it's a real LLM behind a server endpoint. Only the model module changes; the loop, policy, and validation stay identical.
- **policy ≠ model.** A model can hallucinate any tool call. Policy enforces what is *allowed*. The model is not the permission system.
- **schemas ≠ types.** TypeScript types help during development; Zod schemas validate at runtime, so a misbehaving model or a refactored tool can never silently emit malformed data.
- **trace ≠ logs.** Every step of the loop is a typed, inspectable event with a payload, so the UI, evals, and audit tooling all read from the same structure.

## Extending the lab

### Adding a new scenario

1. Add a row to `src/data/agent-lab/scenarios.ts`.
2. If the scenario references a new customer, extend `src/data/agent-lab/customers.ts` and (optionally) `invoices.ts`.
3. The scenario will appear in the UI scenario picker automatically.
4. Add an assertion to `src/lib/agent-lab/agentRunner.test.ts` for the expected outcome.

### Adding a new tool

1. Add the tool implementation in `src/lib/agent-lab/mockTools.ts`.
2. Add an args schema and a result schema in `src/lib/agent-lab/schemas.ts`, and register the args schema in `toolArgsSchemas`.
3. Add a permission rule in `src/lib/agent-lab/policy.ts` (decide if it's read-only, requires approval, or denied).
4. Register the result schema and the result title in `agentRunner.ts` (`TOOL_RESULT_SCHEMAS`, `TOOL_RESULT_TITLES`), and route it in `executeTool` and `recordObservation`.
5. Teach `fakeModel.decideNextStep` when to propose it.

### Adding a new lens (tab)

1. Create a new component under `src/components/agent-lab/lenses/`.
2. Register it in `AgentLabApp.tsx`'s `tabs` list and the active-tab switch.

## What's intentionally not here yet

- **A wired-up LLM provider.** The Real Model boundary is built end-to-end (server endpoint, mode toggle, graceful fallback), but `callRealProvider` inside `decide.ts` is intentionally a placeholder so the lab works without anyone paying for tokens. Plugging in OpenAI / Anthropic / Bedrock is a small, isolated change inside that one function.
- **Persistence.** Roadmap Phase 6. Local progress and eval-result history.
- **In-trace retrieval events.** Phase 5 currently exposes RAG as a comparison panel; folding `retrieval_query` and `retrieval_result` events into the live agent run would let evals assert on grounding too.

See [`agent-lab-roadmap.md`](./agent-lab-roadmap.md) for the full plan.
