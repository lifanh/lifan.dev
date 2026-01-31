import { ComparisonTable, DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { IncomeStatementBuilder } from '../components/interactive/calculators/IncomeStatementBuilder';
import { ProfitMarginAnalyzer } from '../components/interactive/calculators/ProfitMarginAnalyzer';
import { module04Quiz } from './quizzes';

export function Module4Content() {
  return (
    <div className="space-y-8">
      {/* Section 4.1 */}
      <section id="section-4-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          4.1 Understanding the Income Statement
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The Income Statement (also called the Profit & Loss Statement or P&L) answers the
          fundamental question: <strong>Did we make money or lose money over a specific period?</strong>
        </p>

        <DefinitionCard
          term="Income Statement"
          definition="A financial statement that shows revenues, expenses, and resulting profit or loss over a specific time period (month, quarter, or year). It measures financial performance."
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 my-6 text-center">
          <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
            Revenue − Expenses = Net Income (or Net Loss)
          </p>
        </div>

        <KeyTakeaway>
          <p>
            Unlike the Balance Sheet (a snapshot at a moment in time), the Income Statement
            covers a <strong>period of time</strong>—like a movie vs. a photograph.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 4.2 */}
      <section id="section-4-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          4.2 Revenue: Money Coming In
        </h2>

        <DefinitionCard
          term="Revenue (Sales/Income)"
          definition="The money earned from selling goods or providing services. Revenue is recognized when earned, not necessarily when cash is received."
        />

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Types of Revenue:
        </h3>

        <ComparisonTable
          headers={['Revenue Type', 'Description', 'Examples']}
          rows={[
            ['Operating Revenue', 'From core business activities', 'Sales of products, service fees, subscriptions'],
            ['Non-Operating Revenue', 'From secondary activities', 'Interest income, rental income, gains from investments'],
          ]}
        />

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Important:</strong> Revenue is recorded when <em>earned</em> (accrual basis),
            not when cash is received. If you provide a service today but the customer pays in 30 days,
            you record revenue today.
          </p>
        </div>
      </section>

      {/* Section 4.3 */}
      <section id="section-4-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          4.3 Expenses: Money Going Out
        </h2>

        <DefinitionCard
          term="Expenses"
          definition="The costs incurred to generate revenue. Expenses reduce equity and are matched to the revenue they help generate."
        />

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Common Expense Categories:
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Operating Expenses</h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <li>Cost of Goods Sold (COGS)</li>
              <li>Salaries and wages</li>
              <li>Rent and utilities</li>
              <li>Marketing and advertising</li>
              <li>Office supplies</li>
              <li>Insurance</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Non-Operating Expenses</h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <li>Interest expense</li>
              <li>Depreciation</li>
              <li>Losses from asset sales</li>
              <li>Legal settlements</li>
              <li>Restructuring costs</li>
            </ul>
          </div>
        </div>

        <KeyTakeaway>
          <p>
            The <strong>matching principle</strong> requires that expenses be recorded in the same
            period as the revenue they helped generate. If you pay $12,000 for a year of insurance
            in January, you recognize $1,000/month as an expense throughout the year.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 4.4 */}
      <section id="section-4-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          4.4 Income Statement Structure
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          A typical income statement follows this structure:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 font-mono text-sm my-6 overflow-x-auto">
          <pre className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
{`ACME Corporation
Income Statement
For the Year Ended December 31, 2025
────────────────────────────────────────

Revenue
  Sales Revenue                    $500,000
  Service Revenue                   $75,000
                                  ─────────
  Total Revenue                    $575,000

Cost of Goods Sold                ($200,000)
                                  ─────────
Gross Profit                       $375,000

Operating Expenses
  Salaries Expense                ($120,000)
  Rent Expense                     ($36,000)
  Utilities Expense                 ($8,000)
  Marketing Expense                ($25,000)
  Depreciation Expense             ($15,000)
                                  ─────────
  Total Operating Expenses        ($204,000)
                                  ─────────
Operating Income                   $171,000

Other Income/Expenses
  Interest Expense                  ($5,000)
  Interest Income                    $2,000
                                  ─────────
Income Before Taxes                $168,000

Income Tax Expense                 ($42,000)
                                  ─────────
Net Income                         $126,000
                                  ═════════`}
          </pre>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Key Terms:
        </h3>

        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-medium text-slate-900 dark:text-white">Gross Profit</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Revenue minus Cost of Goods Sold. Shows profitability of core product/service before overhead.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-medium text-slate-900 dark:text-white">Operating Income (EBIT)</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Earnings Before Interest and Taxes. Shows profitability from core operations.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-medium text-slate-900 dark:text-white">Net Income (Bottom Line)</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Final profit after all expenses, interest, and taxes. This flows to retained earnings on the balance sheet.</p>
          </div>
        </div>
      </section>

      {/* Section 4.5 */}
      <section id="section-4-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          4.5 Key Profitability Ratios
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Ratios help you analyze performance and compare across companies or time periods:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold">Ratio</th>
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold">Formula</th>
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold">What It Tells You</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Gross Profit Margin</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-mono text-xs">Gross Profit ÷ Revenue × 100</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">% of revenue remaining after COGS</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Operating Margin</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-mono text-xs">Operating Income ÷ Revenue × 100</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">% of revenue remaining after all operating costs</td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Net Profit Margin</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-mono text-xs">Net Income ÷ Revenue × 100</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">% of revenue that becomes actual profit</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="font-medium text-slate-900 dark:text-white mb-3">Using our example above:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Gross Profit Margin:</strong> $375,000 ÷ $575,000 = 65.2%</li>
            <li><strong>Operating Margin:</strong> $171,000 ÷ $575,000 = 29.7%</li>
            <li><strong>Net Profit Margin:</strong> $126,000 ÷ $575,000 = 21.9%</li>
          </ul>
        </div>
      </section>

      {/* Real-World Scenario */}
      <section id="section-4-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Real-World Scenario: Analyzing a Personal "Income Statement"
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          You can apply the same concepts to personal finance. Here's a personal monthly income statement:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 font-mono text-sm my-6 overflow-x-auto">
          <pre className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
{`Personal Income Statement
For the Month of January 2026
────────────────────────────────────────

Income
  Salary (after tax)                $5,500
  Side Hustle Income                  $800
  Interest/Dividends                   $50
                                  ─────────
  Total Income                      $6,350

Fixed Expenses
  Rent/Mortgage                    ($1,800)
  Car Payment                        ($350)
  Insurance (Health/Auto/Renter)     ($300)
  Subscriptions                      ($100)
                                  ─────────
  Total Fixed                      ($2,550)

Variable Expenses
  Groceries                          ($400)
  Utilities                          ($150)
  Gas/Transportation                 ($200)
  Dining Out                         ($250)
  Entertainment                      ($150)
  Personal Care                       ($75)
  Miscellaneous                      ($125)
                                  ─────────
  Total Variable                   ($1,350)
                                  ─────────
Total Expenses                     ($3,900)
                                  ─────────
Net Savings                         $2,450
                                  ═════════

Savings Rate: 38.6%`}
          </pre>
        </div>

        <KeyTakeaway>
          <p>
            A personal income statement helps you see where your money goes each month. The "net
            savings" is like net income—it's what you have left to invest, save, or pay down debt.
            A healthy savings rate is typically 20% or higher.
          </p>
        </KeyTakeaway>
      </section>

      {/* Income Statement Builder */}
      <section id="section-4-7" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Interactive Tool: Income Statement Builder
        </h2>

        <TryItYourself>
          <p>
            Build a simple income statement by entering your income sources and expenses.
            Save it to keep your work for later.
          </p>
        </TryItYourself>

        <div className="my-6">
          <IncomeStatementBuilder />
        </div>
      </section>

      <section id="section-4-8" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Interactive Tool: Profit Margin Analyzer
        </h2>

        <TryItYourself>
          <p>
            Adjust revenue, COGS, and expenses to see how gross margin and net margin change.
            Use the goal seek to estimate the revenue needed for a target profit.
          </p>
        </TryItYourself>

        <div className="my-6">
          <ProfitMarginAnalyzer />
        </div>
      </section>

      {/* Module Summary */}
      <section id="section-4-summary" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            In this module, you learned:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>The income statement shows revenue minus expenses equals net income over a period</li>
            <li>Revenue is recognized when earned, not when cash is received (accrual basis)</li>
            <li>Expenses should be matched to the revenue they help generate</li>
            <li>Gross profit, operating income, and net income represent different levels of profitability</li>
            <li>Profit margins help analyze and compare business performance</li>
            <li>The same concepts apply to personal finance for tracking monthly cash flow</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 5, you'll learn about the Balance Sheet—a snapshot
          of what a business owns and owes at a specific moment in time.
        </p>
      </section>

      {/* Knowledge Check */}
      <section id="section-4-quiz" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the income statement, revenue, expenses, and profitability analysis.
        </p>
        <KnowledgeCheck
          moduleId={4}
          title="Module 4: The Income Statement"
          questions={module04Quiz}
        />
      </section>
    </div>
  );
}
