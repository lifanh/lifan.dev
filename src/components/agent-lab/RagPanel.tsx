import { BookOpen, Quote, Search, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { creditPolicyDocument } from '../../data/agent-lab/creditPolicyDocument';
import {
  composeCitedAnswer,
  composeUncitedAnswer,
  retrievePolicySections,
  type RetrievalResult,
} from '../../lib/agent-lab/retrieval';

type RagPanelProps = {
  /** The active scenario's user request, used as the default query. */
  defaultQuery: string;
  /** A short conclusion derived from the agent run, threaded into the cited answer. */
  scenarioConclusion: string;
};

/**
 * RAG mini-lab.
 *
 * Side-by-side comparison of an uncited baseline answer and a retrieval-grounded
 * answer that cites specific policy sections by id. The retrieval is deterministic
 * keyword matching — no embeddings or vector database — so the lesson is about
 * citations and grounding, not about cosine similarity.
 */
export function RagPanel({ defaultQuery, scenarioConclusion }: RagPanelProps) {
  const [query, setQuery] = useState(defaultQuery);

  const result: RetrievalResult = useMemo(() => retrievePolicySections(query), [query]);
  const cited = useMemo(() => composeCitedAnswer(result, scenarioConclusion), [result, scenarioConclusion]);
  const uncited = useMemo(() => composeUncitedAnswer(query), [query]);

  const citedSectionIds = new Set(result.citations.map((citation) => citation.sectionId));

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-50">
          <Search className="h-4 w-4" aria-hidden="true" />
          Query
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Edit the query to see how retrieval picks different sections. The "without
          retrieval" answer stays generic; the "with retrieval" answer cites every
          section it leaned on.
        </p>
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          rows={2}
          className="mt-3 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
        />
        {result.tokens.length > 0 && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Tokens scored: {result.tokens.join(', ')}
          </p>
        )}
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <AnswerCard tone="without" title="Without retrieval" body={uncited} />
        <AnswerCard
          tone="with"
          title="With retrieval"
          body={cited}
          citationCount={result.citations.length}
        />
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-50">
          <Quote className="h-4 w-4" aria-hidden="true" />
          Retrieved sections
        </h3>
        {result.citations.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            No section scored above zero against the current query. Try a query that
            mentions blocked accounts, overdue invoices, watchlist, or large orders.
          </p>
        ) : (
          <ol className="mt-3 space-y-2">
            {result.citations.map((citation) => (
              <li
                key={citation.sectionId}
                className="rounded-lg border border-blue-200 bg-blue-50/60 p-3 dark:border-blue-800/40 dark:bg-blue-950/30"
              >
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-blue-900 dark:text-blue-200">
                  <code className="rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-900/60">
                    {citation.sectionId}
                  </code>
                  <span>score: {citation.score}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-50">
                  {citation.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {citation.snippet}
                </p>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-50">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Credit policy document
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
          The full source the retriever indexes. Sections used by the current query
          are highlighted.
        </p>
        <ol className="mt-3 space-y-2">
          {creditPolicyDocument.map((section) => {
            const isCited = citedSectionIds.has(section.id);

            return (
              <li
                key={section.id}
                className={`rounded-lg border p-3 ${
                  isCited
                    ? 'border-blue-300 bg-blue-50/60 dark:border-blue-700/50 dark:bg-blue-950/30'
                    : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <code
                    className={`rounded px-1.5 py-0.5 ${
                      isCited
                        ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/60 dark:text-blue-200'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {section.id}
                  </code>
                  {isCited && (
                    <span className="inline-flex items-center gap-1 text-blue-800 dark:text-blue-300">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      cited
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-50">
                  {section.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {section.body}
                </p>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

function AnswerCard({
  tone,
  title,
  body,
  citationCount,
}: {
  tone: 'with' | 'without';
  title: string;
  body: string;
  citationCount?: number;
}) {
  return (
    <section
      className={`rounded-lg border p-4 ${
        tone === 'with'
          ? 'border-blue-200 bg-blue-50/40 dark:border-blue-800/40 dark:bg-blue-950/20'
          : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">{title}</h4>
        {typeof citationCount === 'number' && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {citationCount} citation{citationCount === 1 ? '' : 's'}
          </span>
        )}
      </div>
      <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-white p-3 text-sm leading-6 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
        {body}
      </pre>
    </section>
  );
}
