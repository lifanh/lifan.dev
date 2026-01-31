import { Target } from 'lucide-react';
import type { ReactNode } from 'react';

interface TryItYourselfProps {
  children: ReactNode;
}

export function TryItYourself({ children }: TryItYourselfProps) {
  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 my-6">
      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-sm font-semibold mb-2">
        <Target className="w-4 h-4" />
        TRY IT YOURSELF
      </div>
      <div className="text-slate-800 dark:text-slate-200">{children}</div>
    </div>
  );
}
