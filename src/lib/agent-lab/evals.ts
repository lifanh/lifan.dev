import { runAgentLabScenario } from './agentRunner';
import type {
  AgentRunResult,
  AgentRunStatus,
  AgentScenario,
  ApprovalDecision,
  EligibilityDecision,
  TraceEventType,
} from './types';

/**
 * evals.ts
 *
 * In-browser evaluation harness for Agent Lab. Each `EvalCase` is a fully
 * specified expected behavior — a tool sequence, a decision, an approval
 * shape, certain trace events, and (optionally) facts that must appear in
 * the final answer. The runner replays each case against the deterministic
 * agent and produces a list of pass/fail assertions.
 *
 * This is the "did the agent do the right thing?" layer: the part that
 * separates a scripted demo from real agent engineering.
 */

export type EvalAssertion = {
  label: string;
  passed: boolean;
  detail?: string;
};

export type EvalExpectation = {
  status?: AgentRunStatus;
  decision?: EligibilityDecision;
  requiresHumanApproval?: boolean;
  /** Tools that must appear (in order, but other tools may appear between). */
  toolSequence?: string[];
  /** Substrings that must appear in finalAnswer. */
  finalAnswerIncludes?: string[];
  /** Trace event types that must appear at least once. */
  eventTypesInclude?: TraceEventType[];
  /** Trace event types that must NOT appear. */
  eventTypesExclude?: TraceEventType[];
  /** Cap on iterations — guards against runaway loops. */
  maxIterations?: number;
  /** Cap on tool-call count — guards against unnecessary calls. */
  maxToolCalls?: number;
  /** True if the run is expected to produce a 'completed' status with a ticket. */
  ticketCreated?: boolean;
};

export type EvalCase = {
  id: string;
  description: string;
  /** Reference to a public scenario by id. */
  scenarioId?: string;
  /** Inline scenario for eval-only edge cases (malformed args, etc). */
  scenario?: AgentScenario;
  approvalDecision?: ApprovalDecision;
  simulateInvalidRecommendation?: boolean;
  expected: EvalExpectation;
};

export type EvalResult = {
  case: EvalCase;
  passed: boolean;
  assertions: EvalAssertion[];
  result?: AgentRunResult;
  error?: string;
  metrics?: {
    latencyMs: number;
    toolCalls: number;
    iterations: number;
    estimatedCostUsd: number;
  };
};

