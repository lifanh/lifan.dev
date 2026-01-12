import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ProfitMarginAnalyzer } from './ProfitMarginAnalyzer';

afterEach(() => {
  cleanup();
});

describe('ProfitMarginAnalyzer', () => {
  it('updates net income when percentages change', () => {
    render(<ProfitMarginAnalyzer />);

    fireEvent.change(screen.getByLabelText(/^Revenue$/i), { target: { value: '1000' } });

    fireEvent.change(screen.getByLabelText(/COGS %/i), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText(/Labor %/i), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText(/Rent %/i), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText(/Utilities %/i), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText(/Other %/i), { target: { value: '0' } });

    expect(screen.getAllByText('$1,000').length).toBeGreaterThan(0);

    fireEvent.change(screen.getByLabelText(/COGS %/i), { target: { value: '50' } });

    expect(screen.getAllByText('$500').length).toBeGreaterThan(0);
  });
});
