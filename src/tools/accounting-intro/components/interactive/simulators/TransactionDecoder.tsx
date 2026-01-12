import { CheckCircle2, HelpCircle, RotateCcw, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Account {
  id: string;
  name: string;
  number: number;
}

interface Scenario {
  id: string;
  description: string;
  correctEntry: {
    debitAccount: string;
    creditAccount: string;
    amount: number;
  };
  explanation: string;
  hint: string;
}

const ACCOUNTS: Account[] = [
  { id: 'cash', name: 'Cash', number: 1010 },
  { id: 'ar', name: 'Accounts Receivable', number: 1020 },
  { id: 'supplies', name: 'Supplies', number: 1030 },
  { id: 'equipment', name: 'Equipment', number: 1500 },
  { id: 'ap', name: 'Accounts Payable', number: 2010 },
  { id: 'loan', name: 'Bank Loan', number: 2500 },
  { id: 'capital', name: "Owner's Capital", number: 3010 },
  { id: 'revenue', name: 'Service Revenue', number: 4010 },
  { id: 'rent', name: 'Rent Expense', number: 5010 },
  { id: 'utilities', name: 'Utilities Expense', number: 5020 },
  { id: 'salaries', name: 'Salaries Expense', number: 5030 },
  { id: 'supplies-expense', name: 'Supplies Expense', number: 5040 },
  { id: 'interest-expense', name: 'Interest Expense', number: 5050 },
];

const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    description: 'You purchase $500 of office supplies on your business credit (pay later).',
    correctEntry: { debitAccount: 'supplies', creditAccount: 'ap', amount: 500 },
    hint: 'One account increases (asset). One liability increases.',
    explanation:
      'Supplies is an asset. Buying supplies on credit increases Supplies (debit) and increases Accounts Payable (credit).',
  },
  {
    id: 's2',
    description: 'A customer pays you $2,500 in cash for services you already provided.',
    correctEntry: { debitAccount: 'cash', creditAccount: 'revenue', amount: 2500 },
    hint: 'Cash goes up. Revenue goes up.',
    explanation:
      'Cash is an asset with a normal debit balance, so an increase is a debit. Service Revenue increases with a credit.',
  },
  {
    id: 's3',
    description: 'You pay $1,200 cash for monthly rent.',
    correctEntry: { debitAccount: 'rent', creditAccount: 'cash', amount: 1200 },
    hint: 'Expense goes up. Cash goes down.',
    explanation:
      'Rent Expense increases (debit). Cash decreases (credit).',
  },
  {
    id: 's4',
    description: 'You borrow $10,000 from the bank and receive the cash today.',
    correctEntry: { debitAccount: 'cash', creditAccount: 'loan', amount: 10000 },
    hint: 'Cash goes up. A liability goes up.',
    explanation:
      'Borrowing increases Cash (debit) and increases Bank Loan (credit) because you now owe the bank.',
  },
  {
    id: 's5',
    description: 'You collect $1,800 from a client who previously owed you money.',
    correctEntry: { debitAccount: 'cash', creditAccount: 'ar', amount: 1800 },
    hint: 'Cash goes up. Accounts Receivable goes down.',
    explanation:
      'Collecting on receivables increases Cash (debit) and decreases Accounts Receivable (credit).',
  },
];

function getAccountLabel(id: string): string {
  const account = ACCOUNTS.find((a) => a.id === id);
  if (!account) return id;
  return `${account.number} - ${account.name}`;
}

export function TransactionDecoder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [debitAccount, setDebitAccount] = useState('');
  const [creditAccount, setCreditAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, attempts: 0 });

  const current = SCENARIOS[currentIndex];

  const parsedAmount = useMemo(() => parseFloat(amount), [amount]);

  const canSubmit = debitAccount && creditAccount && amount;

  const checkAnswer = () => {
    if (!canSubmit) return;

    const correct =
      debitAccount === current.correctEntry.debitAccount &&
      creditAccount === current.correctEntry.creditAccount &&
      parsedAmount === current.correctEntry.amount;

    setIsCorrect(correct);
    setShowResult(true);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      attempts: prev.attempts + 1,
    }));
  };

  const nextScenario = () => {
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex((i) => i + 1);
      setDebitAccount('');
      setCreditAccount('');
      setAmount('');
      setShowHint(false);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setDebitAccount('');
    setCreditAccount('');
    setAmount('');
    setShowHint(false);
    setShowResult(false);
    setIsCorrect(false);
    setScore({ correct: 0, attempts: 0 });
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-white">Transaction Decoder</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">Score: {score.correct}/{score.attempts}</span>
          <button
            onClick={reset}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            type="button"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
            <span>Scenario {currentIndex + 1} of {SCENARIOS.length}</span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / SCENARIOS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
          <p className="text-slate-800 dark:text-slate-200 font-medium">{current.description}</p>
          {showHint && (
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">{current.hint}</p>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid md:grid-cols-3 gap-3 items-start">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="transaction-decoder-debit">
                Debit account
              </label>
              <select
                id="transaction-decoder-debit"
                aria-label="Debit account"
                value={debitAccount}
                onChange={(e) => setDebitAccount(e.target.value)}
                disabled={showResult}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
              >
                <option value="">Select account...</option>
                {ACCOUNTS.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.number} - {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="transaction-decoder-credit">
                Credit account
              </label>
              <select
                id="transaction-decoder-credit"
                aria-label="Credit account"
                value={creditAccount}
                onChange={(e) => setCreditAccount(e.target.value)}
                disabled={showResult}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
              >
                <option value="">Select account...</option>
                {ACCOUNTS.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.number} - {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="transaction-decoder-amount">
                Amount
              </label>
              <input
                id="transaction-decoder-amount"
                aria-label="Amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={showResult}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowHint((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              type="button"
            >
              <HelpCircle className="w-4 h-4" />
              Hint
            </button>

            <button
              onClick={checkAnswer}
              disabled={!canSubmit || showResult}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              type="button"
            >
              Check Answer
            </button>

            <button
              onClick={nextScenario}
              disabled={!showResult || currentIndex >= SCENARIOS.length - 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              type="button"
            >
              Next Scenario
            </button>
          </div>
        </div>

        {showResult && (
          <div
            className={`p-4 rounded-lg border ${
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    isCorrect
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'
                  }`}
                >
                  {isCorrect ? 'Correct!' : 'Not quite.'}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    isCorrect
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}
                >
                  {current.explanation}
                </p>

                {!isCorrect && (
                  <div className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                    Correct entry:
                    <div className="mt-1 font-mono text-xs">
                      Dr. {getAccountLabel(current.correctEntry.debitAccount)} ${current.correctEntry.amount}
                      <br />
                      Cr. {getAccountLabel(current.correctEntry.creditAccount)} ${current.correctEntry.amount}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
