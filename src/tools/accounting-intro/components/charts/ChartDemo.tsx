import { Suspense } from 'react';
import { useCalculatorStore } from '../../../store/useCalculatorStore';
import { BarChart, LineChart, PieChart } from './index';

export function ChartDemo() {
  const { data } = useCalculatorStore();

  // Sample data for demonstration
  const expenseData = [
    { name: 'Housing', value: 1500, color: '#3b82f6' },
    { name: 'Food', value: 600, color: '#10b981' },
    { name: 'Transportation', value: 400, color: '#f59e0b' },
    { name: 'Utilities', value: 200, color: '#ef4444' },
    { name: 'Entertainment', value: 300, color: '#8b5cf6' },
  ];

  const monthlyData = [
    { month: 'Jan', income: 5000, expenses: 3500 },
    { month: 'Feb', income: 5200, expenses: 3300 },
    { month: 'Mar', income: 5000, expenses: 3600 },
    { month: 'Apr', income: 5500, expenses: 3400 },
    { month: 'May', income: 5300, expenses: 3200 },
    { month: 'Jun', income: 5400, expenses: 3500 },
  ];

  const netWorthData = [
    { month: 'Jan', netWorth: 45000 },
    { month: 'Feb', netWorth: 46200 },
    { month: 'Mar', netWorth: 47600 },
    { month: 'Apr', netWorth: 49200 },
    { month: 'May', netWorth: 51000 },
    { month: 'Jun', netWorth: 52500 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Chart Components Demo
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          These charts demonstrate the lazy-loaded chart components using Recharts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Suspense fallback={
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
              <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        }>
          <PieChart
            data={expenseData}
            title="Expense Breakdown"
          />
        </Suspense>

        <Suspense fallback={
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
              <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        }>
          <BarChart
            data={monthlyData}
            title="Monthly Income vs Expenses"
            dataKey="income"
            xAxisKey="month"
            color="#3b82f6"
          />
        </Suspense>
      </div>

      <div>
        <Suspense fallback={
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
              <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        }>
          <LineChart
            data={netWorthData}
            title="Net Worth Trend"
            dataKey="netWorth"
            xAxisKey="month"
            color="#10b981"
          />
        </Suspense>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
        <h4 className="font-medium text-slate-900 dark:text-white mb-2">About Chart Components</h4>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
          <li>• All chart components are lazy-loaded to reduce initial bundle size</li>
          <li>• Charts use Recharts library for responsive, interactive visualizations</li>
          <li>• Dark mode support with automatic theme detection</li>
          <li>• Customizable colors and styling through props</li>
        </ul>
      </div>
    </div>
  );
}
