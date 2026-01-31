import { BookOpen, CheckCircle2, HelpCircle, RotateCcw, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Account {
  id: string;
  name: string;
  number: number;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  normalBalance: 'debit' | 'credit';
}

interface JournalEntry {
  debitAccount: string;
  debitAmount: number;
  creditAccount: string;
  creditAmount: number;
}

interface Transaction {
  id: string;
  description: string;
  hint: string;
  correctEntry: JournalEntry;
}

const ACCOUNTS: Account[] = [
  { id: 'cash', name: 'Cash', number: 1010, type: 'asset', normalBalance: 'debit' },
  { id: 'ar', name: 'Accounts Receivable', number: 1020, type: 'asset', normalBalance: 'debit' },
  { id: 'supplies', name: 'Supplies', number: 1030, type: 'asset', normalBalance: 'debit' },
  { id: 'equipment', name: 'Equipment', number: 1500, type: 'asset', normalBalance: 'debit' },
  { id: 'ap', name: 'Accounts Payable', number: 2010, type: 'liability', normalBalance: 'credit' },
  { id: 'revenue', name: 'Service Revenue', number: 4010, type: 'revenue', normalBalance: 'credit' },
  { id: 'rent', name: 'Rent Expense', number: 5010, type: 'expense', normalBalance: 'debit' },
  { id: 'utilities', name: 'Utilities Expense', number: 5020, type: 'expense', normalBalance: 'debit' },
  { id: 'salaries', name: 'Salaries Expense', number: 5030, type: 'expense', normalBalance: 'debit' },
];

const TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    description: 'Received $3,000 cash from a customer for services performed.',
    hint: 'Cash increases (asset), Revenue increases (credit)',
    correctEntry: { debitAccount: 'cash', debitAmount: 3000, creditAccount: 'revenue', creditAmount: 3000 },
  },
  {
    id: 't2',
    description: 'Paid $1,200 for monthly office rent.',
    hint: 'Rent Expense increases (debit), Cash decreases (credit)',
    correctEntry: { debitAccount: 'rent', debitAmount: 1200, creditAccount: 'cash', creditAmount: 1200 },
  },
  {
    id: 't3',
    description: 'Purchased $500 of office supplies on credit (will pay later).',
    hint: 'Supplies increase (asset), Accounts Payable increases (liability)',
    correctEntry: { debitAccount: 'supplies', debitAmount: 500, creditAccount: 'ap', creditAmount: 500 },
  },
  {
    id: 't4',
    description: 'Performed $2,000 of services for a client who will pay in 30 days.',
    hint: 'Accounts Receivable increases (asset), Revenue increases (credit)',
    correctEntry: { debitAccount: 'ar', debitAmount: 2000, creditAccount: 'revenue', creditAmount: 2000 },
  },
  {
    id: 't5',
    description: 'Paid the $500 owed for office supplies purchased earlier.',
    hint: 'Accounts Payable decreases (debit to reduce liability), Cash decreases (credit)',
    correctEntry: { debitAccount: 'ap', debitAmount: 500, creditAccount: 'cash', creditAmount: 500 },
  },
  {
    id: 't6',
    description: 'Collected $2,000 from the client who owed us money.',
    hint: 'Cash increases (debit), Accounts Receivable decreases (credit)',
    correctEntry: { debitAccount: 'cash', debitAmount: 2000, creditAccount: 'ar', creditAmount: 2000 },
  },
  {
    id: 't7',
    description: 'Paid $800 for employee salaries.',
    hint: 'Salaries Expense increases (debit), Cash decreases (credit)',
    correctEntry: { debitAccount: 'salaries', debitAmount: 800, creditAccount: 'cash', creditAmount: 800 },
  },
  {
    id: 't8',
    description: 'Paid $150 for utility bills.',
    hint: 'Utilities Expense increases (debit), Cash decreases (credit)',
    correctEntry: { debitAccount: 'utilities', debitAmount: 150, creditAccount: 'cash', creditAmount: 150 },
  },
];

