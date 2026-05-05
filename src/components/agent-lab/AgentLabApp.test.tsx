import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import AgentLabApp from './AgentLabApp';

afterEach(() => {
  // Tests below mutate location.search; reset so subsequent tests start clean.
  window.history.replaceState({}, '', '/');
});

describe('AgentLabApp', () => {
  it('runs the ACME scenario and completes the approval workflow', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);

    expect(screen.getByRole('heading', { name: /Agent Engineering Lab/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Run simulation/i }));

    expect(await screen.findByText(/Human approval required/i)).toBeInTheDocument();
    expect(screen.getByText(/ACME should not be auto-approved/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Approve ticket/i }));

    await waitFor(() => {
      expect(screen.getByText(/A credit review ticket was created/i)).toBeInTheDocument();
    });
    expect(screen.queryByText(/Human approval required/i)).not.toBeInTheDocument();
  });

  it('honors a rejected approval without creating a ticket', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);

    fireEvent.click(screen.getByRole('button', { name: /Run simulation/i }));
    expect(await screen.findByText(/Human approval required/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^Reject$/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/No credit review ticket was created/i),
      ).toBeInTheDocument();
    });
  });

  it('can switch to the Globex scenario and auto-approve without an approval gate', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);

    fireEvent.click(screen.getByRole('button', { name: /Globex standard order/i }));
    fireEvent.click(screen.getByRole('button', { name: /Run simulation/i }));

    expect(await screen.findByText(/Globex can be auto-approved/i)).toBeInTheDocument();
    expect(screen.queryByText(/Human approval required/i)).not.toBeInTheDocument();
  });

  it('reveals trace events when the Trace Viewer tab is opened', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);

    fireEvent.click(screen.getByRole('button', { name: /Globex standard order/i }));
    fireEvent.click(screen.getByRole('button', { name: /Run simulation/i }));

    await screen.findByText(/Globex can be auto-approved/i);

    // Trace events are not visible on the Overview tab.
    expect(screen.queryByText(/Eligibility decision returned/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Trace Viewer/i }));

    expect(await screen.findByText(/Eligibility decision returned/i)).toBeInTheDocument();
  });

  it('shows an idle status before the first run and a result-shaped status after', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);

    expect(screen.getByRole('status')).toHaveTextContent(/Idle/i);

    fireEvent.click(screen.getByRole('button', { name: /Globex standard order/i }));
    fireEvent.click(screen.getByRole('button', { name: /Run simulation/i }));

    await screen.findByText(/Globex can be auto-approved/i);

    expect(screen.getByRole('status')).toHaveTextContent(/Auto-approved/i);
  });

  it('renders a model-mode toggle that defaults to simulated and disables real mode by default', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);

    const radioGroup = screen.getByRole('radiogroup', { name: /Model client/i });
    const simulated = screen.getByRole('radio', { name: /^Simulated$/i });
    const real = screen.getByRole('radio', { name: /^Real model$/i });

    expect(radioGroup).toBeInTheDocument();
    expect(simulated).toHaveAttribute('aria-checked', 'true');
    // Default test stub reports realModelAvailable: false.
    await screen.findByText(/test stub/i);
    expect(real).toBeDisabled();
  });

  it('reveals the credit policy document and citations when the RAG tab is opened', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);

    fireEvent.click(screen.getByRole('button', { name: /^RAG$/i }));

    expect(await screen.findByText(/Credit policy document/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Without retrieval/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /With retrieval/i })).toBeInTheDocument();
    // The default ACME query should retrieve at least one section.
    expect(screen.getByText(/Retrieved sections/i)).toBeInTheDocument();
  });

  it('contains long JSON payloads inside a scrollable inspector', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);

    fireEvent.click(screen.getByRole('button', { name: /Globex standard order/i }));
    fireEvent.click(screen.getByRole('button', { name: /Run simulation/i }));

    await screen.findByText(/Globex can be auto-approved/i);

    fireEvent.click(screen.getByRole('button', { name: /Trace Viewer/i }));

    // The inspector renders payloads inside a <pre> with a max-height.
    const inspector = await screen.findByText(/"customerId"/i);
    const pre = inspector.closest('pre');
    expect(pre).not.toBeNull();
    expect(pre?.className).toMatch(/max-h-/);
    expect(pre?.className).toMatch(/overflow-auto/);
  });

  it('honors ?lens= on first paint to deep-link a specific tab', async () => {
    window.history.replaceState({}, '', '/tools/agent-lab?lens=trace');
    render(<AgentLabApp simulationLatencyMs={0} />);
    const trace = await screen.findByRole('button', { name: /Trace Viewer/i });
    await waitFor(() => {
      expect(trace).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('updates the URL ?lens= query when the user changes tabs', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);
    fireEvent.click(screen.getByRole('button', { name: /^RAG$/i }));
    await waitFor(() => {
      expect(new URLSearchParams(window.location.search).get('lens')).toBe('rag');
    });
    fireEvent.click(screen.getByRole('button', { name: /^Overview$/i }));
    await waitFor(() => {
      // Overview is the default and should clear the query param.
      expect(new URLSearchParams(window.location.search).get('lens')).toBeNull();
    });
  });

  it('groups the tab nav into Run, Lenses, and Mini-labs', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);
    // Wait for the realModelStatus useEffect to settle before asserting.
    await screen.findByText(/test stub/i);
    const nav = screen.getByRole('navigation', { name: /Agent Lab sections/i });
    expect(nav.textContent).toMatch(/Run/);
    expect(nav.textContent).toMatch(/Lenses/);
    expect(nav.textContent).toMatch(/Mini-labs/);
  });

  it('renders the shared lab chrome with prev/next pagination', async () => {
    render(<AgentLabApp simulationLatencyMs={0} />);
    await screen.findByText(/test stub/i);
    const chrome = screen.getByRole('navigation', { name: /Agent Lab navigation/i });
    expect(chrome).toBeInTheDocument();
    // The chrome includes a back-link to the labs index.
    const backLink = screen.getByRole('link', { name: /All 12 labs/i });
    expect(backLink).toHaveAttribute('href', '/tools/agent-lab/labs');
  });
});