export const evalCases: EvalCase[] = [
  {
    id: 'acme-gate-reached',
    description: 'ACME credit review pauses at the human approval gate',
    scenarioId: 'acme-credit-review',
    expected: {
      status: 'waiting_for_approval',
      decision: 'review_required',
      requiresHumanApproval: true,
      toolSequence: ['getCustomer', 'getCreditStatus', 'getOpenInvoices', 'checkOrderEligibility'],
      eventTypesInclude: ['approval_required', 'permission_check'],
      eventTypesExclude: ['error'],
      maxIterations: 8,
    },
  },
  {
    id: 'acme-approved-creates-ticket',
    description: 'ACME credit review creates a ticket when human approves',
    scenarioId: 'acme-credit-review',
    approvalDecision: 'approved',
    expected: {
      status: 'completed',
      decision: 'review_required',
      ticketCreated: true,
      toolSequence: [
        'getCustomer',
        'getCreditStatus',
        'getOpenInvoices',
        'checkOrderEligibility',
        'createCreditReviewTicket',
      ],
      finalAnswerIncludes: ['credit review ticket was created'],
      eventTypesInclude: ['final_answer', 'approval_required'],
      eventTypesExclude: ['error', 'validation_error'],
    },
  },
  {
    id: 'acme-rejected-no-ticket',
    description: 'ACME credit review skips writing when human rejects',
    scenarioId: 'acme-credit-review',
    approvalDecision: 'rejected',
    expected: {
      status: 'completed',
      decision: 'review_required',
      ticketCreated: false,
      finalAnswerIncludes: ['No credit review ticket was created'],
      eventTypesInclude: ['final_answer', 'approval_required'],
      eventTypesExclude: ['error', 'validation_error'],
    },
  },
  {
    id: 'globex-auto-approve',
    description: 'Globex small order auto-approves with no human in the loop',
    scenarioId: 'globex-standard-order',
    expected: {
      status: 'completed',
      decision: 'approve',
      requiresHumanApproval: false,
      toolSequence: ['getCustomer', 'getCreditStatus', 'getOpenInvoices', 'checkOrderEligibility'],
      finalAnswerIncludes: ['Globex can be auto-approved'],
      eventTypesInclude: ['final_answer'],
      eventTypesExclude: ['approval_required', 'error', 'validation_error'],
      maxToolCalls: 4,
    },
  },
  {
    id: 'initech-blocked',
    description: 'Initech blocked account terminates without an approval gate',
    scenarioId: 'initech-blocked-order',
    expected: {
      status: 'completed',
      decision: 'block',
      requiresHumanApproval: false,
      finalAnswerIncludes: ['Initech should be blocked'],
      eventTypesInclude: ['final_answer'],
      eventTypesExclude: ['approval_required', 'validation_error'],
    },
  },
  {
    id: 'unknown-customer-error',
    description: 'A run aborts cleanly when the customer does not exist',
    scenario: {
      id: 'eval-unknown-customer',
      title: 'Eval: unknown customer',
      customerNameOrId: 'NotARealCorp',
      orderAmount: 5000,
      currency: 'USD',
      userRequest: 'Can NotARealCorp place a new order for $5,000?',
      lesson: 'Eval-only case demonstrating tool-error handling.',
    },
    expected: {
      status: 'error',
      eventTypesInclude: ['error', 'tool_call'],
      finalAnswerIncludes: ['Customer not found'],
    },
  },
  {
    id: 'malformed-amount-validation',
    description: 'Negative order amounts fail Zod arg validation before execution',
    scenario: {
      id: 'eval-malformed-amount',
      title: 'Eval: malformed amount',
      customerNameOrId: 'ACME',
      orderAmount: -50,
      currency: 'USD',
      userRequest: 'Can ACME place a -$50 order?',
      lesson: 'Eval-only case demonstrating runtime arg validation.',
    },
    expected: {
      status: 'error',
      eventTypesInclude: ['validation_error', 'error'],
      eventTypesExclude: ['final_answer'],
    },
  },
  {
    id: 'schema-repair-on-globex',
    description: 'A malformed model output is rejected and repaired',
    scenarioId: 'globex-standard-order',
    simulateInvalidRecommendation: true,
    expected: {
      status: 'completed',
      decision: 'approve',
      eventTypesInclude: ['validation_error', 'model_retry', 'final_answer'],
    },
  },
];

