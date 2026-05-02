import type {
  ApprovalDecision,
  CreditReviewTicket,
  CreditStatus,
  Customer,
  Invoice,
  OrderEligibility,
} from './types';

/**
 * fakeModel.ts
 *
 * The deterministic stand-in for an LLM. It is given a snapshot of the agent's
 * state (what it has observed so far) and decides the single next step.
 *
 * Splitting this out from the runner is intentional: the runner is now a real
 * loop that asks "model" -> "what next?" at each iteration, instead of running
 * a hardcoded script. Swapping this module for a real provider (Phase 4 of the
 * roadmap) only requires implementing the same `decideNextStep` contract.
 */

export type ModelObservations = {
  customer?: Customer;
  creditStatus?: CreditStatus;
  openInvoices?: Invoice[];
  eligibility?: OrderEligibility;
  ticket?: CreditReviewTicket;
};

export type ModelState = {
  scenarioId: string;
  customerNameOrId: string;
  orderAmount: number;
  observations: ModelObservations;
  approvalDecision?: ApprovalDecision;
  /**
   * When true, the model intentionally proposes a malformed final
   * recommendation on its first attempt to demonstrate schema validation
   * and a repair retry. Used by the Structured Output lesson.
   */
  simulateInvalidRecommendation?: boolean;
  invalidRecommendationAttempted?: boolean;
  /**
   * Set by the runner once a gated write-action has been rejected at the
   * approval gate, so the model knows not to re-propose the same tool call
   * and instead produce a final answer that reflects the rejection.
   */
  gatedActionRejected?: boolean;
};

export type ToolCallDecision = {
  type: 'tool_call';
  toolName:
    | 'getCustomer'
    | 'getCreditStatus'
    | 'getOpenInvoices'
    | 'checkOrderEligibility'
    | 'createCreditReviewTicket';
  args: Record<string, unknown>;
  rationale: string;
};

export type FinalAnswerDecision = {
  type: 'final_answer';
  recommendation: OrderEligibility;
  rationale: string;
};

export type InvalidRecommendationDecision = {
  type: 'invalid_recommendation';
  payload: unknown;
  rationale: string;
};

export type ModelDecision =
  | ToolCallDecision
  | FinalAnswerDecision
  | InvalidRecommendationDecision;

export function decideNextStep(state: ModelState): ModelDecision {
  const { observations } = state;

  if (!observations.customer) {
    return {
      type: 'tool_call',
      toolName: 'getCustomer',
      args: { customerNameOrId: state.customerNameOrId },
      rationale: 'Resolve the customer record before checking credit.',
    };
  }

  if (!observations.creditStatus) {
    return {
      type: 'tool_call',
      toolName: 'getCreditStatus',
      args: { customerId: observations.customer.id },
      rationale: 'Read credit limit and current exposure for this customer.',
    };
  }

  if (!observations.openInvoices) {
    return {
      type: 'tool_call',
      toolName: 'getOpenInvoices',
      args: { customerId: observations.customer.id },
      rationale: 'Read open invoices to detect overdue items before deciding.',
    };
  }

  if (!observations.eligibility) {
    return {
      type: 'tool_call',
      toolName: 'checkOrderEligibility',
      args: {
        customerId: observations.customer.id,
        orderAmount: state.orderAmount,
      },
      rationale: 'Combine credit and invoice data into a single decision.',
    };
  }

  const eligibility = observations.eligibility;

  // Write-action branch: review_required → propose creating a credit review ticket.
  // The runner is responsible for the policy + approval gate; the model only proposes.
  if (eligibility.decision === 'review_required') {
    if (state.gatedActionRejected) {
      return finalAnswer(
        state,
        eligibility,
        'Human rejected the proposed credit review ticket; finalize answer without writing.',
      );
    }

    if (!observations.ticket) {
      return {
        type: 'tool_call',
        toolName: 'createCreditReviewTicket',
        args: {
          customerId: eligibility.customerId,
          reason: eligibility.reasons.join(' '),
        },
        rationale:
          state.approvalDecision === 'approved'
            ? 'Human approved the gated action; create the credit review ticket.'
            : 'Order needs human review; propose a credit review ticket via the approval gate.',
      };
    }
  }

  // Optional schema-failure demo path used by the Structured Output lesson.
  if (state.simulateInvalidRecommendation && !state.invalidRecommendationAttempted) {
    return {
      type: 'invalid_recommendation',
      payload: {
        customerId: eligibility.customerId,
        orderAmount: eligibility.orderAmount,
        currency: 'USD',
        // intentionally invalid: decision is not in the enum, reasons is a string,
        // and recommendedAction is missing
        decision: 'maybe-approve-tomorrow',
        reasons: 'looks fine to me',
      },
      rationale:
        'Drafted a recommendation in free-form text that does not match the schema.',
    };
  }

  return finalAnswer(
    state,
    eligibility,
    'All required observations gathered; produce the recommendation.',
  );
}

function finalAnswer(
  _state: ModelState,
  eligibility: OrderEligibility,
  rationale: string,
): FinalAnswerDecision {
  return {
    type: 'final_answer',
    recommendation: eligibility,
    rationale,
  };
}
