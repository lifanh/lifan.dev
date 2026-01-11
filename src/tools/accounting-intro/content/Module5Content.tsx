import { ComparisonTable, DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { BalanceSheetBuilder } from '../components/interactive/calculators/BalanceSheetBuilder';
import { module05Quiz } from './quizzes';

export function Module5Content() {
  return (
    <div className="space-y-8">
      {/* Section 5.1 */}
      <section id="section-5-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          5.1 Understanding the Balance Sheet
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The Balance Sheet (also called Statement of Financial Position) answers the question:
          <strong> What does the company own, owe, and what's left for owners at a specific moment?</strong>
        </p>

        <DefinitionCard
          term="Balance Sheet"
          definition="A financial statement showing assets, liabilities, and owner's equity at a specific point in time. It's a snapshot of financial position, not a period-based statement like the income statement."
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 my-6 text-center">
          <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
            Assets = Liabilities + Owner's Equity
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
            This is the accounting equation you learned in Module 2!
          </p>
        </div>

        <KeyTakeaway>
          <p>
            The Balance Sheet is like a photograph—it shows your financial position at a
            <strong> specific moment in time</strong> (e.g., "as of December 31, 2025").
            Compare this to the Income Statement, which covers a period.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 5.2 */}
      <section id="section-5-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          5.2 Assets: What You Own
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Assets are resources with economic value. They're listed in order of liquidity
          (how quickly they can be converted to cash).
        </p>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Current Assets (converted to cash within 1 year):
        </h3>

        <div className="grid md:grid-cols-2 gap-3 my-4">
          {[
            { name: 'Cash & Cash Equivalents', desc: 'Money in bank accounts, petty cash' },
            { name: 'Accounts Receivable', desc: 'Money owed by customers' },
            { name: 'Inventory', desc: 'Goods held for sale' },
            { name: 'Prepaid Expenses', desc: 'Payments made in advance (rent, insurance)' },
            { name: 'Short-term Investments', desc: 'Marketable securities' },
          ].map((item) => (
            <div key={item.name} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
              <p className="font-medium text-slate-900 dark:text-white text-sm">{item.name}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Non-Current (Long-term) Assets:
        </h3>

        <div className="grid md:grid-cols-2 gap-3 my-4">
          {[
            { name: 'Property, Plant & Equipment (PP&E)', desc: 'Land, buildings, machinery, vehicles' },
            { name: 'Intangible Assets', desc: 'Patents, trademarks, goodwill' },
            { name: 'Long-term Investments', desc: 'Securities held for over a year' },
          ].map((item) => (
            <div key={item.name} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
              <p className="font-medium text-slate-900 dark:text-white text-sm">{item.name}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Depreciation:</strong> Fixed assets (except land) lose value over time.
            Accumulated depreciation is subtracted from asset values on the balance sheet to
            show their "book value."
          </p>
        </div>
      </section>

      {/* Section 5.3 */}
      <section id="section-5-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          5.3 Liabilities: What You Owe
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Liabilities are obligations to pay money or provide services. Like assets,
          they're organized by when they're due.
        </p>

        <ComparisonTable
          headers={['Type', 'Due Within', 'Examples']}
          rows={[
            ['Current Liabilities', '1 year', 'Accounts payable, short-term loans, wages payable, taxes payable, current portion of long-term debt'],
            ['Long-term Liabilities', 'More than 1 year', 'Bank loans, bonds payable, mortgage payable, deferred tax liabilities'],
          ]}
        />
      </section>

      {/* Section 5.4 */}
      <section id="section-5-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          5.4 Owner's Equity: What's Left for Owners
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Owner's Equity represents the owners' claim on assets after all liabilities are paid.
          It has several components:
        </p>

        <div className="space-y-3 my-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-medium text-slate-900 dark:text-white">Common Stock / Paid-in Capital</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Money invested by shareholders in exchange for ownership</p>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-medium text-slate-900 dark:text-white">Retained Earnings</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Accumulated profits kept in the business (not paid as dividends)</p>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="font-medium text-slate-900 dark:text-white">Treasury Stock</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Company's own shares repurchased (reduces equity)</p>
          </div>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Retained Earnings</strong> connects the Income Statement to the Balance Sheet.
            Each period's net income increases retained earnings (or net loss decreases it),
            while dividends paid decrease it.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 5.5 */}
      <section id="section-5-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          5.5 Balance Sheet Structure
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Here's a typical balance sheet format:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 font-mono text-sm my-6 overflow-x-auto">
          <pre className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
{`ACME Corporation
Balance Sheet
As of December 31, 2025
────────────────────────────────────────

ASSETS

Current Assets
  Cash                              $50,000
  Accounts Receivable               $75,000
  Inventory                         $60,000
  Prepaid Expenses                   $5,000
                                  ─────────
  Total Current Assets             $190,000

Non-Current Assets
  Property, Plant & Equipment      $300,000
  Less: Accumulated Depreciation   ($80,000)
  Intangible Assets                 $25,000
                                  ─────────
  Total Non-Current Assets         $245,000
                                  ─────────
TOTAL ASSETS                       $435,000
                                  ═════════

LIABILITIES & EQUITY

Current Liabilities
  Accounts Payable                  $35,000
  Wages Payable                     $15,000
  Short-term Debt                   $20,000
                                  ─────────
  Total Current Liabilities         $70,000

Long-term Liabilities
  Bank Loan                        $100,000
  Bonds Payable                     $50,000
                                  ─────────
  Total Long-term Liabilities      $150,000
                                  ─────────
TOTAL LIABILITIES                  $220,000

Owner's Equity
  Common Stock                     $100,000
  Retained Earnings                $115,000
                                  ─────────
  Total Owner's Equity             $215,000
                                  ─────────
TOTAL LIABILITIES & EQUITY         $435,000
                                  ═════════`}
          </pre>
        </div>

        <p className="text-slate-700 dark:text-slate-300">
          Notice how Total Assets ($435,000) equals Total Liabilities + Equity ($220,000 + $215,000 = $435,000).
          The balance sheet always balances!
        </p>
      </section>

      {/* Section 5.6 */}
      <section id="section-5-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          5.6 Key Balance Sheet Ratios
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          These ratios help analyze financial health:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold">Ratio</th>
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold">Formula</th>
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold">What It Measures</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Current Ratio</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-mono text-xs">Current Assets ÷ Current Liabilities</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">Ability to pay short-term debts (ideally &gt; 1.5)</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Quick Ratio</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-mono text-xs">(Current Assets - Inventory) ÷ Current Liabilities</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">Stricter liquidity test (ideally &gt; 1.0)</td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Debt-to-Equity</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-mono text-xs">Total Liabilities ÷ Total Equity</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">Financial leverage (lower = less risk)</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Working Capital</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-mono text-xs">Current Assets - Current Liabilities</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">Cushion for short-term operations</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="font-medium text-slate-900 dark:text-white mb-3">Using our example above:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Current Ratio:</strong> $190,000 ÷ $70,000 = 2.71 (healthy!)</li>
            <li><strong>Quick Ratio:</strong> ($190,000 - $60,000) ÷ $70,000 = 1.86 (healthy!)</li>
            <li><strong>Debt-to-Equity:</strong> $220,000 ÷ $215,000 = 1.02 (moderate leverage)</li>
            <li><strong>Working Capital:</strong> $190,000 - $70,000 = $120,000</li>
          </ul>
        </div>
      </section>

      <section id="section-5-builder" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Interactive Tool: Balance Sheet Builder
        </h2>

        <TryItYourself>
          <p>
            Enter assets and liabilities to build a balance sheet snapshot. The builder will calculate
            equity automatically and let you save your work.
          </p>
        </TryItYourself>

        <div className="my-6">
          <BalanceSheetBuilder />
        </div>
      </section>

      {/* Module Summary */}
      <section id="section-5-summary" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            In this module, you learned:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>The balance sheet shows assets, liabilities, and equity at a specific point in time</li>
            <li>Assets are listed by liquidity: current assets first, then non-current assets</li>
            <li>Liabilities are organized by when they're due: current vs. long-term</li>
            <li>Owner's equity includes paid-in capital, retained earnings, and treasury stock</li>
            <li>Retained earnings connect the income statement to the balance sheet</li>
            <li>Key ratios like current ratio and debt-to-equity help assess financial health</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 6, you'll learn about the Cash Flow Statement—tracking
          where cash comes from and where it goes.
        </p>
      </section>

      {/* Knowledge Check */}
      <section id="section-5-quiz" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the balance sheet, assets, liabilities, and equity.
        </p>
        <KnowledgeCheck
          moduleId={5}
          title="Module 5: The Balance Sheet"
          questions={module05Quiz}
        />
      </section>
    </div>
  );
}
