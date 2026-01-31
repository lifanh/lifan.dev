/**
 * Downloadable Financial Templates
 *
 * This module provides CSV and Excel-compatible templates for common
 * financial documents that users can download and use.
 */

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  category: 'personal' | 'business' | 'both';
  filename: string;
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: 'net-worth-tracker',
    name: 'Net Worth Tracker',
    description: 'Track your assets and liabilities to calculate net worth over time.',
    category: 'personal',
    filename: 'net-worth-tracker.csv',
  },
  {
    id: 'general-ledger',
    name: 'General Ledger',
    description: 'Record all financial transactions with debits and credits.',
    category: 'both',
    filename: 'general-ledger.csv',
  },
  {
    id: 'journal-entry-log',
    name: 'Journal Entry Log',
    description: 'Log journal entries with dates, accounts, and descriptions.',
    category: 'both',
    filename: 'journal-entry-log.csv',
  },
  {
    id: 'personal-income-statement',
    name: 'Personal Income Statement',
    description: 'Track personal income and expenses to see your monthly cash flow.',
    category: 'personal',
    filename: 'personal-income-statement.csv',
  },
  {
    id: 'small-business-pl',
    name: 'Small Business P&L',
    description: 'Profit and Loss statement template for small businesses.',
    category: 'business',
    filename: 'small-business-pl.csv',
  },
  {
    id: 'personal-balance-sheet',
    name: 'Personal Balance Sheet',
    description: 'Snapshot of your financial position at a point in time.',
    category: 'personal',
    filename: 'personal-balance-sheet.csv',
  },
  {
    id: 'cash-flow-forecast',
    name: 'Cash Flow Forecast',
    description: 'Project future cash inflows and outflows for better planning.',
    category: 'both',
    filename: 'cash-flow-forecast.csv',
  },
  {
    id: 'personal-monthly-budget',
    name: 'Personal Monthly Budget',
    description: 'Plan and track monthly income and expenses by category.',
    category: 'personal',
    filename: 'personal-monthly-budget.csv',
  },
];

// Template CSV content generators
export function generateNetWorthTrackerCSV(): string {
  return `Net Worth Tracker
Date:,${new Date().toLocaleDateString()}

ASSETS,Amount,Notes
Cash & Bank Accounts,,
  Checking Account,,
  Savings Account,,
  Money Market,,
  Cash on Hand,,
Investments,,
  Retirement Accounts (401k/IRA),,
  Brokerage Accounts,,
  Stocks/Bonds,,
  Mutual Funds,,
Real Estate,,
  Primary Residence (Market Value),,
  Investment Properties,,
Vehicles,,
  Car 1,,
  Car 2,,
Other Assets,,
  Personal Property,,
  Business Interests,,
  Other,,
TOTAL ASSETS,=SUM(Above amounts),

LIABILITIES,Amount,Notes
Short-term Debt,,
  Credit Cards,,
  Personal Loans,,
  Medical Bills,,
Long-term Debt,,
  Mortgage,,
  Auto Loans,,
  Student Loans,,
  HELOC,,
Other Liabilities,,
  Other Debts,,
TOTAL LIABILITIES,=SUM(Above amounts),

NET WORTH,=Assets - Liabilities,`;
}

export function generateGeneralLedgerCSV(): string {
  return `General Ledger
Period:,${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}

Date,Account Number,Account Name,Description,Debit,Credit,Balance
Example: 1/1/2025,1000,Cash,Opening Balance,10000,,10000
Example: 1/5/2025,1000,Cash,Revenue from Sales,500,,10500
Example: 1/10/2025,1000,Cash,Rent Payment,,1200,9300
,,,,,
,,,,,
,,,,,

ACCOUNT CODES REFERENCE
1000-1999,Asset Accounts
2000-2999,Liability Accounts
3000-3999,Equity Accounts
4000-4999,Revenue Accounts
5000-5999,Expense Accounts`;
}

export function generateJournalEntryLogCSV(): string {
  return `Journal Entry Log
Company/Name:,
Period:,${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}

Entry #,Date,Account,Description,Debit,Credit,Reference
1,Example: 1/1/2025,Cash,Opening cash balance,10000,,
1,Example: 1/1/2025,Owner's Equity,Opening equity contribution,,10000,
2,Example: 1/5/2025,Cash,Sales revenue received,1500,,Invoice #001
2,Example: 1/5/2025,Sales Revenue,Service provided,,1500,Invoice #001
3,Example: 1/10/2025,Rent Expense,Monthly rent payment,1200,,Check #101
3,Example: 1/10/2025,Cash,Rent payment,,1200,Check #101
,,,,,
,,,,,

TIPS:
- Each transaction should have equal debits and credits
- Use consistent account names
- Include reference numbers for audit trail
- Date entries in chronological order`;
}

