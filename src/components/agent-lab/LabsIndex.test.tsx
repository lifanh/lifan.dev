import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LabsIndex from './LabsIndex';

describe('LabsIndex', () => {
  it('renders all twelve labs', () => {
    render(<LabsIndex />);
    const list = screen.getByLabelText(/Agent Lab modules/i);
    expect(list.querySelectorAll('li')).toHaveLength(12);
  });

  it('links Lab 1 to its dedicated route', () => {
    render(<LabsIndex />);
    const link = screen
      .getByRole('link', { name: /LLM API fundamentals/i });
    expect(link).toHaveAttribute('href', '/tools/agent-lab/llm-fundamentals');
  });

  it('links the canonical-lab labs back to /tools/agent-lab', () => {
    render(<LabsIndex />);
    const structuredOutputs = screen.getByRole('link', { name: /Structured outputs/i });
    expect(structuredOutputs).toHaveAttribute('href', '/tools/agent-lab');
  });

  it('opens Lab 12 in a new tab as a docs link', () => {
    render(<LabsIndex />);
    const ops = screen.getByRole('link', { name: /Observability and deployment/i });
    expect(ops).toHaveAttribute('target', '_blank');
    expect(ops.getAttribute('href')).toMatch(/agent-lab-operations\.md/);
  });
});
