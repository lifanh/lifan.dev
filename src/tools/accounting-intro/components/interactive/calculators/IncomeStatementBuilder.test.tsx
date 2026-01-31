import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useCalculatorStore } from '../../../store';
import { IncomeStatementBuilder } from './IncomeStatementBuilder';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  localStorage.clear();
  useCalculatorStore.getState().resetAll();
});

describe('IncomeStatementBuilder', () => {
  it('saves income statement data to calculator store', () => {
    render(<IncomeStatementBuilder />);

    fireEvent.change(screen.getByLabelText(/Income amount 1/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/Expense amount 1/i), { target: { value: '200' } });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    expect(screen.getAllByText('$800').length).toBeGreaterThan(0);

    const statement = useCalculatorStore.getState().data.incomeStatement;
    expect(statement).toBeTruthy();
    expect(statement?.income[0]?.amount).toBe(1000);
    expect(statement?.expenses[0]?.amount).toBe(200);
  });
});
