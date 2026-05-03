import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * GET /api/agent-lab/status
 *
 * Reports whether the real-model adapter is configured. The browser uses this
 * to decide whether to enable the "Real model" toggle. The endpoint never
 * exposes a key — only a boolean and a human-readable note.
 */
export const GET: APIRoute = async ({ locals }) => {
  // Cloudflare Pages exposes env vars via locals.runtime.env at runtime.
  // For local dev / tests we fall back to import.meta.env / process.env.
  const env = readEnv(locals);
  const apiKey =
    env.OPENAI_API_KEY ?? env.ANTHROPIC_API_KEY ?? env.AGENT_LAB_LLM_API_KEY ?? '';

  const realModelAvailable = Boolean(apiKey);

  return new Response(
    JSON.stringify({
      realModelAvailable,
      note: realModelAvailable
        ? 'Real-model adapter is wired and a provider key is configured.'
        : 'No provider key configured; the lab runs in simulated mode by default.',
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    },
  );
};

type EnvBag = Record<string, string | undefined>;

function readEnv(locals: unknown): EnvBag {
  const merged: EnvBag = {};

  // Cloudflare Pages runtime env
  if (locals && typeof locals === 'object') {
    const runtime = (locals as { runtime?: { env?: EnvBag } }).runtime;
    if (runtime?.env) {
      Object.assign(merged, runtime.env);
    }
  }

  // import.meta.env (Vite-injected build-time env)
  if (typeof import.meta !== 'undefined' && (import.meta as { env?: EnvBag }).env) {
    Object.assign(merged, (import.meta as { env: EnvBag }).env);
  }

  // process.env (Node test runs)
  if (typeof process !== 'undefined' && process.env) {
    Object.assign(merged, process.env as EnvBag);
  }

  return merged;
}
