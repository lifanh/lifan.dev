import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Module1Content } from '../content/Module1Content';
import { Module2Content } from '../content/Module2Content';
import { Module3Content } from '../content/Module3Content';
import { Module4Content } from '../content/Module4Content';
import { Module5Content } from '../content/Module5Content';
import { Module6Content } from '../content/Module6Content';
import { useProgressStore } from '../store';
import { MODULES } from '../types/module';
import { ModuleHeader, ModuleNavigation, ProgressBar } from './layout';

export function AccountingPlatform() {
  const { progress, setCurrentModule } = useProgressStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentModule = MODULES.find((m) => m.id === progress.currentModule);

  const handleModuleSelect = (moduleId: number) => {
    setCurrentModule(moduleId);
    setSidebarOpen(false);
  };

  const renderModuleContent = () => {
    switch (progress.currentModule) {
      case 1:
        return <Module1Content />;
      case 2:
        return <Module2Content />;
      case 3:
        return <Module3Content />;
      case 4:
        return <Module4Content />;
      case 5:
        return <Module5Content />;
      case 6:
        return <Module6Content />;
      default:
        return (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <p className="text-lg">This module is coming soon!</p>
            <p className="mt-2">Check back later for more content.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Top Progress Bar */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1">
            <ProgressBar />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Sidebar */}
          <aside
            className={`
              fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700
              transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 lg:w-auto lg:border-0 lg:bg-transparent
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              pt-20 lg:pt-0 px-4 lg:px-0 overflow-y-auto
            `}
          >
            <div className="lg:sticky lg:top-20">
              <ModuleNavigation
                currentModule={progress.currentModule}
                onModuleSelect={handleModuleSelect}
              />
            </div>
          </aside>

          {/* Backdrop for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-20 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="min-w-0">
            {currentModule && <ModuleHeader module={currentModule} />}

            <div className="prose prose-slate dark:prose-invert max-w-none">
              {renderModuleContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => handleModuleSelect(Math.max(1, progress.currentModule - 1))}
                disabled={progress.currentModule === 1}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous Module
              </button>
              <button
                onClick={() => handleModuleSelect(Math.min(MODULES.length, progress.currentModule + 1))}
                disabled={progress.currentModule === MODULES.length}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next Module →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
