import { ComparisonTable, DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { module09Quiz } from './quizzes';

export function Module9Content() {
  return (
    <div className="space-y-8">
      {/* Section 9.1 */}
      <section id="section-9-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          9.1 Understanding Interest
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Interest is the <strong>cost of using someone else's money</strong>—or the <strong>reward
          for letting others use yours</strong>. It's the fundamental concept behind lending,
          borrowing, and investing.
        </p>

        <DefinitionCard
          term="Interest"
          definition="The price paid for the use of money over time. For borrowers, it's a cost; for savers and investors, it's income."
        />

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">💸 When You Borrow</h4>
            <p className="text-red-700 dark:text-red-300 text-sm">
              Interest is the fee you pay for using the lender's money. The higher the rate,
              the more expensive the loan.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">💰 When You Save</h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Interest is your reward for leaving money with a bank or lender. Your money
              grows over time without effort.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Key Interest Terms
        </h3>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Term</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Definition</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Principal</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">The original amount borrowed or invested</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">$10,000 loan</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Interest Rate</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">The percentage charged per period</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">6% per year</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">APR</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Annual Percentage Rate (includes fees)</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">6.5% APR</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">APY</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Annual Percentage Yield (includes compounding)</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">6.17% APY</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Term</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">The length of the loan or investment</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">30 years, 5 years</td>
              </tr>
            </tbody>
          </table>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Interest works both ways.</strong> Understand it as a cost when borrowing
            and as a tool for building wealth when saving. The same math applies in both directions.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 9.2 */}
      <section id="section-9-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          9.2 Simple vs. Compound Interest
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The difference between simple and compound interest can mean thousands of dollars
          over time. Understanding this distinction is crucial.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
              Simple Interest
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
              Interest calculated <strong>only on the original principal</strong>. The interest
              amount stays the same each period.
            </p>
            <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-3 font-mono text-sm text-blue-800 dark:text-blue-200 mb-3">
              I = P × r × t
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-xs">
              Where: I = Interest, P = Principal, r = Rate, t = Time
            </p>
            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/30 rounded text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-200">Example:</p>
              <p className="text-blue-700 dark:text-blue-300">
                $1,000 at 5% for 3 years<br />
                I = $1,000 × 0.05 × 3 = <strong>$150</strong>
              </p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
              Compound Interest
            </h4>
            <p className="text-purple-700 dark:text-purple-300 text-sm mb-4">
              Interest calculated on <strong>principal PLUS accumulated interest</strong>.
              Interest earns interest!
            </p>
            <div className="bg-purple-100 dark:bg-purple-800/30 rounded p-3 font-mono text-sm text-purple-800 dark:text-purple-200 mb-3">
              A = P × (1 + r/n)^(n×t)
            </div>
            <p className="text-purple-700 dark:text-purple-300 text-xs">
              Where: A = Final Amount, n = Compounding frequency
            </p>
            <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-800/30 rounded text-sm">
              <p className="font-medium text-purple-800 dark:text-purple-200">Example:</p>
              <p className="text-purple-700 dark:text-purple-300">
                $1,000 at 5% for 3 years (annual)<br />
                A = $1,000 × (1.05)³ = <strong>$1,157.63</strong><br />
                Interest = $157.63
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          The Power of Compound Interest Over Time
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 my-6">
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
            $10,000 invested at 7% annual return:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-slate-600 dark:text-slate-400">
                  <th className="px-3 py-2 text-left">Year</th>
                  <th className="px-3 py-2 text-right">Simple Interest</th>
                  <th className="px-3 py-2 text-right">Compound Interest</th>
                  <th className="px-3 py-2 text-right">Difference</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="px-3 py-2">5</td>
                  <td className="px-3 py-2 text-right">$13,500</td>
                  <td className="px-3 py-2 text-right">$14,026</td>
                  <td className="px-3 py-2 text-right text-green-600">+$526</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">10</td>
                  <td className="px-3 py-2 text-right">$17,000</td>
                  <td className="px-3 py-2 text-right">$19,672</td>
                  <td className="px-3 py-2 text-right text-green-600">+$2,672</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">20</td>
                  <td className="px-3 py-2 text-right">$24,000</td>
                  <td className="px-3 py-2 text-right">$38,697</td>
                  <td className="px-3 py-2 text-right text-green-600">+$14,697</td>
                </tr>
                <tr className="font-bold">
                  <td className="px-3 py-2">30</td>
                  <td className="px-3 py-2 text-right">$31,000</td>
                  <td className="px-3 py-2 text-right">$76,123</td>
                  <td className="px-3 py-2 text-right text-green-600">+$45,123</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Einstein's Quote:</strong> "Compound interest is the eighth wonder of the
            world. He who understands it, earns it; he who doesn't, pays it."
          </p>
        </div>
      </section>

      {/* Section 9.3 */}
      <section id="section-9-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          9.3 Compounding Frequency
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          How often interest compounds affects how quickly your money grows (or debt accumulates).
        </p>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Frequency</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Times/Year</th>
                <th className="px-4 py-2 text-right font-semibold text-slate-800 dark:text-slate-200">$10,000 at 6% after 1 Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Annual</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">1</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-right">$10,600.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Semi-annual</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">2</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-right">$10,609.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Quarterly</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">4</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-right">$10,613.64</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300">Monthly</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">12</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-right">$10,616.78</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Daily</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">365</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-right font-medium">$10,618.31</td>
              </tr>
            </tbody>
          </table>
        </div>

        <KeyTakeaway>
          <p>
            <strong>For savers:</strong> Look for accounts with daily or monthly compounding.
            <strong> For borrowers:</strong> Loans with less frequent compounding cost less.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 9.4 */}
      <section id="section-9-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          9.4 The Rule of 72
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          A quick mental math trick to estimate how long it takes for money to double.
        </p>

        <DefinitionCard
          term="Rule of 72"
          definition="A shortcut formula to estimate doubling time: Years to Double ≈ 72 ÷ Interest Rate (%)"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 my-6">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4 text-center text-xl">
            72 ÷ Rate = Years to Double
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-green-100 dark:bg-green-800/30 rounded p-3">
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">3%</p>
              <p className="text-sm text-green-600 dark:text-green-400">24 years</p>
            </div>
            <div className="bg-green-100 dark:bg-green-800/30 rounded p-3">
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">6%</p>
              <p className="text-sm text-green-600 dark:text-green-400">12 years</p>
            </div>
            <div className="bg-green-100 dark:bg-green-800/30 rounded p-3">
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">8%</p>
              <p className="text-sm text-green-600 dark:text-green-400">9 years</p>
            </div>
            <div className="bg-green-100 dark:bg-green-800/30 rounded p-3">
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">12%</p>
              <p className="text-sm text-green-600 dark:text-green-400">6 years</p>
            </div>
          </div>
        </div>

        <TryItYourself>
          <p>
            If you invest $5,000 at 9% annual return, approximately how long until it doubles
            to $10,000? Use the Rule of 72 to calculate.
          </p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Answer: 72 ÷ 9 = 8 years
          </p>
        </TryItYourself>
      </section>

      {/* Section 9.5 */}
      <section id="section-9-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          9.5 Loan Types and Structures
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Loans come in many forms. Understanding the structure helps you choose wisely and
          avoid costly surprises.
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Amortized Loans
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Equal payments over time that include both principal and interest. Early payments
              are mostly interest; later payments are mostly principal.
            </p>
            <p className="text-blue-600 dark:text-blue-400 text-xs">
              Examples: Mortgages, auto loans, personal loans
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Interest-Only Loans
            </h4>
            <p className="text-purple-700 dark:text-purple-300 text-sm mb-3">
              Pay only interest for a set period, then start paying principal. Lower initial
              payments, but you're not building equity early on.
            </p>
            <p className="text-purple-600 dark:text-purple-400 text-xs">
              Examples: Some mortgages, business lines of credit
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Balloon Loans
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm mb-3">
              Small regular payments with a large "balloon" payment due at the end.
              Risky if you can't pay or refinance at the end.
            </p>
            <p className="text-green-600 dark:text-green-400 text-xs">
              Examples: Some commercial real estate loans, bridge loans
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Revolving Credit
            </h4>
            <p className="text-amber-700 dark:text-amber-300 text-sm mb-3">
              Borrow up to a limit, pay back, and borrow again. Flexible but can lead to
              perpetual debt if not managed carefully.
            </p>
            <p className="text-amber-600 dark:text-amber-400 text-xs">
              Examples: Credit cards, HELOCs
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Fixed vs. Variable Rates
        </h3>

        <ComparisonTable
          headers={['Aspect', 'Fixed Rate', 'Variable Rate']}
          rows={[
            ['Interest Rate', 'Stays the same for entire term', 'Can change based on market'],
            ['Monthly Payment', 'Predictable, never changes', 'Can go up or down'],
            ['Risk', 'No rate risk', 'Rate increases possible'],
            ['Initial Rate', 'Usually higher', 'Usually lower to start'],
            ['Best When', 'Rates are low or rising', 'Rates are high or falling'],
          ]}
        />
      </section>

      {/* Section 9.6 */}
      <section id="section-9-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          9.6 Amortization Explained
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Most major loans (mortgages, auto loans) use amortization. Understanding how it
          works reveals why extra payments are so powerful.
        </p>

        <DefinitionCard
          term="Amortization"
          definition="The process of paying off a loan through regular payments that cover both principal and interest, with the loan fully paid at the end of the term."
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          How Payments Are Split
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 my-6">
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
            Example: $200,000 mortgage at 6% for 30 years (monthly payment: $1,199.10)
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-slate-600 dark:text-slate-400">
                  <th className="px-3 py-2 text-left">Payment</th>
                  <th className="px-3 py-2 text-right">Interest</th>
                  <th className="px-3 py-2 text-right">Principal</th>
                  <th className="px-3 py-2 text-right">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr className="bg-red-50 dark:bg-red-900/10">
                  <td className="px-3 py-2 font-medium">1 (Month 1)</td>
                  <td className="px-3 py-2 text-right text-red-600">$1,000.00</td>
                  <td className="px-3 py-2 text-right text-green-600">$199.10</td>
                  <td className="px-3 py-2 text-right">$199,800.90</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">60 (Year 5)</td>
                  <td className="px-3 py-2 text-right text-red-600">$935.17</td>
                  <td className="px-3 py-2 text-right text-green-600">$263.93</td>
                  <td className="px-3 py-2 text-right">$186,108.71</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">180 (Year 15)</td>
                  <td className="px-3 py-2 text-right text-red-600">$748.59</td>
                  <td className="px-3 py-2 text-right text-green-600">$450.51</td>
                  <td className="px-3 py-2 text-right">$149,279.39</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-900/10">
                  <td className="px-3 py-2 font-medium">360 (Month 360)</td>
                  <td className="px-3 py-2 text-right text-red-600">$5.98</td>
                  <td className="px-3 py-2 text-right text-green-600">$1,193.12</td>
                  <td className="px-3 py-2 text-right font-bold">$0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Eye-Opening Fact:</strong> In the first payment, 83% goes to interest
            and only 17% to principal! This is why extra principal payments early in the
            loan have the biggest impact.
          </p>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Extra principal payments save thousands.</strong> Even small extra
            amounts applied to principal early in the loan can dramatically reduce total
            interest paid and shorten the loan term.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 9.7 */}
      <section id="section-9-7" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          9.7 Comparing Loans
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          When shopping for a loan, look beyond the monthly payment. Here's what to compare:
        </p>

        <div className="space-y-4 my-6">
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">APR (Annual Percentage Rate)</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Includes interest rate plus fees. Better for comparing similar loan types.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Total Cost of the Loan</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Monthly payment × number of payments + all fees. The true cost.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">3</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Monthly Payment</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Does it fit your budget? Lower isn't always better if it means paying longer.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">4</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Prepayment Penalties</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Can you pay extra without penalties? This matters if you plan to pay off early.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">5</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Flexibility</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Can you skip payments? Adjust the term? What are the late fees?
              </p>
            </div>
          </div>
        </div>

        <TryItYourself>
          <p>
            Compare these two loans for a $25,000 car:
          </p>
          <ul className="mt-2 text-sm space-y-1">
            <li><strong>Loan A:</strong> 4.5% APR, 48 months, payment $568/month</li>
            <li><strong>Loan B:</strong> 3.9% APR, 60 months, payment $460/month</li>
          </ul>
          <p className="mt-2">
            Which has the lower monthly payment? Which has the lower total cost?
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Answer: Loan B has lower payment ($460), but Loan A costs $27,264 total vs.
            Loan B at $27,600. Loan A saves $336 despite higher monthly payment.
          </p>
        </TryItYourself>
      </section>

      {/* Knowledge Check */}
      <section id="section-9-8" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          9.8 Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of loans and interest.
        </p>
        <KnowledgeCheck moduleId={9} title="Module 9: Loans & Interest" questions={module09Quiz} />
      </section>

      {/* Summary */}
      <section id="section-9-9" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 my-6">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Key Takeaways</h3>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Interest is the cost of borrowing or the reward for saving—same math, opposite perspective</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Compound interest earns "interest on interest" and creates exponential growth</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Use the Rule of 72 to quickly estimate doubling time (72 ÷ rate = years)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>More frequent compounding benefits savers but costs borrowers more</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Amortized loans front-load interest—early payments are mostly interest</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Extra principal payments save dramatically on interest, especially early in the loan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Compare total cost, not just monthly payments, when shopping for loans</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
