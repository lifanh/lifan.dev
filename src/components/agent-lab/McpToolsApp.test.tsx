import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import McpToolsApp from './McpToolsApp';

describe('McpToolsApp', () => {
  it('lists every tool in the registry sidebar', () => {
    render(<McpToolsApp />);
    const sidebar = screen.getByLabelText(/Available tools/);
    expect(within(sidebar).getByText('getCustomer')).toBeInTheDocument();
    expect(within(sidebar).getByText('getCreditStatus')).toBeInTheDocument();
    expect(within(sidebar).getByText('getOpenInvoices')).toBeInTheDocument();
    expect(within(sidebar).getByText('checkOrderEligibility')).toBeInTheDocument();
    expect(within(sidebar).getByText('createCreditReviewTicket')).toBeInTheDocument();
  });

  it('shows the requires-approval badge on the write tool when selected', () => {
    render(<McpToolsApp />);
    fireEvent.click(screen.getByRole('button', { name: /createCreditReviewTicket/ }));
    const detail = screen.getByLabelText(/Tool descriptor for createCreditReviewTicket/);
    // "requires approval" appears as both the badge label and inside the
    // explanation copy.
    expect(within(detail).getAllByText(/requires approval/i).length).toBeGreaterThan(0);
    expect(within(detail).getAllByText(/persistent/i).length).toBeGreaterThan(0);
  });

  it('renders the input schema as JSON when a tool is selected', () => {
    render(<McpToolsApp />);
    fireEvent.click(screen.getByRole('button', { name: /checkOrderEligibility/ }));
    const schemaBlock = screen.getByLabelText(/Input schema JSON for checkOrderEligibility/);
    expect(schemaBlock.textContent).toMatch(/"orderAmount"/);
    expect(schemaBlock.textContent).toMatch(/"customerId"/);
  });

  it('renders the simulated MCP handshake with all five steps', () => {
    render(<McpToolsApp />);
    const handshake = screen.getByLabelText(/Simulated MCP handshake/);
    expect(within(handshake).getByText(/1\. initialize$/)).toBeInTheDocument();
    expect(within(handshake).getByText(/2\. initialize\/result/)).toBeInTheDocument();
    expect(within(handshake).getByText(/3\. tools\/list$/)).toBeInTheDocument();
    expect(within(handshake).getByText(/4\. tools\/list\/result/)).toBeInTheDocument();
    expect(within(handshake).getByText(/5\. tools\/call/)).toBeInTheDocument();
  });

  it('updates the handshake call payload when a different tool is selected', () => {
    render(<McpToolsApp />);
    fireEvent.click(screen.getByRole('button', { name: /createCreditReviewTicket/ }));
    const handshake = screen.getByLabelText(/Simulated MCP handshake/);
    expect(handshake.textContent).toMatch(/"name": "createCreditReviewTicket"/);
  });
});
