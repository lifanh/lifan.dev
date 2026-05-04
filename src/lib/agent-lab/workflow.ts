import { creditPolicyDocument, type PolicySection } from '../../data/agent-lab/creditPolicyDocument';
import {
  checkOrderEligibility,
  createCreditReviewTicket,
  getCreditStatus,
  getCustomer,
  getOpenInvoices,
} from './mockTools';
import { evaluateToolPermission } from './policy';
import { retrievePolicySections } from './retrieval';
import type {
  ApprovalDecision,
  CreditReviewTicket,
  CreditStatus,
  Customer,
  Invoice,
  OrderEligibility,
} from './types';

/**
 * workflow.ts
 *
 * Lab 8 — Workflow orchestration vs free-form agent loop.
 *
 * Many production "agents" are deterministic workflows with one or two
 * LLM-shaped steps embedded inside. Free-form planning is powerful but
 * unpredictable; a fixed pipeline is auditable, reproducible, and far
 * easier to evaluate.
 *
 * This module hard-codes a six-step credit-eligibility workflow over the
 * same mock ERP that the free-form agent runner uses. Each step is a
 * pure function that consumes the workflow state and returns the next
 * state plus a structured step record. The runner side-by-side renders
 * the workflow steps next to a free-form agent trace so the contrast is
 * immediate.
 *
 * The workflow does not call any model. Where the runner asks "what
 * should I do next?", the workflow has already decided.
 */

export type WorkflowStepId =
  | 'classifyRequest'
  | 'retrievePolicy'
  | 'checkCustomerAccount'
  | 'generateRecommendation'
  | 'requestApproval'
  | 'executeFinalAction';

export type WorkflowStepStatus = 'ok' | 'skipped' | 'error' | 'awaiting_approval';

export type WorkflowStepRecord = {
  id: WorkflowStepId;
  label: string;
  description: string;
  status: WorkflowStepStatus;
  data?: unknown;
  error?: string;
};

export type WorkflowFinalAction =
  | { kind: 'release_order'; detail: string }
  | { kind: 'create_ticket'; detail: string; ticket?: CreditReviewTicket }
  | { kind: 'block'; detail: string }
  | { kind: 'reject_pending_approval'; detail: string }
  | { kind: 'awaiting_approval'; detail: string };

export type WorkflowInput = {
  customerNameOrId: string;
  orderAmount: number;
  userRequest: string;
  approvalDecision?: ApprovalDecision;
};

export type WorkflowState = {
  input: WorkflowInput;
  classification?: 'order_eligibility' | 'unknown';
  policySections?: PolicySection[];
  customer?: Customer;
  creditStatus?: CreditStatus;
  openInvoices?: Invoice[];
  recommendation?: OrderEligibility;
  approvalRequired?: boolean;
  approvalReason?: string;
  approvalDecision?: ApprovalDecision;
  finalAction?: WorkflowFinalAction;
};

export type WorkflowResult = {
  input: WorkflowInput;
  state: WorkflowState;
  steps: WorkflowStepRecord[];
  finalAction: WorkflowFinalAction;
};

const STEP_LABELS: Record<WorkflowStepId, { label: string; description: string }> = {
  classifyRequest: {
    label: 'Classify request',
    description: 'Detect intent so the right pipeline runs. Free-form agents do this implicitly; workflows do it explicitly.',
  },
  retrievePolicy: {
    label: 'Retrieve policy',
    description: 'Look up the credit-policy sections relevant to the request before any tool runs.',
  },
  checkCustomerAccount: {
    label: 'Check customer account',
    description: 'Resolve the customer, fetch credit status and open invoices in a fixed order.',
  },
  generateRecommendation: {
    label: 'Generate recommendation',
    description: 'Compute the eligibility decision deterministically from the data already gathered.',
  },
  requestApproval: {
    label: 'Request approval',
    description: 'Consult the policy gate. Write actions and large orders pause for a human.',
  },
  executeFinalAction: {
    label: 'Execute final action',
    description: 'Release the order, create a ticket, or block — exactly one terminal action.',
  },
};

export async function runWorkflow(input: WorkflowInput): Promise<WorkflowResult> {
  const steps: WorkflowStepRecord[] = [];
  let state: WorkflowState = { input };

  state = await step('classifyRequest', steps, state, classifyRequest);
  if (state.classification === 'unknown') {
    return finish(state, steps, {
      kind: 'block',
      detail: 'Request did not match the credit-eligibility intent; workflow stopped.',
    });
  }

  state = await step('retrievePolicy', steps, state, retrievePolicy);
  state = await step('checkCustomerAccount', steps, state, checkCustomerAccount);

  if (!state.customer) {
    return finish(state, steps, {
      kind: 'block',
      detail: 'Customer account could not be resolved; workflow stopped.',
    });
  }

  state = await step('generateRecommendation', steps, state, generateRecommendation);
  state = await step('requestApproval', steps, state, requestApproval);

  if (state.approvalRequired && !state.approvalDecision) {
    const record: WorkflowStepRecord = {
      id: 'executeFinalAction',
      label: STEP_LABELS.executeFinalAction.label,
      description: STEP_LABELS.executeFinalAction.description,
      status: 'awaiting_approval',
      data: { reason: state.approvalReason },
    };
    steps.push(record);
    return finish(state, steps, {
      kind: 'awaiting_approval',
      detail: state.approvalReason ?? 'Awaiting human approval.',
    });
  }

  state = await step('executeFinalAction', steps, state, executeFinalAction);

  return finish(state, steps, state.finalAction!);
}

