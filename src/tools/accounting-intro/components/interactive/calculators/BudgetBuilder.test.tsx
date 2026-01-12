import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useCalculatorStore } from '../../../store';
import { BudgetBuilder } from './BudgetBuilder';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  localStorage.clear();
  useCalculatorStore.getState().resetAll();
});

describe('BudgetBuilder', () => {
  it('saves budget data to calculator store', () => {
    render(<BudgetBuilder />);

    fireEvent.change(screen.getByLabelText(/Monthly income/i), { target: { value: '2000' } });
    fireEvent.change(screen.getByLabelText(/Planned amount 1/i), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText(/Actual amount 1/i), { target: { value: '600' } });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    const budget = useCalculatorStore.getState().data.budget;
    expect(budget).toBeTruthy();
    expect(budget?.income).toBe(2000);
    expect(budget?.items[0]?.planned).toBe(500);
    expect(budget?.items[0]?.actual).toBe(600);
    expect(budget?.methodology).toBe('traditional');
  });
});
