import { ComparisonTable, DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { NetWorthCalculator } from '../components/interactive/calculators/NetWorthCalculator';
import { TransactionImpactVisualizer } from '../components/interactive/visualizers/TransactionImpactVisualizer';
import { module02Quiz } from './quizzes';

export function Module2Content() {
  return (
    <div className="space-y-8">
      {/* Section 2.1 */}
      <section id="section-2-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          2.1 The Foundation of All Accounting
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Every accounting system ever created rests on one elegant equation:
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 my-6 text-center">
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            Assets = Liabilities + Owner's Equity
          </p>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mb-6">
          This isn't just a formula to memorize—it's a fundamental truth about how value works.
        </p>

        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
          Understanding Each Component
        </h3>

        <DefinitionCard
          term="Assets"
          definition="Resources with economic value that you own or have the right to use. Examples include cash, investments, property, and equipment."
        />

        <ComparisonTable
          headers={['Asset Type', 'Personal Examples', 'Business Examples']}
          rows={[
            ['Current Assets (convert to cash within 1 year)', 'Checking account, savings, investments you could sell', 'Cash, accounts receivable, inventory'],
            ['Fixed Assets (long-term)', 'Home, car, furniture', 'Equipment, buildings, land'],
            ['Intangible Assets', '—', 'Patents, trademarks, goodwill'],
          ]}
        />

        <DefinitionCard
          term="Liabilities"
          definition="Obligations to pay money or provide services to others. These are your debts—what you owe."
        />

        <ComparisonTable
          headers={['Liability Type', 'Personal Examples', 'Business Examples']}
          rows={[
            ['Current Liabilities (due within 1 year)', 'Credit card balance, bills due', 'Accounts payable, short-term loans'],
            ['Long-term Liabilities', 'Mortgage, student loans, car loan', 'Bank loans, bonds payable'],
          ]}
        />

        <DefinitionCard
          term="Owner's Equity (Net Worth)"
          definition="Your ownership stake—what would remain if you sold all assets and paid all debts. For individuals, this is called Net Worth."
        />

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 my-6">
          <p className="text-slate-800 dark:text-slate-200">
            <strong>For individuals:</strong> Net Worth = Assets - Liabilities
          </p>
          <p className="text-slate-800 dark:text-slate-200 mt-2">
            <strong>For businesses:</strong> Owner's Equity = Initial Investment + Retained Earnings
          </p>
        </div>
      </section>

      {/* Section 2.2 */}
      <section id="section-2-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          2.2 The Equation Always Balances
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Every financial transaction affects at least two elements while keeping the equation in balance.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Example Transactions:
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold">Transaction</th>
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold">Assets</th>
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold">Liabilities</th>
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold">Equity</th>
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center font-semibold">Balanced?</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Receive $1,000 paycheck</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-green-600">Cash +$1,000</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">—</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-green-600">Revenue +$1,000</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center">✓</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Pay $500 rent</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-red-600">Cash -$500</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">—</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-red-600">Expense -$500</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Buy $300 groceries on credit</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">—</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-red-600">Credit Card +$300</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-red-600">Expense -$300</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center">✓</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Pay off $200 credit card</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-red-600">Cash -$200</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-green-600">Credit Card -$200</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">—</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center">✓</td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Buy $20,000 car with $5,000 down + loan</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">
                  <span className="text-green-600">Car +$20,000</span>, <span className="text-red-600">Cash -$5,000</span>
                </td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-red-600">Loan +$15,000</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">—</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center">✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        <KeyTakeaway>
          <p>
            Notice how every transaction keeps the equation balanced. This self-balancing nature
            is the genius of double-entry bookkeeping—errors become immediately apparent when
            the books don't balance.
          </p>
        </KeyTakeaway>
      </section>

      {/* Net Worth Calculator */}
      <section id="section-2-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Interactive Tool: Net Worth Calculator
        </h2>

        <TryItYourself>
          <p>
            Use the calculator below to calculate your personal net worth. Enter your assets
            and liabilities to see how the accounting equation applies to your own finances.
          </p>
        </TryItYourself>

        <div className="my-6">
          <NetWorthCalculator />
        </div>
      </section>

      {/* Real-World Scenario */}
      <section id="section-2-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Real-World Scenario: First-Time Home Buyer
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-slate-700 dark:text-slate-300 italic">
            Alex has $40,000 saved and is buying a $300,000 home with a 20% down payment
            ($60,000 needed—so he's short!).
          </p>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          Analysis:
        </h3>

        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-medium text-slate-900 dark:text-white mb-2">Before Purchase:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Assets: $40,000 (savings)</li>
              <li>Liabilities: $0</li>
              <li>Net Worth: $40,000</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-medium text-slate-900 dark:text-white mb-2">After Purchase (if Alex saves more first):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Assets: $300,000 (home value)</li>
              <li>Liabilities: $240,000 (mortgage - 80% of home value)</li>
              <li>Net Worth: $60,000</li>
            </ul>
          </div>
        </div>

        <KeyTakeaway>
          <p>
            Notice how Alex's net worth increased from $40,000 to $60,000 after buying the home.
            Even though they took on $240,000 in debt, they also gained a $300,000 asset. The
            accounting equation helps us see the full picture.
          </p>
        </KeyTakeaway>
      </section>

      {/* Summary */}
      <section id="section-2-summary" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            In this module, you learned:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>The fundamental accounting equation: Assets = Liabilities + Owner's Equity</li>
            <li>Assets are what you own; liabilities are what you owe; equity is what's yours</li>
            <li>Every transaction affects at least two accounts while maintaining balance</li>
            <li>Net worth is your personal equity calculation (Assets - Liabilities)</li>
            <li>Understanding this equation helps you make informed financial decisions</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 3, you'll learn about double-entry bookkeeping
          and how to properly record transactions in a journal and ledger.
        </p>
      </section>

      {/* Transaction Impact Visualizer */}
      <section id="section-2-visualizer" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Interactive Tool: Transaction Impact Visualizer
        </h2>

        <TryItYourself>
          <p>
            Add transactions below and watch how each one affects the accounting equation.
            Notice how every transaction keeps the equation in balance!
          </p>
        </TryItYourself>

        <div className="my-6">
          <TransactionImpactVisualizer />
        </div>
      </section>

      {/* Knowledge Check */}
      <section id="section-2-quiz" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the accounting equation and how transactions affect it.
        </p>
        <KnowledgeCheck
          moduleId={2}
          title="Module 2: The Accounting Equation"
          questions={module02Quiz}
        />
      </section>
    </div>
  );
}
