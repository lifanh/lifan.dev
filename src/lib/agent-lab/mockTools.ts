import { customers } from '../../data/agent-lab/customers';
import { invoices } from '../../data/agent-lab/invoices';
import type {
  CreditReviewTicket,
  CreditStatus,
  Customer,
  Invoice,
  OrderEligibility,
  ToolExecutionOptions,
} from './types';

function sleep(ms = 350): Promise<void> {
  if (ms <= 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => globalThis.setTimeout(resolve, ms));
}

function normalizeSearchValue(value: string): string {
  return value.trim().toLowerCase().replace(/\s+corp\.?$/, '');
}

function findCustomer(customerNameOrId: string): Customer {
  const normalized = normalizeSearchValue(customerNameOrId);
  const customer = customers.find((entry) => {
    return entry.id.toLowerCase() === normalized || normalizeSearchValue(entry.name).includes(normalized);
  });

  if (!customer) {
    throw new Error(`Customer not found: ${customerNameOrId}`);
  }

  return customer;
}

export async function getCustomer(
  customerNameOrId: string,
  options: ToolExecutionOptions = {},
): Promise<Customer> {
  await sleep(options.latencyMs);
  return findCustomer(customerNameOrId);
}

export async function getCreditStatus(
  customerId: string,
  options: ToolExecutionOptions = {},
): Promise<CreditStatus> {
  await sleep(options.latencyMs);
  const customer = findCustomer(customerId);

  return {
    customerId: customer.id,
    creditLimit: customer.creditLimit,
    currentExposure: customer.currentExposure,
    availableCredit: Math.max(customer.creditLimit - customer.currentExposure, 0),
    status: customer.accountStatus,
    riskLevel: customer.riskLevel,
  };
}

export async function getOpenInvoices(
  customerId: string,
  options: ToolExecutionOptions = {},
): Promise<Invoice[]> {
  await sleep(options.latencyMs);
  return invoices.filter((invoice) => {
    return invoice.customerId === customerId && invoice.status !== 'paid';
  });
}

export async function checkOrderEligibility(
  customerId: string,
  orderAmount: number,
  options: ToolExecutionOptions = {},
): Promise<OrderEligibility> {
  await sleep(options.latencyMs);
  const customer = findCustomer(customerId);
  const openInvoices = invoices.filter((invoice) => {
    return invoice.customerId === customerId && invoice.status !== 'paid';
  });
  const overdueInvoices = openInvoices.filter((invoice) => invoice.status === 'overdue');
  const projectedExposure = customer.currentExposure + orderAmount;
  const availableCredit = Math.max(customer.creditLimit - customer.currentExposure, 0);
  const overLimitBy = Math.max(projectedExposure - customer.creditLimit, 0);
  const maxDaysPastDue = overdueInvoices.reduce((max, invoice) => Math.max(max, invoice.daysPastDue), 0);
  const reasons: string[] = [];

  if (customer.accountStatus === 'blocked') {
    reasons.push('Account status is blocked.');
  }

  if (overLimitBy > 0) {
    reasons.push(`Projected exposure exceeds credit limit by $${overLimitBy.toLocaleString('en-US')}.`);
  }

  if (overdueInvoices.length > 0) {
    reasons.push(`${overdueInvoices.length} open invoice is overdue; oldest is ${maxDaysPastDue} days past due.`);
  }

  if (customer.riskLevel === 'high') {
    reasons.push('Customer risk level is high.');
  }

  if (customer.accountStatus === 'watchlist') {
    reasons.push('Account is on the watchlist and requires review on every new order.');
  }

  if (customer.accountStatus === 'blocked') {
    return {
      customerId,
      orderAmount,
      currency: 'USD',
      decision: 'block',
      creditLimit: customer.creditLimit,
      currentExposure: customer.currentExposure,
      projectedExposure,
      availableCredit,
      overLimitBy,
      overdueInvoiceCount: overdueInvoices.length,
      maxDaysPastDue,
      requiresHumanApproval: false,
      reasons,
      recommendedAction: 'Block the order until the account hold is removed.',
    };
  }

  if (overLimitBy > 0 || overdueInvoices.length > 0 || customer.accountStatus === 'watchlist') {
    return {
      customerId,
      orderAmount,
      currency: 'USD',
      decision: 'review_required',
      creditLimit: customer.creditLimit,
      currentExposure: customer.currentExposure,
      projectedExposure,
      availableCredit,
      overLimitBy,
      overdueInvoiceCount: overdueInvoices.length,
      maxDaysPastDue,
      requiresHumanApproval: true,
      reasons,
      recommendedAction: 'Create a credit review ticket before releasing the order.',
    };
  }

  return {
    customerId,
    orderAmount,
    currency: 'USD',
    decision: 'approve',
    creditLimit: customer.creditLimit,
    currentExposure: customer.currentExposure,
    projectedExposure,
    availableCredit,
    overLimitBy,
    overdueInvoiceCount: overdueInvoices.length,
    maxDaysPastDue,
    requiresHumanApproval: false,
    reasons: ['Available credit and payment status are within policy.'],
    recommendedAction: 'Approve the order for release.',
  };
}

export async function createCreditReviewTicket(
  customerId: string,
  reason: string,
  options: ToolExecutionOptions = {},
): Promise<CreditReviewTicket> {
  await sleep(options.latencyMs);

  return {
    id: `crt_${customerId}_20260502`,
    customerId,
    reason,
    status: 'open',
    createdAt: '2026-05-02T08:00:00.000Z',
  };
}
