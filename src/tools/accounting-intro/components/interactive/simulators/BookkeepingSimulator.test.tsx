import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { BookkeepingSimulator } from './BookkeepingSimulator';

afterEach(() => {
  cleanup();
});

describe('BookkeepingSimulator', () => {
  it('accepts a correct journal entry and updates score', () => {
    render(<BookkeepingSimulator />);

    expect(screen.getByText(/Received \$3,000 cash from a customer/i)).toBeTruthy();

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'cash' } });
    fireEvent.change(selects[1], { target: { value: 'revenue' } });

    const amountInputs = screen.getAllByPlaceholderText('0');
    fireEvent.change(amountInputs[0], { target: { value: '3000' } });
    fireEvent.change(amountInputs[1], { target: { value: '3000' } });

    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));

    expect(screen.getByText('Correct!')).toBeTruthy();
    expect(screen.getByText(/Score:\s*1\/1/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Next Transaction/i })).toBeTruthy();
  });
});
