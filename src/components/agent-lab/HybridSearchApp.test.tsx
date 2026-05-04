import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HybridSearchApp from './HybridSearchApp';

describe('HybridSearchApp', () => {
  it('renders all four method columns by default', () => {
    render(<HybridSearchApp initialQuery="blocked account hold" />);
    expect(screen.getByText(/Keyword \(BM25\)/)).toBeInTheDocument();
    expect(screen.getByText(/Vector \(pseudo-embedding\)/)).toBeInTheDocument();
    expect(screen.getByText(/Hybrid \(RRF\)/)).toBeInTheDocument();
    expect(screen.getByText(/Hybrid \+ rerank/)).toBeInTheDocument();
  });

  it('hides the rerank column when rerank is toggled off', () => {
    render(<HybridSearchApp initialQuery="blocked account hold" />);
    fireEvent.click(screen.getByRole('button', { name: /rerank/i }));
    expect(screen.queryByText(/Hybrid \+ rerank/)).not.toBeInTheDocument();
  });

  it('updates results when the query input changes', () => {
    render(<HybridSearchApp initialQuery="blocked account hold" />);
    const keywordCol = screen.getByLabelText(/Keyword \(BM25\) ranked results/);
    expect(within(keywordCol).getByText(/P-001/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^Query$/), { target: { value: 'million dollar order threshold' } });
    const updatedCol = screen.getByLabelText(/Keyword \(BM25\) ranked results/);
    expect(within(updatedCol).getByText(/P-005/)).toBeInTheDocument();
  });

  it('renders the source policy document for inspection', () => {
    render(<HybridSearchApp />);
    expect(screen.getByText(/Source policy/)).toBeInTheDocument();
    // Section P-008 is rendered in the source-policy list (and may also appear
    // in result columns when the initial query happens to match it).
    expect(screen.getAllByText(/\[P-008\]/).length).toBeGreaterThan(0);
  });

  it('shows a friendly empty state when no method matches', () => {
    render(<HybridSearchApp initialQuery="zzzzz" />);
    // Pseudo-vector still produces some hash collisions so vector may not be
    // empty, but BM25 must be empty for an unmatchable token.
    const keywordCol = screen.getByLabelText(/Keyword \(BM25\) ranked results/);
    expect(within(keywordCol).getByText(/No matching sections/)).toBeInTheDocument();
  });
});
