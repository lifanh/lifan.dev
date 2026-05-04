/**
 * llmSimulator.ts
 *
 * Lab 1 — LLM API fundamentals.
 *
 * A deliberately small, deterministic stand-in for an LLM completion
 * API. The point of this lab is the request/response *protocol* — the
 * roles, the parameters, the latency, the cost — not the quality of
 * the generation. Real provider wiring (OpenAI / Anthropic / Bedrock)
 * would slot in behind the same interface; the route at
 * /api/agent-lab/decide.ts already shows how that boundary is built.
 */

export type LlmRole = 'system' | 'user' | 'assistant';

export type LlmMessage = {
  role: LlmRole;
  content: string;
};

export type LlmRequest = {
  messages: LlmMessage[];
  temperature: number;
  maxTokens: number;
  /** Optional seed so a given request always produces the same output. */
  seed?: number;
};

export type LlmTokenUsage = {
  prompt: number;
  completion: number;
  total: number;
};

export type LlmResponse = {
  request: LlmRequest;
  message: LlmMessage;
  finishReason: 'stop' | 'length';
  usage: LlmTokenUsage;
  latencyMs: number;
  /** Estimated USD cost using mock per-million-token rates. */
  costUsd: number;
  /** Surface to the UI that this was a simulated response, not a real one. */
  simulated: true;
};

// Mock pricing similar in shape to public LLM pricing pages — purely
// illustrative so the lab can show \"cost per request\" without ever
// charging anyone.
const PROMPT_USD_PER_MTOK = 0.5;
const COMPLETION_USD_PER_MTOK = 1.5;

/** Rough token estimator: ~4 characters per token. */
export function estimateTokens(text: string): number {
  if (text.length === 0) return 0;
  return Math.max(1, Math.ceil(text.length / 4));
}

export function callSimulatedLlm(request: LlmRequest): LlmResponse {
  const promptText = request.messages.map((m) => m.content).join('\n\n');
  const promptTokens = estimateTokens(promptText);

  const seed = request.seed ?? hashForSeed(`${request.temperature}|${promptText}`);
  const completion = generateCompletion(request, seed);
  const truncated = truncateByTokens(completion, request.maxTokens);
  const completionTokens = estimateTokens(truncated.text);

  const latencyMs = simulateLatency(promptTokens, completionTokens);
  const costUsd = computeCost(promptTokens, completionTokens);

  return {
    request,
    message: { role: 'assistant', content: truncated.text },
    finishReason: truncated.truncated ? 'length' : 'stop',
    usage: {
      prompt: promptTokens,
      completion: completionTokens,
      total: promptTokens + completionTokens,
    },
    latencyMs,
    costUsd,
    simulated: true,
  };
}

// --- Deterministic generator ----------------------------------------------

/**
 * Build a plausible, deterministic completion from the request. The
 * shape varies by detected intent (extract / compare / what-is /
 * default) so the lab can demonstrate that the same protocol carries
 * many task shapes. Higher temperatures append a single \"variation
 * hint\" so the lab can show that temperature changes output without
 * asserting how a real model would actually sample.
 */
function generateCompletion(request: LlmRequest, seed: number): string {
  const lastUser = [...request.messages].reverse().find((m) => m.role === 'user');
  if (!lastUser) return 'No user message provided.';
  const systemDirectives = request.messages
    .filter((m) => m.role === 'system')
    .map((m) => m.content)
    .join(' ');

  const intent = classifyIntent(lastUser.content);
  const base = canonicalAnswer(intent, lastUser.content, systemDirectives);

  if (request.temperature <= 0) {
    return base;
  }

  // Temperature controls how often we pick the variation. At 0 we never
  // do; at 2 we always do. The seed picks one of three variations so
  // re-running the same request keeps the same output.
  const variations = [
    'Alternatively, you might frame this as a structured workflow rather than a single answer.',
    'A second pass could highlight risks the first answer underweights.',
    'Reasonable engineers may disagree on the framing; this is one consistent take.',
  ];
  const variationProbability = clamp(request.temperature / 2, 0, 1);
  const seedDecision = (seed % 100) / 100;
  if (seedDecision < variationProbability) {
    const pick = variations[seed % variations.length];
    return `${base}\n\n${pick}`;
  }
  return base;
}

