import { describe, expect, it } from 'vitest';
import {
  checkOrderEligibilityArgsSchema,
  createCreditReviewTicketArgsSchema,
  formatZodIssues,
  orderEligibilitySchema,
} from './schemas';

describe('agent lab schemas', () => {
  it('rejects negative order amounts and reports the failing field', () => {
    const parsed = checkOrderEligibilityArgsSchema.safeParse({
      customerId: 'cust_acme',
      orderAmount: -50,
    });

    expect(parsed.success).toBe(false);

    if (!parsed.success) {
      const issues = formatZodIssues(parsed.error);
      expect(issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ path: 'orderAmount' }),
        ]),
      );
    }
  });

  it('rejects credit review tickets with a too-short reason', () => {
    const parsed = createCreditReviewTicketArgsSchema.safeParse({
      customerId: 'cust_acme',
      reason: 'no',
    });

    expect(parsed.success).toBe(false);
  });

  it('accepts a well-formed order eligibility recommendation', () => {
    const parsed = orderEligibilitySchema.safeParse({
      customerId: 'cust_acme',
      orderAmount: 20000,
      currency: 'USD',
      decision: 'review_required',
      creditLimit: 50000,
      currentExposure: 38000,
      projectedExposure: 58000,
      availableCredit: 12000,
      overLimitBy: 8000,
      overdueInvoiceCount: 1,
      maxDaysPastDue: 45,
      requiresHumanApproval: true,
      reasons: ['Projected exposure exceeds credit limit by $8,000.'],
      recommendedAction: 'Create a credit review ticket before releasing the order.',
    });

    expect(parsed.success).toBe(true);
  });

  it('rejects a malformed final recommendation with multiple errors', () => {
    const parsed = orderEligibilitySchema.safeParse({
      customerId: 'cust_acme',
      orderAmount: 20000,
      currency: 'USD',
      decision: 'maybe',
      reasons: 'looks fine',
    });

    expect(parsed.success).toBe(false);

    if (!parsed.success) {
      const issues = formatZodIssues(parsed.error);
      const paths = issues.map((issue) => issue.path);
      expect(paths).toContain('decision');
      expect(paths).toContain('reasons');
    }
  });
});
