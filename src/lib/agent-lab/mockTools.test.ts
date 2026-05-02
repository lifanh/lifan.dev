import { describe, expect, it } from 'vitest';
import { getCreditStatus, getCustomer, getOpenInvoices } from './mockTools';

describe('mockTools', () => {
  it('finds ACME by name token', async () => {
    const customer = await getCustomer('ACME');
    expect(customer?.name).toBe('ACME Corp');
  });

  it('returns credit status with available credit', async () => {
    const customer = await getCustomer('Globex');
    if (!customer) throw new Error('Missing customer fixture');
    const credit = await getCreditStatus(customer.id);
    expect(credit.availableCredit).toBe(78000);
  });

  it('returns open invoices for a customer', async () => {
    const customer = await getCustomer('Initech');
    if (!customer) throw new Error('Missing customer fixture');
    const openInvoices = await getOpenInvoices(customer.id);
    expect(openInvoices.length).toBeGreaterThan(0);
  });
});
