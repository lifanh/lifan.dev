import { Quote } from 'lucide-react';

interface QuoteBlockProps {
  quote: string;
  author: string;
  source?: string;
}

export function QuoteBlock({ quote, author, source }: QuoteBlockProps) {
  return (
    <blockquote className="border-l-4 border-slate-300 dark:border-slate-600 pl-6 py-4 my-6 bg-slate-50 dark:bg-slate-800/50 rounded-r-lg">
      <Quote className="w-5 h-5 text-slate-400 dark:text-slate-500 mb-3" />
      <p className="text-slate-700 dark:text-slate-300 italic text-lg mb-3">
        "{quote}"
      </p>
      <footer className="text-sm text-slate-600 dark:text-slate-400">
        <cite className="font-medium not-italic">{author}</cite>
        {source && <span className="ml-1">— {source}</span>}
      </footer>
    </blockquote>
  );
}
