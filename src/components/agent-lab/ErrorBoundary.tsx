import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  /** Optional fallback renderer; defaults to a friendly recovery card. */
  fallback?: (props: { error: Error; reset: () => void }) => ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

/**
 * Catches unexpected render-time errors inside the lab and shows a
 * recovery UI instead of an unmounted page. Runtime agent errors are
 * already turned into trace `error` events by the runner; this boundary
 * is a defense-in-depth net for component bugs.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (typeof console !== 'undefined') {
      console.error('Agent Lab error boundary caught:', error, info);
    }
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback({ error: this.state.error, reset: this.reset });
      }

      return (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-5 dark:border-amber-700/50 dark:bg-amber-950/30">
          <div className="flex items-start gap-3">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold text-amber-900 dark:text-amber-200">
                Agent Lab hit an unexpected error
              </h2>
              <p className="mt-1 text-sm leading-6 text-amber-900 dark:text-amber-200">
                The page is still loaded; you can reset the lab without refreshing.
              </p>
              <details className="mt-2 text-xs text-amber-900 dark:text-amber-200">
                <summary className="cursor-pointer">Error details</summary>
                <pre className="mt-1 max-h-48 overflow-auto rounded bg-amber-100 p-2 dark:bg-amber-900/40">
                  {this.state.error.message}
                </pre>
              </details>
              <button
                type="button"
                onClick={this.reset}
                className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-amber-700/40 bg-white px-3 py-2 text-sm font-medium text-amber-900 transition-colors motion-reduce:transition-none hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600  dark:border-amber-700/50 dark:bg-slate-900 dark:text-amber-200 dark:hover:bg-slate-800"
              >
                <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                Reset lab
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
