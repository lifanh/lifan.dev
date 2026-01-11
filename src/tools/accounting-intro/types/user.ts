import type {
    BalanceSheetData,
    BudgetData,
    CashFlowData,
    IncomeStatementData,
    NetWorthData,
} from './financial';
import type { ModuleProgress } from './module';
import type { QuizResult } from './quiz';

export interface UserProgress {
  currentModule: number;
  completedModules: number[];
  moduleProgress: Record<number, ModuleProgress>;
  totalTimeSpent: number;
  lastVisited: string;
  streak: number;
  longestStreak: number;
}

export interface UserAssessments {
  awarenessQuiz: QuizResult | null;
  moduleQuizzes: Record<number, QuizResult>;
}

export interface UserCalculatorData {
  netWorth: NetWorthData | null;
  incomeStatement: IncomeStatementData | null;
  balanceSheet: BalanceSheetData | null;
  budget: BudgetData | null;
  cashFlowForecast: CashFlowData | null;
}

export interface UserHistory {
  netWorthHistory: { date: string; value: number }[];
  budgetHistory: { month: string; planned: number; actual: number }[];
}

export interface UserPreferences {
  currency: string;
  locale: string;
  darkMode: boolean;
  animationsEnabled: boolean;
  showHints: boolean;
}

export interface AccountingPlatformData {
  progress: UserProgress;
  assessments: UserAssessments;
  calculatorData: UserCalculatorData;
  history: UserHistory;
  preferences: UserPreferences;
}

export const DEFAULT_PROGRESS: UserProgress = {
  currentModule: 1,
  completedModules: [],
  moduleProgress: {},
  totalTimeSpent: 0,
  lastVisited: new Date().toISOString(),
  streak: 0,
  longestStreak: 0,
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  currency: 'USD',
  locale: 'en-US',
  darkMode: false,
  animationsEnabled: true,
  showHints: true,
};
