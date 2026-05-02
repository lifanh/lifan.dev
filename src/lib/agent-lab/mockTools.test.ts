import { describe, expect, it } from 'vitest';
import { checkOrderEligibility, getCustomer, getOpenInvoices } from './mockTools';

describe('agent lab mock tools', () => {
  it('resolves ACME by customer name', async () => {
    const customer = await getCustomer('ACME', { latencyMs: 0 });

    expect(customer).toMatchObject({
      id: 'cust_acme',
      name: 'ACME Corp',
      riskLevel: 'medium',
      accountStatus: 'watchlist',
    });
  });

  it('returns ACME overdue invoice data', async () => {
    const invoices = await getOpenInvoices('cust_acme', { latencyMs: 0 });

    expect(invoices).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customerId: 'cust_acme',
          status: 'overdue',
          daysPastDue: 42,
        }),
      ]),
    );
  });

  it('flags ACME twenty thousand dollar order for credit review', async () => {
    const eligibility = await checkOrderEligibility('cust_acme', 20000, { latencyMs: 0 });

    expect(eligibility).toMatchObject({
      decision: 'review_required',
      projectedExposure: 58000,
      overLimitBy: 8000,
      requiresHumanApproval: true,
    });
  });
});
