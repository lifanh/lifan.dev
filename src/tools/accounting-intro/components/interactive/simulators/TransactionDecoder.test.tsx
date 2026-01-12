import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { TransactionDecoder } from './TransactionDecoder';

afterEach(() => {
  cleanup();
});

describe('TransactionDecoder', () => {
  it('accepts a correct decoded transaction and updates score', () => {
    render(<TransactionDecoder />);

    expect(screen.getByText(/purchase \$500 of office supplies/i)).toBeTruthy();

    fireEvent.change(screen.getByLabelText(/Debit account/i), { target: { value: 'supplies' } });
    fireEvent.change(screen.getByLabelText(/Credit account/i), { target: { value: 'ap' } });
    fireEvent.change(screen.getByLabelText(/^Amount$/i), { target: { value: '500' } });

    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));

    expect(screen.getByText('Correct!')).toBeTruthy();
    expect(screen.getByText(/Score:\s*1\/1/i)).toBeTruthy();
  });
});
