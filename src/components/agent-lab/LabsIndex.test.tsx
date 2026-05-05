import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LabsIndex from './LabsIndex';

describe('LabsIndex', () => {
  it('renders all twelve lab cards across the theme groups', () => {
    render(<LabsIndex />);
    // Each lab card renders one h3 inside the modules list.
    const cardHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(cardHeadings).toHaveLength(12);
    // The outer <ol> exists with the labelled aria-label.
    expect(screen.getByLabelText(/Agent Lab modules/i)).toBeInTheDocument();
  });

  it('groups labs by theme', () => {
    render(<LabsIndex />);
    expect(screen.getByRole('heading', { name: /^Foundations$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Retrieval$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Tooling$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Quality$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Safety$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Operations$/i })).toBeInTheDocument();
  });

  it('links Lab 1 to its dedicated route', () => {
    render(<LabsIndex />);
    const link = screen.getByRole('link', { name: /LLM API fundamentals/i });
    expect(link).toHaveAttribute('href', '/tools/agent-lab/llm-fundamentals');
  });

  it('deep-links canonical-lab cards to the matching lens via ?lens=', () => {
    render(<LabsIndex />);
    const structuredOutputs = screen.getByRole('link', { name: /Structured outputs/i });
    expect(structuredOutputs).toHaveAttribute('href', '/tools/agent-lab?lens=structured');

    const toolCalling = screen.getByRole('link', { name: /Tool calling/i });
    expect(toolCalling).toHaveAttribute('href', '/tools/agent-lab?lens=tools');

    const evals = screen.getByRole('link', { name: /Evaluation harness/i });
    expect(evals).toHaveAttribute('href', '/tools/agent-lab?lens=evals');
  });

  it('opens Lab 12 in a new tab as a docs link', () => {
    render(<LabsIndex />);
    const ops = screen.getByRole('link', { name: /Observability and deployment/i });
    expect(ops).toHaveAttribute('target', '_blank');
    expect(ops.getAttribute('href')).toMatch(/agent-lab-operations\.md/);
  });
});
