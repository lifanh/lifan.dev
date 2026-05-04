import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WorkflowApp from './WorkflowApp';

describe('WorkflowApp', () => {
  it('renders both pipeline columns by default with empty states', () => {
    render(<WorkflowApp />);
    expect(screen.getByLabelText(/Workflow pipeline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Free-form agent loop/i)).toBeInTheDocument();
    // Each empty-state copy includes the phrase "to see the workflow trace" or
    // "to see the agent trace" — using a partial substring avoids brittleness
    // around the inline <em> in the message.
    expect(screen.getByText(/to see the workflow trace/i)).toBeInTheDocument();
    expect(screen.getByText(/to see the agent trace/i)).toBeInTheDocument();
  });

  it('runs both pipelines on the ACME scenario and pauses at approval', async () => {
    render(<WorkflowApp />);
    fireEvent.click(screen.getByRole('button', { name: /Run both pipelines/i }));

    // Workflow column shows the six step labels.
    const workflowCol = await screen.findByLabelText(/Workflow pipeline/i, undefined, {
      timeout: 8000,
    });
    expect(await within(workflowCol).findByText(/Classify request/i, undefined, { timeout: 8000 })).toBeInTheDocument();
    expect(within(workflowCol).getByText(/Request approval/i)).toBeInTheDocument();

    // Approve / reject buttons appear once the workflow is in awaiting_approval.
    expect(
      await screen.findByRole('button', { name: /Approve and re-run/i }, { timeout: 8000 }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reject and re-run/i })).toBeInTheDocument();
  });

  it('switches to the Globex scenario and the workflow renders the recommendation step', async () => {
    render(<WorkflowApp />);
    fireEvent.click(screen.getByRole('button', { name: /Globex standard order/i }));
    fireEvent.click(screen.getByRole('button', { name: /Run both pipelines/i }));

    const workflowCol = await screen.findByLabelText(/Workflow pipeline/i, undefined, {
      timeout: 8000,
    });
    // Workflow renders Generate recommendation step on the clean path; that's
    // a deterministic milestone that arrives before the agent runner finishes.
    expect(
      await within(workflowCol).findByText(/Generate recommendation/i, undefined, { timeout: 8000 }),
    ).toBeInTheDocument();
    // No approval gate appears on the clean path.
    expect(screen.queryByRole('button', { name: /Approve and re-run/i })).not.toBeInTheDocument();
  });

  it('shows the Initech blocked path on both sides', async () => {
    render(<WorkflowApp />);
    fireEvent.click(screen.getByRole('button', { name: /Initech blocked account/i }));
    fireEvent.click(screen.getByRole('button', { name: /Run both pipelines/i }));

    const workflowCol = await screen.findByLabelText(/Workflow pipeline/i, undefined, {
      timeout: 8000,
    });
    expect(
      await within(workflowCol).findByText(/Execute final action/i, undefined, { timeout: 8000 }),
    ).toBeInTheDocument();
  });
});
