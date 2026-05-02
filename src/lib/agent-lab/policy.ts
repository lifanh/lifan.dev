import type { ToolPermissionDecision } from './types';

export function evaluateToolPermission(toolName: string, _args: unknown): { decision: ToolPermissionDecision; reason?: string } {
  if (toolName.startsWith('get')) {
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
