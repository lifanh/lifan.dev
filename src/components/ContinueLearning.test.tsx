import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import ContinueLearning from './ContinueLearning';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  localStorage.clear();
});

function seed(key: string, progress: Record<string, unknown>) {
  localStorage.setItem(key, JSON.stringify({ state: { progress }, version: 0 }));
}

describe('ContinueLearning', () => {
  it('renders nothing when no tool has been started', async () => {
    const { container } = render(<ContinueLearning />);
    // useEffect resolves to no started tools -> component returns null.
    await Promise.resolve();
    expect(container.querySelector('section')).toBeNull();
  });

  it('shows a resume card for the most recently visited started tool', async () => {
    seed('philosophy-intro:progress', {
      completedModules: [1, 2],
      currentModule: 3,
      moduleProgress: {},
      lastVisited: '2026-02-01T00:00:00.000Z',
    });
    seed('accounting-intro:progress', {
      completedModules: [1],
      currentModule: 2,
      moduleProgress: {},
      lastVisited: '2026-01-01T00:00:00.000Z',
    });

    render(<ContinueLearning />);

    expect(await screen.findByText('Introduction to Philosophy')).toBeTruthy();
    expect(screen.getByText(/Module 3 of 12/)).toBeTruthy();
    const resumeLink = screen.getByRole('link', { name: /Resume/i });
    expect(resumeLink.getAttribute('href')).toBe('/tools/philosophy-intro');
    // The other started tool is listed as a secondary entry.
    expect(screen.getByText('Accounting Fundamentals')).toBeTruthy();
  });
});
