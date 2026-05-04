import type { APIRoute } from 'astro';
import { z } from 'zod';

export const prerender = false;

/**
 * POST /api/agent-lab/decide
 *
 * Server-side decision endpoint. The browser sends the agent's current
 * state; the server consults a real LLM and returns the next step.
 *
 * This file is the boundary between the public lab and any provider
 * credentials. The browser never sees a key. Wiring an actual LLM
 * (OpenAI, Anthropic, Bedrock, etc.) is a small change inside the
 * `callRealProvider` placeholder below.
 *
 * Until a key is configured, the endpoint returns 503 with a clear
 * message. The runner catches that, falls back to the deterministic
 * fake model, and surfaces the fallback in the trace so the user can
 * see what happened.
 */

const stateSchema = z.object({
  scenarioId: z.string().min(1).max(64),
  customerNameOrId: z.string().min(1).max(64),
  orderAmount: z.number().int().min(0).max(10_000_000),
  observations: z.record(z.string(), z.unknown()).default({}),
  approvalDecision: z.enum(['approved', 'rejected']).optional(),
  simulateInvalidRecommendation: z.boolean().optional(),
  invalidRecommendationAttempted: z.boolean().optional(),
  gatedActionRejected: z.boolean().optional(),
});

const MAX_BODY_BYTES = 64 * 1024;

const SCENARIO_ALLOWLIST = new Set([
  'acme-credit-review',
  'globex-standard-order',
  'initech-blocked-order',
]);

export const POST: APIRoute = async ({ request, locals }) => {
  // Body-size guard. The Content-Length header is a fast pre-check, but it
  // can be missing or spoofed (e.g. chunked encoding), so we also enforce
  // the limit on the actual byte length after reading the body.
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: 'Request body too large.' }, 413);
  }

  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch {
    return json({ error: 'Could not read request body.' }, 400);
  }

  if (new TextEncoder().encode(bodyText).byteLength > MAX_BODY_BYTES) {
    return json({ error: 'Request body too large.' }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return json({ error: 'Body must be valid JSON.' }, 400);
  }

  const parsed = stateSchema.safeParse(
    (body && typeof body === 'object' && 'state' in body
      ? (body as { state: unknown }).state
      : body),
  );

  if (!parsed.success) {
    return json(
      {
        error: 'state failed validation.',
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
      400,
    );
  }

  // Scenario allowlist (eval-only inline scenarios are not accepted by the
  // public endpoint).
  if (!SCENARIO_ALLOWLIST.has(parsed.data.scenarioId)) {
    return json(
      { error: `Scenario "${parsed.data.scenarioId}" is not allowed by the public endpoint.` },
      400,
    );
  }

  const env = readEnv(locals);
  const apiKey =
    env.OPENAI_API_KEY ?? env.ANTHROPIC_API_KEY ?? env.AGENT_LAB_LLM_API_KEY ?? '';

  if (!apiKey) {
    // Intentional: the browser-side runner catches this and falls back to
    // the deterministic fake model. This keeps the lab usable without
    // anyone paying for tokens.
    return json(
      {
        error: 'No provider key configured.',
        note:
          'Wire OPENAI_API_KEY, ANTHROPIC_API_KEY, or AGENT_LAB_LLM_API_KEY ' +
          'in Cloudflare Pages env to enable real-model mode.',
      },
      503,
    );
  }

  // Provider key present but no provider implementation wired yet.
  // Adding one is a 50-line change inside callRealProvider().
  try {
    const decision = await callRealProvider(parsed.data, apiKey);
    return json({ decision }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Provider error';
    return json({ error: `Provider call failed: ${message}` }, 502);
  }
};

type ValidatedState = z.infer<typeof stateSchema>;

async function callRealProvider(
  _state: ValidatedState,
  _apiKey: string,
): Promise<unknown> {
  // ───────────────────────────────────────────────────────────────────────
  // EXTENSION POINT
  //
  // Wire your provider of choice here. The function must return a value
  // matching the ModelDecision shape:
  //
  //   { type: 'tool_call'; toolName: string; args: object; rationale: string }
  //   | { type: 'final_answer'; recommendation: OrderEligibility; rationale: string }
  //   | { type: 'invalid_recommendation'; payload: unknown; rationale: string }
  //
  // Suggested approach:
  //   1. Build a system prompt that lists the available tools, the policy
  //      rules summarized in `creditPolicyDocument.ts`, and the schemas
  //      from `schemas.ts`.
  //   2. Pass the current state as user content (observations + scenario).
  //   3. Use the provider's structured-output / tool-calling feature to get
  //      back a typed decision. Validate with `ModelDecision` Zod once
  //      added.
  //   4. Map the response into `ModelDecision` and return.
  //
  // Until that's wired, throw so the runner falls back to the fake model.
  // ───────────────────────────────────────────────────────────────────────
  throw new Error('Real provider not wired. See callRealProvider in decide.ts.');
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

type EnvBag = Record<string, string | undefined>;

function readEnv(locals: unknown): EnvBag {
  const merged: EnvBag = {};

  if (locals && typeof locals === 'object') {
    const runtime = (locals as { runtime?: { env?: EnvBag } }).runtime;
    if (runtime?.env) {
      Object.assign(merged, runtime.env);
    }
  }

  if (typeof import.meta !== 'undefined' && (import.meta as { env?: EnvBag }).env) {
    Object.assign(merged, (import.meta as { env: EnvBag }).env);
  }

  if (typeof process !== 'undefined' && process.env) {
    Object.assign(merged, process.env as EnvBag);
  }

  return merged;
}
