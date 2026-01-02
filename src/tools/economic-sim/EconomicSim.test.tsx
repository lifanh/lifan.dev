import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EconomicSim from './EconomicSim';

describe('EconomicSim Component', () => {
  it('renders input ranges with accessible values', () => {
    render(<EconomicSim />);

    // Check Price Input
    const priceInput = screen.getByLabelText(/Unit Price/i);
    expect(priceInput).toBeInTheDocument();

    // Check Supply Input
    const supplyInput = screen.getByLabelText(/Supply Available/i);
    expect(supplyInput).toBeInTheDocument();

    // Verify aria-valuetext is present for meaningful announcement
    expect(priceInput).toHaveAttribute('aria-valuetext', '$10');
    expect(supplyInput).toHaveAttribute('aria-valuetext', '100 units');
  });

  it('announces dynamic feedback in a live region', () => {
    render(<EconomicSim />);

    // Initially balanced, no feedback message (10 * 5 = 50 demand vs 100 supply -> surplus)
    const statusRegion = screen.getByRole('status');
    expect(statusRegion).toBeInTheDocument();
    expect(statusRegion).toHaveTextContent(/Shortage!/i);

    // Change price to high value to cause surplus
    const priceInput = screen.getByLabelText(/Unit Price/i);
    fireEvent.change(priceInput, { target: { value: '30' } });

    expect(statusRegion).toHaveTextContent(/Surplus!/i);
  });
});
