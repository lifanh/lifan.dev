import { AlertTriangle, DollarSign, Shield, Target, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCalculatorStore } from '../../../store';

interface FinancialData {
  netWorth: number;
  assets: number;
  liabilities: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  liquidAssets: number;
  emergencyFund: number;
  totalDebt: number;
}

interface Ratio {
  value: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  description: string;
}

export function FinancialHealthDashboard() {
  const { data } = useCalculatorStore();
  const [financialData, setFinancialData] = useState<FinancialData>({
    netWorth: 0,
    assets: 0,
    liabilities: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    liquidAssets: 0,
    emergencyFund: 0,
    totalDebt: 0,
  });

  useEffect(() => {
    // Load data from calculator store
    const netWorthData = data.netWorth;
    const incomeData = data.incomeStatement;
    const budgetData = data.budget;

    // Compute totals from raw data
    const computeNetWorthTotals = (data: any) => {
      if (!data || !data.assets || !data.liabilities) return { netWorth: 0, totalAssets: 0, totalLiabilities: 0, liquidAssets: 0 };

      const totalAssets = data.assets.reduce((sum: number, asset: any) => sum + (parseFloat(asset.value) || 0), 0);
      const totalLiabilities = data.liabilities.reduce((sum: number, liability: any) => sum + (parseFloat(liability.value) || 0), 0);
      const netWorth = totalAssets - totalLiabilities;

      // Calculate liquid assets (cash and investments)
      const liquidAssets = data.assets
        .filter((asset: any) => asset.category === 'cash' || asset.category === 'investments')
        .reduce((sum: number, asset: any) => sum + (parseFloat(asset.value) || 0), 0);

      return { netWorth, totalAssets, totalLiabilities, liquidAssets };
    };

    const computeIncomeTotals = (data: any) => {
      if (!data || !data.income || !data.expenses) return { totalIncome: 0, totalExpenses: 0 };

      const totalIncome = data.income.reduce((sum: number, item: any) => sum + (parseFloat(item.amount) || 0), 0);
      const totalExpenses = data.expenses.reduce((sum: number, item: any) => sum + (parseFloat(item.amount) || 0), 0);

      return { totalIncome, totalExpenses };
    };

    const netWorthTotals = computeNetWorthTotals(netWorthData);
    const incomeTotals = computeIncomeTotals(incomeData);
    const budgetTotals = budgetData ? { totalIncome: budgetData.income || 0, totalExpenses: 0 } : { totalIncome: 0, totalExpenses: 0 };

    if (netWorthData || incomeData || budgetData) {
      setFinancialData({
        netWorth: netWorthTotals.netWorth,
        assets: netWorthTotals.totalAssets,
        liabilities: netWorthTotals.totalLiabilities,
        monthlyIncome: incomeTotals.totalIncome || budgetTotals.totalIncome,
        monthlyExpenses: incomeTotals.totalExpenses || budgetTotals.totalExpenses,
        liquidAssets: netWorthTotals.liquidAssets,
        emergencyFund: netWorthTotals.liquidAssets,
        totalDebt: netWorthTotals.totalLiabilities,
      });
    }
  }, [data]);

  // Calculate financial ratios
  const calculateRatios = () => {
    const ratios: { [key: string]: Ratio } = {};

    // Emergency Fund Ratio (liquid assets / monthly expenses)
    const emergencyFundRatio = financialData.monthlyExpenses > 0
      ? financialData.emergencyFund / financialData.monthlyExpenses
      : 0;
    ratios.emergencyFund = {
      value: emergencyFundRatio,
      status: emergencyFundRatio >= 6 ? 'excellent' :
              emergencyFundRatio >= 3 ? 'good' :
              emergencyFundRatio >= 1 ? 'fair' : 'poor',
      description: 'Months of expenses covered by emergency fund',
    };

    // Debt-to-Income Ratio
    const monthlyDebtPayment = data.totalDebt * 0.03; // Rough estimate
    const debtToIncomeRatio = financialData.monthlyIncome > 0
      ? (monthlyDebtPayment / financialData.monthlyIncome) * 100
      : 0;
    ratios.debtToIncome = {
      value: debtToIncomeRatio,
      status: debtToIncomeRatio <= 20 ? 'excellent' :
              debtToIncomeRatio <= 35 ? 'good' :
              debtToIncomeRatio <= 50 ? 'fair' : 'poor',
      description: 'Percentage of income going to debt payments',
    };

    // Savings Rate
    const monthlySavings = financialData.monthlyIncome - financialData.monthlyExpenses;
    const savingsRate = financialData.monthlyIncome > 0
      ? (monthlySavings / financialData.monthlyIncome) * 100
      : 0;
    ratios.savingsRate = {
      value: savingsRate,
      status: savingsRate >= 20 ? 'excellent' :
              savingsRate >= 10 ? 'good' :
              savingsRate >= 5 ? 'fair' : 'poor',
      description: 'Percentage of income saved each month',
    };

    // Liquidity Ratio (liquid assets / monthly expenses)
    const liquidityRatio = financialData.monthlyExpenses > 0
      ? financialData.liquidAssets / financialData.monthlyExpenses
      : 0;
    ratios.liquidity = {
      value: liquidityRatio,
      status: liquidityRatio >= 3 ? 'excellent' :
              liquidityRatio >= 1 ? 'good' :
              liquidityRatio >= 0.5 ? 'fair' : 'poor',
      description: 'Ability to cover expenses with liquid assets',
    };

    // Net Worth Growth (placeholder - would need historical data)
    ratios.netWorthGrowth = {
      value: 0,
      status: 'good' as const,
      description: 'Net worth change over time (tracking needed)',
    };

    return ratios;
  };

  const ratios = calculateRatios();

  const getStatusColor = (status: Ratio['status']) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
      case 'good': return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
      case 'fair': return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20';
      case 'poor': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
    }
  };

  const getStatusIcon = (status: Ratio['status']) => {
    switch (status) {
      case 'excellent': return <Target className="w-4 h-4" />;
      case 'good': return <TrendingUp className="w-4 h-4" />;
      case 'fair': return <AlertTriangle className="w-4 h-4" />;
      case 'poor': return <TrendingDown className="w-4 h-4" />;
    }
  };

  const getOverallHealth = () => {
    const statusValues = { excellent: 4, good: 3, fair: 2, poor: 1 };
    const averageScore = Object.values(ratios).reduce((sum, r) => sum + statusValues[r.status], 0) / Object.keys(ratios).length;

    if (averageScore >= 3.5) return { status: 'Excellent', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' };
    if (averageScore >= 2.5) return { status: 'Good', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    if (averageScore >= 1.5) return { status: 'Fair', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' };
    return { status: 'Needs Attention', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' };
  };

  const overallHealth = getOverallHealth();

  return (
    <div className="space-y-6">
      {/* Overall Health Score */}
      <div className={`${overallHealth.bg} dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Overall Financial Health</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Based on your financial ratios</p>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold ${overallHealth.color}`}>{overallHealth.status}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Score</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Net Worth</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                ${financialData.netWorth.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-slate-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Savings</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                ${Math.max(0, financialData.monthlyIncome - financialData.monthlyExpenses).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-slate-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Debt-to-Assets</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {financialData.assets > 0 ? Math.round((financialData.totalDebt / financialData.assets) * 100) : 0}%
              </p>
            </div>
            <Shield className="w-8 h-8 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Financial Ratios */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Financial Ratios</h3>
        <div className="space-y-3">
          {Object.entries(ratios).map(([key, ratio]) => (
            <div key={key} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ratio.status)}`}>
                    {getStatusIcon(ratio.status)}
                    {ratio.status.charAt(0).toUpperCase() + ratio.status.slice(1)}
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {key === 'debtToIncome' || key === 'savingsRate'
                    ? `${ratio.value.toFixed(1)}%`
                    : key === 'netWorthGrowth'
                    ? '—'
                    : ratio.value.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{ratio.description}</p>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      ratio.status === 'excellent' ? 'bg-green-500' :
                      ratio.status === 'good' ? 'bg-blue-500' :
                      ratio.status === 'fair' ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{
                      width: key === 'debtToIncome' || key === 'savingsRate'
                        ? `${Math.min(100, ratio.value)}%`
                        : key === 'emergencyFund'
                        ? `${Math.min(100, (ratio.value / 6) * 100)}%`
                        : key === 'liquidity'
                        ? `${Math.min(100, (ratio.value / 3) * 100)}%`
                        : '0%'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recommendations</h3>
        <div className="space-y-3">
          {ratios.emergencyFund.status === 'poor' && (
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700 dark:text-slate-300">
                  Build an emergency fund covering at least 3-6 months of expenses.
                </p>
              </div>
            </div>
          )}
          {ratios.savingsRate.status === 'poor' && (
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700 dark:text-slate-300">
                  Try to save at least 10% of your income each month.
                </p>
              </div>
            </div>
          )}
          {ratios.debtToIncome.status === 'poor' && (
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700 dark:text-slate-300">
                  Consider debt reduction strategies to lower your debt-to-income ratio.
                </p>
              </div>
            </div>
          )}
          {(ratios.emergencyFund.status === 'excellent' &&
            ratios.savingsRate.status === 'excellent' &&
            ratios.debtToIncome.status !== 'poor') && (
            <div className="flex gap-3">
              <Target className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-700 dark:text-slate-300">
                  Your financial health is excellent! Consider investing surplus funds for long-term growth.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Source Notice */}
      <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
        This dashboard uses data from your Net Worth Calculator, Income Statement, and Budget Builder.
        Update those tools to see the latest figures here.
      </div>
    </div>
  );
}
