import { describe, expect, it } from 'vitest';
import {
  composeCitedAnswer,
  composeUncitedAnswer,
  retrievePolicySections,
  tokenize,
} from './retrieval';

describe('agent lab retrieval', () => {
  it('tokenizes lowercased words and drops stop words', () => {
    const tokens = tokenize('Can ACME place a new order for $20,000?');
    expect(tokens).toContain('acme');
    expect(tokens).toContain('order');
    expect(tokens).toContain('20');
    expect(tokens).not.toContain('a');
    expect(tokens).not.toContain('the');
    expect(tokens).not.toContain('place');
  });

  it('returns the blocked-account section for a query about a blocked customer', () => {
    const { citations } = retrievePolicySections('Customer is blocked, can the order be released?');

    expect(citations.length).toBeGreaterThan(0);
    expect(citations[0]?.sectionId).toBe('P-001');
  });

  it('returns the overdue-invoice section for an overdue-invoice query', () => {
    const { citations } = retrievePolicySections('What do we do about overdue invoices past due dates?');

    expect(citations.map((citation) => citation.sectionId)).toContain('P-003');
  });

  it('returns the watchlist section for a watchlist query', () => {
    const { citations } = retrievePolicySections('How are watchlist accounts handled?');

    expect(citations.map((citation) => citation.sectionId)).toContain('P-004');
  });

  it('returns the large-order section for a large-order query', () => {
    const { citations } = retrievePolicySections('Does a $5,000,000 order need approval?');

    expect(citations.map((citation) => citation.sectionId)).toContain('P-005');
  });

  it('respects the limit parameter', () => {
    const { citations } = retrievePolicySections(
      'blocked customer with overdue invoices on watchlist large-order ticket creation',
      2,
    );

    expect(citations.length).toBeLessThanOrEqual(2);
  });

  it('returns an empty citation list when nothing matches', () => {
    const { citations } = retrievePolicySections('xyz qqq foobar');

    expect(citations).toEqual([]);
  });

  it('composes a cited answer that names every section by id', () => {
    const result = retrievePolicySections('blocked account with overdue invoices');
    const answer = composeCitedAnswer(result, 'Hold the order until the credit team clears the hold.');

    expect(answer).toContain('Conclusion: Hold the order');
    for (const citation of result.citations) {
      expect(answer).toContain(`[${citation.sectionId}]`);
    }
  });

  it('composes an uncited baseline answer that mentions retrieval is missing', () => {
    const answer = composeUncitedAnswer('Can ACME place a $20,000 order?');

    expect(answer).toMatch(/without retrieval/i);
    expect(answer).toContain('Can ACME place');
  });
});
