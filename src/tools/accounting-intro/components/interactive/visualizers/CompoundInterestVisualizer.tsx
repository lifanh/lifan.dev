import { TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

interface CompoundingPeriod {
  value: number;
  label: string;
  description: string;
}

const COMPOUNDING_PERIODS: CompoundingPeriod[] = [
  { value: 1, label: 'Annually', description: '1x per year' },
  { value: 2, label: 'Semi-annually', description: '2x per year' },
  { value: 4, label: 'Quarterly', description: '4x per year' },
  { value: 12, label: 'Monthly', description: '12x per year' },
  { value: 365, label: 'Daily', description: '365x per year' },
];

interface YearlyData {
  year: number;
  simpleInterest: number;
  compoundInterest: number;
  difference: number;
}

function calculateGrowth(
  principal: number,
  rate: number,
  years: number,
  compoundingFrequency: number,
  monthlyContribution: number = 0
): YearlyData[] {
  const data: YearlyData[] = [];
  const annualRate = rate / 100;

  for (let year = 0; year <= years; year++) {
    // Simple interest
    const simpleInterest = principal + (principal * annualRate * year) + (monthlyContribution * 12 * year);

    // Compound interest
    let compoundInterest: number;
    if (monthlyContribution === 0) {
      // Standard compound interest formula
      compoundInterest = principal * Math.pow(1 + annualRate / compoundingFrequency, compoundingFrequency * year);
    } else {
      // Compound interest with regular contributions
      const periodicRate = annualRate / compoundingFrequency;
      const periodsPerYear = compoundingFrequency;
      const totalPeriods = year * periodsPerYear;
      const contributionPerPeriod = (monthlyContribution * 12) / periodsPerYear;

      // Future value of principal
      const fvPrincipal = principal * Math.pow(1 + periodicRate, totalPeriods);

      // Future value of regular contributions (annuity)
      let fvContributions = 0;
      if (periodicRate > 0) {
        fvContributions = contributionPerPeriod * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
      } else {
        fvContributions = contributionPerPeriod * totalPeriods;
      }

      compoundInterest = fvPrincipal + fvContributions;
    }

    data.push({
      year,
      simpleInterest: Math.round(simpleInterest),
      compoundInterest: Math.round(compoundInterest),
      difference: Math.round(compoundInterest - simpleInterest),
    });
  }

  return data;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function CompoundInterestVisualizer() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(30);
  const [compoundingFrequency, setCompoundingFrequency] = useState(12);
  const [monthlyContribution, setMonthlyContribution] = useState(200);

  const data = useMemo(
    () => calculateGrowth(principal, rate, years, compoundingFrequency, monthlyContribution),
    [principal, rate, years, compoundingFrequency, monthlyContribution]
  );

  const finalData = data[data.length - 1];
  const totalContributed = principal + monthlyContribution * 12 * years;
  const interestEarned = finalData.compoundInterest - totalContributed;
  const maxValue = finalData.compoundInterest;

  // Rule of 72 calculation
  const doublingTime = rate > 0 ? Math.round(72 / rate) : 0;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-lg font-semibold text-white">Compound Interest Visualizer</h3>
            <p className="text-purple-100 text-sm">See the power of compounding over time</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Input Controls */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Initial Investment
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Monthly Addition
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="0"
              step="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Annual Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Math.max(0, Math.min(30, parseFloat(e.target.value) || 0)))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="0"
              max="30"
              step="0.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Years
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="1"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Compounding
            </label>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {COMPOUNDING_PERIODS.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Total Contributed</p>
            <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
              {formatCurrency(totalContributed)}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">Interest Earned</p>
            <p className="text-xl font-bold text-green-800 dark:text-green-200">
              {formatCurrency(interestEarned)}
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Final Balance</p>
            <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
              {formatCurrency(finalData.compoundInterest)}
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 text-center">
            <p className="text-sm text-amber-600 dark:text-amber-400 mb-1">Rule of 72</p>
            <p className="text-xl font-bold text-amber-800 dark:text-amber-200">
              {doublingTime > 0 ? `~${doublingTime} years` : '—'}
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400">to double</p>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 mb-6">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Growth Over Time
          </h4>

          <div className="space-y-3">
            {/* Show key milestones */}
            {[0, Math.floor(years / 4), Math.floor(years / 2), Math.floor((years * 3) / 4), years]
              .filter((y, i, arr) => arr.indexOf(y) === i)
              .map((yearIndex) => {
                const yearData = data[yearIndex];
                if (!yearData) return null;

                const compoundWidth = (yearData.compoundInterest / maxValue) * 100;
                const contributedWidth = (((principal + monthlyContribution * 12 * yearIndex) / maxValue) * 100);

                return (
                  <div key={yearIndex}>
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Year {yearData.year}</span>
                      <span>{formatCurrency(yearData.compoundInterest)}</span>
                    </div>
                    <div className="relative h-8 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                      {/* Compound growth (interest earned) */}
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${compoundWidth}%` }}
                      />
                      {/* Principal + contributions */}
                      <div
                        className="absolute inset-y-0 left-0 bg-blue-400 dark:bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${contributedWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex gap-4 mt-4 justify-center text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
              <span className="text-slate-600 dark:text-slate-400">Contributions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
              <span className="text-slate-600 dark:text-slate-400">Interest Earned</span>
            </div>
          </div>
        </div>

        {/* Comparison: Simple vs Compound */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
            💡 The Compound Advantage
          </h4>
          <p className="text-green-700 dark:text-green-300 text-sm mb-3">
            After {years} years, compound interest earns you{' '}
            <strong>{formatCurrency(finalData.difference)}</strong> more than simple interest.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-green-600 dark:text-green-400">Simple Interest Total</p>
              <p className="font-bold text-green-800 dark:text-green-200">
                {formatCurrency(finalData.simpleInterest)}
              </p>
            </div>
            <div>
              <p className="text-green-600 dark:text-green-400">Compound Interest Total</p>
              <p className="font-bold text-green-800 dark:text-green-200">
                {formatCurrency(finalData.compoundInterest)}
              </p>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-400">Year</th>
                <th className="px-3 py-2 text-right font-semibold text-slate-600 dark:text-slate-400">Simple</th>
                <th className="px-3 py-2 text-right font-semibold text-slate-600 dark:text-slate-400">Compound</th>
                <th className="px-3 py-2 text-right font-semibold text-slate-600 dark:text-slate-400">Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {data
                .filter((_, i) => i % 5 === 0 || i === data.length - 1)
                .map((row) => (
                  <tr key={row.year}>
                    <td className="px-3 py-2 text-slate-700 dark:text-slate-300">{row.year}</td>
                    <td className="px-3 py-2 text-right text-slate-600 dark:text-slate-400">
                      {formatCurrency(row.simpleInterest)}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-300 font-medium">
                      {formatCurrency(row.compoundInterest)}
                    </td>
                    <td className="px-3 py-2 text-right text-green-600 dark:text-green-400">
                      +{formatCurrency(row.difference)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Educational Note */}
        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
            📚 Understanding Compound Interest
          </h5>
          <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
            <li>• <strong>Compound interest</strong> earns interest on your interest.</li>
            <li>• <strong>More frequent compounding</strong> (monthly vs annually) yields more growth.</li>
            <li>• <strong>Time is your best friend.</strong> Start early to maximize the effect.</li>
            <li>• <strong>Rule of 72:</strong> Divide 72 by your interest rate to estimate doubling time.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
