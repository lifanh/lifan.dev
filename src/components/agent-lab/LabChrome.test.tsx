import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LabChrome } from './LabChrome';

describe('LabChrome', () => {
  it('renders position, theme tag, and a back-link to the labs index', () => {
    render(<LabChrome current={6} />);
    const nav = screen.getByRole('navigation', { name: /Agent Lab navigation/i });
    expect(within(nav).getByText(/Lab 06 \/ 12/)).toBeInTheDocument();
    expect(within(nav).getByText(/Retrieval/)).toBeInTheDocument();
    const back = within(nav).getByRole('link', { name: /All 12 labs/i });
    expect(back).toHaveAttribute('href', '/tools/agent-lab/labs');
  });

  it('links prev/next to the right neighbor labs in the catalog order', () => {
    render(<LabChrome current={6} />);
    const prev = screen.getByLabelText(/Previous lab: RAG/i);
    expect(prev).toHaveAttribute('href', '/tools/agent-lab?lens=rag');
    const next = screen.getByLabelText(/Next lab: MCP-style tool protocol/i);
    expect(next).toHaveAttribute('href', '/tools/agent-lab/mcp-tools');
  });

  it('disables the prev link on the first lab', () => {
    render(<LabChrome current={1} />);
    const prev = screen.getByLabelText(/No previous lab/i);
    expect(prev.tagName).toBe('SPAN');
    expect(prev).toHaveAttribute('aria-disabled', 'true');
  });

  it('skips external (docs-only) labs in pagination', () => {
    render(<LabChrome current={11} />);
    // Lab 12 is a docs-only external link, so the next button should be disabled.
    const next = screen.getByLabelText(/No next lab/i);
    expect(next).toHaveAttribute('aria-disabled', 'true');
  });
});
