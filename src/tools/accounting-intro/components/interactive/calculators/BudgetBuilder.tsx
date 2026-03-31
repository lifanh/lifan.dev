import { Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCalculatorStore } from '../../../store';
import type { BudgetData, ExpenseCategory } from '../../../types';
import { PDFExport } from '../../export/index';

type BudgetMethodology = BudgetData['methodology'];

interface BudgetItemInput {
  id: string;
  category: ExpenseCategory;
  planned: string;
  actual: string;
}

const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: 'housing', label: 'Housing' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'food', label: 'Food' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'personal', label: 'Personal' },
  { value: 'debt-payments', label: 'Debt Payments' },
  { value: 'savings', label: 'Savings' },
  { value: 'other', label: 'Other' },
];

const METHODOLOGIES: { value: BudgetMethodology; label: string }[] = [
  { value: 'traditional', label: 'Traditional' },
  { value: 'zero-based', label: 'Zero-based' },
  { value: '50-30-20', label: '50/30/20' },
  { value: 'envelope', label: 'Envelope' },
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

function getDefaultMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

export function BudgetBuilder() {
  const stored = useCalculatorStore((s) => s.data.budget);
  const setBudget = useCalculatorStore((s) => s.setBudget);
  const clearCalculator = useCalculatorStore((s) => s.clearCalculator);

  const [initialized, setInitialized] = useState(false);

  const [month, setMonth] = useState<string>(getDefaultMonth());
  const [methodology, setMethodology] = useState<BudgetMethodology>('traditional');
  const [income, setIncome] = useState<string>('');
  const [items, setItems] = useState<BudgetItemInput[]>([
    { id: generateId(), category: 'housing', planned: '', actual: '' },
  ]);

  useEffect(() => {
    if (initialized) return;

    if (stored) {
      setMonth(stored.month);
      setMethodology(stored.methodology);
      setIncome(String(stored.income));
      setItems(
        stored.items.length > 0
          ? stored.items.map((i) => ({
              id: i.id,
              category: i.category,
              planned: String(i.planned),
              actual: String(i.actual),
            }))
          : [{ id: generateId(), category: 'housing', planned: '', actual: '' }]
      );
    }

    setInitialized(true);
  }, [initialized, stored]);

  const totals = useMemo(() => {
    const incomeValue = parseFloat(income) || 0;
    const planned = items.reduce((sum, i) => sum + (parseFloat(i.planned) || 0), 0);
    const actual = items.reduce((sum, i) => sum + (parseFloat(i.actual) || 0), 0);

    const plannedRemaining = incomeValue - planned;
    const actualRemaining = incomeValue - actual;

    return {
      incomeValue,
      planned,
      actual,
      plannedRemaining,
      actualRemaining,
      variance: actual - planned,
    };
  }, [income, items]);

  const addItem = () => {
    setItems([...items, { id: generateId(), category: 'other', planned: '', actual: '' }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof BudgetItemInput, value: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const handleSave = () => {
    const data: BudgetData = {
      income: parseFloat(income) || 0,
      month,
      methodology,
      items: items.map((i) => ({
        id: i.id,
        category: i.category,
        planned: parseFloat(i.planned) || 0,
        actual: parseFloat(i.actual) || 0,
      })),
    };

    setBudget(data);
  };

  const handleReset = () => {
    setMonth(getDefaultMonth());
    setMethodology('traditional');
    setIncome('');
    setItems([{ id: generateId(), category: 'housing', planned: '', actual: '' }]);
    clearCalculator('budget');
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-semibold text-slate-900 dark:text-white">Budget Builder</h3>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <PDFExport
            data={{
              month,
              methodology,
              income: parseFloat(income) || 0,
              items: items.map((i) => ({
                category: i.category,
                planned: parseFloat(i.planned) || 0,
                actual: parseFloat(i.actual) || 0,
              })),
              totals,
            }}
            type="budget"
            title={`Budget - ${month}`}
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
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="budget-month">
              Month
            </label>
            <input
              id="budget-month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              htmlFor="budget-methodology"
            >
              Methodology
            </label>
            <select
              id="budget-methodology"
              value={methodology}
              onChange={(e) => setMethodology(e.target.value as BudgetMethodology)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {METHODOLOGIES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              htmlFor="budget-income"
            >
              Monthly income
            </label>
            <input
              id="budget-income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="$0"
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-slate-900 dark:text-white">Budget items</h4>
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
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[180px_150px_150px_auto] gap-2 items-start"
              >
                <select
                  value={item.category}
                  onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                  className="px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {EXPENSE_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  aria-label={`Planned amount ${index + 1}`}
                  placeholder="Planned"
                  value={item.planned}
                  onChange={(e) => updateItem(item.id, 'planned', e.target.value)}
                  className="px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                  type="number"
                  aria-label={`Actual amount ${index + 1}`}
                  placeholder="Actual"
                  value={item.actual}
                  onChange={(e) => updateItem(item.id, 'actual', e.target.value)}
                  className="px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  type="button"
                  aria-label="Remove budget item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <h4 className="font-medium text-slate-900 dark:text-white mb-4">Summary</h4>

          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Income</span>
              <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(totals.incomeValue)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total planned</span>
              <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(totals.planned)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total actual</span>
              <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(totals.actual)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Variance (actual − planned)</span>
              <span className={totals.variance <= 0 ? 'font-medium text-green-700 dark:text-green-300' : 'font-medium text-red-700 dark:text-red-300'}>
                {formatCurrency(totals.variance)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Planned remaining</span>
              <span className={totals.plannedRemaining >= 0 ? 'font-medium text-green-700 dark:text-green-300' : 'font-medium text-red-700 dark:text-red-300'}>
                {formatCurrency(totals.plannedRemaining)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Actual remaining</span>
              <span className={totals.actualRemaining >= 0 ? 'font-medium text-green-700 dark:text-green-300' : 'font-medium text-red-700 dark:text-red-300'}>
                {formatCurrency(totals.actualRemaining)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
