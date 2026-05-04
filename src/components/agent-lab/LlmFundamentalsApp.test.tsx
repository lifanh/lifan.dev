import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LlmFundamentalsApp from './LlmFundamentalsApp';

describe('LlmFundamentalsApp', () => {
  it('renders both prompt configurations and a wire payload preview each', () => {
    render(<LlmFundamentalsApp />);
    expect(screen.getByLabelText(/Prompt configuration A/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prompt configuration B/i)).toBeInTheDocument();
    // Each panel renders its messages, temperature, and maxTokens in the JSON preview.
    const previews = screen.getAllByText(/"messages":/);
    expect(previews.length).toBe(2);
  });

  it('does not show response columns until Send both requests is clicked', () => {
    render(<LlmFundamentalsApp />);
    expect(screen.queryByLabelText(/^Response A$/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Send both requests/i }));
    expect(screen.getByLabelText(/^Response A$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Response B$/i)).toBeInTheDocument();
  });

  it('reports token usage, latency, and cost for each response', () => {
    render(<LlmFundamentalsApp />);
    fireEvent.click(screen.getByRole('button', { name: /Send both requests/i }));
    const a = screen.getByLabelText(/^Response A$/i);
    expect(within(a).getAllByText(/Total tokens/i).length).toBeGreaterThan(0);
    expect(within(a).getAllByText(/Latency/i).length).toBeGreaterThan(0);
    expect(within(a).getAllByText(/Cost/i).length).toBeGreaterThan(0);
  });

  it('responds to a temperature change in panel A by re-running on click', () => {
    render(<LlmFundamentalsApp />);
    const panelA = screen.getByLabelText(/Prompt configuration A/i);
    const sliders = within(panelA).getAllByRole('slider');
    // first slider in each panel is the temperature control
    fireEvent.change(sliders[0], { target: { value: '1.5' } });
    fireEvent.click(screen.getByRole('button', { name: /Send both requests/i }));
    expect(screen.getByLabelText(/^Response A$/i)).toBeInTheDocument();
  });
});
