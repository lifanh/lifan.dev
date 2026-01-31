import { lazy } from 'react';

// Lazy load chart components to reduce bundle size
export const PieChart = lazy(() => import('./PieChart').then(module => ({ default: module.CustomPieChart })));
export const BarChart = lazy(() => import('./BarChart').then(module => ({ default: module.CustomBarChart })));
export const LineChart = lazy(() => import('./LineChart').then(module => ({ default: module.CustomLineChart })));
export const AreaChart = lazy(() => import('./AreaChart').then(module => ({ default: module.CustomAreaChart })));

// Chart wrapper component for loading states
interface ChartWrapperProps {
  children: React.ReactNode;
  title?: string;
}

export function ChartWrapper({ children, title }: ChartWrapperProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
      {children}
    </div>
  );
}
