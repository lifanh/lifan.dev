import { describe, expect, it } from 'vitest';
import { evaluateToolPermission } from './policy';

describe('agent lab tool policy', () => {
  it('allows read-only tools', () => {
    expect(evaluateToolPermission('getCustomer', { customerNameOrId: 'ACME' })).toEqual({
      decision: 'allow',
    });
  });

  it('allows checkOrderEligibility for normal-sized orders', () => {
    expect(
      evaluateToolPermission('checkOrderEligibility', {
        customerId: 'cust_acme',
        orderAmount: 20000,
      }),
    ).toEqual({ decision: 'allow' });
  });

  it('requires approval for orders that exceed the large-order threshold', () => {
    const result = evaluateToolPermission('checkOrderEligibility', {
      customerId: 'cust_acme',
      orderAmount: 5_000_000,
    });

    expect(result.decision).toBe('requires_approval');
    if (result.decision === 'requires_approval') {
      expect(result.reason).toContain('large-order threshold');
    }
  });

  it('requires approval before creating a credit review ticket', () => {
    expect(
      evaluateToolPermission('createCreditReviewTicket', { customerId: 'cust_acme' }),
    ).toEqual({
      decision: 'requires_approval',
      reason: 'This tool creates a persistent business record.',
    });
  });

  it('denies unknown tools', () => {
    expect(evaluateToolPermission('deleteCustomer', { customerId: 'cust_acme' })).toEqual({
      decision: 'deny',
      reason: 'Unknown or unsafe tool.',
    });
  });
});
