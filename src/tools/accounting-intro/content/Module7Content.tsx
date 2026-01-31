import { ComparisonTable, DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { BudgetBuilder } from '../components/interactive/calculators/BudgetBuilder';
import { module07Quiz } from './quizzes';

export function Module7Content() {
  return (
    <div className="space-y-8">
      {/* Section 7.1 */}
      <section id="section-7-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          7.1 What is Budgeting?
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          A budget is a <strong>financial plan</strong> that estimates income and expenses over a
          specific period. It's not about restricting spending—it's about <em>intentional spending</em>
          that aligns with your goals.
        </p>

        <DefinitionCard
          term="Budget"
          definition="A financial plan that allocates expected income to planned expenses and savings goals over a specific time period (usually monthly or annually)."
        />

        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 my-6">
          <p className="text-emerald-800 dark:text-emerald-200">
            <strong>The Real Purpose:</strong> A budget isn't about saying "no" to everything—it's
            about saying "yes" to what matters most. When you budget, you're making conscious
            decisions about your money before emotions or impulses take over.
          </p>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Budgeting = Planning + Tracking + Adjusting.</strong> It's an ongoing process,
            not a one-time exercise. The best budget is one you actually use and update regularly.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 7.2 */}
      <section id="section-7-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          7.2 Budgeting Methodologies
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          There's no one-size-fits-all approach to budgeting. Different methodologies work better
          for different people and situations. Here are the four most popular approaches:
        </p>

        <div className="space-y-4 my-6">
          {/* Traditional Budgeting */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              1. Traditional (Line-Item) Budgeting
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              The classic approach: list all income, list all expenses by category, and ensure
              expenses don't exceed income.
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">✓ Pros:</p>
                <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300 space-y-1">
                  <li>Simple and straightforward</li>
                  <li>Easy to understand</li>
                  <li>Works well for stable income</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">✗ Cons:</p>
                <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300 space-y-1">
                  <li>Can encourage "use it or lose it" mentality</li>
                  <li>May not question if spending is necessary</li>
                  <li>Less flexible for variable income</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Zero-Based Budgeting */}
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              2. Zero-Based Budgeting
            </h4>
            <p className="text-purple-700 dark:text-purple-300 text-sm mb-3">
              Every dollar has a job. Income minus all allocations (including savings) equals zero.
            </p>
            <div className="bg-purple-100 dark:bg-purple-800/30 rounded p-3 mb-3 font-mono text-sm text-purple-800 dark:text-purple-200">
              Income - Expenses - Savings - Investments = $0
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-medium text-purple-800 dark:text-purple-200 mb-1">✓ Pros:</p>
                <ul className="list-disc pl-5 text-purple-700 dark:text-purple-300 space-y-1">
                  <li>Forces intentionality with every dollar</li>
                  <li>Prevents "leftover" money from disappearing</li>
                  <li>Great for debt payoff or aggressive saving</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-purple-800 dark:text-purple-200 mb-1">✗ Cons:</p>
                <ul className="list-disc pl-5 text-purple-700 dark:text-purple-300 space-y-1">
                  <li>Requires more time and effort</li>
                  <li>Can feel restrictive to some</li>
                  <li>Needs frequent adjustments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 50/30/20 Rule */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              3. The 50/30/20 Rule
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm mb-3">
              A simple framework: 50% to needs, 30% to wants, 20% to savings and debt repayment.
            </p>
            <div className="flex gap-2 mb-3">
              <div className="flex-1 bg-green-200 dark:bg-green-700 rounded p-2 text-center">
                <span className="text-lg font-bold text-green-800 dark:text-green-100">50%</span>
                <p className="text-xs text-green-700 dark:text-green-200">Needs</p>
              </div>
              <div className="flex-1 bg-green-300 dark:bg-green-600 rounded p-2 text-center">
                <span className="text-lg font-bold text-green-800 dark:text-green-100">30%</span>
                <p className="text-xs text-green-700 dark:text-green-200">Wants</p>
              </div>
              <div className="flex-1 bg-green-400 dark:bg-green-500 rounded p-2 text-center">
                <span className="text-lg font-bold text-green-800 dark:text-green-100">20%</span>
                <p className="text-xs text-green-700 dark:text-green-200">Savings</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">✓ Pros:</p>
                <ul className="list-disc pl-5 text-green-700 dark:text-green-300 space-y-1">
                  <li>Easy to remember and implement</li>
                  <li>Provides flexibility within categories</li>
                  <li>Good starting point for beginners</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">✗ Cons:</p>
                <ul className="list-disc pl-5 text-green-700 dark:text-green-300 space-y-1">
                  <li>May not work in high cost-of-living areas</li>
                  <li>Needs vs wants can be subjective</li>
                  <li>Less detailed tracking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Envelope System */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              4. Envelope System
            </h4>
            <p className="text-amber-700 dark:text-amber-300 text-sm mb-3">
              Allocate cash to physical (or virtual) envelopes for each spending category.
              When the envelope is empty, you stop spending in that category.
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">✓ Pros:</p>
                <ul className="list-disc pl-5 text-amber-700 dark:text-amber-300 space-y-1">
                  <li>Visual and tangible limits</li>
                  <li>Prevents overspending</li>
                  <li>Great for discretionary categories</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">✗ Cons:</p>
                <ul className="list-disc pl-5 text-amber-700 dark:text-amber-300 space-y-1">
                  <li>Less practical in digital payment world</li>
                  <li>Carrying cash can be inconvenient</li>
                  <li>Doesn't work well for online purchases</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <ComparisonTable
          headers={['Method', 'Best For', 'Effort Level', 'Flexibility']}
          rows={[
            ['Traditional', 'Stable income, simple finances', 'Low', 'Medium'],
            ['Zero-Based', 'Debt payoff, aggressive savers', 'High', 'Low'],
            ['50/30/20', 'Beginners, high earners', 'Low', 'High'],
            ['Envelope', 'Overspenders, cash users', 'Medium', 'Low'],
          ]}
        />
      </section>

      {/* Section 7.3 */}
      <section id="section-7-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          7.3 Creating Your Budget
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Follow these steps to create an effective budget:
        </p>

        <div className="space-y-4 my-6">
          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-8 h-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Calculate Your Income</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                List all sources of income after taxes. Include salary, side gigs, investments,
                and any other regular income.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-8 h-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Track Current Spending</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Review 2-3 months of bank and credit card statements. Categorize every expense
                to understand your actual spending patterns.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-8 h-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Set Financial Goals</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Define short-term (emergency fund, vacation), medium-term (car, down payment),
                and long-term goals (retirement, education).
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-8 h-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Allocate Every Dollar</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Assign income to categories: fixed expenses, variable expenses, savings,
                and discretionary spending.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-8 h-8 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-sm">
              5
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Review and Adjust</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Compare actual spending to your budget weekly. Make adjustments as needed.
                A budget is a living document!
              </p>
            </div>
          </div>
        </div>

        <TryItYourself>
          <p>
            Before using the Budget Builder below, gather your last 3 months of bank
            and credit card statements. Calculate your average monthly spending in each category.
          </p>
        </TryItYourself>
      </section>

      {/* Section 7.4 - Budget Builder Tool */}
      <section id="section-7-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          7.4 Interactive: Budget Builder
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Use this tool to create your own budget. Select a methodology that fits your style,
          enter your income, and plan your expenses. Track actual spending to see how you're doing.
        </p>

        <BudgetBuilder />
      </section>

      {/* Section 7.5 - Variance Analysis */}
      <section id="section-7-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          7.5 Variance Analysis
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          <strong>Variance analysis</strong> compares what you planned (budgeted) to what
          actually happened. Understanding variances helps you improve future budgets.
        </p>

        <DefinitionCard
          term="Variance"
          definition="The difference between a budgeted (planned) amount and the actual amount. Can be favorable (good) or unfavorable (bad) depending on context."
        />

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Favorable Variance ✓
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm mb-2">
              When actual results are better than planned:
            </p>
            <ul className="list-disc pl-5 text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>Spending less than budgeted</li>
              <li>Earning more than expected</li>
              <li>Saving more than planned</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Unfavorable Variance ✗
            </h4>
            <p className="text-red-700 dark:text-red-300 text-sm mb-2">
              When actual results are worse than planned:
            </p>
            <ul className="list-disc pl-5 text-red-700 dark:text-red-300 text-sm space-y-1">
              <li>Overspending in a category</li>
              <li>Earning less than expected</li>
              <li>Missing savings goals</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
          Calculating Variance
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm my-4">
          <p className="text-slate-800 dark:text-slate-200">
            <strong>Expense Variance</strong> = Budgeted Amount - Actual Amount
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
            Positive = Favorable (under budget) | Negative = Unfavorable (over budget)
          </p>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm my-4">
          <p className="text-slate-800 dark:text-slate-200">
            <strong>Variance Percentage</strong> = (Variance / Budgeted Amount) × 100
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
            Helps compare variances across different-sized categories
          </p>
        </div>

        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
          Example: Monthly Budget Variance
        </h3>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-600">
                <th className="text-left py-2 px-3 text-slate-900 dark:text-white">Category</th>
                <th className="text-right py-2 px-3 text-slate-900 dark:text-white">Budgeted</th>
                <th className="text-right py-2 px-3 text-slate-900 dark:text-white">Actual</th>
                <th className="text-right py-2 px-3 text-slate-900 dark:text-white">Variance</th>
                <th className="text-center py-2 px-3 text-slate-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 px-3">Housing</td>
                <td className="text-right py-2 px-3">$1,500</td>
                <td className="text-right py-2 px-3">$1,500</td>
                <td className="text-right py-2 px-3">$0</td>
                <td className="text-center py-2 px-3">➖</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 px-3">Food</td>
                <td className="text-right py-2 px-3">$600</td>
                <td className="text-right py-2 px-3">$720</td>
                <td className="text-right py-2 px-3 text-red-600 dark:text-red-400">-$120</td>
                <td className="text-center py-2 px-3">❌</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 px-3">Transportation</td>
                <td className="text-right py-2 px-3">$400</td>
                <td className="text-right py-2 px-3">$350</td>
                <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">+$50</td>
                <td className="text-center py-2 px-3">✅</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 px-3">Entertainment</td>
                <td className="text-right py-2 px-3">$200</td>
                <td className="text-right py-2 px-3">$280</td>
                <td className="text-right py-2 px-3 text-red-600 dark:text-red-400">-$80</td>
                <td className="text-center py-2 px-3">❌</td>
              </tr>
              <tr className="font-semibold bg-slate-50 dark:bg-slate-800/50">
                <td className="py-2 px-3">Total</td>
                <td className="text-right py-2 px-3">$2,700</td>
                <td className="text-right py-2 px-3">$2,850</td>
                <td className="text-right py-2 px-3 text-red-600 dark:text-red-400">-$150</td>
                <td className="text-center py-2 px-3">❌</td>
              </tr>
            </tbody>
          </table>
        </div>

        <KeyTakeaway>
          <p>
            Variances aren't failures—they're learning opportunities. Use unfavorable variances
            to identify areas needing attention, and favorable variances to potentially reallocate
            funds to goals.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 7.6 - Real-World Scenario */}
      <section id="section-7-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          7.6 Scenario: The Emergency Fund Journey
        </h2>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 my-4">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <strong>Meet Jordan:</strong> A 28-year-old marketing coordinator earning $4,500/month
            after taxes. Jordan has $500 in savings, $3,000 in credit card debt, and wants to
            build a 3-month emergency fund ($13,500).
          </p>

          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Current Situation:</h4>
          <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1 mb-4">
            <li>Monthly income: $4,500</li>
            <li>Current spending: $4,200 (leaves only $300/month)</li>
            <li>At current rate: 43 months to reach goal</li>
          </ul>

          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">The Challenge:</h4>
          <p className="text-slate-700 dark:text-slate-300">
            Can Jordan use budgeting to reach the emergency fund goal faster while paying off
            the credit card?
          </p>
        </div>

        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">
          Jordan's Zero-Based Budget
        </h3>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-600">
                <th className="text-left py-2 px-3 text-slate-900 dark:text-white">Category</th>
                <th className="text-right py-2 px-3 text-slate-900 dark:text-white">Before</th>
                <th className="text-right py-2 px-3 text-slate-900 dark:text-white">After</th>
                <th className="text-right py-2 px-3 text-slate-900 dark:text-white">Savings</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 px-3">Housing</td>
                <td className="text-right py-2 px-3">$1,500</td>
                <td className="text-right py-2 px-3">$1,500</td>
                <td className="text-right py-2 px-3">$0</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 px-3">Food</td>
                <td className="text-right py-2 px-3">$700</td>
                <td className="text-right py-2 px-3">$500</td>
                <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">$200</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 px-3">Transportation</td>
                <td className="text-right py-2 px-3">$450</td>
                <td className="text-right py-2 px-3">$350</td>
                <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">$100</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 px-3">Entertainment</td>
                <td className="text-right py-2 px-3">$400</td>
                <td className="text-right py-2 px-3">$150</td>
                <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">$250</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 px-3">Subscriptions</td>
                <td className="text-right py-2 px-3">$200</td>
                <td className="text-right py-2 px-3">$50</td>
                <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">$150</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-2 px-3">Other</td>
                <td className="text-right py-2 px-3">$650</td>
                <td className="text-right py-2 px-3">$400</td>
                <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">$250</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20">
                <td className="py-2 px-3 font-medium">Credit Card Payment</td>
                <td className="text-right py-2 px-3">$100</td>
                <td className="text-right py-2 px-3">$500</td>
                <td className="text-right py-2 px-3 text-blue-600 dark:text-blue-400">+$400</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-green-50 dark:bg-green-900/20">
                <td className="py-2 px-3 font-medium">Emergency Fund</td>
                <td className="text-right py-2 px-3">$200</td>
                <td className="text-right py-2 px-3">$550</td>
                <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">+$350</td>
              </tr>
              <tr className="font-semibold bg-slate-50 dark:bg-slate-800/50">
                <td className="py-2 px-3">Total</td>
                <td className="text-right py-2 px-3">$4,200</td>
                <td className="text-right py-2 px-3">$4,000</td>
                <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">$950 freed up</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 my-6">
          <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
            The Result:
          </h4>
          <ul className="list-disc pl-5 text-emerald-700 dark:text-emerald-300 space-y-1">
            <li>Credit card paid off in 6 months (was: 30+ months)</li>
            <li>After debt payoff: $1,050/month to emergency fund</li>
            <li>Emergency fund complete in ~13 months total (was: 43 months)</li>
            <li><strong>Time saved: 30 months!</strong></li>
          </ul>
        </div>
      </section>

      {/* Section 7.7 - Knowledge Check */}
      <section id="section-7-7" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          7.7 Knowledge Check
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of budgeting concepts with this quiz.
        </p>

        <KnowledgeCheck
          moduleId={7}
          title="Module 7 Knowledge Check"
          questions={module07Quiz}
        />
      </section>

      {/* Section 7.8 - Resources */}
      <section id="section-7-8" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          7.8 Resources
        </h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              📄 Templates
            </h4>
            <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
              <li>• Personal Monthly Budget (Excel)</li>
              <li>• Zero-Based Budget Worksheet</li>
              <li>• 50/30/20 Budget Calculator</li>
              <li>• Envelope System Tracker</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              ✅ Checklists
            </h4>
            <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
              <li>• Monthly Budget Review Checklist</li>
              <li>• Expense Category Guide</li>
              <li>• Budget Setup Checklist</li>
            </ul>
          </div>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Module 7 Complete!</strong> You now understand different budgeting methodologies,
            how to create and maintain a budget, and how to use variance analysis to improve your
            financial planning. Continue to Module 8 to learn about recording and organizing your
            financial transactions.
          </p>
        </KeyTakeaway>
      </section>
    </div>
  );
}
