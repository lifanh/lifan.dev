import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCalculatorStore } from '../../../store';
import { FinancialHealthDashboard } from './FinancialHealthDashboard';

// Mock the store
vi.mock('../../../store', () => ({
  useCalculatorStore: vi.fn(),
}));

describe('FinancialHealthDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useCalculatorStore as any).mockReturnValue({
      data: {
        netWorth: null,
        incomeStatement: null,
        balanceSheet: null,
        budget: null,
        cashFlowForecast: null,
      },
    });
  });

  it('renders dashboard with placeholder data when no saved data', () => {
    render(<FinancialHealthDashboard />);

    expect(screen.getByText('Overall Financial Health')).toBeInTheDocument();
    expect(screen.getByText('Financial Ratios')).toBeInTheDocument();
    expect(screen.getByText('Net Worth')).toBeInTheDocument();
    expect(screen.getAllByText('$0')).toHaveLength(2); // Net Worth and Monthly Savings
  });

  it('displays calculated metrics from saved data', () => {
    const mockData = {
      netWorth: {
        assets: [
          { id: '1', name: 'Checking', value: '30000', category: 'cash' },
          { id: '2', name: 'Investments', value: '120000', category: 'investments' },
        ],
        liabilities: [
          { id: '1', name: 'Credit Card', value: '20000', category: 'credit-card' },
          { id: '2', name: 'Mortgage', value: '30000', category: 'mortgage' },
        ],
        lastUpdated: new Date().toISOString(),
      },
      incomeStatement: {
        income: [
          { id: '1', name: 'Salary', amount: '5000', category: 'salary', isRecurring: true },
        ],
        expenses: [
          { id: '1', name: 'Rent', amount: '2000', category: 'housing', isRecurring: true },
          { id: '2', name: 'Food', amount: '1500', category: 'food', isRecurring: true },
        ],
        period: 'monthly' as const,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      },
    };

    (useCalculatorStore as any).mockReturnValue({
      data: mockData,
    });

    render(<FinancialHealthDashboard />);

    expect(screen.getByText('$100,000')).toBeInTheDocument(); // Net Worth
    expect(screen.getByText('$1,500')).toBeInTheDocument(); // Monthly Savings
    expect(screen.getByText('33%')).toBeInTheDocument(); // Debt-to-Assets
  });

  it('shows emergency fund ratio status', () => {
    (useCalculatorStore as any).mockReturnValue({
      data: {
        netWorth: {
          assets: [
            { id: '1', name: 'Checking', value: '15000', category: 'cash' },
            { id: '2', name: 'Investments', value: '5000', category: 'investments' },
          ],
          liabilities: [],
          lastUpdated: new Date().toISOString(),
        },
        incomeStatement: {
          income: [],
          expenses: [
            { id: '1', name: 'Rent', amount: '3000', category: 'housing', isRecurring: true },
          ],
          period: 'monthly' as const,
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
        },
      },
    });

    render(<FinancialHealthDashboard />);

    expect(screen.getByText('Emergency Fund')).toBeInTheDocument();
    expect(screen.getAllByText('Good')).toHaveLength(2); // Emergency Fund + Liquidity ratios
  });

  it('displays recommendations for poor financial health', () => {
    (useCalculatorStore as any).mockReturnValue({
      data: {
        netWorth: {
          assets: [
            { id: '1', name: 'Checking', value: '1000', category: 'cash' },
          ],
          liabilities: [
            { id: '1', name: 'Credit Card', value: '80000', category: 'credit-card' },
          ],
          lastUpdated: new Date().toISOString(),
        },
        incomeStatement: {
          income: [
            { id: '1', name: 'Salary', amount: '2000', category: 'salary', isRecurring: true },
          ],
          expenses: [
            { id: '1', name: 'Rent', amount: '3000', category: 'housing', isRecurring: true },
          ],
          period: 'monthly' as const,
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
        },
      },
    });

    render(<FinancialHealthDashboard />);

    expect(screen.getByText(/Build an emergency fund/i)).toBeInTheDocument();
    expect(screen.getByText(/Try to save at least 10%/i)).toBeInTheDocument();
  });

  it('renders without error with excellent financial data', () => {
    (useCalculatorStore as any).mockReturnValue({
      data: {
        netWorth: {
          assets: [
            { id: '1', name: 'Checking', value: '50000', category: 'cash' },
            { id: '2', name: 'Investments', value: '170000', category: 'investments' },
          ],
          liabilities: [
            { id: '1', name: 'Mortgage', value: '20000', category: 'mortgage' },
          ],
          lastUpdated: new Date().toISOString(),
        },
        incomeStatement: {
          income: [
            { id: '1', name: 'Salary', amount: '8000', category: 'salary', isRecurring: true },
          ],
          expenses: [
            { id: '1', name: 'Rent', amount: '3000', category: 'housing', isRecurring: true },
          ],
          period: 'monthly' as const,
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
        },
      },
    });

    render(<FinancialHealthDashboard />);

    // Just verify it renders the key sections
    expect(screen.getByText('Overall Financial Health')).toBeInTheDocument();
    expect(screen.getByText('Net Worth')).toBeInTheDocument();
    expect(screen.getByText('$200,000')).toBeInTheDocument();
  });

  it('handles division by zero gracefully', () => {
    (useCalculatorStore as any).mockReturnValue({
      data: {
        incomeStatement: {
          income: [],
          expenses: [],
          period: 'monthly' as const,
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
        },
      },
    });

    render(<FinancialHealthDashboard />);

    expect(screen.getByText('Net Worth')).toBeInTheDocument();
    expect(screen.getAllByText('$0')).toHaveLength(2); // Net Worth and Monthly Savings
  });
});