export function generatePersonalIncomeStatementCSV(): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthHeaders = months.join(',');

  return `Personal Income Statement
Year:,${new Date().getFullYear()}

INCOME,${monthHeaders},Total
Salary/Wages,,,,,,,,,,,,,
Bonus,,,,,,,,,,,,,
Side Income,,,,,,,,,,,,,
Investment Income,,,,,,,,,,,,,
Other Income,,,,,,,,,,,,,
TOTAL INCOME,,,,,,,,,,,,,

EXPENSES,${monthHeaders},Total
Housing,,,,,,,,,,,,
  Rent/Mortgage,,,,,,,,,,,,,
  Utilities,,,,,,,,,,,,,
  Insurance,,,,,,,,,,,,,
Transportation,,,,,,,,,,,,,
  Car Payment,,,,,,,,,,,,,
  Gas,,,,,,,,,,,,,
  Insurance,,,,,,,,,,,,,
  Maintenance,,,,,,,,,,,,,
Food,,,,,,,,,,,,,
  Groceries,,,,,,,,,,,,,
  Dining Out,,,,,,,,,,,,,
Healthcare,,,,,,,,,,,,,
  Insurance,,,,,,,,,,,,,
  Medical Expenses,,,,,,,,,,,,,
Personal,,,,,,,,,,,,,
  Clothing,,,,,,,,,,,,,
  Entertainment,,,,,,,,,,,,,
  Subscriptions,,,,,,,,,,,,,
Debt Payments,,,,,,,,,,,,,
  Credit Cards,,,,,,,,,,,,,
  Loans,,,,,,,,,,,,,
Savings & Investments,,,,,,,,,,,,,
  Emergency Fund,,,,,,,,,,,,,
  Retirement,,,,,,,,,,,,,
Other,,,,,,,,,,,,,
TOTAL EXPENSES,,,,,,,,,,,,,

NET INCOME (Income - Expenses),,,,,,,,,,,,,
Savings Rate %,,,,,,,,,,,,,`;
}

export function generateSmallBusinessPLCSV(): string {
  return `Profit & Loss Statement
Business Name:,
Period:,${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}

,This Month,Year to Date,Budget,Variance
REVENUE,,,,
  Product Sales,,,,
  Service Revenue,,,,
  Other Revenue,,,,
TOTAL REVENUE,,,,

COST OF GOODS SOLD,,,,
  Materials,,,,
  Direct Labor,,,,
  Manufacturing Overhead,,,,
TOTAL COGS,,,,

GROSS PROFIT,,,,
Gross Profit Margin %,,,,

OPERATING EXPENSES,,,,
  Salaries & Wages,,,,
  Rent,,,,
  Utilities,,,,
  Insurance,,,,
  Marketing & Advertising,,,,
  Professional Services,,,,
  Office Supplies,,,,
  Travel & Entertainment,,,,
  Depreciation,,,,
  Other Expenses,,,,
TOTAL OPERATING EXPENSES,,,,

OPERATING INCOME (EBIT),,,,
Operating Margin %,,,,

OTHER INCOME/EXPENSES,,,,
  Interest Income,,,,
  Interest Expense,,,,
  Other,,,,
TOTAL OTHER,,,,

NET INCOME BEFORE TAXES,,,,
  Income Tax Expense,,,,
NET INCOME,,,,
Net Profit Margin %,,,,`;
}

export function generatePersonalBalanceSheetCSV(): string {
  return `Personal Balance Sheet
As of:,${new Date().toLocaleDateString()}

ASSETS,Amount,% of Total
CURRENT ASSETS (Liquid),,
  Cash & Checking Accounts,,
  Savings Accounts,,
  Money Market Funds,,
  Certificates of Deposit,,
  Accounts Receivable (money owed to you),,
Total Current Assets,,

INVESTMENT ASSETS,,
  401(k) / 403(b),,
  Traditional IRA,,
  Roth IRA,,
  Brokerage Accounts,,
  Stocks,,
  Bonds,,
  Mutual Funds / ETFs,,
  Other Investments,,
Total Investment Assets,,

FIXED ASSETS,,
  Primary Residence (Market Value),,
  Other Real Estate,,
  Vehicles,,
  Personal Property (jewelry, art, etc.),,
  Business Interests,,
Total Fixed Assets,,

TOTAL ASSETS,,100%

LIABILITIES,Amount,% of Total
CURRENT LIABILITIES (Due within 1 year),,
  Credit Card Balances,,
  Personal Loans,,
  Medical Bills,,
  Taxes Owed,,
  Other Short-term Debt,,
Total Current Liabilities,,

LONG-TERM LIABILITIES,,
  Mortgage Balance,,
  HELOC Balance,,
  Auto Loans,,
  Student Loans,,
  Other Long-term Debt,,
Total Long-term Liabilities,,

TOTAL LIABILITIES,,

NET WORTH (Assets - Liabilities),,
Debt-to-Asset Ratio (Liabilities/Assets),,
Current Ratio (Current Assets/Current Liabilities),,`;
}

