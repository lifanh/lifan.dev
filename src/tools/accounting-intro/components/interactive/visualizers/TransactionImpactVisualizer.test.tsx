import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { TransactionImpactVisualizer } from './TransactionImpactVisualizer';

afterEach(() => {
  cleanup();
});

describe('TransactionImpactVisualizer', () => {
  it('updates equation totals when a transaction is added and resets correctly', () => {
    render(<TransactionImpactVisualizer />);

    expect(screen.getByText('Transaction Impact Visualizer')).toBeTruthy();
    expect(screen.getAllByText('$10,000').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: /Receive \$1,000 paycheck/i }));

    expect(screen.getAllByText('$11,000').length).toBeGreaterThan(0);
    expect(screen.getAllByText('$8,000').length).toBeGreaterThan(0);
    expect(screen.getByText('Transaction Log')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));

    expect(screen.queryByText('$11,000')).toBeNull();
  });
});
