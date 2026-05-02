import { z } from 'zod';
import { scenarios } from '../../data/agent-lab/scenarios';
import { decideNextStep, type ModelDecision, type ModelState } from './fakeModel';
import {
  checkOrderEligibility,
  createCreditReviewTicket,
  getCreditStatus,
  getCustomer,
  getOpenInvoices,
} from './mockTools';
import { evaluateToolPermission } from './policy';
import {
  creditReviewTicketSchema,
  creditStatusSchema,
  customerSchema,
  formatZodIssues,
  openInvoicesSchema,
  orderEligibilitySchema,
  toolArgsSchemas,
  type ToolName,
  type ValidationIssue,
} from './schemas';
import type {
  AgentRunResult,
  ApprovalDecision,
  OrderEligibility,
  PendingApproval,
  PermissionDecision,
  TraceEvent,
  TraceEventType,
} from './types';

type RunInput = {
  scenarioId: string;
  approvalDecision?: ApprovalDecision;
  latencyMs?: number;
  /**
   * When true, the fake model will produce one malformed recommendation
   * before the corrected one, demonstrating schema validation + repair.
   */
  simulateInvalidRecommendation?: boolean;
};

const MAX_ITERATIONS = 12;

const TOOL_RESULT_TITLES: Record<ToolName, string> = {
  getCustomer: 'Customer resolved',
  getCreditStatus: 'Credit status returned',
  getOpenInvoices: 'Open invoices returned',
  checkOrderEligibility: 'Eligibility decision returned',
  createCreditReviewTicket: 'Credit review ticket created',
};

const TOOL_RESULT_SCHEMAS: Record<ToolName, z.ZodTypeAny> = {
  getCustomer: customerSchema,
  getCreditStatus: creditStatusSchema,
  getOpenInvoices: openInvoicesSchema,
  checkOrderEligibility: orderEligibilitySchema,
  createCreditReviewTicket: creditReviewTicketSchema,
};

function permissionTitle(toolName: ToolName, decision: PermissionDecision): string {
  if (toolName === 'createCreditReviewTicket' && decision.decision === 'requires_approval') {
    return 'Policy requires human approval';
  }

  if (decision.decision === 'requires_approval') {
    return `Policy requires human approval for ${toolName}`;
  }

  if (decision.decision === 'deny') {
    return `Policy denied ${toolName}`;
  }

  return `Policy allowed ${toolName}`;
}

function createEventFactory() {
  const startedAt = Date.now();
  let index = 0;

  return (
    type: TraceEventType,
    title: string,
    payload: unknown,
    durationMs?: number,
  ): TraceEvent => {
    index += 1;

    return {
      id: `${String(index).padStart(2, '0')}-${type}`,
      type,
      title,
      timestamp: startedAt + index * 120,
      payload,
      durationMs,
    };
  };
}

function estimateMetrics(events: TraceEvent[], iterations: number) {
  const toolCalls = events.filter((event) => event.type === 'tool_call').length;
  const modelResponses = events.filter((event) => event.type === 'model_response').length;
  const estimatedInputTokens = 620 + toolCalls * 110 + iterations * 40;
  const estimatedOutputTokens = 180 + modelResponses * 70;

  return {
    latencyMs: events.reduce((total, event) => total + (event.durationMs ?? 35), 0),
    estimatedInputTokens,
    estimatedOutputTokens,
    estimatedCostUsd: Number(
      (estimatedInputTokens * 0.00000015 + estimatedOutputTokens * 0.0000006).toFixed(6),
    ),
    toolCalls,
    iterations,
    simulated: true as const,
  };
}

function formatMoney(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}

function formatCustomerDisplayName(customerName: string): string {
  return customerName.replace(/\s+Corp\.?$/, '');
}

