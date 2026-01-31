import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
    BalanceSheetData,
    BudgetData,
    CashFlowData,
    IncomeStatementData,
    NetWorthData,
    UserCalculatorData,
} from '../types';

interface CalculatorState {
  data: UserCalculatorData;
  setNetWorth: (data: NetWorthData) => void;
  setIncomeStatement: (data: IncomeStatementData) => void;
  setBalanceSheet: (data: BalanceSheetData) => void;
  setBudget: (data: BudgetData) => void;
  setCashFlow: (data: CashFlowData) => void;
  clearCalculator: (key: keyof UserCalculatorData) => void;
  resetAll: () => void;
}

const DEFAULT_DATA: UserCalculatorData = {
  netWorth: null,
  incomeStatement: null,
  balanceSheet: null,
  budget: null,
  cashFlowForecast: null,
};

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      data: DEFAULT_DATA,

      setNetWorth: (data: NetWorthData) => {
        set((state) => ({
          data: { ...state.data, netWorth: data },
        }));
      },

      setIncomeStatement: (data: IncomeStatementData) => {
        set((state) => ({
          data: { ...state.data, incomeStatement: data },
        }));
      },

      setBalanceSheet: (data: BalanceSheetData) => {
        set((state) => ({
          data: { ...state.data, balanceSheet: data },
        }));
      },

      setBudget: (data: BudgetData) => {
        set((state) => ({
          data: { ...state.data, budget: data },
        }));
      },

      setCashFlow: (data: CashFlowData) => {
        set((state) => ({
          data: { ...state.data, cashFlowForecast: data },
        }));
      },

      clearCalculator: (key: keyof UserCalculatorData) => {
        set((state) => ({
          data: { ...state.data, [key]: null },
        }));
      },

      resetAll: () => {
        set({ data: DEFAULT_DATA });
      },
    }),
    {
      name: 'accounting-intro:calculators',
    }
  )
);
