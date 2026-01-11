export interface Asset {
  id: string;
  name: string;
  value: number;
  category: AssetCategory;
}

export type AssetCategory =
  | 'cash'
  | 'investments'
  | 'property'
  | 'vehicles'
  | 'other';

export interface Liability {
  id: string;
  name: string;
  value: number;
  category: LiabilityCategory;
}

export type LiabilityCategory =
  | 'mortgage'
  | 'auto-loan'
  | 'credit-card'
  | 'student-loan'
  | 'personal-loan'
  | 'other';

export interface NetWorthData {
  assets: Asset[];
  liabilities: Liability[];
  lastUpdated: string;
}

export interface IncomeItem {
  id: string;
  name: string;
  amount: number;
  category: IncomeCategory;
  isRecurring: boolean;
}

export type IncomeCategory =
  | 'salary'
  | 'business'
  | 'investments'
  | 'other';

export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  isRecurring: boolean;
}

export type ExpenseCategory =
  | 'housing'
  | 'transportation'
  | 'food'
  | 'utilities'
  | 'insurance'
  | 'healthcare'
  | 'entertainment'
  | 'personal'
  | 'debt-payments'
  | 'savings'
  | 'other';

export interface IncomeStatementData {
  income: IncomeItem[];
  expenses: ExpenseItem[];
  period: 'monthly' | 'quarterly' | 'annual';
  startDate: string;
  endDate: string;
}

export interface BalanceSheetData {
  assets: Asset[];
  liabilities: Liability[];
  asOfDate: string;
}

export interface BudgetItem {
  id: string;
  category: ExpenseCategory;
  planned: number;
  actual: number;
}

export interface BudgetData {
  income: number;
  items: BudgetItem[];
  month: string;
  methodology: 'traditional' | 'zero-based' | '50-30-20' | 'envelope';
}

export interface CashFlowItem {
  id: string;
  name: string;
  amount: number;
  type: 'inflow' | 'outflow';
  category: 'operating' | 'investing' | 'financing';
  month: number;
}

export interface CashFlowData {
  startingBalance: number;
  items: CashFlowItem[];
  year: number;
}

export interface FinancialRatios {
  currentRatio: number;
  quickRatio: number;
  debtToEquity: number;
  debtRatio: number;
  grossProfitMargin: number;
  operatingMargin: number;
  netProfitMargin: number;
  savingsRate: number;
}
