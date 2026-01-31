import { Calculator, Plus, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { AssetCategory, LiabilityCategory } from '../../../types';

interface AssetInput {
  id: string;
  name: string;
  value: string;
  category: AssetCategory;
}

interface LiabilityInput {
  id: string;
  name: string;
  value: string;
  category: LiabilityCategory;
}

const ASSET_CATEGORIES: { value: AssetCategory; label: string }[] = [
  { value: 'cash', label: 'Cash & Bank Accounts' },
  { value: 'investments', label: 'Investments' },
  { value: 'property', label: 'Property' },
  { value: 'vehicles', label: 'Vehicles' },
  { value: 'other', label: 'Other Assets' },
];

const LIABILITY_CATEGORIES: { value: LiabilityCategory; label: string }[] = [
  { value: 'mortgage', label: 'Mortgage' },
  { value: 'auto-loan', label: 'Auto Loan' },
  { value: 'credit-card', label: 'Credit Card' },
  { value: 'student-loan', label: 'Student Loan' },
  { value: 'personal-loan', label: 'Personal Loan' },
  { value: 'other', label: 'Other Debt' },
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

export function NetWorthCalculator() {
  const [assets, setAssets] = useState<AssetInput[]>([
    { id: generateId(), name: 'Checking Account', value: '', category: 'cash' },
  ]);

  const [liabilities, setLiabilities] = useState<LiabilityInput[]>([
    { id: generateId(), name: 'Credit Card', value: '', category: 'credit-card' },
  ]);

  const addAsset = () => {
    setAssets([...assets, { id: generateId(), name: '', value: '', category: 'cash' }]);
  };

  const removeAsset = (id: string) => {
    if (assets.length > 1) {
      setAssets(assets.filter((a) => a.id !== id));
    }
  };

  const updateAsset = (id: string, field: keyof AssetInput, value: string) => {
    setAssets(assets.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const addLiability = () => {
    setLiabilities([...liabilities, { id: generateId(), name: '', value: '', category: 'other' }]);
  };

  const removeLiability = (id: string) => {
    if (liabilities.length > 1) {
      setLiabilities(liabilities.filter((l) => l.id !== id));
    }
  };

  const updateLiability = (id: string, field: keyof LiabilityInput, value: string) => {
    setLiabilities(liabilities.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const totals = useMemo(() => {
    const totalAssets = assets.reduce((sum, a) => sum + (parseFloat(a.value) || 0), 0);
    const totalLiabilities = liabilities.reduce((sum, l) => sum + (parseFloat(l.value) || 0), 0);
    const netWorth = totalAssets - totalLiabilities;
    return { totalAssets, totalLiabilities, netWorth };
  }, [assets, liabilities]);

  const reset = () => {
    setAssets([{ id: generateId(), name: 'Checking Account', value: '', category: 'cash' }]);
    setLiabilities([{ id: generateId(), name: 'Credit Card', value: '', category: 'credit-card' }]);
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">Net Worth Calculator</h3>
        </div>
        <button
          onClick={reset}
          className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Reset
        </button>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Assets Column */}
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Assets (What You Own)
            </h4>
            <div className="space-y-3">
              {assets.map((asset, index) => (
                <div key={asset.id} className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={asset.category}
                    onChange={(e) => updateAsset(asset.id, 'category', e.target.value)}
                    className="w-full sm:w-1/3 px-3 py-2.5 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label={`Asset ${index + 1} category`}
                  >
                    {ASSET_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2 flex-1">
                    <input
                      type="text"
                      placeholder="Name"
                      value={asset.name}
                      onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                      className="flex-1 px-3 py-2.5 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label={`Asset ${index + 1} name`}
                    />
                    <input
                      type="number"
                      placeholder="$0"
                      value={asset.value}
                      onChange={(e) => updateAsset(asset.id, 'value', e.target.value)}
                      className="w-24 sm:w-28 px-3 py-2.5 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label={`Asset ${index + 1} value`}
                    />
                    <button
                      onClick={() => removeAsset(asset.id)}
                      disabled={assets.length === 1}
                      className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Remove asset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addAsset}
                className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Plus className="w-4 h-4" />
                Add Asset
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600 dark:text-slate-400">Total Assets:</span>
                <span className="text-green-600 dark:text-green-400">{formatCurrency(totals.totalAssets)}</span>
              </div>
            </div>
          </div>

          {/* Liabilities Column */}
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              Liabilities (What You Owe)
            </h4>
            <div className="space-y-3">
              {liabilities.map((liability, index) => (
                <div key={liability.id} className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={liability.category}
                    onChange={(e) => updateLiability(liability.id, 'category', e.target.value)}
                    className="w-full sm:w-1/3 px-3 py-2.5 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label={`Liability ${index + 1} category`}
                  >
                    {LIABILITY_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2 flex-1">
                    <input
                      type="text"
                      placeholder="Name"
                      value={liability.name}
                      onChange={(e) => updateLiability(liability.id, 'name', e.target.value)}
                      className="flex-1 px-3 py-2.5 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label={`Liability ${index + 1} name`}
                    />
                    <input
                      type="number"
                      placeholder="$0"
                      value={liability.value}
                      onChange={(e) => updateLiability(liability.id, 'value', e.target.value)}
                      className="w-24 sm:w-28 px-3 py-2.5 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label={`Liability ${index + 1} value`}
                    />
                    <button
                      onClick={() => removeLiability(liability.id)}
                      disabled={liabilities.length === 1}
                      className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Remove liability"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addLiability}
                className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Plus className="w-4 h-4" />
                Add Liability
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-600 dark:text-slate-400">Total Liabilities:</span>
                <span className="text-red-600 dark:text-red-400">{formatCurrency(totals.totalLiabilities)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Worth Display */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Your Net Worth</p>
            <p
              className={`text-4xl font-bold ${
                totals.netWorth >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {formatCurrency(totals.netWorth)}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Assets ({formatCurrency(totals.totalAssets)}) − Liabilities ({formatCurrency(totals.totalLiabilities)})
            </p>
          </div>

          {/* Equation Visualization */}
          <div className="mt-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-3">
              The Accounting Equation in Action:
            </p>
            <div className="flex items-center justify-center gap-3 text-sm font-mono">
              <span className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                {formatCurrency(totals.totalAssets)}
              </span>
              <span className="text-slate-500">=</span>
              <span className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
                {formatCurrency(totals.totalLiabilities)}
              </span>
              <span className="text-slate-500">+</span>
              <span
                className={`px-3 py-2 rounded ${
                  totals.netWorth >= 0
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                }`}
              >
                {formatCurrency(totals.netWorth)}
              </span>
            </div>
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2">
              Assets = Liabilities + Equity (Net Worth)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
