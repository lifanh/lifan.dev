import { describe, expect, it } from 'vitest';
import {
    TEMPLATES,
    generateCashFlowForecastCSV,
    generateGeneralLedgerCSV,
    generateJournalEntryLogCSV,
    generateNetWorthTrackerCSV,
    generatePersonalBalanceSheetCSV,
    generatePersonalIncomeStatementCSV,
    generatePersonalMonthlyBudgetCSV,
    generateSmallBusinessPLCSV,
} from './templates';

describe('templates', () => {
  describe('TEMPLATES array', () => {
    it('contains 8 templates', () => {
      expect(TEMPLATES).toHaveLength(8);
    });

    it('each template has required fields', () => {
      TEMPLATES.forEach((template) => {
        expect(template.id).toBeTruthy();
        expect(template.name).toBeTruthy();
        expect(template.description).toBeTruthy();
        expect(['personal', 'business', 'both']).toContain(template.category);
        expect(template.filename).toMatch(/\.csv$/);
      });
    });

    it('has unique template IDs', () => {
      const ids = TEMPLATES.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('generateNetWorthTrackerCSV', () => {
    it('generates valid CSV content', () => {
      const csv = generateNetWorthTrackerCSV();
      expect(csv).toContain('Net Worth Tracker');
      expect(csv).toContain('ASSETS');
      expect(csv).toContain('LIABILITIES');
      expect(csv).toContain('NET WORTH');
    });

    it('includes asset categories', () => {
      const csv = generateNetWorthTrackerCSV();
      expect(csv).toContain('Cash & Bank Accounts');
      expect(csv).toContain('Investments');
      expect(csv).toContain('Real Estate');
      expect(csv).toContain('Vehicles');
    });

    it('includes liability categories', () => {
      const csv = generateNetWorthTrackerCSV();
      expect(csv).toContain('Mortgage');
      expect(csv).toContain('Credit Cards');
      expect(csv).toContain('Student Loans');
    });
  });

  describe('generateGeneralLedgerCSV', () => {
    it('generates valid CSV content', () => {
      const csv = generateGeneralLedgerCSV();
      expect(csv).toContain('General Ledger');
      expect(csv).toContain('Date');
      expect(csv).toContain('Account Number');
      expect(csv).toContain('Debit');
      expect(csv).toContain('Credit');
      expect(csv).toContain('Balance');
    });

    it('includes account codes reference', () => {
      const csv = generateGeneralLedgerCSV();
      expect(csv).toContain('ACCOUNT CODES REFERENCE');
      expect(csv).toContain('Asset Accounts');
      expect(csv).toContain('Liability Accounts');
    });
  });

  describe('generateJournalEntryLogCSV', () => {
    it('generates valid CSV content', () => {
      const csv = generateJournalEntryLogCSV();
      expect(csv).toContain('Journal Entry Log');
      expect(csv).toContain('Entry #');
      expect(csv).toContain('Account');
      expect(csv).toContain('Description');
    });

    it('includes example entries', () => {
      const csv = generateJournalEntryLogCSV();
      expect(csv).toContain('Cash');
      expect(csv).toContain("Owner's Equity");
    });
  });

  describe('generatePersonalIncomeStatementCSV', () => {
    it('generates valid CSV content', () => {
      const csv = generatePersonalIncomeStatementCSV();
      expect(csv).toContain('Personal Income Statement');
      expect(csv).toContain('INCOME');
      expect(csv).toContain('EXPENSES');
      expect(csv).toContain('NET INCOME');
    });

    it('includes all months', () => {
      const csv = generatePersonalIncomeStatementCSV();
      expect(csv).toContain('Jan');
      expect(csv).toContain('Dec');
    });

    it('includes expense categories', () => {
      const csv = generatePersonalIncomeStatementCSV();
      expect(csv).toContain('Housing');
      expect(csv).toContain('Transportation');
      expect(csv).toContain('Food');
      expect(csv).toContain('Healthcare');
    });
  });

  describe('generateSmallBusinessPLCSV', () => {
    it('generates valid CSV content', () => {
      const csv = generateSmallBusinessPLCSV();
      expect(csv).toContain('Profit & Loss Statement');
      expect(csv).toContain('REVENUE');
      expect(csv).toContain('COST OF GOODS SOLD');
      expect(csv).toContain('GROSS PROFIT');
      expect(csv).toContain('OPERATING INCOME');
      expect(csv).toContain('NET INCOME');
    });

    it('includes budget variance columns', () => {
      const csv = generateSmallBusinessPLCSV();
      expect(csv).toContain('This Month');
      expect(csv).toContain('Year to Date');
      expect(csv).toContain('Budget');
      expect(csv).toContain('Variance');
    });
  });

  describe('generatePersonalBalanceSheetCSV', () => {
    it('generates valid CSV content', () => {
      const csv = generatePersonalBalanceSheetCSV();
      expect(csv).toContain('Personal Balance Sheet');
      expect(csv).toContain('ASSETS');
      expect(csv).toContain('LIABILITIES');
      expect(csv).toContain('NET WORTH');
    });

    it('includes asset categories', () => {
      const csv = generatePersonalBalanceSheetCSV();
      expect(csv).toContain('CURRENT ASSETS');
      expect(csv).toContain('INVESTMENT ASSETS');
      expect(csv).toContain('FIXED ASSETS');
    });

    it('includes financial ratios', () => {
      const csv = generatePersonalBalanceSheetCSV();
      expect(csv).toContain('Debt-to-Asset Ratio');
      expect(csv).toContain('Current Ratio');
    });
  });

  describe('generateCashFlowForecastCSV', () => {
    it('generates valid CSV content', () => {
      const csv = generateCashFlowForecastCSV();
      expect(csv).toContain('Cash Flow Forecast');
      expect(csv).toContain('BEGINNING CASH BALANCE');
      expect(csv).toContain('CASH INFLOWS');
      expect(csv).toContain('CASH OUTFLOWS');
      expect(csv).toContain('NET CASH FLOW');
      expect(csv).toContain('ENDING CASH BALANCE');
    });

    it('includes weekly columns', () => {
      const csv = generateCashFlowForecastCSV();
      expect(csv).toContain('Week 1');
      expect(csv).toContain('Week 4');
      expect(csv).toContain('Month Total');
    });
  });

  describe('generatePersonalMonthlyBudgetCSV', () => {
    it('generates valid CSV content', () => {
      const csv = generatePersonalMonthlyBudgetCSV();
      expect(csv).toContain('Personal Monthly Budget');
      expect(csv).toContain('INCOME');
      expect(csv).toContain('NEEDS');
      expect(csv).toContain('WANTS');
      expect(csv).toContain('SAVINGS & DEBT');
    });

    it('includes 50/30/20 budget targets', () => {
      const csv = generatePersonalMonthlyBudgetCSV();
      expect(csv).toContain('50% Target');
      expect(csv).toContain('30% Target');
      expect(csv).toContain('20% Target');
    });

    it('includes budget vs actual columns', () => {
      const csv = generatePersonalMonthlyBudgetCSV();
      expect(csv).toContain('Budgeted');
      expect(csv).toContain('Actual');
      expect(csv).toContain('Difference');
    });
  });
});
