import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { NetWorthCalculator } from './NetWorthCalculator';

afterEach(() => {
  cleanup();
});

describe('NetWorthCalculator', () => {
  it('calculates net worth from assets and liabilities', () => {
    render(<NetWorthCalculator />);

    const valueInputs = screen.getAllByPlaceholderText('$0');
    fireEvent.change(valueInputs[0], { target: { value: '1000' } });
    fireEvent.change(valueInputs[1], { target: { value: '200' } });

    expect(screen.getAllByText('$800').length).toBeGreaterThan(0);
  });

  it('resets inputs when the reset button is clicked', () => {
    render(<NetWorthCalculator />);

    const valueInputs = screen.getAllByPlaceholderText('$0');
    fireEvent.change(valueInputs[0], { target: { value: '1000' } });
    fireEvent.change(valueInputs[1], { target: { value: '200' } });

    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));

    const resetInputs = screen.getAllByPlaceholderText('$0');
    expect((resetInputs[0] as HTMLInputElement).value).toBe('');
    expect((resetInputs[1] as HTMLInputElement).value).toBe('');
    expect(screen.queryByText('$800')).toBeNull();
  });
});