export async function runEvalCase(c: EvalCase, latencyMs = 0): Promise<EvalResult> {
  try {
    const result = await runAgentLabScenario({
      scenarioId: c.scenarioId,
      scenario: c.scenario,
      approvalDecision: c.approvalDecision,
      latencyMs,
      simulateInvalidRecommendation: c.simulateInvalidRecommendation,
    });

    const assertions = buildAssertions(c, result);

    return {
      case: c,
      passed: assertions.every((assertion) => assertion.passed),
      assertions,
      result,
      metrics: {
        latencyMs: result.metrics.latencyMs,
        toolCalls: result.metrics.toolCalls,
        iterations: result.metrics.iterations,
        estimatedCostUsd: result.metrics.estimatedCostUsd,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return {
      case: c,
      passed: false,
      assertions: [
        {
          label: 'Run completed without throwing',
          passed: false,
          detail: message,
        },
      ],
      error: message,
    };
  }
}

export async function runAllEvals(
  cases: EvalCase[] = evalCases,
  latencyMs = 0,
): Promise<EvalResult[]> {
  const results: EvalResult[] = [];

  for (const c of cases) {
    results.push(await runEvalCase(c, latencyMs));
  }

  return results;
}

function buildAssertions(c: EvalCase, result: AgentRunResult): EvalAssertion[] {
  const assertions: EvalAssertion[] = [];
  const expected = c.expected;

  if (expected.status) {
    assertions.push({
      label: `status === ${expected.status}`,
      passed: result.status === expected.status,
      detail: result.status === expected.status ? undefined : `got: ${result.status}`,
    });
  }

  if (expected.decision) {
    assertions.push({
      label: `decision === ${expected.decision}`,
      passed: result.recommendation.decision === expected.decision,
      detail:
        result.recommendation.decision === expected.decision
          ? undefined
          : `got: ${result.recommendation.decision}`,
    });
  }

  if (expected.requiresHumanApproval !== undefined) {
    assertions.push({
      label: `requiresHumanApproval === ${expected.requiresHumanApproval}`,
      passed: result.recommendation.requiresHumanApproval === expected.requiresHumanApproval,
      detail:
        result.recommendation.requiresHumanApproval === expected.requiresHumanApproval
          ? undefined
          : `got: ${result.recommendation.requiresHumanApproval}`,
    });
  }

  if (expected.toolSequence) {
    const actualSequence = result.events
      .filter((event) => event.type === 'tool_call')
      .map((event) => (event.payload as { name: string }).name);
    const matches = matchesOrdered(actualSequence, expected.toolSequence);
    assertions.push({
      label: `tool sequence: ${expected.toolSequence.join(' → ')}`,
      passed: matches,
      detail: matches ? undefined : `got: ${actualSequence.join(' → ') || '(no tool calls)'}`,
    });
  }

  if (expected.finalAnswerIncludes) {
    for (const substring of expected.finalAnswerIncludes) {
      assertions.push({
        label: `finalAnswer includes "${substring}"`,
        passed: result.finalAnswer.includes(substring),
        detail: result.finalAnswer.includes(substring)
          ? undefined
          : `got: ${truncate(result.finalAnswer, 120)}`,
      });
    }
  }

  if (expected.eventTypesInclude) {
    const types = new Set(result.events.map((event) => event.type));
    for (const type of expected.eventTypesInclude) {
      assertions.push({
        label: `events include ${type}`,
        passed: types.has(type),
      });
    }
  }

  if (expected.eventTypesExclude) {
    const types = new Set(result.events.map((event) => event.type));
    for (const type of expected.eventTypesExclude) {
      assertions.push({
        label: `events do not include ${type}`,
        passed: !types.has(type),
      });
    }
  }

  if (expected.maxIterations !== undefined) {
    assertions.push({
      label: `iterations <= ${expected.maxIterations}`,
      passed: result.iterations <= expected.maxIterations,
      detail: `got: ${result.iterations}`,
    });
  }

  if (expected.maxToolCalls !== undefined) {
    assertions.push({
      label: `toolCalls <= ${expected.maxToolCalls}`,
      passed: result.metrics.toolCalls <= expected.maxToolCalls,
      detail: `got: ${result.metrics.toolCalls}`,
    });
  }

  if (expected.ticketCreated !== undefined) {
    const hasTicket = Boolean(result.ticket);
    assertions.push({
      label: `ticket created === ${expected.ticketCreated}`,
      passed: hasTicket === expected.ticketCreated,
      detail: hasTicket === expected.ticketCreated ? undefined : `got: ${hasTicket}`,
    });
  }

  return assertions;
}

/**
 * Returns true if every element of `expected` appears in `actual` in order
 * (other elements may appear between, before, or after).
 */
function matchesOrdered(actual: string[], expected: string[]): boolean {
  let i = 0;

  for (const item of actual) {
    if (item === expected[i]) {
      i += 1;
      if (i === expected.length) {
        return true;
      }
    }
  }

  return i === expected.length;
}

function truncate(value: string, max: number): string {
  if (value.length <= max) {
    return value;
  }

  return `${value.slice(0, max - 1)}…`;
}
