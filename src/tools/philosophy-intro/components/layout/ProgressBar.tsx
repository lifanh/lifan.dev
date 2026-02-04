import { useProgressStore } from '../../store';
import { MODULES } from '../../types/module';

export function ProgressBar() {
  const { progress } = useProgressStore();
  const totalModules = MODULES.length;
  const completedCount = progress.completedModules.length;
  const percentage = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Course progress: ${percentage}%`}
        />
      </div>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
        {percentage}% Complete
      </span>
    </div>
  );
}
