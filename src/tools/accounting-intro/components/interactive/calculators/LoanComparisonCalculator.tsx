import { Calculator, DollarSign, Percent, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

interface LoanInput {
  id: string;
  name: string;
  principal: string;
  interestRate: string;
  termMonths: string;
  extraPayment: string;
}

interface LoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  effectiveRate: number;
  payoffMonths: number;
}

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
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

function calculateLoan(
  principal: number,
  annualRate: number,
  termMonths: number,
  extraPayment: number = 0
): LoanResults {
  if (principal <= 0 || annualRate < 0 || termMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      effectiveRate: 0,
      payoffMonths: 0,
    };
  }

  const monthlyRate = annualRate / 100 / 12;

  // Calculate standard monthly payment using amortization formula
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = principal / termMonths;
  } else {
    monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
  }

  // Calculate with extra payments
  let balance = principal;
  let totalPayment = 0;
  let months = 0;
  const totalMonthlyPayment = monthlyPayment + extraPayment;

  while (balance > 0 && months < termMonths * 2) {
    months++;
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(totalMonthlyPayment - interestPayment, balance);
    const payment = interestPayment + principalPayment;
    totalPayment += payment;
    balance -= principalPayment;

    if (balance < 0.01) break;
  }

  const totalInterest = totalPayment - principal;
  const effectiveRate = (totalInterest / principal) * 100;

  return {
    monthlyPayment: monthlyPayment + extraPayment,
    totalPayment,
    totalInterest,
    effectiveRate,
    payoffMonths: months,
  };
}

