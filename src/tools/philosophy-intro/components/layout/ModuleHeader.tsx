import { Clock, Target } from 'lucide-react';
import type { Module } from '../../types/module';

interface ModuleHeaderProps {
  module: Module;
}

export function ModuleHeader({ module }: ModuleHeaderProps) {
  return (
    <header className="mb-8">
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
        Part {module.part}: {module.partTitle}
      </div>
      <h1 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
        Module {module.id}: {module.title}
      </h1>
      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6">
        {module.description}
      </p>

      <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{module.estimatedTime} min</span>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white mb-4">
          <Target className="w-4 h-4 text-blue-500" />
          Learning Objectives
        </h2>
        <ul className="space-y-2">
          {module.objectives.map((objective, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-medium">
                {index + 1}
              </span>
              {objective}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
