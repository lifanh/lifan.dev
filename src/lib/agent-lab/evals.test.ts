import { describe, expect, it } from 'vitest';
import { evalCases, runAllEvals, runEvalCase } from './evals';

describe('agent lab evals', () => {
  it('exposes at least the five canonical scenario cases', () => {
    const ids = evalCases.map((c) => c.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'acme-gate-reached',
        'globex-auto-approve',
        'initech-blocked',
        'unknown-customer-error',
        'malformed-amount-validation',
      ]),
    );
    expect(evalCases.length).toBeGreaterThanOrEqual(5);
  });

  it('passes every canonical case against the deterministic agent', async () => {
    const results = await runAllEvals();

    const failures = results.filter((result) => !result.passed);
    if (failures.length > 0) {
      const reports = failures.map((failure) => {
        const failedAssertions = failure.assertions
          .filter((assertion) => !assertion.passed)
          .map((assertion) => `  - ${assertion.label}${assertion.detail ? ` (${assertion.detail})` : ''}`)
          .join('\n');
        return `${failure.case.id}\n${failedAssertions}`;
      });
      throw new Error(`Eval failures:\n${reports.join('\n\n')}`);
    }

    expect(failures).toEqual([]);
    expect(results.length).toBe(evalCases.length);
  });

  it('reports specific assertion failures when an expectation does not match', async () => {
    const result = await runEvalCase({
      id: 'broken-expectation',
      description: 'Globex with a deliberately wrong expected decision',
      scenarioId: 'globex-standard-order',
      expected: {
        decision: 'block',
      },
    });

    expect(result.passed).toBe(false);
    expect(result.assertions[0]?.label).toContain('decision === block');
    expect(result.assertions[0]?.detail).toContain('approve');
  });

  it('captures latency, iterations, tool calls, and cost in metrics', async () => {
    const result = await runEvalCase({
      id: 'globex-metrics',
      description: 'Metrics are populated for a passing run',
      scenarioId: 'globex-standard-order',
      expected: { status: 'completed' },
    });

    expect(result.passed).toBe(true);
    expect(result.metrics?.iterations).toBeGreaterThan(0);
    expect(result.metrics?.toolCalls).toBeGreaterThan(0);
    expect(typeof result.metrics?.estimatedCostUsd).toBe('number');
  });

  it('detects out-of-order tool sequences', async () => {
    const result = await runEvalCase({
      id: 'tool-order-mismatch',
      description: 'Required sequence that the agent does not produce',
      scenarioId: 'globex-standard-order',
      expected: {
        toolSequence: ['checkOrderEligibility', 'getCustomer'],
      },
    });

    expect(result.passed).toBe(false);
    const failed = result.assertions.find((assertion) => !assertion.passed);
    expect(failed?.label).toContain('checkOrderEligibility → getCustomer');
  });
});
