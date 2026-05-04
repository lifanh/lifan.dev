import { z } from 'zod';

/**
 * Runtime schemas for Agent Lab tool arguments, tool results, and the final
 * order-eligibility recommendation.
 *
 * Why this lives outside the model:
 * - Tool boundaries should be validated at runtime, not trusted from model output.
 * - Schemas double as docs for what each tool requires and returns.
 * - When a model produces an invalid recommendation, validation surfaces the
 *   exact field that failed instead of letting bad data flow downstream.
 */

export const accountStatusSchema = z.enum(['active', 'blocked', 'watchlist']);
export const riskLevelSchema = z.enum(['low', 'medium', 'high']);
export const eligibilityDecisionSchema = z.enum(['approve', 'review_required', 'block']);

const customerIdSchema = z
  .string()
  .min(1, 'customerId is required')
  .max(64, 'customerId is unexpectedly long');

const orderAmountSchema = z
  .number()
  .int('orderAmount must be an integer number of dollars')
  .positive('orderAmount must be greater than 0')
  .max(10_000_000, 'orderAmount exceeds the maximum allowed for this lab');

export const getCustomerArgsSchema = z.object({
  customerNameOrId: z.string().min(1, 'customerNameOrId is required'),
});

export const getCreditStatusArgsSchema = z.object({
  customerId: customerIdSchema,
});

export const getOpenInvoicesArgsSchema = z.object({
  customerId: customerIdSchema,
});

export const checkOrderEligibilityArgsSchema = z.object({
  customerId: customerIdSchema,
  orderAmount: orderAmountSchema,
});

export const createCreditReviewTicketArgsSchema = z.object({
  customerId: customerIdSchema,
  reason: z
    .string()
    .min(8, 'reason must be at least 8 characters so the credit team has context'),
});

export const toolArgsSchemas = {
  getCustomer: getCustomerArgsSchema,
  getCreditStatus: getCreditStatusArgsSchema,
  getOpenInvoices: getOpenInvoicesArgsSchema,
  checkOrderEligibility: checkOrderEligibilityArgsSchema,
  createCreditReviewTicket: createCreditReviewTicketArgsSchema,
} as const;

export type ToolName = keyof typeof toolArgsSchemas;

export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  creditLimit: z.number(),
  currentExposure: z.number(),
  paymentTerms: z.string(),
  riskLevel: riskLevelSchema,
  accountStatus: accountStatusSchema,
});

export const creditStatusSchema = z.object({
  customerId: z.string(),
  creditLimit: z.number(),
  currentExposure: z.number(),
  availableCredit: z.number().nonnegative(),
  status: accountStatusSchema,
  riskLevel: riskLevelSchema,
});

export const invoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.number(),
  dueDate: z.string(),
  status: z.enum(['open', 'paid', 'overdue']),
  daysPastDue: z.number().int().nonnegative(),
});

export const openInvoicesSchema = z.array(invoiceSchema);

export const orderEligibilitySchema = z.object({
  customerId: z.string(),
  orderAmount: z.number().positive(),
  currency: z.literal('USD'),
  decision: eligibilityDecisionSchema,
  creditLimit: z.number(),
  currentExposure: z.number(),
  projectedExposure: z.number(),
  availableCredit: z.number().nonnegative(),
  overLimitBy: z.number().nonnegative(),
  overdueInvoiceCount: z.number().int().nonnegative(),
  maxDaysPastDue: z.number().int().nonnegative(),
  requiresHumanApproval: z.boolean(),
  reasons: z.array(z.string().min(1)).min(1, 'recommendation must include at least one reason'),
  recommendedAction: z.string().min(8, 'recommendedAction must explain the next step'),
});

export const creditReviewTicketSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  reason: z.string().min(8),
  status: z.literal('open'),
  createdAt: z.string(),
});

export type ValidationIssue = {
  path: string;
  message: string;
};

export function formatZodIssues(error: z.ZodError): ValidationIssue[] {
  return error.issues.map((issue) => ({
    path: issue.path.length > 0 ? issue.path.join('.') : '(root)',
    message: issue.message,
  }));
}
