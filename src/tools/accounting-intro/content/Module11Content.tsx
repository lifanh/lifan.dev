import { DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { module11Quiz } from './quizzes';

export function Module11Content() {
  return (
    <div className="space-y-8">
      {/* Section 11.1 */}
      <section id="section-11-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          11.1 Introduction to Financial Analysis
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Financial statements tell a story—but you need the right tools to read it.
          <strong> Financial analysis</strong> transforms raw numbers into actionable insights
          about performance, efficiency, and financial health.
        </p>

        <DefinitionCard
          term="Financial Analysis"
          definition="The process of evaluating financial statements and related data to assess an entity's financial performance, position, and future prospects for decision-making purposes."
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          Why Analyze Financial Statements?
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">📈 For Investors</h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Evaluate if a company is a good investment. Compare potential investments.
              Assess risk and expected returns.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">🏢 For Managers</h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Monitor performance against goals. Identify areas for improvement.
              Make informed operational decisions.
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">🏦 For Lenders</h4>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              Assess creditworthiness. Determine if the borrower can repay.
              Set appropriate loan terms.
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">👤 For You</h4>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              Understand your personal financial health. Make better money decisions.
              Communicate with financial professionals.
            </p>
          </div>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Numbers without context are just numbers.</strong> Financial analysis
            provides the framework to understand what those numbers mean and what actions to take.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 11.2 */}
      <section id="section-11-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          11.2 Horizontal Analysis (Trend Analysis)
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          <strong>Horizontal analysis</strong> compares financial data across time periods to
          identify trends and patterns.
        </p>

        <DefinitionCard
          term="Horizontal Analysis"
          definition="A technique that compares financial statement line items over two or more periods, usually expressed as percentage changes, to identify trends."
        />

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 my-6">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Example: Sales Trend Analysis
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-slate-600 dark:text-slate-400">
                  <th className="px-3 py-2 text-left"></th>
                  <th className="px-3 py-2 text-right">2023</th>
                  <th className="px-3 py-2 text-right">2024</th>
                  <th className="px-3 py-2 text-right">2025</th>
                  <th className="px-3 py-2 text-right">Change '23-'25</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="px-3 py-2 font-medium">Revenue</td>
                  <td className="px-3 py-2 text-right">$500,000</td>
                  <td className="px-3 py-2 text-right">$575,000</td>
                  <td className="px-3 py-2 text-right">$650,000</td>
                  <td className="px-3 py-2 text-right text-green-600">+30%</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Net Income</td>
                  <td className="px-3 py-2 text-right">$50,000</td>
                  <td className="px-3 py-2 text-right">$52,000</td>
                  <td className="px-3 py-2 text-right">$45,000</td>
                  <td className="px-3 py-2 text-right text-red-600">-10%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
            ⚠️ Revenue is growing but profit is shrinking—a warning sign that deserves investigation!
          </p>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          How to Calculate
        </h3>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5 my-6">
          <div className="font-mono text-center text-blue-800 dark:text-blue-200 mb-3">
            % Change = (Current Year - Base Year) / Base Year × 100
          </div>
          <p className="text-blue-700 dark:text-blue-300 text-sm text-center">
            Example: ($650,000 - $500,000) / $500,000 × 100 = 30% increase
          </p>
        </div>
      </section>

      {/* Section 11.3 */}
      <section id="section-11-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          11.3 Vertical Analysis (Common-Size Analysis)
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          <strong>Vertical analysis</strong> expresses each line item as a percentage of a base
          figure, revealing the relative size of each component.
        </p>

        <DefinitionCard
          term="Vertical Analysis"
          definition="A technique that expresses each line item as a percentage of a base amount—typically revenue for income statements and total assets for balance sheets."
        />

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Income Statement (Base = Revenue)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Revenue</span>
                <span className="font-mono">100%</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>COGS</span>
                <span className="font-mono">60%</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Gross Profit</span>
                <span className="font-mono">40%</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Operating Expenses</span>
                <span className="font-mono">25%</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>Net Income</span>
                <span className="font-mono">10%</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Balance Sheet (Base = Total Assets)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Cash</span>
                <span className="font-mono">15%</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Accounts Receivable</span>
                <span className="font-mono">20%</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Inventory</span>
                <span className="font-mono">25%</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Fixed Assets</span>
                <span className="font-mono">40%</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium border-t border-slate-300 dark:border-slate-600 pt-2">
                <span>Total Assets</span>
                <span className="font-mono">100%</span>
              </div>
            </div>
          </div>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Vertical analysis makes comparison easy.</strong> You can compare a small
            business to a large corporation because everything is expressed as percentages.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 11.4 */}
      <section id="section-11-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          11.4 Ratio Analysis: Liquidity Ratios
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          <strong>Liquidity ratios</strong> measure the ability to pay short-term obligations.
          Can you cover your bills due in the next year?
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Current Ratio
              </h4>
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded px-3 py-1 font-mono text-sm text-blue-800 dark:text-blue-200">
                Current Assets / Current Liabilities
              </div>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Measures ability to pay current obligations with current assets.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-red-100 dark:bg-red-900/30 rounded p-2">
                <span className="font-bold text-red-700 dark:text-red-300">&lt; 1.0</span>
                <p className="text-red-600 dark:text-red-400 text-xs">Risky</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 rounded p-2">
                <span className="font-bold text-green-700 dark:text-green-300">1.5 - 2.0</span>
                <p className="text-green-600 dark:text-green-400 text-xs">Healthy</p>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 rounded p-2">
                <span className="font-bold text-amber-700 dark:text-amber-300">&gt; 3.0</span>
                <p className="text-amber-600 dark:text-amber-400 text-xs">Maybe too high</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                Quick Ratio (Acid-Test)
              </h4>
              <div className="bg-purple-100 dark:bg-purple-800/30 rounded px-3 py-1 font-mono text-sm text-purple-800 dark:text-purple-200">
                (Current Assets - Inventory) / Current Liabilities
              </div>
            </div>
            <p className="text-purple-700 dark:text-purple-300 text-sm mb-3">
              More conservative than current ratio—excludes inventory which may be hard to sell quickly.
            </p>
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              <div className="bg-red-100 dark:bg-red-900/30 rounded p-2">
                <span className="font-bold text-red-700 dark:text-red-300">&lt; 1.0</span>
                <p className="text-red-600 dark:text-red-400 text-xs">May struggle to pay bills</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 rounded p-2">
                <span className="font-bold text-green-700 dark:text-green-300">≥ 1.0</span>
                <p className="text-green-600 dark:text-green-400 text-xs">Can cover immediate needs</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Cash Ratio
              </h4>
              <div className="bg-green-100 dark:bg-green-800/30 rounded px-3 py-1 font-mono text-sm text-green-800 dark:text-green-200">
                Cash & Equivalents / Current Liabilities
              </div>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Most conservative—only counts cash and cash equivalents. Useful for assessing
              worst-case scenarios.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11.5 */}
      <section id="section-11-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          11.5 Ratio Analysis: Solvency Ratios
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          <strong>Solvency ratios</strong> measure long-term financial stability. Can you
          survive and pay debts over the long term?
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Debt-to-Equity Ratio
              </h4>
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded px-3 py-1 font-mono text-sm text-blue-800 dark:text-blue-200">
                Total Debt / Total Equity
              </div>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Shows how much the company relies on debt versus shareholder investment.
            </p>
            <div className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>Lower is generally safer.</strong> A ratio of 1.0 means equal debt and equity.
              Above 2.0 may indicate high leverage (riskier but can boost returns).
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                Debt Ratio
              </h4>
              <div className="bg-purple-100 dark:bg-purple-800/30 rounded px-3 py-1 font-mono text-sm text-purple-800 dark:text-purple-200">
                Total Liabilities / Total Assets
              </div>
            </div>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              What percentage of assets is financed by debt? Below 50% is typically considered conservative.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Interest Coverage Ratio
              </h4>
              <div className="bg-green-100 dark:bg-green-800/30 rounded px-3 py-1 font-mono text-sm text-green-800 dark:text-green-200">
                EBIT / Interest Expense
              </div>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Can you pay your interest obligations? Higher is better. Below 1.5 is a warning sign.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11.6 */}
      <section id="section-11-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          11.6 Ratio Analysis: Profitability Ratios
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          <strong>Profitability ratios</strong> measure how effectively the company generates
          profit from its operations.
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Gross Profit Margin
              </h4>
              <div className="bg-green-100 dark:bg-green-800/30 rounded px-3 py-1 font-mono text-sm text-green-800 dark:text-green-200">
                (Revenue - COGS) / Revenue × 100
              </div>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm">
              How much is left after direct costs? Varies widely by industry. Software: 70-90%. Grocery: 20-30%.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Operating Profit Margin
              </h4>
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded px-3 py-1 font-mono text-sm text-blue-800 dark:text-blue-200">
                Operating Income / Revenue × 100
              </div>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Profit from core operations before interest and taxes. Shows operational efficiency.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                Net Profit Margin
              </h4>
              <div className="bg-purple-100 dark:bg-purple-800/30 rounded px-3 py-1 font-mono text-sm text-purple-800 dark:text-purple-200">
                Net Income / Revenue × 100
              </div>
            </div>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              The "bottom line"—what percentage of revenue becomes profit after ALL expenses.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200">
                Return on Assets (ROA)
              </h4>
              <div className="bg-amber-100 dark:bg-amber-800/30 rounded px-3 py-1 font-mono text-sm text-amber-800 dark:text-amber-200">
                Net Income / Average Total Assets × 100
              </div>
            </div>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              How effectively does the company use its assets to generate profit?
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-red-800 dark:text-red-200">
                Return on Equity (ROE)
              </h4>
              <div className="bg-red-100 dark:bg-red-800/30 rounded px-3 py-1 font-mono text-sm text-red-800 dark:text-red-200">
                Net Income / Average Shareholders' Equity × 100
              </div>
            </div>
            <p className="text-red-700 dark:text-red-300 text-sm">
              How effectively does the company generate profit from shareholders' investment?
              Often considered the most important profitability metric.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11.7 */}
      <section id="section-11-7" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          11.7 Ratio Analysis: Efficiency Ratios
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          <strong>Efficiency ratios</strong> (activity ratios) measure how well the company
          uses its assets to generate sales.
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Inventory Turnover
              </h4>
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded px-3 py-1 font-mono text-sm text-blue-800 dark:text-blue-200">
                COGS / Average Inventory
              </div>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              How many times inventory is sold and replaced per year. Higher = more efficient.
              Grocery stores: 12-15. Jewelry stores: 1-2.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                Accounts Receivable Turnover
              </h4>
              <div className="bg-purple-100 dark:bg-purple-800/30 rounded px-3 py-1 font-mono text-sm text-purple-800 dark:text-purple-200">
                Net Credit Sales / Average A/R
              </div>
            </div>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              How quickly you collect from customers. Higher = collecting faster. Can also express
              as Days Sales Outstanding (365 / turnover).
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Total Asset Turnover
              </h4>
              <div className="bg-green-100 dark:bg-green-800/30 rounded px-3 py-1 font-mono text-sm text-green-800 dark:text-green-200">
                Revenue / Average Total Assets
              </div>
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm">
              How efficiently all assets generate revenue. Retail: 2.0+. Utilities: 0.3-0.5.
            </p>
          </div>
        </div>
      </section>

      {/* Section 11.8 */}
      <section id="section-11-8" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          11.8 Quick Reference: Key Ratios
        </h2>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Ratio</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Formula</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">What It Measures</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr className="bg-blue-50/50 dark:bg-blue-900/10">
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium" colSpan={3}>Liquidity</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Current Ratio</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400 font-mono text-xs">CA / CL</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Short-term solvency</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Quick Ratio</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400 font-mono text-xs">(CA - Inv) / CL</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Immediate liquidity</td>
              </tr>
              <tr className="bg-purple-50/50 dark:bg-purple-900/10">
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium" colSpan={3}>Solvency</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Debt-to-Equity</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400 font-mono text-xs">Debt / Equity</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Financial leverage</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Interest Coverage</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400 font-mono text-xs">EBIT / Interest</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Debt payment ability</td>
              </tr>
              <tr className="bg-green-50/50 dark:bg-green-900/10">
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium" colSpan={3}>Profitability</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Net Profit Margin</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400 font-mono text-xs">NI / Revenue</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Bottom-line profit</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">ROE</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400 font-mono text-xs">NI / Equity</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Return to shareholders</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">ROA</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400 font-mono text-xs">NI / Assets</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Asset efficiency</td>
              </tr>
              <tr className="bg-amber-50/50 dark:bg-amber-900/10">
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium" colSpan={3}>Efficiency</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Inventory Turnover</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400 font-mono text-xs">COGS / Avg Inv</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Inventory efficiency</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">A/R Turnover</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400 font-mono text-xs">Sales / Avg A/R</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Collection speed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 11.9 */}
      <section id="section-11-9" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          11.9 Limitations of Ratio Analysis
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          While ratios are powerful tools, they have limitations you should understand.
        </p>

        <div className="space-y-3 my-6">
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-amber-500">⚠️</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Historical Data</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ratios are based on past performance, not future guarantees.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-amber-500">⚠️</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Accounting Methods Vary</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Companies using different accounting methods may not be directly comparable.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-amber-500">⚠️</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Industry Context Matters</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                A "good" ratio in one industry may be poor in another.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-amber-500">⚠️</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Window Dressing</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Companies may manipulate year-end figures to improve ratios.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-amber-500">⚠️</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">One Ratio Isn't Enough</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Always use multiple ratios together for a complete picture.
              </p>
            </div>
          </div>
        </div>

        <TryItYourself>
          <p>
            Using the following data, calculate the current ratio, debt-to-equity ratio, and
            net profit margin:
          </p>
          <ul className="mt-2 text-sm space-y-1">
            <li>Current Assets: $150,000 | Current Liabilities: $75,000</li>
            <li>Total Debt: $200,000 | Total Equity: $400,000</li>
            <li>Net Income: $60,000 | Revenue: $500,000</li>
          </ul>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Answers: Current Ratio = 2.0 | D/E = 0.5 | Net Margin = 12%
          </p>
        </TryItYourself>
      </section>

      {/* Knowledge Check */}
      <section id="section-11-10" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          11.10 Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of financial analysis.
        </p>
        <KnowledgeCheck moduleId={11} title="Module 11: Financial Analysis Basics" questions={module11Quiz} />
      </section>

      {/* Summary */}
      <section id="section-11-11" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 my-6">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Key Takeaways</h3>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Horizontal analysis compares data over time to identify trends</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Vertical analysis expresses items as percentages for easy comparison</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Liquidity ratios (current, quick) measure short-term payment ability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Solvency ratios (debt-to-equity) measure long-term financial stability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Profitability ratios (margins, ROE, ROA) measure profit generation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Efficiency ratios measure how well assets are utilized</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Always compare ratios to industry benchmarks and over time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Use multiple ratios together—no single ratio tells the whole story</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
