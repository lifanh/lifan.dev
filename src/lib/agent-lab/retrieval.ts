import { creditPolicyDocument, type PolicySection } from '../../data/agent-lab/creditPolicyDocument';

/**
 * retrieval.ts
 *
 * A deliberately small, deterministic retrieval implementation for the
 * Agent Lab RAG mini-lab. No vector database, no embeddings — just
 * tokenized keyword matching with a tiny stop-word list.
 *
 * The point is to teach citations: every retrieved chunk carries a stable
 * section id so the lab can show "this answer comes from §P-001" rather
 * than "the model knows the policy."
 */

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'can',
  'do',
  'does',
  'for',
  'from',
  'has',
  'have',
  'in',
  'is',
  'it',
  'its',
  'new',
  'of',
  'on',
  'or',
  'place',
  'should',
  'than',
  'that',
  'the',
  'this',
  'to',
  'was',
  'were',
  'will',
  'with',
]);

const SYNONYMS: Record<string, string[]> = {
  block: ['blocked', 'hold'],
  blocked: ['block', 'hold'],
  hold: ['block', 'blocked'],
  overdue: ['past', 'aging'],
  past: ['overdue'],
  large: ['big', 'million', 'high-value'],
  big: ['large'],
  approve: ['approval', 'auto-approve'],
  approval: ['approve'],
  watchlist: ['watch', 'monitor'],
  customer: ['account'],
  account: ['customer'],
  invoice: ['invoices'],
  invoices: ['invoice'],
};

export type RetrievalCitation = {
  sectionId: string;
  title: string;
  score: number;
  snippet: string;
};

export type RetrievalResult = {
  query: string;
  tokens: string[];
  citations: RetrievalCitation[];
};

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function expandTokens(tokens: string[]): Set<string> {
  const expanded = new Set<string>(tokens);

  for (const token of tokens) {
    const synonyms = SYNONYMS[token];
    if (synonyms) {
      for (const synonym of synonyms) {
        expanded.add(synonym);
      }
    }
  }

  return expanded;
}

function scoreSection(section: PolicySection, queryTokens: Set<string>): number {
  const sectionText = `${section.title} ${section.body} ${section.keywords.join(' ')}`;
  const sectionTokens = new Set(tokenize(sectionText));

  // Explicit keywords get double weight.
  const keywordSet = new Set(section.keywords.map((kw) => kw.toLowerCase()));

  let score = 0;
  for (const token of queryTokens) {
    if (sectionTokens.has(token)) {
      score += keywordSet.has(token) ? 2 : 1;
    }
  }

  return score;
}

function snippetFor(section: PolicySection, max = 160): string {
  if (section.body.length <= max) {
    return section.body;
  }

  return `${section.body.slice(0, max - 1)}…`;
}

export function retrievePolicySections(query: string, limit = 3): RetrievalResult {
  const tokens = tokenize(query);
  const expanded = expandTokens(tokens);

  const scored = creditPolicyDocument
    .map((section) => ({
      section,
      score: scoreSection(section, expanded),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.section.id.localeCompare(b.section.id);
    })
    .slice(0, limit);

  const citations: RetrievalCitation[] = scored.map(({ section, score }) => ({
    sectionId: section.id,
    title: section.title,
    score,
    snippet: snippetFor(section),
  }));

  return { query, tokens, citations };
}

/**
 * Compose a deterministic "with retrieval" answer that cites every
 * retrieved section by id. Pedagogically this is the entire point: the
 * answer is grounded in concrete sections, not free-floating model
 * knowledge.
 */
export function composeCitedAnswer(
  result: RetrievalResult,
  conclusion: string,
): string {
  if (result.citations.length === 0) {
    return `No matching policy sections were found. Conclusion: ${conclusion}`;
  }

  const cites = result.citations
    .map((citation) => `Per [${citation.sectionId}] ${citation.title}: ${citation.snippet}`)
    .join('\n\n');

  return `${cites}\n\nConclusion: ${conclusion}`;
}

/**
 * The "without retrieval" baseline answer the lab compares against.
 * Intentionally generic and uncitable.
 */
export function composeUncitedAnswer(query: string): string {
  return [
    `Without retrieval, the agent must rely on whatever it absorbed during training.`,
    `For "${query}", the answer might cover credit limits, account status, and overdue`,
    `invoices in general terms, but it cannot point to a specific paragraph of policy`,
    `or guarantee its phrasing matches the document the credit team actually maintains.`,
  ].join(' ');
}
