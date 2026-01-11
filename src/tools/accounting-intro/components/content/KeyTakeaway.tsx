import { Lightbulb } from 'lucide-react';
import type { ReactNode } from 'react';

interface KeyTakeawayProps {
  children: ReactNode;
}

export function KeyTakeaway({ children }: KeyTakeawayProps) {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5 my-6">
      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 text-sm font-semibold mb-2">
        <Lightbulb className="w-4 h-4" />
        KEY TAKEAWAY
      </div>
      <div className="text-slate-800 dark:text-slate-200">{children}</div>
    </div>
  );
}
