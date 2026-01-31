import { DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { module12Quiz } from './quizzes';

export function Module12Content() {
  return (
    <div className="space-y-8">
      {/* Section 12.1 */}
      <section id="section-12-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          12.1 Introduction to Compliance
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Financial compliance isn't just about following rules—it's about maintaining trust.
          Whether you're managing personal finances or running a business, understanding
          compliance requirements protects you from penalties and ensures your financial
          information is reliable.
        </p>

        <DefinitionCard
          term="Financial Compliance"
          definition="The process of adhering to laws, regulations, standards, and ethical practices in financial reporting and operations."
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          Why Compliance Matters
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ Benefits</h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• Avoid fines and legal penalties</li>
              <li>• Build trust with stakeholders</li>
              <li>• Qualify for loans and investment</li>
              <li>• Make better decisions with accurate data</li>
              <li>• Sleep well at night!</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Risks of Non-Compliance</h4>
            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
              <li>• Financial penalties and fines</li>
              <li>• Criminal prosecution in severe cases</li>
              <li>• Loss of business licenses</li>
              <li>• Damaged reputation</li>
              <li>• Difficulty obtaining credit</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 12.2 */}
      <section id="section-12-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          12.2 Accounting Standards Overview
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Accounting standards provide the rules for how financial information should be
          recorded, presented, and disclosed. They ensure consistency and comparability.
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              GAAP (Generally Accepted Accounting Principles)
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
              The standard framework used in the United States for financial accounting.
            </p>
            <div className="text-blue-600 dark:text-blue-400 text-sm">
              <strong>Set by:</strong> FASB (Financial Accounting Standards Board)
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              IFRS (International Financial Reporting Standards)
            </h4>
            <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">
              The global standard used in 140+ countries, facilitating international comparison.
            </p>
            <div className="text-purple-600 dark:text-purple-400 text-sm">
              <strong>Set by:</strong> IASB (International Accounting Standards Board)
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Key Accounting Principles
        </h3>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Principle</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium">Revenue Recognition</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Record revenue when earned, not when received</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium">Matching</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Match expenses to the revenue they generate</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium">Consistency</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Use the same methods year over year</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium">Materiality</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Report significant items that affect decisions</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium">Conservatism</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">When uncertain, choose the less favorable option</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium">Full Disclosure</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Report all information relevant to users</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 12.3 */}
      <section id="section-12-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          12.3 Understanding Income Taxes
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Taxes are a fact of life. Understanding how they work helps you plan effectively
          and avoid surprises.
        </p>

        <DefinitionCard
          term="Taxable Income"
          definition="Your total income minus adjustments, deductions, and exemptions—the amount on which you actually owe taxes."
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          How Income Tax Works
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 my-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-200">Gross Income</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">All income from all sources</p>
              </div>
            </div>
            <div className="ml-4 border-l-2 border-slate-300 dark:border-slate-600 h-6"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-200">− Adjustments</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">IRA contributions, student loan interest, etc.</p>
              </div>
            </div>
            <div className="ml-4 border-l-2 border-slate-300 dark:border-slate-600 h-6"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">=</div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-200">Adjusted Gross Income (AGI)</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Important threshold for many credits</p>
              </div>
            </div>
            <div className="ml-4 border-l-2 border-slate-300 dark:border-slate-600 h-6"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-200">− Deductions</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Standard deduction OR itemized deductions</p>
              </div>
            </div>
            <div className="ml-4 border-l-2 border-slate-300 dark:border-slate-600 h-6"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">=</div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-200">Taxable Income</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Apply tax rates to this amount</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Progressive Tax Brackets
        </h3>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The U.S. uses <strong>progressive taxation</strong>—higher income is taxed at higher
          rates. But only the income in each bracket is taxed at that rate.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
          <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">💡 Common Misconception</h4>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            "If I earn more and move to a higher tax bracket, I'll take home less money."
            <strong> This is FALSE!</strong> Only the additional income above the bracket
            threshold is taxed at the higher rate. You never lose money by earning more.
          </p>
        </div>
      </section>

      {/* Section 12.4 */}
      <section id="section-12-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          12.4 Deductions vs. Credits
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Both deductions and credits reduce your tax burden, but they work very differently.
          Understanding the difference helps you maximize your tax savings.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
              Tax Deductions
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Reduce your <strong>taxable income</strong>
            </p>
            <div className="bg-white dark:bg-slate-800 rounded p-3 text-sm">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Example:</strong> $1,000 deduction at 22% tax rate
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Saves: $1,000 × 22% = <strong>$220</strong>
              </p>
            </div>
            <p className="text-blue-600 dark:text-blue-400 text-sm mt-3">
              <strong>Examples:</strong> Mortgage interest, charitable donations, business expenses
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
              Tax Credits
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm mb-3">
              Reduce your <strong>taxes owed</strong> (dollar-for-dollar)
            </p>
            <div className="bg-white dark:bg-slate-800 rounded p-3 text-sm">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Example:</strong> $1,000 tax credit
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Saves: <strong>$1,000</strong> (regardless of tax rate)
              </p>
            </div>
            <p className="text-green-600 dark:text-green-400 text-sm mt-3">
              <strong>Examples:</strong> Child tax credit, education credits, EV credits
            </p>
          </div>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Tax credits are generally more valuable than deductions.</strong> A $1,000
            credit saves you $1,000 in taxes. A $1,000 deduction saves you only a percentage
            based on your tax bracket.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 12.5 */}
      <section id="section-12-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          12.5 Common Tax Forms
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Here are the most important tax forms you'll encounter in the United States.
        </p>

        <div className="space-y-3 my-6">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-bold w-fit">W-2</span>
              <h4 className="font-medium text-slate-800 dark:text-slate-200">Wage and Tax Statement</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              From your employer. Shows wages earned and taxes withheld during the year.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="bg-purple-500 text-white px-3 py-1 rounded text-sm font-bold w-fit">W-4</span>
              <h4 className="font-medium text-slate-800 dark:text-slate-200">Employee's Withholding Certificate</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              You give to your employer. Determines how much tax to withhold from each paycheck.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-bold w-fit">1099</span>
              <h4 className="font-medium text-slate-800 dark:text-slate-200">Information Returns (Various)</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              Reports non-employee income: 1099-NEC (freelance), 1099-INT (interest), 1099-DIV (dividends), etc.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="bg-amber-500 text-white px-3 py-1 rounded text-sm font-bold w-fit">1040</span>
              <h4 className="font-medium text-slate-800 dark:text-slate-200">U.S. Individual Income Tax Return</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              The main form you file. Calculates your total income, deductions, and tax owed.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold w-fit">Schedule C</span>
              <h4 className="font-medium text-slate-800 dark:text-slate-200">Profit or Loss from Business</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              For self-employed individuals and sole proprietors. Reports business income and expenses.
            </p>
          </div>
        </div>
      </section>

      {/* Section 12.6 */}
      <section id="section-12-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          12.6 Tax Planning Strategies
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          <strong>Tax avoidance</strong> (legal) vs. <strong>tax evasion</strong> (illegal):
          Smart tax planning uses legal strategies to minimize your tax burden.
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">🏦 Retirement Contributions</h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Traditional 401(k) and IRA contributions reduce taxable income now. Roth accounts
              don't reduce current taxes but grow tax-free.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">💰 HSA Contributions</h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Health Savings Accounts are "triple tax advantaged": deductible contributions,
              tax-free growth, and tax-free withdrawals for medical expenses.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">📊 Tax-Loss Harvesting</h4>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              Sell investments at a loss to offset capital gains. Can also offset up to $3,000
              of ordinary income per year.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">🎁 Charitable Giving</h4>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              Donate appreciated assets (stocks) instead of cash to avoid capital gains tax
              AND get the full deduction.
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">📅 Income Timing</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              If you control when you receive income (self-employed, bonuses), defer income
              to years when you expect lower tax rates.
            </p>
          </div>
        </div>

        <TryItYourself>
          <p>Review these questions to identify potential tax savings:</p>
          <ul className="mt-2 text-sm space-y-1">
            <li>• Are you maximizing retirement account contributions?</li>
            <li>• If self-employed, are you deducting all legitimate business expenses?</li>
            <li>• Should you itemize deductions or take the standard deduction?</li>
            <li>• Are there education or child-related credits you qualify for?</li>
            <li>• Are you tracking capital gains and losses?</li>
          </ul>
        </TryItYourself>
      </section>

      {/* Section 12.7 */}
      <section id="section-12-7" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          12.7 Internal Controls
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          <strong>Internal controls</strong> are the policies and procedures that protect assets,
          ensure accurate records, and prevent fraud. They apply to businesses of all sizes—
          and even personal finances.
        </p>

        <DefinitionCard
          term="Internal Controls"
          definition="Procedures and policies designed to safeguard assets, ensure accurate financial reporting, promote operational efficiency, and encourage compliance with laws and regulations."
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          Key Control Principles
        </h3>

        <div className="space-y-4 my-6">
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Segregation of Duties</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                No single person should control all aspects of a transaction. Separate authorization,
                recording, and custody of assets.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Authorization</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Require approval for transactions above certain thresholds. Document who can approve what.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Documentation</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Keep records of all transactions. Document policies and procedures.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Physical Controls</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Secure cash, inventory, and sensitive documents. Use locks, safes, and restricted access.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Reconciliation</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Regularly compare records to actual assets. Bank reconciliation, inventory counts, etc.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">6</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Review & Audit</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Conduct periodic reviews. Surprise audits are particularly effective at deterring fraud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 12.8 */}
      <section id="section-12-8" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          12.8 Key Deadlines & Record Retention
        </h2>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Important U.S. Tax Deadlines
        </h3>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Date</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium">January 31</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Employers send W-2s to employees</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium">April 15</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Individual tax returns due (or extension)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium">Quarterly</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Estimated taxes: April 15, June 15, Sept 15, Jan 15</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300 font-medium">October 15</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Extended returns due</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          How Long to Keep Records
        </h3>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Document Type</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Retention Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Tax returns & supporting documents</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">7 years minimum</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Property records (home purchase)</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">7 years after sale</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Investment records (cost basis)</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">7 years after sale</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Bank statements</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">1-7 years depending on use</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">Retirement account statements</td>
                <td className="px-4 py-2 text-slate-600 dark:text-slate-400">Permanently</td>
              </tr>
            </tbody>
          </table>
        </div>

        <KeyTakeaway>
          <p>
            <strong>When in doubt, keep it longer.</strong> Storage is cheap, and the cost of
            missing a document when you need it is high.
          </p>
        </KeyTakeaway>
      </section>

      {/* Knowledge Check */}
      <section id="section-12-9" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          12.9 Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of compliance and tax concepts.
        </p>
        <KnowledgeCheck moduleId={12} title="Module 12: Compliance & Tax Basics" questions={module12Quiz} />
      </section>

      {/* Summary */}
      <section id="section-12-10" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 my-6">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Key Takeaways</h3>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Compliance protects you from penalties and builds trust</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>GAAP and IFRS provide standardized accounting frameworks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Tax credits are more valuable than deductions of the same amount</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Smart tax planning uses legal strategies to minimize taxes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Internal controls protect assets and ensure accurate records</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Segregation of duties is a key fraud prevention control</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Keep tax records for at least 7 years</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Know your key deadlines: April 15, quarterly estimated taxes</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 my-6">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">🎉 Congratulations!</h3>
          <p className="text-green-700 dark:text-green-300">
            You've completed all 12 modules of the Introduction to Accounting course!
            You now have a solid foundation in accounting principles, financial statements,
            practical skills, and compliance. Keep practicing and applying these concepts
            to your personal and professional life.
          </p>
        </div>
      </section>
    </div>
  );
}
