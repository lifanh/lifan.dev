import { ArrowRight, Plus, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface Transaction {
  id: string;
  description: string;
  effects: {
    assets: number;
    liabilities: number;
    equity: number;
  };
}

const SAMPLE_TRANSACTIONS: Omit<Transaction, 'id'>[] = [
  {
    description: 'Receive $1,000 paycheck',
    effects: { assets: 1000, liabilities: 0, equity: 1000 },
  },
  {
    description: 'Pay $500 rent',
    effects: { assets: -500, liabilities: 0, equity: -500 },
  },
  {
    description: 'Buy $300 groceries on credit card',
    effects: { assets: 0, liabilities: 300, equity: -300 },
  },
  {
    description: 'Pay off $200 credit card balance',
    effects: { assets: -200, liabilities: -200, equity: 0 },
  },
  {
    description: 'Buy $20,000 car with $5,000 down + $15,000 loan',
    effects: { assets: 15000, liabilities: 15000, equity: 0 },
  },
  {
    description: 'Receive $500 gift',
    effects: { assets: 500, liabilities: 0, equity: 500 },
  },
  {
    description: 'Pay $100 utility bill',
    effects: { assets: -100, liabilities: 0, equity: -100 },
  },
  {
    description: 'Transfer $1,000 to savings (no net change)',
    effects: { assets: 0, liabilities: 0, equity: 0 },
  },
];

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function formatCurrency(value: number): string {
  const prefix = value >= 0 ? '+' : '';
  return prefix + new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatTotal(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function TransactionImpactVisualizer() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [baseValues] = useState({
    assets: 10000,
    liabilities: 3000,
    equity: 7000,
  });

  const totals = transactions.reduce(
    (acc, t) => ({
      assets: acc.assets + t.effects.assets,
      liabilities: acc.liabilities + t.effects.liabilities,
      equity: acc.equity + t.effects.equity,
    }),
    { ...baseValues }
  );

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions([...transactions, { ...transaction, id: generateId() }]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const reset = () => {
    setTransactions([]);
  };

  const isBalanced = totals.assets === totals.liabilities + totals.equity;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ArrowRight className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">Transaction Impact Visualizer</h3>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="p-6">
        {/* Current Equation State */}
        <div className="mb-6">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 text-center">
            Current Balance (Starting: Assets $10,000 | Liabilities $3,000 | Equity $7,000)
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className={`px-4 py-3 rounded-lg text-center min-w-[120px] ${
              isBalanced ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Assets</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">{formatTotal(totals.assets)}</p>
            </div>
            <span className="text-2xl text-slate-400">=</span>
            <div className={`px-4 py-3 rounded-lg text-center min-w-[120px] ${
              isBalanced ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Liabilities</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">{formatTotal(totals.liabilities)}</p>
            </div>
            <span className="text-2xl text-slate-400">+</span>
            <div className={`px-4 py-3 rounded-lg text-center min-w-[120px] ${
              isBalanced ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Equity</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatTotal(totals.equity)}</p>
            </div>
          </div>
          {isBalanced ? (
            <p className="text-center text-sm text-green-600 dark:text-green-400 mt-3">
              ✓ Equation is balanced!
            </p>
          ) : (
            <p className="text-center text-sm text-red-600 dark:text-red-400 mt-3">
              ✗ Equation is not balanced (this shouldn't happen with valid transactions)
            </p>
          )}
        </div>

        {/* Transaction Log */}
        {transactions.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Transaction Log</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {transactions.map((t, index) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 rounded-lg px-4 py-2 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-xs">{index + 1}.</span>
                    <span className="text-slate-700 dark:text-slate-300">{t.description}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs ${t.effects.assets !== 0 ? (t.effects.assets > 0 ? 'text-green-600' : 'text-red-600') : 'text-slate-400'}`}>
                      A: {formatCurrency(t.effects.assets)}
                    </span>
                    <span className={`text-xs ${t.effects.liabilities !== 0 ? (t.effects.liabilities > 0 ? 'text-red-600' : 'text-green-600') : 'text-slate-400'}`}>
                      L: {formatCurrency(t.effects.liabilities)}
                    </span>
                    <span className={`text-xs ${t.effects.equity !== 0 ? (t.effects.equity > 0 ? 'text-blue-600' : 'text-orange-600') : 'text-slate-400'}`}>
                      E: {formatCurrency(t.effects.equity)}
                    </span>
                    <button
                      onClick={() => removeTransaction(t.id)}
                      className="text-slate-400 hover:text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Transaction */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Add a Transaction</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {SAMPLE_TRANSACTIONS.map((t, index) => (
              <button
                key={index}
                onClick={() => addTransaction(t)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-left bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                <Plus className="w-3 h-3 text-blue-500 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 line-clamp-2">{t.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Educational Note */}
        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Notice:</strong> Every transaction keeps the equation balanced. Assets always equal
            Liabilities plus Equity. This is the foundation of double-entry bookkeeping!
          </p>
        </div>
      </div>
    </div>
  );
}
