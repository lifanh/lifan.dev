import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { InlineCheck } from './InlineCheck';

afterEach(() => {
  cleanup();
});

const props = {
  question: 'Which branch reports to external parties?',
  options: ['Managerial accounting', 'Financial accounting', 'Tax accounting'],
  correctAnswer: 1,
  explanation: 'Financial accounting serves external users.',
};

describe('accounting InlineCheck', () => {
  it('reveals correct feedback and explanation when the right option is chosen', () => {
    render(<InlineCheck {...props} />);

    fireEvent.click(screen.getByRole('button', { name: /Financial accounting/i }));

    expect(screen.getByText('Correct!')).toBeTruthy();
    expect(screen.getByText(props.explanation)).toBeTruthy();
  });

  it('reveals incorrect feedback when the wrong option is chosen', () => {
    render(<InlineCheck {...props} />);

    fireEvent.click(screen.getByRole('button', { name: /Managerial accounting/i }));

    expect(screen.getByText('Not quite')).toBeTruthy();
    expect(screen.getByText(props.explanation)).toBeTruthy();
  });

  it('allows retrying after an answer is revealed', () => {
    render(<InlineCheck {...props} />);

    fireEvent.click(screen.getByRole('button', { name: /Managerial accounting/i }));
    fireEvent.click(screen.getByRole('button', { name: /Try again/i }));

    expect(screen.queryByText('Not quite')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /Financial accounting/i }));
    expect(screen.getByText('Correct!')).toBeTruthy();
  });
});
