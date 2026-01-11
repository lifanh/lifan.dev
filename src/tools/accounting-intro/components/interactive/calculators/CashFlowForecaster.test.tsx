import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useCalculatorStore } from '../../../store';
import { CashFlowForecaster } from './CashFlowForecaster';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  localStorage.clear();
  useCalculatorStore.getState().resetAll();
});

describe('CashFlowForecaster', () => {
  it('saves cash flow forecast data to calculator store', () => {
    render(<CashFlowForecaster />);

    fireEvent.change(screen.getByLabelText(/Starting balance/i), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText(/Cash flow amount 1/i), { target: { value: '500' } });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    const forecast = useCalculatorStore.getState().data.cashFlowForecast;
    expect(forecast).toBeTruthy();
    expect(forecast?.startingBalance).toBe(1000);
    expect(forecast?.items[0]?.amount).toBe(500);
    expect(forecast?.items[0]?.type).toBe('inflow');
  });
});
