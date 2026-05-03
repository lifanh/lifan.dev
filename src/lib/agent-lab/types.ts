export type RiskLevel = 'low' | 'medium' | 'high';
export type AccountStatus = 'active' | 'blocked' | 'watchlist';

export type Customer = {
  id: string;
  name: string;
  creditLimit: number;
  currentExposure: number;
  paymentTerms: string;
  riskLevel: RiskLevel;
  accountStatus: AccountStatus;
};

export type Invoice = {
  id: string;
  customerId: string;
  amount: number;
  dueDate: string;
  status: 'open' | 'paid' | 'overdue';
  daysPastDue: number;
};

export type OrderRequest = {
  customerId: string;
  amount: number;
  currency: 'USD';
};

export type AgentScenario = {
  id: string;
  title: string;
  customerNameOrId: string;
  orderAmount: number;
  currency: 'USD';
  userRequest: string;
  lesson: string;
};

export type CreditStatus = {
  customerId: string;
  creditLimit: number;
  currentExposure: number;
  availableCredit: number;
  status: AccountStatus;
  riskLevel: RiskLevel;
};

export type EligibilityDecision = 'approve' | 'review_required' | 'block';

export type OrderEligibility = {
  customerId: string;
  orderAmount: number;
  currency: 'USD';
  decision: EligibilityDecision;
  creditLimit: number;
  currentExposure: number;
  projectedExposure: number;
  availableCredit: number;
  overLimitBy: number;
  overdueInvoiceCount: number;
  maxDaysPastDue: number;
  requiresHumanApproval: boolean;
  reasons: string[];
  recommendedAction: string;
};

export type PermissionDecision =
  | { decision: 'allow' }
  | { decision: 'requires_approval'; reason: string }
  | { decision: 'deny'; reason: string };

export type TraceEventType =
  | 'user_message'
  | 'model_response'
  | 'tool_call'
  | 'permission_check'
  | 'tool_result'
  | 'approval_required'
  | 'validation_error'
  | 'model_retry'
  | 'final_answer'
  | 'error';

export type TraceEvent = {
  id: string;
  type: TraceEventType;
  title: string;
  timestamp: number;
  payload: unknown;
  durationMs?: number;
};

export type ApprovalDecision = 'approved' | 'rejected';
export type AgentRunStatus = 'completed' | 'waiting_for_approval' | 'error';

export type CreditReviewTicket = {
  id: string;
  customerId: string;
  reason: string;
  status: 'open';
  createdAt: string;
};

export type PendingApproval = {
  toolName: 'createCreditReviewTicket';
  args: {
    customerId: string;
    reason: string;
  };
  reason: string;
};

export type AgentRunResult = {
  scenario: AgentScenario;
  status: AgentRunStatus;
  events: TraceEvent[];
  recommendation: OrderEligibility;
  finalAnswer: string;
  pendingApproval?: PendingApproval;
  ticket?: CreditReviewTicket;
  iterations: number;
  metrics: {
    latencyMs: number;
    estimatedInputTokens: number;
    estimatedOutputTokens: number;
    estimatedCostUsd: number;
    toolCalls: number;
    iterations: number;
    /** All numbers in metrics are simulated; no real LLM was called. */
    simulated: true;
    /** Which model client actually drove the run ("fake" vs. "real"). */
    modelClientId: 'fake' | 'real';
  };
};

export type ToolExecutionOptions = {
  latencyMs?: number;
};
