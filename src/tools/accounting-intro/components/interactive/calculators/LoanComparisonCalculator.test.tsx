import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { LoanComparisonCalculator } from './LoanComparisonCalculator';

describe('LoanComparisonCalculator', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with default loans', () => {
    render(<LoanComparisonCalculator />);

    expect(screen.getByText('Loan Comparison Calculator')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Loan A')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Loan B')).toBeInTheDocument();
  });

  it('calculates monthly payment correctly', () => {
    render(<LoanComparisonCalculator />);

    // Default values should produce results
    // $250,000 at 6.5% for 30 years should be approximately $1,580/month
    const monthlyPaymentCells = screen.getAllByText(/\$1,\d{3}/);
    expect(monthlyPaymentCells.length).toBeGreaterThan(0);
  });

  it('allows adding a new loan', () => {
    render(<LoanComparisonCalculator />);

    const addButton = screen.getByText(/Add Another Loan/);
    fireEvent.click(addButton);

    expect(screen.getByDisplayValue('Loan C')).toBeInTheDocument();
  });

  it('allows removing a loan', () => {
    render(<LoanComparisonCalculator />);

    const removeButtons = screen.getAllByRole('button', { name: /Remove/ });
    expect(removeButtons.length).toBe(2);

    fireEvent.click(removeButtons[0]);

    expect(screen.queryByDisplayValue('Loan A')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Loan B')).toBeInTheDocument();
  });

  it('prevents removing the last loan', () => {
    render(<LoanComparisonCalculator />);

    // Remove first loan
    const removeButtons = screen.getAllByRole('button', { name: /Remove/ });
    fireEvent.click(removeButtons[0]);

    // Should only have one loan now, no remove button visible
    expect(screen.queryAllByRole('button', { name: /Remove/ })).toHaveLength(0);
  });

  it('limits to 4 loans maximum', () => {
    render(<LoanComparisonCalculator />);

    const addButton = screen.getByText(/Add Another Loan/);

    // Add 2 more loans (4 total)
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    // Add button should be hidden
    expect(screen.queryByText(/Add Another Loan/)).not.toBeInTheDocument();
  });

  it('updates loan values correctly', () => {
    render(<LoanComparisonCalculator />);

    const principalInputs = screen.getAllByPlaceholderText('0');
    fireEvent.change(principalInputs[0], { target: { value: '300000' } });

    expect(screen.getByDisplayValue('300000')).toBeInTheDocument();
  });

  it('displays comparison results table', () => {
    render(<LoanComparisonCalculator />);

    expect(screen.getByText('Comparison Results')).toBeInTheDocument();
    expect(screen.getByText('Monthly Payment')).toBeInTheDocument();
    expect(screen.getByText('Total Interest')).toBeInTheDocument();
    expect(screen.getByText('Total Payment')).toBeInTheDocument();
    expect(screen.getByText('Payoff Time')).toBeInTheDocument();
  });

  it('shows best loan indicator', () => {
    render(<LoanComparisonCalculator />);

    // With default values, one loan should be marked as best
    expect(screen.getByText('Best')).toBeInTheDocument();
  });

  it('resets to default values', () => {
    render(<LoanComparisonCalculator />);

    // Change a value
    const principalInputs = screen.getAllByPlaceholderText('0');
    fireEvent.change(principalInputs[0], { target: { value: '500000' } });
    expect(screen.getByDisplayValue('500000')).toBeInTheDocument();

    // Reset
    const resetButton = screen.getByText('Reset Calculator');
    fireEvent.click(resetButton);

    // Should be back to default
    expect(screen.getAllByDisplayValue('250000')).toHaveLength(2);
  });

  it('displays educational tips', () => {
    render(<LoanComparisonCalculator />);

    expect(screen.getByText(/Tips for Comparing Loans/)).toBeInTheDocument();
    expect(screen.getByText(/APR vs. Interest Rate/)).toBeInTheDocument();
  });
});
