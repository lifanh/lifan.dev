import { Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCalculatorStore } from '../../../store';
import type { CashFlowData, CashFlowItem } from '../../../types';
import { PDFExport } from '../../export/index';

type CashFlowCategory = CashFlowItem['category'];

type CashFlowType = CashFlowItem['type'];

interface CashFlowInput {
  id: string;
  name: string;
  amount: string;
  type: CashFlowType;
  category: CashFlowCategory;
  month: number;
}

const CATEGORIES: { value: CashFlowCategory; label: string }[] = [
  { value: 'operating', label: 'Operating' },
  { value: 'investing', label: 'Investing' },
  { value: 'financing', label: 'Financing' },
];

const TYPES: { value: CashFlowType; label: string }[] = [
  { value: 'inflow', label: 'Inflow' },
  { value: 'outflow', label: 'Outflow' },
];

const MONTHS: { value: number; label: string }[] = [
  { value: 1, label: 'Jan' },
  { value: 2, label: 'Feb' },
  { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' },
  { value: 5, label: 'May' },
  { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' },
  { value: 8, label: 'Aug' },
  { value: 9, label: 'Sep' },
  { value: 10, label: 'Oct' },
  { value: 11, label: 'Nov' },
  { value: 12, label: 'Dec' },
];

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function getDefaultYear(): number {
  return new Date().getFullYear();
}

export function CashFlowForecaster() {
  const stored = useCalculatorStore((s) => s.data.cashFlowForecast);
  const setCashFlow = useCalculatorStore((s) => s.setCashFlow);
  const clearCalculator = useCalculatorStore((s) => s.clearCalculator);

  const [initialized, setInitialized] = useState(false);

  const [year, setYear] = useState<number>(getDefaultYear());
  const [startingBalance, setStartingBalance] = useState<string>('');
  const [items, setItems] = useState<CashFlowInput[]>([
    {
      id: generateId(),
      name: '',
      amount: '',
      type: 'inflow',
      category: 'operating',
      month: 1,
    },
  ]);

  useEffect(() => {
    if (initialized) return;

    if (stored) {
      setYear(stored.year);
      setStartingBalance(String(stored.startingBalance));
      setItems(
        stored.items.length > 0
          ? stored.items.map((i) => ({
              id: i.id,
              name: i.name,
              amount: String(i.amount),
              type: i.type,
              category: i.category,
              month: i.month,
            }))
          : [
              {
                id: generateId(),
                name: '',
                amount: '',
                type: 'inflow',
                category: 'operating',
                month: 1,
              },
            ]
      );
    }

    setInitialized(true);
  }, [initialized, stored]);

  const forecast = useMemo(() => {
    const start = parseFloat(startingBalance) || 0;

    let running = start;

    return MONTHS.map((m) => {
      const monthItems = items.filter((i) => i.month === m.value);
      const inflow = monthItems
        .filter((i) => i.type === 'inflow')
        .reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);
      const outflow = monthItems
        .filter((i) => i.type === 'outflow')
        .reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);

      const net = inflow - outflow;
      running += net;

      return {
        month: m.label,
        inflow,
        outflow,
        net,
        ending: running,
      };
    });
  }, [items, startingBalance]);

  const minEnding = useMemo(() => {
    if (forecast.length === 0) return 0;
    return Math.min(...forecast.map((f) => f.ending));
  }, [forecast]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: generateId(),
        name: '',
        amount: '',
        type: 'inflow',
        category: 'operating',
        month: 1,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof CashFlowInput, value: string | number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleSave = () => {
    const data: CashFlowData = {
      startingBalance: parseFloat(startingBalance) || 0,
      year,
      items: items.map((i) => ({
        id: i.id,
        name: i.name || 'Cash Flow',
        amount: parseFloat(i.amount) || 0,
        type: i.type,
        category: i.category,
        month: i.month,
      })),
    };

    setCashFlow(data);
  };

  const handleReset = () => {
    setYear(getDefaultYear());
    setStartingBalance('');
    setItems([
      {
        id: generateId(),
        name: '',
        amount: '',
        type: 'inflow',
        category: 'operating',
        month: 1,
      },
    ]);
    clearCalculator('cashFlowForecast');
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-semibold text-slate-900 dark:text-white">Cash Flow Forecaster</h3>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <PDFExport
            data={{
              year,
              startingBalance: parseFloat(startingBalance) || 0,
              items: items.map((i) => ({
                name: i.name || 'Cash Flow',
                amount: parseFloat(i.amount) || 0,
                type: i.type,
                category: i.category,
                month: i.month,
              })),
              totals: {
                netCashFlow: forecast.reduce((sum, f) => sum + f.net, 0),
                endingBalance: forecast[forecast.length - 1]?.ending || 0,
              },
            }}
            type="cash-flow"
            title={`Cash Flow Forecast - ${year}`}
          />
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            type="button"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
            type="button"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              htmlFor="cash-flow-starting-balance"
            >
              Starting balance
            </label>
            <input
              id="cash-flow-starting-balance"
              aria-label="Starting balance"
              type="number"
              placeholder="$0"
              value={startingBalance}
              onChange={(e) => setStartingBalance(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              htmlFor="cash-flow-year"
            >
              Year
            </label>
            <input
              id="cash-flow-year"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value, 10) || getDefaultYear())}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-slate-900 dark:text-white">Cash flows</h4>
            <button
              onClick={addItem}
              className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              type="button"
            >
              <Plus className="w-4 h-4" />
              Add item
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[88px_110px_120px_1fr_140px_auto] gap-2 items-start">
                <select
                  value={item.month}
                  onChange={(e) => updateItem(item.id, 'month', parseInt(e.target.value, 10))}
                  className="px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>

                <select
                  value={item.type}
                  onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                  className="px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>

                <select
                  value={item.category}
                  onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                  className="px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Description"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  className="px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                  type="number"
                  aria-label={`Cash flow amount ${index + 1}`}
                  placeholder="$0"
                  value={item.amount}
                  onChange={(e) => updateItem(item.id, 'amount', e.target.value)}
                  className="px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  type="button"
                  aria-label="Remove cash flow item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-slate-900 dark:text-white">12-month forecast</h4>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Lowest balance: <span className={minEnding < 0 ? 'text-red-600 dark:text-red-400 font-medium' : 'font-medium'}>{formatCurrency(minEnding)}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-white dark:bg-slate-800">
                  <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold">Month</th>
                  <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-right font-semibold">Inflow</th>
                  <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-right font-semibold">Outflow</th>
                  <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-right font-semibold">Net</th>
                  <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-right font-semibold">Ending</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                {forecast.map((row, idx) => (
                  <tr key={row.month} className={idx % 2 === 1 ? 'bg-white/50 dark:bg-slate-800/50' : undefined}>
                    <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">{row.month}</td>
                    <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-right text-green-600 dark:text-green-400">{formatCurrency(row.inflow)}</td>
                    <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-right text-red-600 dark:text-red-400">{formatCurrency(row.outflow)}</td>
                    <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-right">{formatCurrency(row.net)}</td>
                    <td className={`border border-slate-200 dark:border-slate-700 px-3 py-2 text-right ${row.ending < 0 ? 'text-red-600 dark:text-red-400 font-medium' : ''}`}>{formatCurrency(row.ending)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {minEnding < 0 && (
            <p className="mt-4 text-sm text-red-700 dark:text-red-300">
              Warning: your forecast goes negative at least once. Consider reducing outflows or adding financing.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
