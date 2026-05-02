import { describe, expect, it } from 'vitest';
import { scenarios } from '../../data/agent-lab/scenarios';
import { runScenario } from './agentRunner';

describe('runScenario', () => {
  it('ACME 20k triggers approval requirement', async () => {
    const result = await runScenario(scenarios[0]);
    expect(result.requiresApproval).toBe(true);
    expect(result.finalAnswer).toContain('should not be auto-approved');
  });

  it('Globex 5k is approved', async () => {
    const result = await runScenario(scenarios[1]);
    expect(result.requiresApproval).toBe(false);
    expect(result.finalAnswer).toContain('can be auto-approved');
  });

  it('Initech is blocked', async () => {
    const result = await runScenario(scenarios[2]);
    expect(result.finalAnswer).toContain('blocked');
  });
});