function buildFinalAnswer(
  customerName: string,
  recommendation: OrderEligibility,
  approvalDecision?: ApprovalDecision,
): string {
  const displayName = formatCustomerDisplayName(customerName);

  if (recommendation.decision === 'approve') {
    return `${displayName} can be auto-approved for a ${formatMoney(recommendation.orderAmount)} order. Available credit is ${formatMoney(recommendation.availableCredit)}, projected exposure is ${formatMoney(recommendation.projectedExposure)}, and no overdue invoices were found.`;
  }

  if (recommendation.decision === 'block') {
    return `${displayName} should be blocked from placing this ${formatMoney(recommendation.orderAmount)} order. The account is blocked, and the recommended action is to hold the order until the account status changes.`;
  }

  const reviewOutcome =
    approvalDecision === 'approved'
      ? 'A credit review ticket was created for the credit team.'
      : approvalDecision === 'rejected'
        ? 'No credit review ticket was created because human approval was rejected.'
        : 'A credit review ticket requires human approval before it can be created.';

  return `${displayName} should not be auto-approved for a ${formatMoney(recommendation.orderAmount)} order. Credit limit is ${formatMoney(recommendation.creditLimit)}, current exposure is ${formatMoney(recommendation.currentExposure)}, projected exposure is ${formatMoney(recommendation.projectedExposure)}, over credit limit by ${formatMoney(recommendation.overLimitBy)}, and the oldest overdue invoice is ${recommendation.maxDaysPastDue} days past due. ${reviewOutcome}`;
}

async function executeTool(
  toolName: ToolName,
  args: Record<string, unknown>,
  latencyMs: number,
): Promise<unknown> {
  switch (toolName) {
    case 'getCustomer':
      return getCustomer(args.customerNameOrId as string, { latencyMs });
    case 'getCreditStatus':
      return getCreditStatus(args.customerId as string, { latencyMs });
    case 'getOpenInvoices':
      return getOpenInvoices(args.customerId as string, { latencyMs });
    case 'checkOrderEligibility':
      return checkOrderEligibility(
        args.customerId as string,
        args.orderAmount as number,
        { latencyMs },
      );
    case 'createCreditReviewTicket':
      return createCreditReviewTicket(args.customerId as string, args.reason as string, {
        latencyMs,
      });
  }
}

function recordObservation(
  state: ModelState,
  toolName: ToolName,
  result: unknown,
): void {
  switch (toolName) {
    case 'getCustomer':
      state.observations.customer = result as ModelState['observations']['customer'];
      break;
    case 'getCreditStatus':
      state.observations.creditStatus = result as ModelState['observations']['creditStatus'];
      break;
    case 'getOpenInvoices':
      state.observations.openInvoices = result as ModelState['observations']['openInvoices'];
      break;
    case 'checkOrderEligibility':
      state.observations.eligibility = result as ModelState['observations']['eligibility'];
      break;
    case 'createCreditReviewTicket':
      state.observations.ticket = result as ModelState['observations']['ticket'];
      break;
  }
}

