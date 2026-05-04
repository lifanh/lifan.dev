import type { PermissionDecision } from './types';

/**
 * Tool-permission policy.
 *
 * The policy is intentionally separate from the model. The model can ask to
 * call any tool with any arguments, but the runner consults this function
 * before execution. That means a hallucinated or coerced tool call cannot
 * bypass safety rules — the model is not the permission system.
 *
 * Rules:
 *  - Read-only tools are allowed unconditionally.
 *  - `checkOrderEligibility` is read-only, but very large orders demonstrate
 *    an arg-aware rule: amounts above $1,000,000 require human approval even
 *    on the read-only path, because they imply a large business decision.
 *  - `createCreditReviewTicket` writes a persistent record and always
 *    requires human approval.
 *  - Unknown or unsafe tools are denied.
 */

const READ_ONLY_TOOLS = new Set([
  'getCustomer',
  'getCreditStatus',
  'getOpenInvoices',
]);

const LARGE_ORDER_THRESHOLD = 1_000_000;

export function evaluateToolPermission(
  toolName: string,
  args: unknown,
): PermissionDecision {
  if (READ_ONLY_TOOLS.has(toolName)) {
    return { decision: 'allow' };
  }

  if (toolName === 'checkOrderEligibility') {
    const orderAmount = readNumber(args, 'orderAmount');

    if (orderAmount !== undefined && orderAmount > LARGE_ORDER_THRESHOLD) {
      return {
        decision: 'requires_approval',
        reason: `Order amount $${orderAmount.toLocaleString('en-US')} exceeds the $${LARGE_ORDER_THRESHOLD.toLocaleString('en-US')} large-order threshold.`,
      };
    }

    return { decision: 'allow' };
  }

  if (toolName === 'createCreditReviewTicket') {
    return {
      decision: 'requires_approval',
      reason: 'This tool creates a persistent business record.',
    };
  }

  return {
    decision: 'deny',
    reason: 'Unknown or unsafe tool.',
  };
}

function readNumber(args: unknown, key: string): number | undefined {
  if (args && typeof args === 'object' && key in args) {
    const value = (args as Record<string, unknown>)[key];

    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
  }

  return undefined;
}
