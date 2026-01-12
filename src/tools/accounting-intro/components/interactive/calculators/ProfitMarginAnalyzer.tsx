import { RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  if (!Number.isFinite(value) || value === 0) return '0%';
  return `${Math.round(value * 1000) / 10}%`;
}

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

interface PercentControlProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function PercentControl({ id, label, value, onChange }: PercentControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <span className="text-sm font-medium text-slate-900 dark:text-white">{value.toFixed(1)}%</span>
      </div>
      <input
        id={id}
        aria-label={label}
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

export function ProfitMarginAnalyzer() {
  const [revenue, setRevenue] = useState<string>('500000');

  const [cogsPercent, setCogsPercent] = useState<number>(35);
  const [laborPercent, setLaborPercent] = useState<number>(30);
  const [rentPercent, setRentPercent] = useState<number>(12);
  const [utilitiesPercent, setUtilitiesPercent] = useState<number>(4.8);
  const [otherPercent, setOtherPercent] = useState<number>(16);

  const [targetProfit, setTargetProfit] = useState<string>('50000');

  const computed = useMemo(() => {
    const rev = parseFloat(revenue) || 0;

    const cogs = rev * (cogsPercent / 100);
    const labor = rev * (laborPercent / 100);
    const rent = rev * (rentPercent / 100);
    const utilities = rev * (utilitiesPercent / 100);
    const other = rev * (otherPercent / 100);

    const grossProfit = rev - cogs;
    const totalExpenses = labor + rent + utilities + other;
    const netIncome = grossProfit - totalExpenses;

    const grossMargin = rev > 0 ? grossProfit / rev : 0;
    const netMargin = rev > 0 ? netIncome / rev : 0;

    const contributionMargin = 1 - (cogsPercent + laborPercent + rentPercent + utilitiesPercent + otherPercent) / 100;

    const target = parseFloat(targetProfit) || 0;
    const requiredRevenue = contributionMargin > 0 ? target / contributionMargin : null;

    return {
      rev,
      cogs,
      grossProfit,
      labor,
      rent,
      utilities,
      other,
      totalExpenses,
      netIncome,
      grossMargin,
      netMargin,
      contributionMargin,
      requiredRevenue,
    };
  }, [
    revenue,
    cogsPercent,
    laborPercent,
    rentPercent,
    utilitiesPercent,
    otherPercent,
    targetProfit,
  ]);

  const reset = () => {
    setRevenue('500000');
    setCogsPercent(35);
    setLaborPercent(30);
    setRentPercent(12);
    setUtilitiesPercent(4.8);
    setOtherPercent(16);
    setTargetProfit('50000');
  };

  const totalPercent = useMemo(() => {
    return cogsPercent + laborPercent + rentPercent + utilitiesPercent + otherPercent;
  }, [cogsPercent, laborPercent, rentPercent, utilitiesPercent, otherPercent]);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-white">Profit Margin Analyzer</h3>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          type="button"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="p-6 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="profit-margin-revenue">
                Revenue
              </label>
              <input
                id="profit-margin-revenue"
                aria-label="Revenue"
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Total % allocated
              </p>
              <p className={totalPercent > 100 ? 'text-red-700 dark:text-red-300 text-2xl font-semibold' : 'text-slate-900 dark:text-white text-2xl font-semibold'}>
                {totalPercent.toFixed(1)}%
              </p>
              {totalPercent > 100 && (
                <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                  Your costs exceed revenue (total &gt; 100%). Reduce COGS or expenses.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <PercentControl id="profit-margin-cogs" label="COGS %" value={cogsPercent} onChange={(v) => setCogsPercent(clampPercent(v))} />
            <PercentControl id="profit-margin-labor" label="Labor %" value={laborPercent} onChange={(v) => setLaborPercent(clampPercent(v))} />
            <PercentControl id="profit-margin-rent" label="Rent %" value={rentPercent} onChange={(v) => setRentPercent(clampPercent(v))} />
            <PercentControl id="profit-margin-utilities" label="Utilities %" value={utilitiesPercent} onChange={(v) => setUtilitiesPercent(clampPercent(v))} />
            <PercentControl id="profit-margin-other" label="Other %" value={otherPercent} onChange={(v) => setOtherPercent(clampPercent(v))} />
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <h4 className="font-medium text-slate-900 dark:text-white mb-4">Real-time profitability</h4>

          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Revenue</span>
              <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(computed.rev)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">COGS</span>
              <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(computed.cogs)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Gross profit</span>
              <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(computed.grossProfit)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total operating expenses</span>
              <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(computed.totalExpenses)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Net income</span>
              <span className={computed.netIncome >= 0 ? 'font-medium text-green-700 dark:text-green-300' : 'font-medium text-red-700 dark:text-red-300'}>
                {formatCurrency(computed.netIncome)}
              </span>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Gross margin</span>
              <span className="font-medium text-slate-900 dark:text-white">{formatPercent(computed.grossMargin)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Net margin</span>
              <span className="font-medium text-slate-900 dark:text-white">{formatPercent(computed.netMargin)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <h4 className="font-medium text-slate-900 dark:text-white mb-4">Goal seek</h4>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="profit-margin-target">
                Target net income
              </label>
              <input
                id="profit-margin-target"
                aria-label="Target net income"
                type="number"
                value={targetProfit}
                onChange={(e) => setTargetProfit(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">Required revenue (approx)</p>
              <p className="text-xl font-semibold text-slate-900 dark:text-white">
                {computed.requiredRevenue === null ? 'N/A' : formatCurrency(computed.requiredRevenue)}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Assumes COGS and expenses stay at the same % of revenue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
