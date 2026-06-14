import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ChangeVsPermanenceDemo } from './ChangeVsPermanenceDemo';

afterEach(() => {
  cleanup();
});

describe('ChangeVsPermanenceDemo', () => {
  it('starts on the Heraclitus perspective at step 1', () => {
    render(<ChangeVsPermanenceDemo />);
    expect(screen.getByText('Step 1')).toBeTruthy();
    expect(screen.getByText(/cannot step into the same river twice/i)).toBeTruthy();
  });

  it('increments the step count when stepping into the river', () => {
    render(<ChangeVsPermanenceDemo />);
    fireEvent.click(screen.getByRole('button', { name: /Step into the river/i }));
    expect(screen.getByText('Step 2')).toBeTruthy();
  });

  it('switches to the Parmenides interpretation when toggled', () => {
    render(<ChangeVsPermanenceDemo />);
    fireEvent.click(screen.getByRole('button', { name: 'Parmenides' }));
    expect(screen.getByText(/what is, is/i)).toBeTruthy();
    expect(screen.getByText(/the form/i)).toBeTruthy();
  });

  it('resets the step count back to 1', () => {
    render(<ChangeVsPermanenceDemo />);
    fireEvent.click(screen.getByRole('button', { name: /Step into the river/i }));
    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));
    expect(screen.getByText('Step 1')).toBeTruthy();
  });
});
