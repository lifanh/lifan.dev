import { ComparisonTable, ContentCard, DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { module08Quiz } from './quizzes';

export function Module8Content() {
  return (
    <div className="space-y-8">
      {/* Section 8.1 */}
      <section id="section-8-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          8.1 Why Organization Matters
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Good record-keeping is the foundation of sound financial management. Whether you're
          managing personal finances or running a business, <strong>organized records</strong> save
          you time, money, and stress.
        </p>

        <DefinitionCard
          term="Financial Record-Keeping"
          definition="The systematic process of capturing, organizing, and storing financial documents and transactions for future reference, compliance, and analysis."
        />

        <ContentCard variant="warning" title="The Real Cost of Disorganization" className="my-6">
          <p>
            Poor record-keeping leads to missed deductions, late fees, audit penalties, and
            hours spent searching for documents. A few minutes of daily organization prevents
            hours of future frustration.
          </p>
        </ContentCard>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Benefits of Organized Records
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <ContentCard variant="success" title="✓ Tax Compliance">
            <p>
              Accurate records ensure you claim all eligible deductions and can support them if audited.
            </p>
          </ContentCard>
          <ContentCard variant="success" title="✓ Better Decisions">
            <p>
              When you can quickly access financial history, you make more informed decisions.
            </p>
          </ContentCard>
          <ContentCard variant="success" title="✓ Fraud Detection">
            <p>
              Regular review of organized records helps catch unauthorized transactions quickly.
            </p>
          </ContentCard>
          <ContentCard variant="success" title="✓ Peace of Mind">
            <p>
              Knowing exactly where your finances stand reduces stress and anxiety.
            </p>
          </ContentCard>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Invest time upfront to save time later.</strong> A consistent daily habit of
            recording and filing takes 5-10 minutes but saves hours during tax season or when
            making major financial decisions.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 8.2 */}
      <section id="section-8-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          8.2 Source Documents
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          <strong>Source documents</strong> are the original records that prove a transaction
          occurred. They're the foundation of your accounting system.
        </p>

        <DefinitionCard
          term="Source Document"
          definition="An original document that provides evidence of a financial transaction, such as a receipt, invoice, contract, or bank statement."
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          Types of Source Documents
        </h3>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Document</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Purpose</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Receipt</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Proves a purchase was made</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Store receipt for office supplies</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Invoice</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Bills customer for goods/services</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Invoice sent to a client for consulting</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Bank Statement</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Official record from the bank</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Monthly checking account statement</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Contract</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Legal agreement between parties</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Lease agreement, service contract</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Pay Stub</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Record of wages and deductions</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Bi-weekly paycheck stub</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Credit Card Statement</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Record of card transactions</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Monthly Visa statement</td>
              </tr>
            </tbody>
          </table>
        </div>

        <TryItYourself>
          <p>
            Look at your last 5 transactions. Can you find the source document for each one?
            If not, what could you do differently to ensure you always have proof of your transactions?
          </p>
        </TryItYourself>
      </section>

      {/* Section 8.3 */}
      <section id="section-8-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          8.3 Filing Systems
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          A good filing system lets you find any document within seconds. The best system is
          the one you'll actually use consistently.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Filing Approaches
        </h3>

        <div className="space-y-4 my-6">
          <ContentCard variant="info" title="1. Chronological Filing" className="p-5">
            <p className="mb-3">
              Organize documents by date—great for tracking transactions over time.
            </p>
            <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-3 font-mono text-xs">
              📁 2025/<br />
              &nbsp;&nbsp;📁 01-January/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📄 2025-01-05-electric-bill.pdf<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📄 2025-01-15-paycheck.pdf<br />
              &nbsp;&nbsp;📁 02-February/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;...
            </div>
          </ContentCard>

          <ContentCard variant="info" title="2. Category-Based Filing" className="p-5">
            <p className="mb-3">
              Organize by document type—best for finding all documents of a certain kind.
            </p>
            <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-3 font-mono text-xs">
              📁 Finances/<br />
              &nbsp;&nbsp;📁 Income/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📄 pay-stubs/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📄 1099s/<br />
              &nbsp;&nbsp;📁 Expenses/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📄 utilities/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📄 subscriptions/<br />
              &nbsp;&nbsp;📁 Tax-Returns/
            </div>
          </ContentCard>

          <ContentCard variant="success" title="3. Hybrid Approach (Recommended)" className="p-5">
            <p className="mb-3">
              Combine both: organize by category first, then by year within each category.
            </p>
            <div className="bg-green-100 dark:bg-green-800/30 rounded p-3 font-mono text-xs">
              📁 Finances/<br />
              &nbsp;&nbsp;📁 Income/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📁 2025/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📁 2024/<br />
              &nbsp;&nbsp;📁 Expenses/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📁 2025/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📁 2024/<br />
              &nbsp;&nbsp;📁 Tax-Returns/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;📄 2024-federal.pdf
            </div>
          </ContentCard>
        </div>

        <KeyTakeaway>
          <p>
            <strong>The hybrid approach</strong> gives you the best of both worlds: you can
            easily find all income documents AND see what happened in a specific year.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 8.4 */}
      <section id="section-8-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          8.4 Document Retention
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Not all documents need to be kept forever. Understanding retention guidelines helps
          you maintain organized records without drowning in paper.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Retention Guidelines
        </h3>

        <div className="overflow-x-auto my-6">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Document Type</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Keep For</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr className="bg-red-50 dark:bg-red-900/10">
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Tax Returns</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400 font-bold">7+ years</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">IRS audit window; fraud has no limit</td>
              </tr>
              <tr className="bg-red-50 dark:bg-red-900/10">
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Tax Supporting Docs</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400 font-bold">7 years</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">W-2s, 1099s, deduction receipts</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Bank Statements</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">7 years</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Tax support, proof of payment</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Credit Card Statements</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">7 years</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Tax support, warranty claims</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Investment Records</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">7 years after sale</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Cost basis for capital gains</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Property Records</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">7 years after sale</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Prove purchase price, improvements</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Pay Stubs</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">1 year</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Verify against W-2, then discard</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Utility Bills</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">1 year</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Unless needed for home office deduction</td>
              </tr>
              <tr className="bg-blue-50 dark:bg-blue-900/10">
                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">Permanent Records</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400 font-bold">Forever</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Birth certificates, deeds, wills, diplomas</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ContentCard variant="warning" title="Pro Tip" className="my-6">
          <p>
            When in doubt, keep it longer. Digital storage is cheap,
            and you can always shred later—but you can't recreate a document you've already destroyed.
          </p>
        </ContentCard>
      </section>

      {/* Section 8.5 */}
      <section id="section-8-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          8.5 Bank Reconciliation
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Bank reconciliation is the process of comparing your records to the bank's records
          and resolving any differences. It's a critical control that catches errors and fraud.
        </p>

        <DefinitionCard
          term="Bank Reconciliation"
          definition="The process of matching the balance in your accounting records to the corresponding information on the bank statement, identifying and resolving any differences."
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          Why Balances Differ
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <ContentCard variant="info" title="Items YOU Know, Bank Doesn't (Yet)">
            <ul className="space-y-2">
              <li><strong>Outstanding checks:</strong> Checks you wrote that haven't cleared</li>
              <li><strong>Deposits in transit:</strong> Deposits you made near month-end</li>
            </ul>
          </ContentCard>
          <ContentCard variant="info" title="Items BANK Knows, You Don't (Yet)">
            <ul className="space-y-2">
              <li><strong>Bank fees:</strong> Service charges, overdraft fees</li>
              <li><strong>Interest earned:</strong> Interest credited to account</li>
              <li><strong>NSF checks:</strong> Returned checks from bad payers</li>
              <li><strong>Automatic payments:</strong> Subscriptions, loan payments</li>
            </ul>
          </ContentCard>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          The Reconciliation Process
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 my-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                📊 Bank Side
              </h4>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p>Bank Statement Balance</p>
                <p className="text-green-600 dark:text-green-400">+ Deposits in Transit</p>
                <p className="text-red-600 dark:text-red-400">− Outstanding Checks</p>
                <p className="text-amber-600 dark:text-amber-400">± Bank Errors</p>
                <hr className="border-slate-300 dark:border-slate-600" />
                <p className="font-bold">= Adjusted Bank Balance</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                📒 Book Side
              </h4>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p>Book Balance (Your Records)</p>
                <p className="text-green-600 dark:text-green-400">+ Interest Earned</p>
                <p className="text-red-600 dark:text-red-400">− Bank Fees</p>
                <p className="text-red-600 dark:text-red-400">− NSF Checks</p>
                <p className="text-amber-600 dark:text-amber-400">± Recording Errors</p>
                <hr className="border-slate-300 dark:border-slate-600" />
                <p className="font-bold">= Adjusted Book Balance</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded text-center">
            <p className="font-bold text-green-800 dark:text-green-200">
              ✓ Adjusted Bank Balance = Adjusted Book Balance
            </p>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              When these match, reconciliation is complete!
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Step-by-Step Reconciliation
        </h3>

        <div className="space-y-3 my-6">
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Get your materials</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Bank statement, check register, previous reconciliation</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Compare deposits</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Match deposits in your records to the bank statement</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">3</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Compare withdrawals</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Match checks and other debits; note any uncleared items</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">4</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Record bank items</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Add bank fees, interest, and other items to your books</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">5</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Calculate adjusted balances</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Compute both adjusted balances—they should match</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">✓</span>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Investigate differences</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">If they don't match, find and correct errors</p>
            </div>
          </div>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Reconcile monthly.</strong> The sooner you catch errors, the easier they are
            to fix. Monthly reconciliation also deters and detects fraud early.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 8.6 */}
      <section id="section-8-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          8.6 Digital vs. Physical Records
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Modern record-keeping often combines digital and physical systems. Each has advantages.
        </p>

        <ComparisonTable
          headers={['Aspect', 'Digital Records', 'Physical Records']}
          rows={[
            ['Storage Space', 'Virtually unlimited', 'Requires physical space'],
            ['Search Speed', 'Instant with good naming', 'Manual searching'],
            ['Backup', 'Easy to duplicate', 'Harder to replicate'],
            ['Disaster Risk', 'Hardware failure, hacking', 'Fire, flood, theft'],
            ['Legal Acceptance', 'Generally accepted', 'Always accepted'],
            ['Cost', 'Low ongoing cost', 'Paper, ink, storage'],
          ]}
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          The 3-2-1 Backup Rule
        </h3>

        <ContentCard variant="info" className="p-5 my-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">3</span>
              <p className="font-medium mt-1">Copies</p>
              <p>Keep 3 copies of important data</p>
            </div>
            <div>
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">2</span>
              <p className="font-medium mt-1">Media Types</p>
              <p>Store on 2 different types of media</p>
            </div>
            <div>
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">1</span>
              <p className="font-medium mt-1">Off-Site</p>
              <p>Keep 1 copy in a different location</p>
            </div>
          </div>
        </ContentCard>

        <TryItYourself>
          <p>
            Check your current backup situation. Do you have 3 copies of your financial records?
            Are they on different media? Is at least one off-site (like cloud storage)?
            Make a plan to achieve 3-2-1 compliance.
          </p>
        </TryItYourself>
      </section>

      {/* Section 8.7 */}
      <section id="section-8-7" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          8.7 Building Good Habits
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The best record-keeping system is useless if you don't use it. Here's how to build
          sustainable habits:
        </p>

        <div className="space-y-4 my-6">
          <ContentCard variant="neutral" title="📅 Daily (2 minutes)">
            <ul className="list-disc pl-5 space-y-1">
              <li>Snap photos of receipts immediately</li>
              <li>Add notes for cash transactions</li>
            </ul>
          </ContentCard>
          <ContentCard variant="neutral" title="📅 Weekly (15 minutes)">
            <ul className="list-disc pl-5 space-y-1">
              <li>Review and categorize transactions</li>
              <li>File digital documents</li>
              <li>Check for any missing records</li>
            </ul>
          </ContentCard>
          <ContentCard variant="neutral" title="📅 Monthly (30-60 minutes)">
            <ul className="list-disc pl-5 space-y-1">
              <li>Reconcile all bank and credit card accounts</li>
              <li>Review budget vs. actual spending</li>
              <li>Update financial statements</li>
              <li>Verify automatic payments</li>
            </ul>
          </ContentCard>
          <ContentCard variant="neutral" title="📅 Annually (2-4 hours)">
            <ul className="list-disc pl-5 space-y-1">
              <li>Prepare tax documents</li>
              <li>Review and update retention (shred old docs)</li>
              <li>Verify backup systems are working</li>
              <li>Update net worth statement</li>
              <li>Set financial goals for next year</li>
            </ul>
          </ContentCard>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Small, consistent efforts beat occasional marathons.</strong> A few minutes
            each day keeps your finances organized without feeling overwhelming.
          </p>
        </KeyTakeaway>
      </section>

      {/* Knowledge Check */}
      <section id="section-8-8" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          8.8 Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of financial record-keeping and bank reconciliation.
        </p>
        <KnowledgeCheck moduleId={8} title="Module 8: Recording & Organizing" questions={module08Quiz} />
      </section>

      {/* Summary */}
      <section id="section-8-9" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 my-6">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Key Takeaways</h3>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Organized records save time, support tax compliance, and enable better decisions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Source documents are the foundation—keep receipts, invoices, and statements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>A hybrid filing system (category + year) works best for most people</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Keep tax-related documents for at least 7 years</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Bank reconciliation catches errors and fraud—do it monthly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Follow the 3-2-1 backup rule for digital records</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Build daily, weekly, monthly, and annual habits for sustainable organization</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
