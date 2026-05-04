import { creditPolicyDocument, type PolicySection } from '../../data/agent-lab/creditPolicyDocument';
import { tokenize } from './retrieval';

/**
 * hybridSearch.ts
 *
 * Lab 6 — Hybrid search and reranking.
 *
 * The lesson is structural: a single retrieval signal misses a class of
 * queries. Keyword/BM25 misses paraphrases ("client on hold" vs the doc's
 * "blocked account"); a vector-only signal misses exact-term anchors
 * ("P-005", "$1,000,000"). Hybrid retrieval combines the two and a
 * reranker can sharpen the top of the list at the cost of latency.
 *
 * Everything in this module is deterministic. The "vector" path is a
 * pseudo-embedding built from character trigrams + hashed buckets +
 * cosine similarity — enough to demonstrate paraphrase tolerance without
 * a model. Real embeddings would slot in here without changing the
 * higher-level fusion or rerank code.
 */

export type ScoredSection = {
  sectionId: string;
  title: string;
  score: number;
  /** Per-method debug info, useful for the side-by-side panel. */
  detail?: Record<string, number>;
};

export type SearchMethod = 'keyword' | 'vector' | 'hybrid' | 'rerank';

export type SearchResult = {
  method: SearchMethod;
  query: string;
  ranked: ScoredSection[];
};

// --- BM25 ------------------------------------------------------------------

const BM25_K1 = 1.2;
const BM25_B = 0.75;

type SectionStats = {
  section: PolicySection;
  tokens: string[];
  termFrequency: Map<string, number>;
  length: number;
};

function statsFor(section: PolicySection): SectionStats {
  const text = `${section.title} ${section.body} ${section.keywords.join(' ')}`;
  const tokens = tokenize(text);
  const termFrequency = new Map<string, number>();
  for (const token of tokens) {
    termFrequency.set(token, (termFrequency.get(token) ?? 0) + 1);
  }
  return { section, tokens, termFrequency, length: tokens.length };
}

const SECTION_STATS: SectionStats[] = creditPolicyDocument.map(statsFor);
const AVG_DOC_LENGTH =
  SECTION_STATS.reduce((sum, stat) => sum + stat.length, 0) / SECTION_STATS.length;

function inverseDocumentFrequency(term: string): number {
  const docsContainingTerm = SECTION_STATS.filter((stat) => stat.termFrequency.has(term)).length;
  if (docsContainingTerm === 0) {
    return 0;
  }
  // Robertson-Spärck-Jones IDF, clamped to non-negative so a term in every
  // doc still has weight zero rather than a negative pull.
  return Math.max(
    0,
    Math.log((SECTION_STATS.length - docsContainingTerm + 0.5) / (docsContainingTerm + 0.5) + 1),
  );
}

export function bm25Search(query: string, limit = 5): SearchResult {
  const queryTokens = tokenize(query);
  const ranked = SECTION_STATS.map((stat) => {
    let score = 0;
    for (const term of queryTokens) {
      const tf = stat.termFrequency.get(term) ?? 0;
      if (tf === 0) continue;
      const idf = inverseDocumentFrequency(term);
      const numerator = tf * (BM25_K1 + 1);
      const denominator = tf + BM25_K1 * (1 - BM25_B + BM25_B * (stat.length / AVG_DOC_LENGTH));
      score += idf * (numerator / denominator);
    }
    return {
      sectionId: stat.section.id,
      title: stat.section.title,
      score: round(score),
      detail: { matchedTerms: queryTokens.filter((t) => stat.termFrequency.has(t)).length },
    };
  });
  return finalize('keyword', query, ranked, limit);
}

// --- Pseudo-vector search --------------------------------------------------

/**
 * Build a deterministic "embedding" by hashing character trigrams of the
 * input into a fixed-size float vector. This is intentionally not a real
 * model — the pedagogy is only that a different signal (substring overlap
 * across token boundaries) catches paraphrases that exact-match misses.
 */
const EMBED_DIM = 64;

function trigrams(text: string): string[] {
  const cleaned = ` ${text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()} `;
  if (cleaned.length < 3) return [];
  const grams: string[] = [];
  for (let i = 0; i <= cleaned.length - 3; i++) {
    const gram = cleaned.slice(i, i + 3);
    if (gram.trim().length > 0) {
      grams.push(gram);
    }
  }
  return grams;
}

function hashStringToBucket(value: string, modulo: number): number {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return Math.abs(hash) % modulo;
}

