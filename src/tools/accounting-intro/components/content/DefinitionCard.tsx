import { BookOpen } from 'lucide-react';

interface DefinitionCardProps {
  term: string;
  definition: string;
}

export function DefinitionCard({ term, definition }: DefinitionCardProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 my-6">
      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-2" aria-hidden="true">
        <BookOpen className="w-4 h-4" />
        DEFINITION
      </div>
      <p className="text-slate-800 dark:text-slate-200">
        <strong className="text-slate-900 dark:text-white">{term}:</strong>{' '}
        {definition}
      </p>
    </div>
  );
}
