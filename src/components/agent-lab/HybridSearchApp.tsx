import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { creditPolicyDocument } from '../../data/agent-lab/creditPolicyDocument';
import {
  runAllSearchMethods,
  type SearchMethod,
  type SearchResult,
  type ScoredSection,
} from '../../lib/agent-lab/hybridSearch';
import { ErrorBoundary } from './ErrorBoundary';
import { LabChrome } from './LabChrome';

type HybridSearchAppProps = {
  initialQuery?: string;
};

const METHOD_BLURBS: Record<SearchMethod, { label: string; description: string }> = {
  keyword: {
    label: 'Keyword (BM25)',
    description: 'Classical lexical scorer. Strong on exact terms, weak on paraphrases.',
  },
  vector: {
    label: 'Vector (pseudo-embedding)',
    description:
      'Deterministic char-trigram bag, hashed to a 64-d unit vector with cosine similarity. Stand-in for a real embedding so the lesson is reproducible.',
  },
  hybrid: {
    label: 'Hybrid (RRF)',
    description: 'Reciprocal Rank Fusion of the keyword and vector lists; no score normalisation needed.',
  },
  rerank: {
    label: 'Hybrid + rerank',
    description:
      'Toy cross-encoder reranks the hybrid top-k by query/title overlap, tie-broken by hybrid score.',
  },
};

const SAMPLE_QUERIES = [
  'million dollar order threshold',
  'client on hold pending review',
  'overdue invoice escalation',
  'auto approve safe path',
  'watchlist accounts',
];

export default function HybridSearchApp({
  initialQuery = 'client on hold pending review',
}: HybridSearchAppProps) {
  const [query, setQuery] = useState(initialQuery);
  const [includeRerank, setIncludeRerank] = useState(true);

  const results = useMemo(() => runAllSearchMethods(query), [query]);

  const visibleMethods: SearchMethod[] = includeRerank
    ? ['keyword', 'vector', 'hybrid', 'rerank']
    : ['keyword', 'vector', 'hybrid'];

  return (
    <ErrorBoundary>
      <div className="space-y-6">
      <LabChrome current={6} />
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-3 py-2">
          <p className="text-sm font-medium uppercase tracking-normal text-slate-500 dark:text-slate-400">
            Lab 6 · Retrieval signals, side by side
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-5xl">
            Hybrid search and reranking
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Run the same query through BM25, a deterministic pseudo-vector index, the reciprocal-rank-fusion
            hybrid, and a toy reranker. The point is structural, not numeric: each signal misses a different
            class of query, and the ranked lists rarely line up.
          </p>
        </header>

        <section
          aria-label="Query controls"
          className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
        >
          <label htmlFor="hybrid-query" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Query
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="hybrid-query"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-[44px] w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
                placeholder="Try a paraphrase, an exact policy id, or both"
              />
            </div>
            <button
              type="button"
              onClick={() => setIncludeRerank((current) => !current)}
              aria-pressed={includeRerank}
              className={`min-h-[44px] rounded-lg border px-4 text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                includeRerank
                  ? 'border-blue-400 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-slate-700 dark:text-slate-50'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {includeRerank ? 'Rerank: on' : 'Rerank: off'}
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {SAMPLE_QUERIES.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setQuery(sample)}
                aria-pressed={query === sample}
                className="min-h-[36px] rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {sample}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {visibleMethods.map((method) => (
            <MethodColumn key={method} result={results[method]} />
          ))}
        </section>

        <section
          aria-label="Source policy document"
          className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">Source policy</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            The same eight sections used across the Agent Lab RAG demo. No external corpus, no hidden state.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            {creditPolicyDocument.map((section) => (
              <li key={section.id} className="rounded-md border border-slate-200 p-3 dark:border-slate-700">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">
                    [{section.id}] {section.title}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">{section.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      </div>
    </ErrorBoundary>
  );
}

function MethodColumn({ result }: { result: SearchResult }) {
  const blurb = METHOD_BLURBS[result.method];
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      <header>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">{blurb.label}</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{blurb.description}</p>
      </header>
      <ol className="mt-4 space-y-2" aria-label={`${blurb.label} ranked results`}>
        {result.ranked.length === 0 && (
          <li className="rounded-md border border-dashed border-slate-300 p-3 text-xs text-slate-500 dark:border-slate-600 dark:text-slate-400">
            No matching sections.
          </li>
        )}
        {result.ranked.map((entry, index) => (
          <ResultRow key={entry.sectionId} entry={entry} rank={index + 1} />
        ))}
      </ol>
    </article>
  );
}

function ResultRow({ entry, rank }: { entry: ScoredSection; rank: number }) {
  return (
    <li className="rounded-md border border-slate-200 p-3 dark:border-slate-700">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
          #{rank} · [{entry.sectionId}] {entry.title}
        </span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-700 dark:bg-slate-700 dark:text-slate-200">
          {entry.score}
        </span>
      </div>
      {entry.detail && (
        <dl className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
          {Object.entries(entry.detail).map(([key, value]) => (
            <div key={key} className="flex gap-1">
              <dt className="font-mono">{key}:</dt>
              <dd className="font-mono">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
}
