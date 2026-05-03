import '@testing-library/jest-dom';

/**
 * Default fetch stub for tests. Individual tests can override via
 * `vi.stubGlobal('fetch', ...)` or by passing `fetchImpl`. This keeps the
 * Agent Lab status check from generating ECONNREFUSED noise in jsdom.
 */
if (typeof globalThis.fetch === 'function') {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    if (url.includes('/api/agent-lab/')) {
      return new Response(
        JSON.stringify({ realModelAvailable: false, note: 'test stub' }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    }
    return originalFetch(input, init);
  };
}
