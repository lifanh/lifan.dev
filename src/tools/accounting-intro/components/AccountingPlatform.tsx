import { Loader2, Menu, X } from 'lucide-react';
import { lazy, Suspense, useState } from 'react';
import { useProgressStore } from '../store';
import { MODULES } from '../types/module';
import { ModuleHeader, ModuleNavigation, ProgressBar } from './layout';

// Lazy load all module content for better code splitting
const Module1Content = lazy(() => import('../content/Module1Content').then(m => ({ default: m.Module1Content })));
const Module2Content = lazy(() => import('../content/Module2Content').then(m => ({ default: m.Module2Content })));
const Module3Content = lazy(() => import('../content/Module3Content').then(m => ({ default: m.Module3Content })));
const Module4Content = lazy(() => import('../content/Module4Content').then(m => ({ default: m.Module4Content })));
const Module5Content = lazy(() => import('../content/Module5Content').then(m => ({ default: m.Module5Content })));
const Module6Content = lazy(() => import('../content/Module6Content').then(m => ({ default: m.Module6Content })));
const Module7Content = lazy(() => import('../content/Module7Content').then(m => ({ default: m.Module7Content })));
const Module8Content = lazy(() => import('../content/Module8Content').then(m => ({ default: m.Module8Content })));
const Module9Content = lazy(() => import('../content/Module9Content').then(m => ({ default: m.Module9Content })));
const Module10Content = lazy(() => import('../content/Module10Content').then(m => ({ default: m.Module10Content })));
const Module11Content = lazy(() => import('../content/Module11Content').then(m => ({ default: m.Module11Content })));
const Module12Content = lazy(() => import('../content/Module12Content').then(m => ({ default: m.Module12Content })));

function ModuleLoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <span className="ml-3 text-slate-600 dark:text-slate-400">Loading module...</span>
    </div>
  );
}

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
      case 7:
        return <Module7Content />;
      case 8:
        return <Module8Content />;
      case 9:
        return <Module9Content />;
      case 10:
        return <Module10Content />;
      case 11:
        return <Module11Content />;
      case 12:
        return <Module12Content />;
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
            className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
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
            <button
              type="button"
              className="fixed inset-0 z-20 bg-black/50 lg:hidden cursor-default"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={(e) => e.key === 'Escape' && setSidebarOpen(false)}
              aria-label="Close navigation"
            />
          )}

          {/* Main Content */}
          <main className="min-w-0">
            {currentModule && <ModuleHeader module={currentModule} />}

            <div key={progress.currentModule} className="prose prose-slate dark:prose-invert max-w-none animate-fade-in">
              <Suspense fallback={<ModuleLoadingFallback />}>
                {renderModuleContent()}
              </Suspense>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => handleModuleSelect(Math.max(1, progress.currentModule - 1))}
                disabled={progress.currentModule === 1}
                className="px-4 py-3 min-h-[44px] text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous Module
              </button>
              <button
                onClick={() => handleModuleSelect(Math.min(MODULES.length, progress.currentModule + 1))}
                disabled={progress.currentModule === MODULES.length}
                className="px-4 py-3 min-h-[44px] text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
