import { evaluateToolPermission } from './policy';
import { createCreditReviewTicket, getCreditStatus, getCustomer, getOpenInvoices } from './mockTools';
import type { RunResult, Scenario, TraceEvent } from './types';

const createEvent = (event: Omit<TraceEvent, 'id' | 'timestamp'>): TraceEvent => ({
  ...event,
  id: crypto.randomUUID(),
  timestamp: Date.now(),
});

export async function runScenario(scenario: Scenario, approvalGranted = false): Promise<RunResult> {
  const trace: TraceEvent[] = [];
  trace.push(createEvent({ type: 'user_message', title: 'User request', payload: scenario.userPrompt }));

  const customer = await getCustomer(scenario.customerName);
  if (!customer) {
    const finalAnswer = `Customer ${scenario.customerName} was not found.`;
    trace.push(createEvent({ type: 'error', title: 'Customer lookup failed', payload: scenario.customerName }));
    trace.push(createEvent({ type: 'final_answer', title: 'Final answer', payload: finalAnswer }));
    return { trace, finalAnswer, requiresApproval: false };
  }

  trace.push(createEvent({ type: 'tool_call', title: 'Tool call: getCustomer', payload: { customerNameOrId: scenario.customerName } }));
  trace.push(createEvent({ type: 'tool_result', title: 'Tool result: getCustomer', payload: customer }));

  const credit = await getCreditStatus(customer.id);
  trace.push(createEvent({ type: 'tool_call', title: 'Tool call: getCreditStatus', payload: { customerId: customer.id } }));
  trace.push(createEvent({ type: 'tool_result', title: 'Tool result: getCreditStatus', payload: credit }));

  const openInvoices = await getOpenInvoices(customer.id);
  trace.push(createEvent({ type: 'tool_call', title: 'Tool call: getOpenInvoices', payload: { customerId: customer.id } }));
  trace.push(createEvent({ type: 'tool_result', title: 'Tool result: getOpenInvoices', payload: openInvoices }));

  const projectedExposure = credit.currentExposure + scenario.orderAmount;
  const overdueCount = openInvoices.filter(invoice => invoice.daysPastDue > 0).length;
  const overLimit = projectedExposure - credit.creditLimit;

  if (customer.accountStatus === 'blocked') {
    const finalAnswer = `${customer.name} is blocked. Order cannot be approved.`;
    trace.push(createEvent({ type: 'final_answer', title: 'Final answer', payload: finalAnswer }));
    return { trace, finalAnswer, requiresApproval: false };
  }

  if (overLimit > 0 || overdueCount > 0 || customer.riskLevel !== 'low') {
    const permission = evaluateToolPermission('createCreditReviewTicket', { customerId: customer.id });
    trace.push(createEvent({ type: 'permission_check', title: 'Permission check', payload: permission }));

    if (permission.decision === 'requires_approval' && !approvalGranted) {
      const finalAnswer = `${customer.name} should not be auto-approved. Human approval is required before creating a credit review ticket.`;
      trace.push(createEvent({ type: 'approval_required', title: 'Approval required', payload: { tool: 'createCreditReviewTicket', reason: permission.reason } }));
      trace.push(createEvent({ type: 'final_answer', title: 'Final answer', payload: finalAnswer }));
      return { trace, finalAnswer, requiresApproval: true };
    }

    const ticket = await createCreditReviewTicket(
      customer.id,
      `Projected exposure is ${projectedExposure} with ${overdueCount} overdue invoices.`,
    );
    trace.push(createEvent({ type: 'tool_call', title: 'Tool call: createCreditReviewTicket', payload: { customerId: customer.id } }));
    trace.push(createEvent({ type: 'tool_result', title: 'Tool result: createCreditReviewTicket', payload: ticket }));

    const finalAnswer = `${customer.name} should not be auto-approved for $${scenario.orderAmount.toLocaleString()}. Credit review ticket ${ticket.ticketId} created.`;
    trace.push(createEvent({ type: 'final_answer', title: 'Final answer', payload: finalAnswer }));
    return { trace, finalAnswer, requiresApproval: false };
  }

  const finalAnswer = `${customer.name} can be auto-approved for $${scenario.orderAmount.toLocaleString()}.`;
  trace.push(createEvent({ type: 'final_answer', title: 'Final answer', payload: finalAnswer }));
  return { trace, finalAnswer, requiresApproval: false };
}
