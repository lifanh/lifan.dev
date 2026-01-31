import { RotateCcw, Save, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCalculatorStore } from '../../../store';
import type { AssetCategory, LiabilityCategory } from '../../../types';
import { PDFExport } from '../../export/index';

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

function getLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function BalanceSheetBuilder() {
  const stored = useCalculatorStore((s) => s.data.balanceSheet);
  const setBalanceSheet = useCalculatorStore((s) => s.setBalanceSheet);
  const clearCalculator = useCalculatorStore((s) => s.clearCalculator);

  const [initialized, setInitialized] = useState(false);

  const [asOfDate, setAsOfDate] = useState<string>(getLocalDateString(new Date()));
  const [assets, setAssets] = useState<AssetInput[]>([
    { id: generateId(), name: 'Cash', value: '', category: 'cash' },
  ]);
  const [liabilities, setLiabilities] = useState<LiabilityInput[]>([
    { id: generateId(), name: 'Credit Card', value: '', category: 'credit-card' },
  ]);

  useEffect(() => {
    if (initialized) return;

    if (stored) {
      setAsOfDate(stored.asOfDate);

      setAssets(
        stored.assets.length > 0
          ? stored.assets.map((a) => ({
              id: a.id,
              name: a.name,
              value: String(a.value),
              category: a.category,
            }))
          : [{ id: generateId(), name: 'Cash', value: '', category: 'cash' }]
      );

      setLiabilities(
        stored.liabilities.length > 0
          ? stored.liabilities.map((l) => ({
              id: l.id,
              name: l.name,
              value: String(l.value),
              category: l.category,
            }))
          : [{ id: generateId(), name: 'Credit Card', value: '', category: 'credit-card' }]
      );
    }

    setInitialized(true);
  }, [initialized, stored]);

  const totals = useMemo(() => {
    const totalAssets = assets.reduce((sum, a) => sum + (parseFloat(a.value) || 0), 0);
    const totalLiabilities = liabilities.reduce((sum, l) => sum + (parseFloat(l.value) || 0), 0);
    const equity = totalAssets - totalLiabilities;
    return { totalAssets, totalLiabilities, equity };
  }, [assets, liabilities]);

  const addAsset = () => {
    setAssets([...assets, { id: generateId(), name: '', value: '', category: 'cash' }]);
  };

  const addLiability = () => {
    setLiabilities([...liabilities, { id: generateId(), name: '', value: '', category: 'other' }]);
  };

  const removeAsset = (id: string) => {
    if (assets.length > 1) {
      setAssets(assets.filter((a) => a.id !== id));
    }
  };

  const removeLiability = (id: string) => {
    if (liabilities.length > 1) {
      setLiabilities(liabilities.filter((l) => l.id !== id));
    }
  };

  const updateAsset = (id: string, field: keyof AssetInput, value: string) => {
    setAssets(assets.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const updateLiability = (id: string, field: keyof LiabilityInput, value: string) => {
    setLiabilities(liabilities.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const handleSave = () => {
    setBalanceSheet({
      asOfDate,
      assets: assets.map((a) => ({
        id: a.id,
        name: a.name || 'Asset',
        value: parseFloat(a.value) || 0,
        category: a.category,
      })),
      liabilities: liabilities.map((l) => ({
        id: l.id,
        name: l.name || 'Liability',
        value: parseFloat(l.value) || 0,
        category: l.category,
      })),
    });
  };

  const handleReset = () => {
    setAsOfDate(getLocalDateString(new Date()));
    setAssets([{ id: generateId(), name: 'Cash', value: '', category: 'cash' }]);
    setLiabilities([{ id: generateId(), name: 'Credit Card', value: '', category: 'credit-card' }]);
    clearCalculator('balanceSheet');
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-semibold text-slate-900 dark:text-white">Balance Sheet Builder</h3>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <PDFExport
            data={{
              assets: assets.map((a) => ({ name: a.name || 'Asset', value: parseFloat(a.value) || 0 })),
              liabilities: liabilities.map((l) => ({ name: l.name || 'Liability', value: parseFloat(l.value) || 0 })),
              totals,
              asOfDate,
            }}
            type="balance-sheet"
            title={`Balance Sheet - ${asOfDate}`}
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
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            type="button"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="max-w-sm">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="balance-sheet-as-of">
            As of date
          </label>
          <input
            id="balance-sheet-as-of"
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-4">Assets</h4>
            <div className="space-y-3">
              {assets.map((asset, index) => (
                <div key={asset.id} className="flex gap-2">
                  <select
                    value={asset.category}
                    onChange={(e) => updateAsset(asset.id, 'category', e.target.value)}
                    className="w-1/3 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {ASSET_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Name"
                    value={asset.name}
                    onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    aria-label={`Asset amount ${index + 1}`}
                    placeholder="$0"
                    value={asset.value}
                    onChange={(e) => updateAsset(asset.id, 'value', e.target.value)}
                    className="w-28 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeAsset(asset.id)}
                    disabled={assets.length === 1}
                    className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Remove asset"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={addAsset}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                type="button"
              >
                + Add Asset
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-4">Liabilities</h4>
            <div className="space-y-3">
              {liabilities.map((liability, index) => (
                <div key={liability.id} className="flex gap-2">
                  <select
                    value={liability.category}
                    onChange={(e) => updateLiability(liability.id, 'category', e.target.value)}
                    className="w-1/3 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {LIABILITY_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Name"
                    value={liability.name}
                    onChange={(e) => updateLiability(liability.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    aria-label={`Liability amount ${index + 1}`}
                    placeholder="$0"
                    value={liability.value}
                    onChange={(e) => updateLiability(liability.id, 'value', e.target.value)}
                    className="w-28 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeLiability(liability.id)}
                    disabled={liabilities.length === 1}
                    className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Remove liability"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={addLiability}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                type="button"
              >
                + Add Liability
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <h4 className="font-medium text-slate-900 dark:text-white mb-4">Summary</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total assets</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{formatCurrency(totals.totalAssets)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total liabilities</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{formatCurrency(totals.totalLiabilities)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Equity</p>
              <p className={`text-lg font-semibold ${totals.equity >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatCurrency(totals.equity)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
