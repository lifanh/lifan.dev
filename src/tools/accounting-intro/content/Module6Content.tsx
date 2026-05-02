import { ComparisonTable, ContentCard, DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { CashFlowForecaster } from '../components/interactive/calculators/CashFlowForecaster';
import { module06Quiz } from './quizzes';

export function Module6Content() {
  return (
    <div className="space-y-8">
      {/* Section 6.1 */}
      <section id="section-6-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          6.1 Understanding the Cash Flow Statement
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The Cash Flow Statement answers: <strong>Where did cash come from and where did it go?</strong>
          It tracks actual cash movements, regardless of when revenue or expenses are recorded.
        </p>

        <DefinitionCard
          term="Cash Flow Statement"
          definition="A financial statement showing cash inflows and outflows over a period, organized into three categories: operating, investing, and financing activities."
        />

        <ContentCard variant="warning">
          <p>
            <strong>Why it matters:</strong> A company can be profitable on the income statement
            but still run out of cash! The cash flow statement reveals the true cash position.
          </p>
        </ContentCard>

        <KeyTakeaway>
          <p>
            <strong>Profit ≠ Cash.</strong> You might record revenue when you invoice a customer
            (accrual), but you don't have cash until they pay. The cash flow statement bridges
            this gap.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 6.2 */}
      <section id="section-6-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          6.2 The Three Sections
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Cash flows are organized into three categories:
        </p>

        <div className="space-y-4 my-6">
          <ContentCard variant="success" title="1. Operating Activities (CFO)">
            <p className="mb-3">
              Cash from core business operations—the day-to-day activities that generate revenue.
            </p>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-medium">Cash Inflows:</p>
                <ul className="list-disc pl-5">
                  <li>Cash received from customers</li>
                  <li>Interest received</li>
                  <li>Dividends received</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Cash Outflows:</p>
                <ul className="list-disc pl-5">
                  <li>Payments to suppliers</li>
                  <li>Salaries and wages</li>
                  <li>Rent, utilities, taxes</li>
                </ul>
              </div>
            </div>
          </ContentCard>

          <ContentCard variant="info" title="2. Investing Activities (CFI)">
            <p className="mb-3">
              Cash spent on or received from long-term assets and investments.
            </p>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-medium">Cash Inflows:</p>
                <ul className="list-disc pl-5">
                  <li>Sale of equipment/property</li>
                  <li>Sale of investments</li>
                  <li>Collection of loans made</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Cash Outflows:</p>
                <ul className="list-disc pl-5">
                  <li>Purchase of equipment</li>
                  <li>Purchase of investments</li>
                  <li>Loans made to others</li>
                </ul>
              </div>
            </div>
          </ContentCard>

          <ContentCard variant="info" title="3. Financing Activities (CFF)">
            <p className="mb-3">
              Cash from or to owners and creditors—how the business is funded.
            </p>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-medium">Cash Inflows:</p>
                <ul className="list-disc pl-5">
                  <li>Issuing stock</li>
                  <li>Borrowing (loans, bonds)</li>
                  <li>Owner investments</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Cash Outflows:</p>
                <ul className="list-disc pl-5">
                  <li>Dividends paid</li>
                  <li>Loan repayments</li>
                  <li>Stock buybacks</li>
                </ul>
              </div>
            </div>
          </ContentCard>
        </div>
      </section>

      {/* Section 6.3 */}
      <section id="section-6-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          6.3 Cash Flow Statement Structure
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Here's a typical cash flow statement (using the indirect method for operating activities):
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 font-mono text-sm my-6 overflow-x-auto">
          <pre className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
{`ACME Corporation
Statement of Cash Flows
For the Year Ended December 31, 2025
────────────────────────────────────────

OPERATING ACTIVITIES
  Net Income                         $126,000
  Adjustments:
    Depreciation                      $15,000
    Increase in Accounts Receivable  ($10,000)
    Decrease in Inventory              $5,000
    Increase in Accounts Payable       $8,000
                                    ─────────
  Net Cash from Operating            $144,000

INVESTING ACTIVITIES
  Purchase of Equipment              ($50,000)
  Sale of Investments                 $20,000
                                    ─────────
  Net Cash from Investing            ($30,000)

FINANCING ACTIVITIES
  Proceeds from Bank Loan             $25,000
  Dividends Paid                     ($40,000)
  Repayment of Long-term Debt        ($15,000)
                                    ─────────
  Net Cash from Financing            ($30,000)
                                    ─────────

Net Increase in Cash                  $84,000
Beginning Cash Balance                $50,000
                                    ─────────
Ending Cash Balance                  $134,000
                                    ═════════`}
          </pre>
        </div>

        <KeyTakeaway>
          <p>
            The ending cash balance ($134,000) should match the Cash line on the Balance Sheet.
            This is how the Cash Flow Statement connects to the Balance Sheet.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 6.4 */}
      <section id="section-6-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          6.4 Direct vs. Indirect Method
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          There are two ways to present operating cash flows:
        </p>

        <ComparisonTable
          headers={['Method', 'Approach', 'Common Use']}
          rows={[
            ['Direct', 'Lists actual cash receipts and payments', 'Required by some standards, more intuitive'],
            ['Indirect', 'Starts with net income and adjusts for non-cash items', 'Most commonly used, easier to prepare'],
          ]}
        />

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Common Adjustments (Indirect Method):
        </h3>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold">Item</th>
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold">Adjustment</th>
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold">Why?</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">Depreciation</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-green-600">+ Add back</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">Non-cash expense (no cash left)</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">↑ Accounts Receivable</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-red-600">− Subtract</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">Revenue recorded but cash not yet received</td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">↓ Accounts Receivable</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-green-600">+ Add</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">Collected cash from past sales</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">↑ Inventory</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-red-600">− Subtract</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">Cash spent buying inventory</td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">↑ Accounts Payable</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-green-600">+ Add</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">Expenses recorded but not yet paid</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6.5 */}
      <section id="section-6-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          6.5 Free Cash Flow
        </h2>

        <DefinitionCard
          term="Free Cash Flow (FCF)"
          definition="Cash available after maintaining or expanding the asset base. It's what's left for debt repayment, dividends, or growth investments."
        />

        <ContentCard variant="info">
          <p className="text-lg font-bold text-center">
            Free Cash Flow = Operating Cash Flow − Capital Expenditures
          </p>
        </ContentCard>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Using our example: FCF = $144,000 − $50,000 = $94,000
        </p>

        <KeyTakeaway>
          <p>
            Free cash flow is often considered a better measure of financial health than net
            income because it shows actual cash generation after necessary investments.
            Investors love positive, growing free cash flow.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 6.6 */}
      <section id="section-6-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          6.6 Reading Cash Flow Patterns
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The pattern of positive (+) and negative (−) cash flows tells a story:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center font-semibold">Operating</th>
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center font-semibold">Investing</th>
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center font-semibold">Financing</th>
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold">Interpretation</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-green-600 font-bold">+</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-red-600 font-bold">−</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-red-600 font-bold">−</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">🌟 Mature, healthy company. Using operating cash to invest and pay down debt/dividends.</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-green-600 font-bold">+</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-red-600 font-bold">−</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-green-600 font-bold">+</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">📈 Growth company. Raising money to fund expansion.</td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-red-600 font-bold">−</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-red-600 font-bold">−</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-green-600 font-bold">+</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">🚀 Startup phase. Burning cash but funded by investors.</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-red-600 font-bold">−</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-green-600 font-bold">+</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-center text-green-600 font-bold">+</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">⚠️ Struggling. Selling assets and borrowing to survive.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="section-6-forecaster" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Interactive Tool: Cash Flow Forecaster
        </h2>

        <TryItYourself>
          <p>
            Forecast your cash balance month by month by entering expected inflows and outflows.
            Save the forecast to keep it for later.
          </p>
        </TryItYourself>

        <div className="my-6">
          <CashFlowForecaster />
        </div>
      </section>

      {/* Module Summary */}
      <section id="section-6-summary" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            In this module, you learned:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>The cash flow statement tracks where cash comes from and goes over a period</li>
            <li>Three sections: Operating (core business), Investing (long-term assets), Financing (capital)</li>
            <li>Profit doesn't equal cash—the cash flow statement bridges this gap</li>
            <li>The indirect method starts with net income and adjusts for non-cash items</li>
            <li>Free Cash Flow = Operating Cash Flow − Capital Expenditures</li>
            <li>Cash flow patterns reveal a company's life stage and financial health</li>
          </ul>
        </div>

        <ContentCard variant="success" title="Congratulations!" icon="🎉">
          <p>
            You've completed Part I: Foundations and Part II: Financial Statements! You now understand
            the three core financial statements and how they connect. This knowledge forms the
            foundation for all financial analysis and decision-making.
          </p>
        </ContentCard>
      </section>

      {/* Knowledge Check */}
      <section id="section-6-quiz" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the cash flow statement, free cash flow, and cash flow analysis.
        </p>
        <KnowledgeCheck
          moduleId={6}
          title="Module 6: The Cash Flow Statement"
          questions={module06Quiz}
        />
      </section>
    </div>
  );
}
