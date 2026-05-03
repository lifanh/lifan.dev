import { decideNextStep, type ModelDecision, type ModelState } from './fakeModel';

/**
 * modelClient.ts
 *
 * The runner does not call a model directly. It calls a `ModelClient`,
 * which has exactly one method: "given the current state, decide the
 * next step." Two implementations are provided:
 *
 *  - `fakeModelClient`: synchronous deterministic stand-in (Phase 1's
 *    extracted `decideNextStep`).
 *  - `createRealModelClient(...)`: posts the state to a server endpoint
 *    that owns the provider credentials. The browser never sees a key.
 *
 * Swapping providers is a one-file change inside the server endpoint.
 * The browser, the runner, the trace, the policy, the schemas, and the
 * eval harness all keep working without modification.
 */

export interface ModelClient {
  readonly id: 'fake' | 'real';
  decideNextStep(state: ModelState): Promise<ModelDecision>;
}

export const fakeModelClient: ModelClient = {
  id: 'fake',
  async decideNextStep(state) {
    return decideNextStep(state);
  },
};

export class RealModelUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RealModelUnavailableError';
  }
}

export type RealModelClientConfig = {
  /** URL of the server-side decide endpoint. Defaults to `/api/agent-lab/decide`. */
  endpoint?: string;
  /** Optional fetch implementation; useful for tests. */
  fetchImpl?: typeof fetch;
  /** Optional abort signal. */
  signal?: AbortSignal;
};

export function createRealModelClient(config: RealModelClientConfig = {}): ModelClient {
  const endpoint = config.endpoint ?? '/api/agent-lab/decide';
  const fetchImpl = config.fetchImpl ?? globalThis.fetch?.bind(globalThis);

  if (!fetchImpl) {
    throw new RealModelUnavailableError('fetch is not available in this environment');
  }

  return {
    id: 'real',
    async decideNextStep(state) {
      let response: Response;
      try {
        response = await fetchImpl(endpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ state }),
          signal: config.signal,
        });
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'Network error';
        throw new RealModelUnavailableError(`Real model fetch failed: ${reason}`);
      }

      if (response.status === 503) {
        throw new RealModelUnavailableError(
          'Real model endpoint reported 503 (no provider configured).',
        );
      }

      if (!response.ok) {
        throw new RealModelUnavailableError(
          `Real model endpoint returned ${response.status} ${response.statusText}`,
        );
      }

      const json = (await response.json().catch(() => null)) as
        | { decision?: ModelDecision }
        | null;

      if (!json || !json.decision || !isModelDecision(json.decision)) {
        throw new RealModelUnavailableError('Real model endpoint returned an unexpected shape.');
      }

      return json.decision;
    },
  };
}

export type RealModelStatus = {
  realModelAvailable: boolean;
  note: string;
};

export async function fetchRealModelStatus(
  endpoint = '/api/agent-lab/status',
  fetchImpl: typeof fetch = globalThis.fetch?.bind(globalThis),
): Promise<RealModelStatus> {
  if (!fetchImpl) {
    return { realModelAvailable: false, note: 'fetch is not available in this environment.' };
  }

  try {
    const response = await fetchImpl(endpoint);
    if (!response.ok) {
      return {
        realModelAvailable: false,
        note: `Status endpoint returned ${response.status}.`,
      };
    }

    const json = (await response.json()) as RealModelStatus;
    return json;
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown error';
    return { realModelAvailable: false, note: `Status request failed: ${reason}` };
  }
}

function isModelDecision(value: unknown): value is ModelDecision {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const decision = value as { type?: unknown };
  return (
    decision.type === 'tool_call' ||
    decision.type === 'final_answer' ||
    decision.type === 'invalid_recommendation'
  );
}
