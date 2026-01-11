import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useCalculatorStore } from '../../../store';
import { BalanceSheetBuilder } from './BalanceSheetBuilder';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  localStorage.clear();
  useCalculatorStore.getState().resetAll();
});

describe('BalanceSheetBuilder', () => {
  it('saves balance sheet data to calculator store', () => {
    render(<BalanceSheetBuilder />);

    fireEvent.change(screen.getByLabelText(/Asset amount 1/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/Liability amount 1/i), { target: { value: '200' } });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    expect(screen.getAllByText('$800').length).toBeGreaterThan(0);

    const balanceSheet = useCalculatorStore.getState().data.balanceSheet;
    expect(balanceSheet).toBeTruthy();
    expect(balanceSheet?.assets[0]?.value).toBe(1000);
    expect(balanceSheet?.liabilities[0]?.value).toBe(200);
  });
});