type Intent = 'extract' | 'compare' | 'definition' | 'default';

function classifyIntent(text: string): Intent {
  const lower = text.toLowerCase();
  if (/extract|parse|structured|json|schema/.test(lower)) return 'extract';
  if (/compare|versus|vs\.?\s|difference/.test(lower)) return 'compare';
  if (/^what is\b|what's\b|define\b|explain\b/.test(lower.trim())) return 'definition';
  return 'default';
}

function canonicalAnswer(intent: Intent, userText: string, systemDirectives: string): string {
  const persona = systemDirectives
    ? `(System persona: \"${systemDirectives.slice(0, 80)}${systemDirectives.length > 80 ? '…' : ''}\".) `
    : '';
  switch (intent) {
    case 'extract':
      return [
        `${persona}Here is the structured extraction. Note that this lab returns deterministic JSON-shaped text so the lesson focuses on protocol, not generation quality.`,
        '',
        '```json',
        '{',
        '  "fields": ["customer", "amount", "due_date", "risk_level"],',
        '  "source_excerpt": ' + JSON.stringify(userText.slice(0, 60)) + ',',
        '  "extraction_confidence": 0.82',
        '}',
        '```',
      ].join('\n');
    case 'compare':
      return [
        `${persona}Comparison summary (deterministic stand-in):`,
        '',
        '- Both options share a common contract; pick the one whose tradeoffs match your constraints.',
        '- The first option emphasises predictability; the second emphasises flexibility.',
        '- A real model would tailor this to the specific subjects in your prompt.',
      ].join('\n');
    case 'definition':
      return `${persona}Working definition (simulated): ${shortenForDefinition(userText)} A real provider would expand with examples, edge cases, and citations.`;
    default:
      return `${persona}Acknowledged: \"${userText.slice(0, 120)}${userText.length > 120 ? '…' : ''}\". A real LLM would produce a free-form answer here. The lab returns this canonical reply so token counts, latency, and temperature variance stay reproducible.`;
  }
}

function shortenForDefinition(text: string): string {
  const stripped = text.replace(/^(what is|what's|define|explain)\s*/i, '').replace(/\?$/, '').trim();
  return stripped.length > 0
    ? `\"${stripped}\" is the subject of this question.`
    : 'The subject is unspecified.';
}

// --- Helpers --------------------------------------------------------------

function truncateByTokens(text: string, maxTokens: number): { text: string; truncated: boolean } {
  if (maxTokens <= 0) return { text: '', truncated: true };
  const approxMaxChars = maxTokens * 4;
  if (text.length <= approxMaxChars) return { text, truncated: false };
  return { text: `${text.slice(0, approxMaxChars - 1)}…`, truncated: true };
}

function simulateLatency(promptTokens: number, completionTokens: number): number {
  // Mock latency: time-to-first-byte + per-token streaming cost.
  return Math.round(120 + promptTokens * 0.5 + completionTokens * 8);
}

function computeCost(promptTokens: number, completionTokens: number): number {
  const promptCost = (promptTokens / 1_000_000) * PROMPT_USD_PER_MTOK;
  const completionCost = (completionTokens / 1_000_000) * COMPLETION_USD_PER_MTOK;
  return Math.round((promptCost + completionCost) * 1_000_000) / 1_000_000;
}

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}

function hashForSeed(text: string): number {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 33) ^ text.charCodeAt(i);
  }
  return Math.abs(hash);
}

export type ComparisonResponse = {
  label: 'A' | 'B';
  request: LlmRequest;
  response: LlmResponse;
};

/**
 * Run the same user message through two different prompt configurations
 * (typically a temperature change, system-message change, or both) so
 * the lab can show variance in tokens, latency, cost, and content side
 * by side.
 */
export function runComparison(left: LlmRequest, right: LlmRequest): ComparisonResponse[] {
  return [
    { label: 'A', request: left, response: callSimulatedLlm(left) },
    { label: 'B', request: right, response: callSimulatedLlm(right) },
  ];
}
