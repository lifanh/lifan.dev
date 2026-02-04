import { MousePointerClick } from 'lucide-react';
import type { ReactNode } from 'react';

interface TryItYourselfProps {
  children: ReactNode;
}

export function TryItYourself({ children }: TryItYourselfProps) {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5 my-6">
      <div className="flex items-center gap-2 text-green-700 dark:text-green-300 text-sm font-semibold mb-2">
        <MousePointerClick className="w-4 h-4" />
        TRY IT YOURSELF
      </div>
      <div className="text-slate-800 dark:text-slate-200">{children}</div>
    </div>
  );
}
