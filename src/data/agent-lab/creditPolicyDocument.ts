/**
 * A short, deliberately-structured credit policy document used for the
 * RAG mini-lab. Every section has a stable id (e.g. "P-001") so the lab
 * can show a citation that points to a specific paragraph rather than to
 * a vague "the policy says".
 *
 * The bodies intentionally mirror the rules already encoded in
 * `mockTools.ts` and `policy.ts`. That alignment lets the lab
 * demonstrate that retrieval-grounded answers stay consistent with the
 * tools and policy the runner already enforces.
 */

export type PolicySection = {
  id: string;
  title: string;
  body: string;
  /** Explicit keywords used to boost retrieval; supplements the body. */
  keywords: string[];
};

export const creditPolicyDocument: PolicySection[] = [
  {
    id: 'P-001',
    title: 'Account holds and blocked accounts',
    body:
      'When a customer account is in a blocked status, no new orders may be released regardless of available credit. The order must be held until the account hold is removed by the credit team. Sales must not promise a release date.',
    keywords: ['blocked', 'block', 'hold', 'status', 'release', 'account'],
  },
  {
    id: 'P-002',
    title: 'Projected exposure and the credit limit',
    body:
      'Projected exposure equals current exposure plus the proposed order amount. If projected exposure exceeds the credit limit by any amount, the order is not auto-approvable. The over-limit amount must be reported in the recommendation reasons.',
    keywords: ['projected', 'exposure', 'credit', 'limit', 'over-limit', 'auto-approve'],
  },
  {
    id: 'P-003',
    title: 'Overdue invoice escalation',
    body:
      'Any open invoice that is more than 30 days past due triggers a credit review. The credit team must inspect the oldest overdue invoice. Orders should not be auto-approved while overdue invoices exist on the account.',
    keywords: ['overdue', 'invoice', 'past due', 'days', 'aging', 'review'],
  },
  {
    id: 'P-004',
    title: 'Watchlist accounts',
    body:
      'Accounts on the watchlist require a credit review on every new order, even when projected exposure stays within the credit limit and no invoices are overdue. Watchlist status is set by the credit team.',
    keywords: ['watchlist', 'watch', 'review', 'monitor'],
  },
  {
    id: 'P-005',
    title: 'Large-order approval threshold',
    body:
      'Any order whose amount exceeds one million United States dollars requires human approval before the eligibility decision is finalized. This rule applies even to read-only eligibility checks because it implies a large business decision.',
    keywords: ['large', 'million', 'threshold', 'approval', 'big', 'high-value'],
  },
  {
    id: 'P-006',
    title: 'Credit review ticket creation',
    body:
      'Creating a credit review ticket is a write action and always requires explicit human approval at the gate. The ticket reason must be at least eight characters and should reference the specific failing policy rule. Tickets are persistent business records.',
    keywords: ['ticket', 'create', 'write', 'human', 'approval', 'persistent'],
  },
  {
    id: 'P-007',
    title: 'Risk level and tightening factors',
    body:
      'A high risk level alone does not block an order, but it must be cited in the recommendation reasons. A combination of high risk plus any of: blocked status, watchlist, overdue invoices, or over-limit projection should escalate to a credit review.',
    keywords: ['risk', 'high', 'medium', 'low', 'risk level'],
  },
  {
    id: 'P-008',
    title: 'Auto-approval safe path',
    body:
      'An order may be auto-approved only when all of the following hold: the account is active, projected exposure stays within the credit limit, there are no overdue invoices, and the order amount is at or below the large-order threshold.',
    keywords: ['auto-approve', 'auto', 'safe', 'allow', 'approve', 'active'],
  },
];
