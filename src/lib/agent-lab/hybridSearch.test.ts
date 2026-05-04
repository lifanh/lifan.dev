import { describe, expect, it } from 'vitest';
import {
  bm25Search,
  hybridSearch,
  rerankSearch,
  runAllSearchMethods,
  vectorSearch,
} from './hybridSearch';

describe('bm25Search', () => {
  it('ranks the blocked-account section first for a literal-term query', () => {
    const result = bm25Search('blocked account hold');
    expect(result.method).toBe('keyword');
    expect(result.ranked[0]?.sectionId).toBe('P-001');
    expect(result.ranked[0]?.score).toBeGreaterThan(0);
  });

  it('returns no results for a query that shares no terms with the corpus', () => {
    const result = bm25Search('quantum lasagna');
    expect(result.ranked).toHaveLength(0);
  });

  it('ranks the large-order section for a million-dollar query', () => {
    const result = bm25Search('million dollar order threshold');
    expect(result.ranked[0]?.sectionId).toBe('P-005');
  });
});

describe('vectorSearch', () => {
  it('produces non-zero scores for paraphrased terms via trigram overlap', () => {
    // "client on hold" never appears verbatim; trigram overlap with
    // "blocked" / "hold" / "account" should still surface P-001.
    const result = vectorSearch('client on hold pending review');
    expect(result.ranked.length).toBeGreaterThan(0);
    expect(result.ranked.some((entry) => entry.sectionId === 'P-001')).toBe(true);
  });

  it('returns deterministic scores across runs', () => {
    const a = vectorSearch('overdue invoice escalation');
    const b = vectorSearch('overdue invoice escalation');
    expect(a.ranked).toEqual(b.ranked);
  });
});

describe('hybridSearch', () => {
  it('combines keyword and vector signals via reciprocal rank fusion', () => {
    const result = hybridSearch('overdue invoice');
    expect(result.method).toBe('hybrid');
    expect(result.ranked.length).toBeGreaterThan(0);
    expect(result.ranked[0]?.detail).toMatchObject({
      keywordRank: expect.any(Number),
      vectorRank: expect.any(Number),
    });
  });

  it('breaks ties deterministically by section id', () => {
    const a = hybridSearch('credit review approval');
    const b = hybridSearch('credit review approval');
    expect(a.ranked.map((e) => e.sectionId)).toEqual(b.ranked.map((e) => e.sectionId));
  });
});

describe('rerankSearch', () => {
  it('boosts a candidate whose title shares query tokens', () => {
    const baseline = hybridSearch('watchlist accounts');
    const reranked = rerankSearch('watchlist accounts');
    // P-004 ("Watchlist accounts") must appear in the reranked top result.
    expect(reranked.ranked[0]?.sectionId).toBe('P-004');
    expect(reranked.ranked[0]?.detail?.titleOverlap).toBeGreaterThan(0);
    // Sanity: rerank must not invent results that were not in the baseline.
    const baselineIds = new Set(baseline.ranked.map((e) => e.sectionId));
    for (const entry of reranked.ranked) {
      expect(baselineIds.has(entry.sectionId)).toBe(true);
    }
  });
});

describe('runAllSearchMethods', () => {
  it('returns one result block per method', () => {
    const all = runAllSearchMethods('blocked customer with overdue invoices');
    expect(all.keyword.method).toBe('keyword');
    expect(all.vector.method).toBe('vector');
    expect(all.hybrid.method).toBe('hybrid');
    expect(all.rerank.method).toBe('rerank');
  });
});