export function generateCashFlowForecastCSV(): string {
  return `Cash Flow Forecast
Name/Business:,
Starting Date:,${new Date().toLocaleDateString()}

,Week 1,Week 2,Week 3,Week 4,Month Total
BEGINNING CASH BALANCE,,,,,

CASH INFLOWS,,,,,
  Sales/Revenue,,,,,
  Accounts Receivable Collections,,,,,
  Investment Income,,,,,
  Loan Proceeds,,,,,
  Other Income,,,,,
TOTAL CASH INFLOWS,,,,,

CASH OUTFLOWS,,,,,
  Rent/Mortgage,,,,,
  Utilities,,,,,
  Payroll/Wages,,,,,
  Inventory/Supplies,,,,,
  Insurance,,,,,
  Loan Payments,,,,,
  Taxes,,,,,
  Marketing,,,,,
  Professional Services,,,,,
  Equipment,,,,,
  Other Expenses,,,,,
TOTAL CASH OUTFLOWS,,,,,

NET CASH FLOW (Inflows - Outflows),,,,,
ENDING CASH BALANCE,,,,,

NOTES:,,,,,
- Highlight weeks with negative cash flow,,,,,
- Plan for seasonal variations,,,,,
- Include buffer for unexpected expenses,,,,,`;
}

export function generatePersonalMonthlyBudgetCSV(): string {
  return `Personal Monthly Budget
Month/Year:,${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}

INCOME,Budgeted,Actual,Difference
Salary (Net Pay),,,
Bonus,,,
Side Hustle/Freelance,,,
Investment Income,,,
Other Income,,,
TOTAL INCOME,,,

NEEDS (50% Target),Budgeted,Actual,Difference
Housing,,,
  Rent/Mortgage,,,
  Utilities (Electric, Gas, Water),,,
  Internet/Phone,,,
  Home Insurance,,,
  Property Tax,,,
Transportation,,,
  Car Payment,,,
  Car Insurance,,,
  Gas,,,
  Maintenance/Repairs,,,
  Public Transit,,,
Groceries,,,
Healthcare,,,
  Health Insurance,,,
  Medications,,,
  Doctor/Dental,,,
Minimum Debt Payments,,,
  Credit Cards,,,
  Student Loans,,,
  Other Loans,,,
Childcare/Education,,,
TOTAL NEEDS,,,
% of Income,,,

WANTS (30% Target),Budgeted,Actual,Difference
Dining Out,,,
Entertainment,,,
  Streaming Services,,,
  Hobbies,,,
  Events/Movies,,,
Shopping,,,
  Clothing,,,
  Personal Care,,,
Travel/Vacation,,,
Gym/Fitness,,,
Other Wants,,,
TOTAL WANTS,,,
% of Income,,,

SAVINGS & DEBT (20% Target),Budgeted,Actual,Difference
Emergency Fund,,,
Retirement (beyond employer match),,,
Extra Debt Payments,,,
Other Savings Goals,,,
TOTAL SAVINGS & DEBT,,,
% of Income,,,

SUMMARY,Budgeted,Actual,Difference
Total Income,,,
Total Expenses,,,
Net (Income - Expenses),,,`;
}

// Template download function
export function downloadTemplate(templateId: string): void {
  let content: string;
  let filename: string;

  switch (templateId) {
    case 'net-worth-tracker':
      content = generateNetWorthTrackerCSV();
      filename = 'net-worth-tracker.csv';
      break;
    case 'general-ledger':
      content = generateGeneralLedgerCSV();
      filename = 'general-ledger.csv';
      break;
    case 'journal-entry-log':
      content = generateJournalEntryLogCSV();
      filename = 'journal-entry-log.csv';
      break;
    case 'personal-income-statement':
      content = generatePersonalIncomeStatementCSV();
      filename = 'personal-income-statement.csv';
      break;
    case 'small-business-pl':
      content = generateSmallBusinessPLCSV();
      filename = 'small-business-pl.csv';
      break;
    case 'personal-balance-sheet':
      content = generatePersonalBalanceSheetCSV();
      filename = 'personal-balance-sheet.csv';
      break;
    case 'cash-flow-forecast':
      content = generateCashFlowForecastCSV();
      filename = 'cash-flow-forecast.csv';
      break;
    case 'personal-monthly-budget':
      content = generatePersonalMonthlyBudgetCSV();
      filename = 'personal-monthly-budget.csv';
      break;
    default:
      console.error(`Unknown template: ${templateId}`);
      return;
  }

  // Create blob and download
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
