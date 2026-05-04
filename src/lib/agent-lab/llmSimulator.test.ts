import { describe, expect, it } from 'vitest';
import { callSimulatedLlm, estimateTokens, runComparison } from './llmSimulator';

describe('estimateTokens', () => {
  it('returns 0 for an empty string', () => {
    expect(estimateTokens('')).toBe(0);
  });

  it('returns at least 1 for non-empty input', () => {
    expect(estimateTokens('hi')).toBe(1);
  });

  it('approximates ~4 characters per token', () => {
    // 16 characters ≈ 4 tokens at the standard heuristic.
    expect(estimateTokens('abcdabcdabcdabcd')).toBe(4);
  });
});

describe('callSimulatedLlm', () => {
  it('echoes the user intent for a default-style request and reports usage + cost', () => {
    const response = callSimulatedLlm({
      messages: [{ role: 'user', content: 'How does the credit policy treat blocked accounts?' }],
      temperature: 0,
      maxTokens: 200,
    });
    expect(response.message.role).toBe('assistant');
    expect(response.message.content.length).toBeGreaterThan(0);
    expect(response.usage.prompt).toBeGreaterThan(0);
    expect(response.usage.completion).toBeGreaterThan(0);
    expect(response.usage.total).toBe(response.usage.prompt + response.usage.completion);
    expect(response.costUsd).toBeGreaterThan(0);
    expect(response.simulated).toBe(true);
    expect(response.finishReason).toBe('stop');
  });

  it('returns the same response for two identical zero-temperature requests', () => {
    const make = () =>
      callSimulatedLlm({
        messages: [
          { role: 'system', content: 'You are a credit risk analyst.' },
          { role: 'user', content: 'Summarise the watchlist policy in one sentence.' },
        ],
        temperature: 0,
        maxTokens: 256,
      });
    expect(make().message.content).toBe(make().message.content);
  });

  it('returns a JSON-shaped reply when the user asks for an extraction', () => {
    const response = callSimulatedLlm({
      messages: [{ role: 'user', content: 'Extract the customer, amount, and due date as JSON.' }],
      temperature: 0,
      maxTokens: 256,
    });
    expect(response.message.content).toMatch(/```json/);
    expect(response.message.content).toMatch(/extraction_confidence/);
  });

  it('truncates and reports finishReason=length when maxTokens is small', () => {
    const response = callSimulatedLlm({
      messages: [{ role: 'user', content: 'Tell me about agent permissioning.' }],
      temperature: 0,
      maxTokens: 5,
    });
    expect(response.finishReason).toBe('length');
    expect(response.message.content.length).toBeLessThan(40);
  });

  it('appends a temperature-driven variation hint at high temperature with a fixed seed', () => {
    const cold = callSimulatedLlm({
      messages: [{ role: 'user', content: 'How should I think about retrieval grounding?' }],
      temperature: 0,
      maxTokens: 256,
      seed: 42,
    });
    const hot = callSimulatedLlm({
      messages: [{ role: 'user', content: 'How should I think about retrieval grounding?' }],
      temperature: 1.8,
      maxTokens: 256,
      seed: 42,
    });
    expect(hot.message.content).not.toBe(cold.message.content);
  });
});

describe('runComparison', () => {
  it('produces labelled A and B responses for two requests', () => {
    const results = runComparison(
      {
        messages: [{ role: 'user', content: 'Define agent loops.' }],
        temperature: 0,
        maxTokens: 200,
      },
      {
        messages: [
          { role: 'system', content: 'Be terse.' },
          { role: 'user', content: 'Define agent loops.' },
        ],
        temperature: 0.7,
        maxTokens: 200,
      },
    );
    expect(results).toHaveLength(2);
    expect(results[0].label).toBe('A');
    expect(results[1].label).toBe('B');
    expect(results[0].response.usage.prompt).toBeLessThan(results[1].response.usage.prompt);
  });
});
