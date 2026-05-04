import { describe, expect, it } from 'vitest';
import { runAgentLabScenario } from './agentRunner';

describe('agent lab scenario runner', () => {
  it('pauses ACME twenty thousand dollar order at a human approval gate', async () => {
    const result = await runAgentLabScenario({
      scenarioId: 'acme-credit-review',
      latencyMs: 0,
    });

    expect(result.status).toBe('waiting_for_approval');
    expect(result.recommendation.decision).toBe('review_required');
    expect(result.events.map((event) => event.type)).toContain('approval_required');
    expect(result.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'permission_check',
          title: 'Policy requires human approval',
        }),
      ]),
    );
  });

  it('creates a credit review ticket for ACME after approval', async () => {
    const result = await runAgentLabScenario({
      scenarioId: 'acme-credit-review',
      approvalDecision: 'approved',
      latencyMs: 0,
    });

    expect(result.status).toBe('completed');
    expect(result.ticket?.customerId).toBe('cust_acme');
    expect(result.finalAnswer).toContain('ACME should not be auto-approved');
    expect(result.finalAnswer).toContain('credit review ticket was created');
    expect(result.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'tool_call',
          title: 'createCreditReviewTicket',
        }),
        expect.objectContaining({
          type: 'final_answer',
        }),
      ]),
    );
  });

  it('does not create a credit review ticket when ACME approval is rejected', async () => {
    const result = await runAgentLabScenario({
      scenarioId: 'acme-credit-review',
      approvalDecision: 'rejected',
      latencyMs: 0,
    });

    expect(result.status).toBe('completed');
    expect(result.ticket).toBeUndefined();
    expect(result.finalAnswer).toContain('No credit review ticket was created');
    expect(result.events.map((event) => event.title)).not.toContain('Credit review ticket created');
    expect(result.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'approval_required' }),
        expect.objectContaining({ type: 'final_answer' }),
      ]),
    );
  });

  it('auto-approves Globex small orders without approval gate', async () => {
    const result = await runAgentLabScenario({
      scenarioId: 'globex-standard-order',
      latencyMs: 0,
    });

    expect(result.status).toBe('completed');
    expect(result.recommendation.decision).toBe('approve');
    expect(result.events.map((event) => event.type)).not.toContain('approval_required');
    expect(result.finalAnswer).toContain('Globex can be auto-approved');
  });

  it('blocks Initech orders when account status is blocked', async () => {
    const result = await runAgentLabScenario({
      scenarioId: 'initech-blocked-order',
      latencyMs: 0,
    });

    expect(result.status).toBe('completed');
    expect(result.recommendation.decision).toBe('block');
    expect(result.finalAnswer).toContain('Initech should be blocked');
  });

  it('aborts cleanly when the customer cannot be resolved', async () => {
    await expect(
      runAgentLabScenario({
        scenarioId: 'does-not-exist',
        latencyMs: 0,
      }),
    ).rejects.toThrow(/Unknown Agent Lab scenario/);
  });

  it('emits a real loop with multiple iterations and at least four tool calls', async () => {
    const result = await runAgentLabScenario({
      scenarioId: 'globex-standard-order',
      latencyMs: 0,
    });

    expect(result.iterations).toBeGreaterThanOrEqual(5);
    expect(result.metrics.toolCalls).toBeGreaterThanOrEqual(4);
    expect(result.metrics.simulated).toBe(true);
    // Each tool call iteration should be preceded by a model_response.
    const modelResponseCount = result.events.filter((event) => event.type === 'model_response').length;
    expect(modelResponseCount).toBeGreaterThanOrEqual(result.metrics.toolCalls);
  });

  it('repairs an invalid recommendation through schema validation and retry', async () => {
    const result = await runAgentLabScenario({
      scenarioId: 'globex-standard-order',
      latencyMs: 0,
      simulateInvalidRecommendation: true,
    });

    expect(result.status).toBe('completed');
    expect(result.events.map((event) => event.type)).toEqual(
      expect.arrayContaining(['validation_error', 'model_retry', 'final_answer']),
    );
    expect(result.recommendation.decision).toBe('approve');
  });
});
