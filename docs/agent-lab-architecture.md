# Agent Engineering Lab — Architecture

A short tour of how the lab is wired together and why each module exists.

## One-line thesis

The model is a single, replaceable component inside a larger system. The system — not the
model — owns the loop, the tools, the policy, the validation, and the approval gate.

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
| `src/lib/agent-lab/fakeModel.ts` | Deterministic stand-in for an LLM. Pure function: `decideNextStep(state) → ToolCall \| FinalAnswer \| InvalidRecommendation`. Will be swapped for a real provider in Phase 4. |
| `src/lib/agent-lab/policy.ts` | Tool-permission rules, independent of the model. Reads tool name and args; returns `allow` / `requires_approval` / `deny`. |
| `src/lib/agent-lab/mockTools.ts` | The ERP/credit "system." Resolves customers, returns credit status, lists invoices, computes eligibility, persists credit-review tickets. |
| `src/lib/agent-lab/agentRunner.ts` | The actual loop. Asks the model, validates args, checks policy, gates writes, executes tools, validates results, builds the trace, returns a structured result. |
| `src/lib/agent-lab/evals.ts` | Evaluation harness. `EvalCase`, `EvalAssertion`, `runEvalCase`, `runAllEvals`. Replays each case against the deterministic agent and asserts on tool sequence, decision, approval shape, trace events, and final-answer facts. |
| `src/data/agent-lab/*` | Mock customers, invoices, scenarios. |
| `src/components/agent-lab/AgentLabApp.tsx` | UI shell. Tab switcher, scenario picker, run controls, metrics, approval gate, final recommendation, and lenses. |
| `src/components/agent-lab/lenses/*` | Tab views: Conversation, Structured Output, Tool Calling, Agent Loop. Each is a different lens onto the same run. |
| `src/components/agent-lab/TraceTimeline.tsx` | Full trace timeline used by the Trace Viewer tab. |
| `src/components/agent-lab/ToolCallPanel.tsx` | JSON inspector for the selected trace event. |
| `src/components/agent-lab/ApprovalGate.tsx` | The human-in-the-loop UI for write actions. |
| `src/components/agent-lab/EvalPanel.tsx` | Evals tab UI: run button, summary tiles, per-case expandable assertion list, per-case metrics. |

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

- **Real model execution.** Roadmap Phase 4. Will live behind a server endpoint, never browser-exposed keys.
- **Local RAG.** Roadmap Phase 5. Keyword retrieval over a small policy document, with citations.
- **Persistence.** Roadmap Phase 6. Local progress and eval-result history.

See [`agent-lab-roadmap.md`](./agent-lab-roadmap.md) for the full plan.
