import { customers } from '../../data/agent-lab/customers';
import { invoices } from '../../data/agent-lab/invoices';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getCustomer(customerNameOrId: string) {
  await sleep(40);
  const normalized = customerNameOrId.toLowerCase();
  return customers.find(
    customer => customer.id.toLowerCase() === normalized || customer.name.toLowerCase().includes(normalized),
  );
}

export async function getCreditStatus(customerId: string) {
  await sleep(40);
  const customer = customers.find(item => item.id === customerId);
  if (!customer) {
    throw new Error(`Customer not found: ${customerId}`);
  }

  return {
    customerId,
    creditLimit: customer.creditLimit,
    currentExposure: customer.currentExposure,
    availableCredit: customer.creditLimit - customer.currentExposure,
    status: customer.accountStatus,
    riskLevel: customer.riskLevel,
  };
}

export async function getOpenInvoices(customerId: string) {
  await sleep(40);
  return invoices.filter(invoice => invoice.customerId === customerId && invoice.status !== 'paid');
}

export async function createCreditReviewTicket(customerId: string, reason: string) {
  await sleep(40);
  return {
    ticketId: `credit_${customerId}_${Date.now()}`,
    customerId,
    reason,
    status: 'pending' as const,
  };
}
