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

export type Scenario = {
  id: string;
  title: string;
  customerName: string;
  orderAmount: number;
  userPrompt: string;
};

export type ToolPermissionDecision = 'allow' | 'requires_approval' | 'deny';

export type TraceEvent = {
  id: string;
  type:
    | 'user_message'
    | 'model_response'
    | 'tool_call'
    | 'permission_check'
    | 'tool_result'
    | 'approval_required'
    | 'final_answer'
    | 'error';
  title: string;
  timestamp: number;
  payload: unknown;
  durationMs?: number;
};

export type RunResult = {
  trace: TraceEvent[];
  finalAnswer: string;
  requiresApproval: boolean;
};
