import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { InlineCheck } from './InlineCheck';

afterEach(() => {
  cleanup();
});

const props = {
  question: 'Which philosopher said change is an illusion?',
  options: ['Heraclitus', 'Parmenides', 'Thales'],
  correctAnswer: 1,
  explanation: 'Parmenides argued reality is unchanging.',
};

describe('InlineCheck', () => {
  it('reveals correct feedback and explanation when the right option is chosen', () => {
    render(<InlineCheck {...props} />);

    fireEvent.click(screen.getByRole('button', { name: /Parmenides/i }));

    expect(screen.getByText('Correct!')).toBeTruthy();
    expect(screen.getByText(props.explanation)).toBeTruthy();
  });

  it('reveals incorrect feedback when the wrong option is chosen', () => {
    render(<InlineCheck {...props} />);

    fireEvent.click(screen.getByRole('button', { name: /Heraclitus/i }));

    expect(screen.getByText('Not quite')).toBeTruthy();
    expect(screen.getByText(props.explanation)).toBeTruthy();
  });

  it('allows retrying after an answer is revealed', () => {
    render(<InlineCheck {...props} />);

    fireEvent.click(screen.getByRole('button', { name: /Heraclitus/i }));
    fireEvent.click(screen.getByRole('button', { name: /Try again/i }));

    expect(screen.queryByText('Not quite')).toBeNull();
    // Options become interactive again after reset.
    fireEvent.click(screen.getByRole('button', { name: /Parmenides/i }));
    expect(screen.getByText('Correct!')).toBeTruthy();
  });
});
