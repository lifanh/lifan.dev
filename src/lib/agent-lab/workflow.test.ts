import { describe, expect, it } from 'vitest';
import { runWorkflow } from './workflow';

describe('runWorkflow', () => {
  it('runs all six steps for an ACME order and pauses for approval', async () => {
    const result = await runWorkflow({
      customerNameOrId: 'ACME',
      orderAmount: 20000,
      userRequest: 'Can ACME place a new order for $20,000?',
    });

    const ids = result.steps.map((step) => step.id);
    expect(ids).toEqual([
      'classifyRequest',
      'retrievePolicy',
      'checkCustomerAccount',
      'generateRecommendation',
      'requestApproval',
      'executeFinalAction',
    ]);
    expect(result.finalAction.kind).toBe('awaiting_approval');
    expect(result.steps.at(-1)?.status).toBe('awaiting_approval');
  });

  it('creates a ticket when ACME approval is granted', async () => {
    const result = await runWorkflow({
      customerNameOrId: 'ACME',
      orderAmount: 20000,
      userRequest: 'Can ACME place a new order for $20,000?',
      approvalDecision: 'approved',
    });
    expect(result.finalAction.kind).toBe('create_ticket');
    if (result.finalAction.kind === 'create_ticket') {
      expect(result.finalAction.ticket?.status).toBe('open');
    }
  });

  it('records a rejected approval as reject_pending_approval', async () => {
    const result = await runWorkflow({
      customerNameOrId: 'ACME',
      orderAmount: 20000,
      userRequest: 'Can ACME place a new order for $20,000?',
      approvalDecision: 'rejected',
    });
    expect(result.finalAction.kind).toBe('reject_pending_approval');
  });

  it('releases the order on the Globex clean path without approval', async () => {
    const result = await runWorkflow({
      customerNameOrId: 'Globex',
      orderAmount: 10000,
      userRequest: 'Can Globex place a new order for $10,000?',
    });
    expect(result.finalAction.kind).toBe('release_order');
    const approvalStep = result.steps.find((step) => step.id === 'requestApproval');
    expect(approvalStep?.data).toMatchObject({ approvalRequired: false });
  });

  it('blocks Initech without ever asking for approval', async () => {
    const result = await runWorkflow({
      customerNameOrId: 'Initech',
      orderAmount: 5000,
      userRequest: 'Can Initech place a new order for $5,000?',
    });
    expect(result.finalAction.kind).toBe('block');
    const approvalStep = result.steps.find((step) => step.id === 'requestApproval');
    expect(approvalStep?.data).toMatchObject({ approvalRequired: false });
  });

  it('stops at classification for an off-topic request', async () => {
    const result = await runWorkflow({
      customerNameOrId: 'ACME',
      orderAmount: 20000,
      userRequest: 'What is the weather in Berlin today?',
    });
    expect(result.steps).toHaveLength(1);
    expect(result.steps[0]?.id).toBe('classifyRequest');
    expect(result.finalAction.kind).toBe('block');
  });

  it('stops at customer lookup for an unknown customer', async () => {
    const result = await runWorkflow({
      customerNameOrId: 'Hooli',
      orderAmount: 20000,
      userRequest: 'Can Hooli place a new order for $20,000?',
    });
    const ids = result.steps.map((step) => step.id);
    expect(ids).toEqual(['classifyRequest', 'retrievePolicy', 'checkCustomerAccount']);
    expect(result.finalAction.kind).toBe('block');
  });
});