export function BookkeepingSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [debitAccount, setDebitAccount] = useState('');
  const [debitAmount, setDebitAmount] = useState('');
  const [creditAccount, setCreditAccount] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, attempts: 0 });

  const currentTransaction = TRANSACTIONS[currentIndex];

  const checkAnswer = () => {
    const correct = currentTransaction.correctEntry;
    const isMatch =
      debitAccount === correct.debitAccount &&
      parseFloat(debitAmount) === correct.debitAmount &&
      creditAccount === correct.creditAccount &&
      parseFloat(creditAmount) === correct.creditAmount;

    setIsCorrect(isMatch);
    setShowResult(true);
    setScore((prev) => ({
      correct: prev.correct + (isMatch ? 1 : 0),
      attempts: prev.attempts + 1,
    }));
  };

  const nextTransaction = () => {
    if (currentIndex < TRANSACTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetForm();
    }
  };

  const resetForm = () => {
    setDebitAccount('');
    setDebitAmount('');
    setCreditAccount('');
    setCreditAmount('');
    setShowHint(false);
    setShowResult(false);
    setIsCorrect(false);
  };

  const resetSimulator = () => {
    setCurrentIndex(0);
    resetForm();
    setScore({ correct: 0, attempts: 0 });
  };

  const getAccountName = (id: string) => ACCOUNTS.find((a) => a.id === id)?.name || id;

  const canSubmit = debitAccount && debitAmount && creditAccount && creditAmount;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">Bookkeeping Simulator</h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Score: {score.correct}/{score.attempts}
          </span>
          <button
            onClick={resetSimulator}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
            <span>Transaction {currentIndex + 1} of {TRANSACTIONS.length}</span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / TRANSACTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Transaction Description */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
          <p className="text-slate-800 dark:text-slate-200 font-medium">
            {currentTransaction.description}
          </p>
          {showHint && (
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
              💡 Hint: {currentTransaction.hint}
            </p>
          )}
        </div>

        {/* Journal Entry Form */}
        <div className="space-y-4 mb-6">
          <div className="font-mono text-sm">
            {/* Debit Entry */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
              <label htmlFor="debit-account" className="w-16 text-slate-500 dark:text-slate-400 shrink-0">Debit:</label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-1">
                <select
                  id="debit-account"
                  value={debitAccount}
                  onChange={(e) => setDebitAccount(e.target.value)}
                  disabled={showResult}
                  className="flex-1 px-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
                >
                  <option value="">Select account...</option>
                  {ACCOUNTS.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.number} - {acc.name}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={debitAmount}
                    onChange={(e) => setDebitAmount(e.target.value)}
                    disabled={showResult}
                    aria-label="Debit amount"
                    className="w-full sm:w-28 pl-7 pr-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Credit Entry */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pl-0 sm:pl-8">
              <label htmlFor="credit-account" className="w-16 text-slate-500 dark:text-slate-400 shrink-0">Credit:</label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-1">
                <select
                  id="credit-account"
                  value={creditAccount}
                  onChange={(e) => setCreditAccount(e.target.value)}
                  disabled={showResult}
                  className="flex-1 px-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
                >
                  <option value="">Select account...</option>
                  {ACCOUNTS.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.number} - {acc.name}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                    disabled={showResult}
                    aria-label="Credit amount"
                    className="w-full sm:w-28 pl-7 pr-3 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div
            role="status"
            aria-live="polite"
            className={`p-4 rounded-lg mb-6 ${
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`font-medium ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </p>
                {!isCorrect && (
                  <div className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    <p className="mb-1">The correct entry is:</p>
                    <div className="font-mono bg-white dark:bg-slate-800 rounded p-2 mt-1">
                      <p>Dr. {getAccountName(currentTransaction.correctEntry.debitAccount)} ${currentTransaction.correctEntry.debitAmount.toLocaleString()}</p>
                      <p className="pl-4">Cr. {getAccountName(currentTransaction.correctEntry.creditAccount)} ${currentTransaction.correctEntry.creditAmount.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowHint(!showHint)}
            disabled={showResult}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-50"
          >
            <HelpCircle className="w-4 h-4" />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>

          <div className="flex gap-3">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                disabled={!canSubmit}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextTransaction}
                disabled={currentIndex >= TRANSACTIONS.length - 1}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {currentIndex >= TRANSACTIONS.length - 1 ? 'Completed!' : 'Next Transaction →'}
              </button>
            )}
          </div>
        </div>

        {/* Completion Message */}
        {currentIndex >= TRANSACTIONS.length - 1 && showResult && (
          <div className="mt-6 text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <p className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Simulation Complete!
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              You scored {score.correct} out of {score.attempts} ({Math.round((score.correct / score.attempts) * 100)}%)
            </p>
            <button
              onClick={resetSimulator}
              className="mt-4 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