function embed(text: string): number[] {
  const vector = new Array(EMBED_DIM).fill(0);
  const grams = trigrams(text);
  if (grams.length === 0) return vector;
  for (const gram of grams) {
    vector[hashStringToBucket(gram, EMBED_DIM)] += 1;
  }
  // L2-normalise so cosine similarity reduces to dot product.
  let magnitude = 0;
  for (const v of vector) magnitude += v * v;
  magnitude = Math.sqrt(magnitude);
  if (magnitude === 0) return vector;
  for (let i = 0; i < vector.length; i++) {
    vector[i] /= magnitude;
  }
  return vector;
}

const SECTION_EMBEDDINGS: Array<{ section: PolicySection; vector: number[] }> = creditPolicyDocument.map(
  (section) => ({
    section,
    vector: embed(`${section.title}. ${section.body} ${section.keywords.join(' ')}`),
  }),
);

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

export function vectorSearch(query: string, limit = 5): SearchResult {
  const queryVector = embed(query);
  const ranked = SECTION_EMBEDDINGS.map(({ section, vector }) => ({
    sectionId: section.id,
    title: section.title,
    score: round(cosineSimilarity(queryVector, vector)),
  }));
  return finalize('vector', query, ranked, limit);
}

// --- Hybrid (Reciprocal Rank Fusion) ---------------------------------------

const RRF_K = 60;

/**
 * Reciprocal Rank Fusion combines two ranked lists by summing
 * 1 / (k + rank) per document. It is the de-facto default for hybrid
 * retrieval because it does not require score normalisation.
 */
export function hybridSearch(query: string, limit = 5): SearchResult {
  const keyword = bm25Search(query, SECTION_STATS.length).ranked;
  const vector = vectorSearch(query, SECTION_STATS.length).ranked;

  const scoreById = new Map<string, { title: string; score: number; detail: Record<string, number> }>();

  function fold(method: 'keyword' | 'vector', ranked: ScoredSection[]) {
    ranked.forEach((entry, index) => {
      const rank = index + 1;
      const contribution = 1 / (RRF_K + rank);
      const current = scoreById.get(entry.sectionId) ?? {
        title: entry.title,
        score: 0,
        detail: {} as Record<string, number>,
      };
      current.score += contribution;
      current.detail[`${method}Rank`] = rank;
      scoreById.set(entry.sectionId, current);
    });
  }

  fold('keyword', keyword);
  fold('vector', vector);

  const ranked = Array.from(scoreById.entries()).map(([sectionId, payload]) => ({
    sectionId,
    title: payload.title,
    score: round(payload.score),
    detail: payload.detail,
  }));

  return finalize('hybrid', query, ranked, limit);
}

// --- Rerank ----------------------------------------------------------------

/**
 * A toy "cross-encoder" rerank step: take the hybrid top-k and re-score
 * by counting how many query tokens appear in the section title (the
 * heaviest signal a real reranker would learn first), tie-broken by the
 * original hybrid score. Real cross-encoders score (query, passage)
 * pairs jointly; the contract is the same — input ranking in, refined
 * ranking out.
 */
export function rerankSearch(query: string, limit = 5, candidatePoolSize = 6): SearchResult {
  const baseline = hybridSearch(query, candidatePoolSize).ranked;
  const queryTokens = new Set(tokenize(query));

  const reranked = baseline.map((entry) => {
    const section = creditPolicyDocument.find((s) => s.id === entry.sectionId);
    const titleTokens = section ? new Set(tokenize(section.title)) : new Set<string>();
    let titleOverlap = 0;
    for (const token of queryTokens) {
      if (titleTokens.has(token)) titleOverlap += 1;
    }
    return {
      sectionId: entry.sectionId,
      title: entry.title,
      score: round(titleOverlap + entry.score),
      detail: { titleOverlap, hybridScore: entry.score },
    };
  });

  return finalize('rerank', query, reranked, limit);
}

// --- Helpers ---------------------------------------------------------------

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function finalize(
  method: SearchMethod,
  query: string,
  ranked: ScoredSection[],
  limit: number,
): SearchResult {
  const sorted = ranked
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.sectionId.localeCompare(b.sectionId);
    })
    .slice(0, limit);
  return { method, query, ranked: sorted };
}

export function runAllSearchMethods(query: string, limit = 4) {
  return {
    keyword: bm25Search(query, limit),
    vector: vectorSearch(query, limit),
    hybrid: hybridSearch(query, limit),
    rerank: rerankSearch(query, limit),
  };
}
