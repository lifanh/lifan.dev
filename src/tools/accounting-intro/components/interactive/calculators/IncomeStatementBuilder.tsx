import { Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCalculatorStore } from '../../../store';
import type {
    ExpenseCategory,
    IncomeCategory,
    IncomeStatementData,
} from '../../../types';
import { PDFExport } from '../../export/index';

interface IncomeInput {
  id: string;
  name: string;
  amount: string;
  category: IncomeCategory;
  isRecurring: boolean;
}

interface ExpenseInput {
  id: string;
  name: string;
  amount: string;
  category: ExpenseCategory;
  isRecurring: boolean;
}

const INCOME_CATEGORIES: { value: IncomeCategory; label: string }[] = [
  { value: 'salary', label: 'Salary' },
  { value: 'business', label: 'Business' },
  { value: 'investments', label: 'Investments' },
  { value: 'other', label: 'Other' },
];

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

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function getLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDefaultPeriodDates(): { startDate: string; endDate: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { startDate: getLocalDateString(start), endDate: getLocalDateString(end) };
}

export function IncomeStatementBuilder() {
  const stored = useCalculatorStore((s) => s.data.incomeStatement);
  const setIncomeStatement = useCalculatorStore((s) => s.setIncomeStatement);
  const clearCalculator = useCalculatorStore((s) => s.clearCalculator);

  const defaultDates = useMemo(() => getDefaultPeriodDates(), []);

  const [initialized, setInitialized] = useState(false);

  const [period, setPeriod] = useState<IncomeStatementData['period']>('monthly');
  const [startDate, setStartDate] = useState<string>(defaultDates.startDate);
  const [endDate, setEndDate] = useState<string>(defaultDates.endDate);

  const [income, setIncome] = useState<IncomeInput[]>([
    { id: generateId(), name: 'Salary', amount: '', category: 'salary', isRecurring: true },
  ]);

  const [expenses, setExpenses] = useState<ExpenseInput[]>([
    { id: generateId(), name: 'Rent', amount: '', category: 'housing', isRecurring: true },
  ]);

  useEffect(() => {
    if (initialized) return;

    if (stored) {
      setPeriod(stored.period);
      setStartDate(stored.startDate);
      setEndDate(stored.endDate);

      setIncome(
        stored.income.length > 0
          ? stored.income.map((i) => ({
              id: i.id,
              name: i.name,
              amount: String(i.amount),
              category: i.category,
              isRecurring: i.isRecurring,
            }))
          : [{ id: generateId(), name: 'Salary', amount: '', category: 'salary', isRecurring: true }]
      );

      setExpenses(
        stored.expenses.length > 0
          ? stored.expenses.map((e) => ({
              id: e.id,
              name: e.name,
              amount: String(e.amount),
              category: e.category,
              isRecurring: e.isRecurring,
            }))
          : [{ id: generateId(), name: 'Rent', amount: '', category: 'housing', isRecurring: true }]
      );
    }

    setInitialized(true);
  }, [initialized, stored]);

  const totals = useMemo(() => {
    const totalIncome = income.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    const net = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? net / totalIncome : 0;
    return { totalIncome, totalExpenses, net, savingsRate };
  }, [expenses, income]);

  const addIncome = () => {
    setIncome([
      ...income,
      { id: generateId(), name: '', amount: '', category: 'other', isRecurring: false },
    ]);
  };

  const addExpense = () => {
    setExpenses([
      ...expenses,
      { id: generateId(), name: '', amount: '', category: 'other', isRecurring: false },
    ]);
  };

  const removeIncome = (id: string) => {
    if (income.length > 1) {
      setIncome(income.filter((i) => i.id !== id));
    }
  };

  const removeExpense = (id: string) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  const updateIncome = (id: string, field: keyof IncomeInput, value: string | boolean) => {
    setIncome(income.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const updateExpense = (id: string, field: keyof ExpenseInput, value: string | boolean) => {
    setExpenses(expenses.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const handleSave = () => {
    const statement: IncomeStatementData = {
      income: income.map((i) => ({
        id: i.id,
        name: i.name || 'Income',
        amount: parseFloat(i.amount) || 0,
        category: i.category,
        isRecurring: i.isRecurring,
      })),
      expenses: expenses.map((e) => ({
        id: e.id,
        name: e.name || 'Expense',
        amount: parseFloat(e.amount) || 0,
        category: e.category,
        isRecurring: e.isRecurring,
      })),
      period,
      startDate,
      endDate,
    };

    setIncomeStatement(statement);
  };

  const handleReset = () => {
    const nextDates = getDefaultPeriodDates();

    setPeriod('monthly');
    setStartDate(nextDates.startDate);
    setEndDate(nextDates.endDate);
    setIncome([{ id: generateId(), name: 'Salary', amount: '', category: 'salary', isRecurring: true }]);
    setExpenses([{ id: generateId(), name: 'Rent', amount: '', category: 'housing', isRecurring: true }]);
    clearCalculator('incomeStatement');
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-semibold text-slate-900 dark:text-white">Income Statement Builder</h3>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <PDFExport
            data={{
              income,
              expenses,
              totals,
              period,
              startDate,
              endDate,
            }}
            type="income-statement"
            title="Income Statement"
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
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="income-statement-period">
              Period
            </label>
            <select
              id="income-statement-period"
              value={period}
              onChange={(e) => setPeriod(e.target.value as IncomeStatementData['period'])}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="income-statement-start">
              Start date
            </label>
            <input
              id="income-statement-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="income-statement-end">
              End date
            </label>
            <input
              id="income-statement-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-4">Income</h4>
            <div className="space-y-3">
              {income.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <select
                    value={item.category}
                    onChange={(e) => updateIncome(item.id, 'category', e.target.value)}
                    className="w-32 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {INCOME_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.name}
                    onChange={(e) => updateIncome(item.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    aria-label={`Income amount ${index + 1}`}
                    placeholder="$0"
                    value={item.amount}
                    onChange={(e) => updateIncome(item.id, 'amount', e.target.value)}
                    className="w-28 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mt-2">
                    <input
                      type="checkbox"
                      checked={item.isRecurring}
                      onChange={(e) => updateIncome(item.id, 'isRecurring', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    Recurring
                  </label>
                  <button
                    onClick={() => removeIncome(item.id)}
                    disabled={income.length === 1}
                    className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Remove income"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addIncome}
                className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                type="button"
              >
                <Plus className="w-4 h-4" />
                Add Income
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-4">Expenses</h4>
            <div className="space-y-3">
              {expenses.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <select
                    value={item.category}
                    onChange={(e) => updateExpense(item.id, 'category', e.target.value)}
                    className="w-32 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.name}
                    onChange={(e) => updateExpense(item.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    aria-label={`Expense amount ${index + 1}`}
                    placeholder="$0"
                    value={item.amount}
                    onChange={(e) => updateExpense(item.id, 'amount', e.target.value)}
                    className="w-28 px-3 py-2 text-sm bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mt-2">
                    <input
                      type="checkbox"
                      checked={item.isRecurring}
                      onChange={(e) => updateExpense(item.id, 'isRecurring', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    Recurring
                  </label>
                  <button
                    onClick={() => removeExpense(item.id)}
                    disabled={expenses.length === 1}
                    className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Remove expense"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addExpense}
                className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                type="button"
              >
                <Plus className="w-4 h-4" />
                Add Expense
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <h4 className="font-medium text-slate-900 dark:text-white mb-4">Summary</h4>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total income</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{formatCurrency(totals.totalIncome)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total expenses</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{formatCurrency(totals.totalExpenses)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Net income</p>
              <p className={`text-lg font-semibold ${totals.net >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatCurrency(totals.net)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Savings rate</p>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{formatPercent(totals.savingsRate)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
