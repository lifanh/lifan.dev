import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import EconomicSim from './EconomicSim';

describe('EconomicSim', () => {
  afterEach(() => {
    cleanup();
  });

  it('provides formatted value announcements for range inputs', () => {
    render(<EconomicSim />);

    // Check Price Input
    const priceInput = screen.getByLabelText(/Unit Price/i);
    // Initially price is 10
    expect(priceInput.getAttribute('aria-valuetext')).toBe('$10');

    // Check Supply Input
    const supplyInput = screen.getByLabelText(/Supply Available/i);
    // Initially supply is 100
    expect(supplyInput.getAttribute('aria-valuetext')).toBe('100 units');
  });
});
