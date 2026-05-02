import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AgentLabApp from './AgentLabApp';

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
});