export async function runAgentLabScenario(input: RunInput): Promise<AgentRunResult> {
  const scenario = scenarios.find((entry) => entry.id === input.scenarioId);

  if (!scenario) {
    throw new Error(`Unknown Agent Lab scenario: ${input.scenarioId}`);
  }

  const latencyMs = input.latencyMs ?? 320;
  const event = createEventFactory();
  const events: TraceEvent[] = [];

  const state: ModelState = {
    scenarioId: scenario.id,
    customerNameOrId: scenario.customerNameOrId,
    orderAmount: scenario.orderAmount,
    observations: {},
    approvalDecision: input.approvalDecision,
    simulateInvalidRecommendation: input.simulateInvalidRecommendation,
  };

  events.push(
    event('user_message', 'User request', {
      role: 'user',
      content: scenario.userRequest,
    }),
  );

  let iterations = 0;

  while (iterations < MAX_ITERATIONS) {
    iterations += 1;
    const decision: ModelDecision = decideNextStep(state);

    if (decision.type === 'invalid_recommendation') {
      events.push(
        event('model_response', `Model proposes recommendation (iteration ${iterations})`, {
          rationale: decision.rationale,
          payload: decision.payload,
        }),
      );

      const parsed = orderEligibilitySchema.safeParse(decision.payload);

      if (!parsed.success) {
        const issues: ValidationIssue[] = formatZodIssues(parsed.error);
        events.push(
          event('validation_error', 'Recommendation failed schema validation', {
            schema: 'OrderEligibility',
            issues,
            payload: decision.payload,
          }),
        );
        events.push(
          event('model_retry', 'Model repairs recommendation against schema', {
            schema: 'OrderEligibility',
            issuesAddressed: issues.length,
          }),
        );
        state.invalidRecommendationAttempted = true;
        continue;
      }
    }

    if (decision.type === 'final_answer') {
      events.push(
        event('model_response', `Model drafts recommendation (iteration ${iterations})`, {
          rationale: decision.rationale,
          decision: decision.recommendation.decision,
          reasons: decision.recommendation.reasons,
          recommendedAction: decision.recommendation.recommendedAction,
        }),
      );

      const parsed = orderEligibilitySchema.safeParse(decision.recommendation);

      if (!parsed.success) {
        const issues = formatZodIssues(parsed.error);
        events.push(
          event('validation_error', 'Recommendation failed schema validation', {
            schema: 'OrderEligibility',
            issues,
            payload: decision.recommendation,
          }),
        );
        events.push(event('error', 'Run aborted', { reason: 'Recommendation failed validation.' }));

        return {
          scenario,
          status: 'error',
          events,
          recommendation: decision.recommendation,
          finalAnswer: 'Run aborted: the final recommendation did not match the schema.',
          iterations,
          metrics: estimateMetrics(events, iterations),
        };
      }

      const finalAnswer = buildFinalAnswer(
        state.observations.customer?.name ?? scenario.customerNameOrId,
        decision.recommendation,
        state.approvalDecision,
      );
      events.push(event('final_answer', 'Final answer', finalAnswer));

      return {
        scenario,
        status: 'completed',
        events,
        recommendation: decision.recommendation,
        finalAnswer,
        ticket: state.observations.ticket,
        iterations,
        metrics: estimateMetrics(events, iterations),
      };
    }

    // decision.type === 'tool_call'
    events.push(
      event('model_response', `Model plans tool use (iteration ${iterations})`, {
        rationale: decision.rationale,
        nextTool: decision.toolName,
      }),
    );

    const toolName = decision.toolName as ToolName;
    const argsSchema = toolArgsSchemas[toolName];
    const argsParse = argsSchema.safeParse(decision.args);

    if (!argsParse.success) {
      const issues = formatZodIssues(argsParse.error);
      events.push(
        event('validation_error', `Invalid arguments for ${toolName}`, {
          toolName,
          schema: `${toolName}Args`,
          issues,
          args: decision.args,
        }),
      );
      events.push(
        event('error', 'Run aborted', {
          reason: `Tool arguments did not match schema for ${toolName}.`,
        }),
      );

      return {
        scenario,
        status: 'error',
        events,
        recommendation: state.observations.eligibility ?? emptyRecommendation(scenario.customerNameOrId, scenario.orderAmount),
        finalAnswer: `Run aborted: invalid arguments for ${toolName}.`,
        iterations,
        metrics: estimateMetrics(events, iterations),
      };
    }

    const permission = evaluateToolPermission(toolName, decision.args);
    events.push(
      event('permission_check', permissionTitle(toolName, permission), {
        toolName,
        args: decision.args,
        result: permission,
      }),
    );

    if (permission.decision === 'deny') {
      events.push(event('error', `Tool ${toolName} denied`, { reason: permission.reason }));

      return {
        scenario,
        status: 'error',
        events,
        recommendation: state.observations.eligibility ?? emptyRecommendation(scenario.customerNameOrId, scenario.orderAmount),
        finalAnswer: `Run aborted: policy denied ${toolName}. ${permission.reason}`,
        iterations,
        metrics: estimateMetrics(events, iterations),
      };
    }

    if (permission.decision === 'requires_approval') {
      const pendingApproval: PendingApproval = {
        toolName: 'createCreditReviewTicket',
        args: {
          customerId: String(decision.args.customerId ?? ''),
          reason: String(decision.args.reason ?? ''),
        },
        reason:
          toolName === 'createCreditReviewTicket'
            ? 'This action creates a persistent business record, so policy requires a human decision.'
            : permission.reason,
      };

      events.push(event('approval_required', 'Approval gate reached', pendingApproval));

      if (!state.approvalDecision) {
        return {
          scenario,
          status: 'waiting_for_approval',
          events,
          recommendation:
            state.observations.eligibility ?? emptyRecommendation(scenario.customerNameOrId, scenario.orderAmount),
          finalAnswer: buildFinalAnswer(
            state.observations.customer?.name ?? scenario.customerNameOrId,
            state.observations.eligibility ?? emptyRecommendation(scenario.customerNameOrId, scenario.orderAmount),
          ),
          pendingApproval,
          iterations,
          metrics: estimateMetrics(events, iterations),
        };
      }

      events.push(
        event('model_response', `Human ${state.approvalDecision} action`, {
          approvalDecision: state.approvalDecision,
          pendingApproval,
        }),
      );

      if (state.approvalDecision === 'rejected') {
        // Skip the write tool; signal the model so it doesn't re-propose it
        // and let the loop produce a final answer next iteration.
        state.gatedActionRejected = true;
        continue;
      }
      // Approved → fall through and execute the tool.
    }

    events.push(
      event('tool_call', toolName, {
        name: toolName,
        arguments: decision.args,
      }),
    );

    const result = await executeTool(toolName, decision.args, latencyMs);

    const resultSchema = TOOL_RESULT_SCHEMAS[toolName];
    const resultParse = resultSchema.safeParse(result);

    if (!resultParse.success) {
      const issues = formatZodIssues(resultParse.error);
      events.push(
        event('validation_error', `Tool ${toolName} returned data that failed validation`, {
          toolName,
          schema: `${toolName}Result`,
          issues,
          payload: result,
        }),
      );
      events.push(event('error', 'Run aborted', { reason: `Tool result for ${toolName} failed validation.` }));

      return {
        scenario,
        status: 'error',
        events,
        recommendation: state.observations.eligibility ?? emptyRecommendation(scenario.customerNameOrId, scenario.orderAmount),
        finalAnswer: `Run aborted: ${toolName} returned data that did not match the schema.`,
        iterations,
        metrics: estimateMetrics(events, iterations),
      };
    }

    events.push(event('tool_result', TOOL_RESULT_TITLES[toolName], result, latencyMs));
    recordObservation(state, toolName, result);
  }

  events.push(
    event('error', 'Run aborted', {
      reason: `Exceeded max iterations (${MAX_ITERATIONS}).`,
    }),
  );

  return {
    scenario,
    status: 'error',
    events,
    recommendation:
      state.observations.eligibility ?? emptyRecommendation(scenario.customerNameOrId, scenario.orderAmount),
    finalAnswer: `Run aborted: agent exceeded ${MAX_ITERATIONS} iterations without producing an answer.`,
    iterations,
    metrics: estimateMetrics(events, iterations),
  };
}

function emptyRecommendation(customerId: string, orderAmount: number): OrderEligibility {
  return {
    customerId,
    orderAmount,
    currency: 'USD',
    decision: 'review_required',
    creditLimit: 0,
    currentExposure: 0,
    projectedExposure: orderAmount,
    availableCredit: 0,
    overLimitBy: 0,
    overdueInvoiceCount: 0,
    maxDaysPastDue: 0,
    requiresHumanApproval: true,
    reasons: ['Recommendation is unavailable.'],
    recommendedAction: 'Investigate the failed run before deciding.',
  };
}
