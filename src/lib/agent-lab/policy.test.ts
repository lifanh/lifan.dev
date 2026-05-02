import { describe, expect, it } from 'vitest';
import { evaluateToolPermission } from './policy';

describe('evaluateToolPermission', () => {
  it('allows read-only get tools', () => {
    expect(evaluateToolPermission('getCustomer', {})).toEqual({ decision: 'allow' });
  });

  it('requires approval for write tools', () => {
    expect(evaluateToolPermission('createCreditReviewTicket', {})).toEqual({
      decision: 'requires_approval',
      reason: 'This tool creates a persistent business record.',
    });
  });

  it('denies unknown tools', () => {
    expect(evaluateToolPermission('deleteEverything', {})).toEqual({
      decision: 'deny',
      reason: 'Unknown or unsafe tool.',
    });
  });
});
