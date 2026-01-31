import { BookOpen, CheckCircle2, Circle, FolderOpen } from 'lucide-react';
import { useProgressStore } from '../../store';
import { MODULES, PARTS } from '../../types/module';

interface ModuleNavigationProps {
  currentModule: number;
  onModuleSelect: (moduleId: number) => void;
}

export function ModuleNavigation({ currentModule, onModuleSelect }: ModuleNavigationProps) {
  const { progress } = useProgressStore();
  const { completedModules } = progress;

  const getModuleStatus = (moduleId: number) => {
    if (completedModules.includes(moduleId)) return 'completed';
    if (moduleId === currentModule) return 'current';
    return 'pending';
  };

  return (
    <nav className="w-full" aria-label="Module navigation">
      {PARTS.map((part) => (
        <div key={part.id} className="mb-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Part {part.id}: {part.title}
          </h3>
          <ul className="space-y-1">
            {part.modules.map((moduleId) => {
              const module = MODULES.find((m) => m.id === moduleId);
              if (!module) return null;

              const status = getModuleStatus(moduleId);
              const isActive = moduleId === currentModule;

              return (
                <li key={moduleId}>
                  <button
                    onClick={() => onModuleSelect(moduleId)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-lg text-left text-sm
                      transition-colors duration-150
                      ${isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    ) : status === 'current' ? (
                      <BookOpen className="w-5 h-5 text-blue-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
                    )}
                    <span className="truncate">
                      {moduleId}. {module.shortTitle}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
        <ul className="space-y-1">
          <li>
            <a
              href="/tools/accounting-intro/resources"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-slate-400" />
              Resources
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