export function LoanComparisonCalculator() {
  const [loans, setLoans] = useState<LoanInput[]>([
    {
      id: generateId(),
      name: 'Loan A',
      principal: '250000',
      interestRate: '6.5',
      termMonths: '360',
      extraPayment: '0',
    },
    {
      id: generateId(),
      name: 'Loan B',
      principal: '250000',
      interestRate: '7.0',
      termMonths: '180',
      extraPayment: '0',
    },
  ]);

  const addLoan = () => {
    if (loans.length < 4) {
      setLoans([
        ...loans,
        {
          id: generateId(),
          name: `Loan ${String.fromCharCode(65 + loans.length)}`,
          principal: '',
          interestRate: '',
          termMonths: '',
          extraPayment: '0',
        },
      ]);
    }
  };

  const removeLoan = (id: string) => {
    if (loans.length > 1) {
      setLoans(loans.filter((l) => l.id !== id));
    }
  };

  const updateLoan = (id: string, field: keyof LoanInput, value: string) => {
    setLoans(loans.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const loanResults = useMemo(() => {
    return loans.map((loan) => {
      const principal = parseFloat(loan.principal) || 0;
      const rate = parseFloat(loan.interestRate) || 0;
      const term = parseInt(loan.termMonths) || 0;
      const extra = parseFloat(loan.extraPayment) || 0;
      return {
        id: loan.id,
        name: loan.name,
        ...calculateLoan(principal, rate, term, extra),
      };
    });
  }, [loans]);

  const bestLoan = useMemo(() => {
    if (loanResults.length === 0) return null;
    const validLoans = loanResults.filter((r) => r.totalInterest > 0);
    if (validLoans.length === 0) return null;
    return validLoans.reduce((best, current) =>
      current.totalInterest < best.totalInterest ? current : best
    );
  }, [loanResults]);

  const reset = () => {
    setLoans([
      {
        id: generateId(),
        name: 'Loan A',
        principal: '250000',
        interestRate: '6.5',
        termMonths: '360',
        extraPayment: '0',
      },
      {
        id: generateId(),
        name: 'Loan B',
        principal: '250000',
        interestRate: '7.0',
        termMonths: '180',
        extraPayment: '0',
      },
    ]);
  };

  const termOptions = [
    { value: '60', label: '5 years' },
    { value: '84', label: '7 years' },
    { value: '120', label: '10 years' },
    { value: '180', label: '15 years' },
    { value: '240', label: '20 years' },
    { value: '360', label: '30 years' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-lg font-semibold text-white">Loan Comparison Calculator</h3>
            <p className="text-green-100 text-sm">Compare different loan options to find the best deal</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Loan Inputs */}
        <div className="space-y-6 mb-8">
          {loans.map((loan, index) => (
            <div
              key={loan.id}
              className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200 dark:border-slate-600"
            >
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={loan.name}
                  onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
                  className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1 text-slate-800 dark:text-slate-200"
                  placeholder="Loan Name"
                />
                {loans.length > 1 && (
                  <button
                    onClick={() => removeLoan(loan.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    aria-label={`Remove ${loan.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Principal
                  </label>
                  <input
                    type="number"
                    value={loan.principal}
                    onChange={(e) => updateLoan(loan.id, 'principal', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    <Percent className="w-4 h-4 inline mr-1" />
                    Interest Rate
                  </label>
                  <input
                    type="number"
                    value={loan.interestRate}
                    onChange={(e) => updateLoan(loan.id, 'interestRate', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Term
                  </label>
                  <select
                    value={loan.termMonths}
                    onChange={(e) => updateLoan(loan.id, 'termMonths', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    {termOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Extra Payment/mo
                  </label>
                  <input
                    type="number"
                    value={loan.extraPayment}
                    onChange={(e) => updateLoan(loan.id, 'extraPayment', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Loan Button */}
        {loans.length < 4 && (
          <button
            onClick={addLoan}
            className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 hover:border-green-500 hover:text-green-600 transition-colors flex items-center justify-center gap-2 mb-8"
          >
            <Plus className="w-5 h-5" />
            Add Another Loan to Compare
          </button>
        )}

        {/* Comparison Results */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Comparison Results
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400">
                    Metric
                  </th>
                  {loanResults.map((result) => (
                    <th
                      key={result.id}
                      className={`px-4 py-3 text-right font-semibold ${
                        bestLoan?.id === result.id
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {result.name}
                      {bestLoan?.id === result.id && (
                        <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                          Best
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                <tr>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Monthly Payment</td>
                  {loanResults.map((result) => (
                    <td key={result.id} className="px-4 py-3 text-right text-slate-800 dark:text-slate-200 font-medium">
                      {formatCurrency(result.monthlyPayment)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-700/30">
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Total Interest</td>
                  {loanResults.map((result) => (
                    <td
                      key={result.id}
                      className={`px-4 py-3 text-right font-medium ${
                        bestLoan?.id === result.id
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {formatCurrency(result.totalInterest)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Total Payment</td>
                  {loanResults.map((result) => (
                    <td key={result.id} className="px-4 py-3 text-right text-slate-800 dark:text-slate-200 font-medium">
                      {formatCurrency(result.totalPayment)}
                    </td>
                  ))}
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-700/30">
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Payoff Time</td>
                  {loanResults.map((result) => (
                    <td key={result.id} className="px-4 py-3 text-right text-slate-800 dark:text-slate-200 font-medium">
                      {result.payoffMonths > 0 ? (
                        <>
                          {Math.floor(result.payoffMonths / 12)}y {result.payoffMonths % 12}m
                        </>
                      ) : (
                        '—'
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Total Interest %</td>
                  {loanResults.map((result) => (
                    <td key={result.id} className="px-4 py-3 text-right text-slate-800 dark:text-slate-200 font-medium">
                      {result.effectiveRate > 0 ? formatPercent(result.effectiveRate) : '—'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Savings Summary */}
          {bestLoan && loanResults.length > 1 && (
            <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h5 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                💡 Savings Summary
              </h5>
              <p className="text-green-700 dark:text-green-300 text-sm">
                <strong>{bestLoan.name}</strong> saves you the most money on interest.
                {loanResults.length === 2 && (
                  <>
                    {' '}
                    You would save{' '}
                    <strong>
                      {formatCurrency(
                        Math.abs(loanResults[0].totalInterest - loanResults[1].totalInterest)
                      )}
                    </strong>{' '}
                    compared to the other option.
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={reset}
            className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors text-sm"
          >
            Reset Calculator
          </button>
        </div>

        {/* Educational Note */}
        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
            📚 Tips for Comparing Loans
          </h5>
          <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
            <li>• <strong>APR vs. Interest Rate:</strong> APR includes fees, making it better for comparison.</li>
            <li>• <strong>Shorter terms</strong> mean higher monthly payments but less total interest.</li>
            <li>• <strong>Extra payments</strong> can dramatically reduce total interest paid.</li>
            <li>• Consider <strong>prepayment penalties</strong> before making extra payments.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