async function step<T extends WorkflowState>(
  id: WorkflowStepId,
  steps: WorkflowStepRecord[],
  state: T,
  handler: (state: T) => Promise<T> | T,
): Promise<T> {
  const meta = STEP_LABELS[id];
  try {
    const next = await handler(state);
    const record: WorkflowStepRecord = {
      id,
      label: meta.label,
      description: meta.description,
      status: id === 'requestApproval' && next.approvalRequired && !next.approvalDecision ? 'awaiting_approval' : 'ok',
      data: snapshotForStep(id, next),
    };
    steps.push(record);
    return next;
  } catch (error) {
    steps.push({
      id,
      label: meta.label,
      description: meta.description,
      status: 'error',
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

function snapshotForStep(id: WorkflowStepId, state: WorkflowState): unknown {
  switch (id) {
    case 'classifyRequest':
      return { classification: state.classification };
    case 'retrievePolicy':
      return {
        sections: state.policySections?.map((section) => ({
          id: section.id,
          title: section.title,
        })),
      };
    case 'checkCustomerAccount':
      return {
        customerId: state.customer?.id,
        creditStatus: state.creditStatus,
        openInvoiceCount: state.openInvoices?.length ?? 0,
      };
    case 'generateRecommendation':
      return {
        decision: state.recommendation?.decision,
        recommendedAction: state.recommendation?.recommendedAction,
        requiresHumanApproval: state.recommendation?.requiresHumanApproval,
      };
    case 'requestApproval':
      return {
        approvalRequired: state.approvalRequired,
        approvalReason: state.approvalReason,
        approvalDecision: state.approvalDecision,
      };
    case 'executeFinalAction':
      return state.finalAction;
  }
}

function finish(
  state: WorkflowState,
  steps: WorkflowStepRecord[],
  finalAction: WorkflowFinalAction,
): WorkflowResult {
  return {
    input: state.input,
    state: { ...state, finalAction },
    steps,
    finalAction,
  };
}

// --- Steps ----------------------------------------------------------------

function classifyRequest(state: WorkflowState): WorkflowState {
  const text = state.input.userRequest.toLowerCase();
  const hasOrderIntent = /order|place|release|credit|eligib/.test(text);
  return {
    ...state,
    classification: hasOrderIntent ? 'order_eligibility' : 'unknown',
  };
}

function retrievePolicy(state: WorkflowState): WorkflowState {
  const result = retrievePolicySections(state.input.userRequest, 4);
  const sections = result.citations
    .map((citation) => creditPolicyDocument.find((section) => section.id === citation.sectionId))
    .filter((section): section is PolicySection => Boolean(section));
  return { ...state, policySections: sections };
}

async function checkCustomerAccount(state: WorkflowState): Promise<WorkflowState> {
  try {
    const customer = await getCustomer(state.input.customerNameOrId, { latencyMs: 0 });
    const [creditStatus, openInvoices] = await Promise.all([
      getCreditStatus(customer.id, { latencyMs: 0 }),
      getOpenInvoices(customer.id, { latencyMs: 0 }),
    ]);
    return { ...state, customer, creditStatus, openInvoices };
  } catch {
    return state;
  }
}

async function generateRecommendation(state: WorkflowState): Promise<WorkflowState> {
  if (!state.customer) return state;
  const recommendation = await checkOrderEligibility(state.customer.id, state.input.orderAmount, {
    latencyMs: 0,
  });
  return { ...state, recommendation };
}

function requestApproval(state: WorkflowState): WorkflowState {
  if (!state.recommendation) {
    return { ...state, approvalRequired: false };
  }

  const willCreateTicket = state.recommendation.requiresHumanApproval;

  if (!willCreateTicket) {
    return { ...state, approvalRequired: false };
  }

  // The would-be next call is createCreditReviewTicket; consult the
  // same policy module the runner uses so the lesson stays consistent.
  const probe = evaluateToolPermission('createCreditReviewTicket', {
    customerId: state.recommendation.customerId,
    reason: state.recommendation.reasons.join(' '),
  });

  if (probe.decision === 'requires_approval') {
    return {
      ...state,
      approvalRequired: true,
      approvalReason: probe.reason,
      approvalDecision: state.input.approvalDecision,
    };
  }

  return { ...state, approvalRequired: false };
}

async function executeFinalAction(state: WorkflowState): Promise<WorkflowState> {
  if (!state.recommendation) {
    return {
      ...state,
      finalAction: { kind: 'block', detail: 'No recommendation was produced.' },
    };
  }

  if (state.recommendation.decision === 'block') {
    return {
      ...state,
      finalAction: {
        kind: 'block',
        detail: state.recommendation.recommendedAction,
      },
    };
  }

  if (state.recommendation.requiresHumanApproval) {
    if (state.approvalDecision === 'rejected') {
      return {
        ...state,
        finalAction: {
          kind: 'reject_pending_approval',
          detail: 'Human reviewer rejected the credit-review ticket; order not released.',
        },
      };
    }

    if (state.approvalDecision === 'approved') {
      const ticket = await createCreditReviewTicket(
        state.recommendation.customerId,
        state.recommendation.reasons.join(' '),
        { latencyMs: 0 },
      );
      return {
        ...state,
        finalAction: {
          kind: 'create_ticket',
          detail: `Credit review ticket ${ticket.id} created; order on hold pending review.`,
          ticket,
        },
      };
    }
  }

  return {
    ...state,
    finalAction: {
      kind: 'release_order',
      detail: state.recommendation.recommendedAction,
    },
  };
}
