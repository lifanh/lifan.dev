import { describe, expect, it } from 'vitest';
import {
  createRealModelClient,
  fakeModelClient,
  fetchRealModelStatus,
  RealModelUnavailableError,
} from './modelClient';
import type { ModelState } from './fakeModel';

const baseState: ModelState = {
  scenarioId: 'globex-standard-order',
  customerNameOrId: 'Globex',
  orderAmount: 10_000,
  observations: {},
};

describe('agent lab model clients', () => {
  it('fakeModelClient returns the same decision as the synchronous helper', async () => {
    const decision = await fakeModelClient.decideNextStep(baseState);
    expect(decision.type).toBe('tool_call');
    if (decision.type === 'tool_call') {
      expect(decision.toolName).toBe('getCustomer');
    }
  });

  it('createRealModelClient throws RealModelUnavailableError on 503', async () => {
    const fetchImpl = (() => {
      return async () =>
        new Response(JSON.stringify({ error: 'No provider' }), {
          status: 503,
          headers: { 'content-type': 'application/json' },
        });
    })() as unknown as typeof fetch;

    const client = createRealModelClient({ endpoint: '/test', fetchImpl });

    await expect(client.decideNextStep(baseState)).rejects.toBeInstanceOf(
      RealModelUnavailableError,
    );
  });

  it('createRealModelClient throws on a malformed response body', async () => {
    const fetchImpl = (async () =>
      new Response(JSON.stringify({ wrong: 'shape' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })) as unknown as typeof fetch;

    const client = createRealModelClient({ endpoint: '/test', fetchImpl });

    await expect(client.decideNextStep(baseState)).rejects.toBeInstanceOf(
      RealModelUnavailableError,
    );
  });

  it('createRealModelClient returns the decision when the response is valid', async () => {
    const fetchImpl = (async () =>
      new Response(
        JSON.stringify({
          decision: {
            type: 'tool_call',
            toolName: 'getCustomer',
            args: { customerNameOrId: 'Globex' },
            rationale: 'mocked',
          },
        }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      )) as unknown as typeof fetch;

    const client = createRealModelClient({ endpoint: '/test', fetchImpl });

    const decision = await client.decideNextStep(baseState);
    expect(decision.type).toBe('tool_call');
  });

  it('fetchRealModelStatus reports unavailable when the endpoint returns non-200', async () => {
    const fetchImpl = (async () =>
      new Response('nope', { status: 500 })) as unknown as typeof fetch;

    const status = await fetchRealModelStatus('/test', fetchImpl);
    expect(status.realModelAvailable).toBe(false);
  });

  it('fetchRealModelStatus reports available when the endpoint says so', async () => {
    const fetchImpl = (async () =>
      new Response(
        JSON.stringify({ realModelAvailable: true, note: 'wired' }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      )) as unknown as typeof fetch;

    const status = await fetchRealModelStatus('/test', fetchImpl);
    expect(status.realModelAvailable).toBe(true);
    expect(status.note).toBe('wired');
  });
});

describe('agent runner with fallback to fake when real is unavailable', () => {
  it('emits an error event and finishes via the fake client when the real client throws', async () => {
    const { runAgentLabScenario } = await import('./agentRunner');

    const failingClient = {
      id: 'real' as const,
      async decideNextStep(): Promise<never> {
        throw new RealModelUnavailableError('simulated outage');
      },
    };

    const result = await runAgentLabScenario({
      scenarioId: 'globex-standard-order',
      latencyMs: 0,
      modelClient: failingClient,
    });

    expect(result.status).toBe('completed');
    expect(result.recommendation.decision).toBe('approve');
    expect(result.events.some((event) => event.type === 'error')).toBe(true);
    expect(result.metrics.modelClientId).toBe('fake');
  });
});
