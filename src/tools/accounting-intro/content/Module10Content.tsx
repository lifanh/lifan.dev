import { ComparisonTable, ContentCard, DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { module10Quiz } from './quizzes';

export function Module10Content() {
  return (
    <div className="space-y-8">
      {/* Section 10.1 */}
      <section id="section-10-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          10.1 Two Ways to Track Money
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          There are two fundamental methods for recording financial transactions: <strong>cash
          basis</strong> and <strong>accrual basis</strong>. The method you choose affects when
          you record revenues and expenses—and can significantly impact how your finances appear.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-6">
          <ContentCard variant="success" title="Cash Basis" icon="💵" className="p-5">
            <p className="mb-3">
              Record transactions <strong>when cash changes hands</strong>.
            </p>
            <ul className="space-y-1">
              <li>• Revenue when you <em>receive</em> payment</li>
              <li>• Expenses when you <em>pay</em> the bill</li>
            </ul>
          </ContentCard>
          <ContentCard variant="info" title="Accrual Basis" icon="📋" className="p-5">
            <p className="mb-3">
              Record transactions <strong>when they're earned or incurred</strong>.
            </p>
            <ul className="space-y-1">
              <li>• Revenue when you <em>perform</em> the service</li>
              <li>• Expenses when you <em>receive</em> the benefit</li>
            </ul>
          </ContentCard>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 my-6">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Example: The December Invoice
          </h4>
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
            You complete $5,000 of consulting work in December. The client pays in January.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 rounded p-3">
              <p className="font-medium text-green-800 dark:text-green-200 mb-1">Cash Basis</p>
              <p className="text-green-700 dark:text-green-300 text-sm">
                December revenue: $0<br />
                January revenue: $5,000
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded p-3">
              <p className="font-medium text-purple-800 dark:text-purple-200 mb-1">Accrual Basis</p>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                December revenue: $5,000<br />
                January revenue: $0
              </p>
            </div>
          </div>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Same transaction, different timing.</strong> Cash basis tracks money movement;
            accrual basis tracks economic activity. Both methods record the same total—just in
            different periods.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 10.2 */}
      <section id="section-10-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          10.2 Cash Basis Accounting
        </h2>

        <DefinitionCard
          term="Cash Basis Accounting"
          definition="An accounting method that records revenues when cash is received and expenses when cash is paid, regardless of when goods are delivered or services performed."
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          How It Works
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 my-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <span className="text-green-500">↓</span> Recording Revenue
              </h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <li>✓ Customer pays with cash or card → Record now</li>
                <li>✓ Check clears your bank → Record now</li>
                <li>✗ Invoice sent but not paid → Don't record yet</li>
                <li>✗ Work completed, awaiting payment → Don't record yet</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <span className="text-red-500">↑</span> Recording Expenses
              </h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <li>✓ Pay rent with check → Record now</li>
                <li>✓ Credit card charge (when you pay it) → Record now</li>
                <li>✗ Receive goods on credit → Don't record yet</li>
                <li>✗ Bill arrives but not paid → Don't record yet</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Pros and Cons
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <ContentCard variant="success" title="✓ Advantages">
            <ul className="space-y-1">
              <li>• Simple to understand and implement</li>
              <li>• Easy to track—just look at bank account</li>
              <li>• Clear picture of actual cash available</li>
              <li>• Lower accounting costs</li>
              <li>• Can defer income for tax purposes</li>
            </ul>
          </ContentCard>
          <ContentCard variant="error" title="✗ Disadvantages">
            <ul className="space-y-1">
              <li>• Doesn't match revenues with expenses</li>
              <li>• Can distort true profitability</li>
              <li>• Harder to plan with inconsistent income timing</li>
              <li>• Not GAAP-compliant</li>
              <li>• May not be allowed for larger businesses</li>
            </ul>
          </ContentCard>
        </div>

        <ContentCard variant="warning" title="Best For" className="my-6">
          <p>
            Small businesses, freelancers, and sole proprietors with
            simple operations, minimal inventory, and annual revenue under $25 million.
          </p>
        </ContentCard>
      </section>

      {/* Section 10.3 */}
      <section id="section-10-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          10.3 Accrual Basis Accounting
        </h2>

        <DefinitionCard
          term="Accrual Basis Accounting"
          definition="An accounting method that records revenues when earned and expenses when incurred, regardless of when cash changes hands."
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          The Matching Principle
        </h3>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The foundation of accrual accounting is the <strong>matching principle</strong>:
          expenses should be recorded in the same period as the revenues they help generate.
        </p>

        <ContentCard variant="info" title="Why Matching Matters" className="p-5 my-6">
          <p className="mb-4">
            A retailer buys $10,000 of inventory in November and sells it for $15,000 in December.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded p-3">
              <p className="font-medium text-slate-800 dark:text-slate-200 mb-2">Cash Basis (Misleading)</p>
              <p className="text-slate-600 dark:text-slate-400">
                November: -$10,000 (loss!)<br />
                December: +$15,000 (big profit!)
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded p-3">
              <p className="font-medium mb-2">Accrual Basis (Accurate)</p>
              <p>
                November: $0 (inventory = asset)<br />
                December: $15,000 - $10,000 = $5,000 profit
              </p>
            </div>
          </div>
        </ContentCard>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Key Accrual Concepts
        </h3>

        <div className="space-y-4 my-6">
          <ContentCard variant="neutral" title="Accounts Receivable (A/R)">
            <p>
              Money owed TO you. You've earned the revenue (performed the service) but haven't
              been paid yet. It's an asset on your balance sheet.
            </p>
          </ContentCard>
          <ContentCard variant="neutral" title="Accounts Payable (A/P)">
            <p>
              Money you owe. You've received goods or services but haven't paid yet.
              It's a liability on your balance sheet.
            </p>
          </ContentCard>
          <ContentCard variant="neutral" title="Accrued Expenses">
            <p>
              Expenses incurred but not yet billed or paid. Example: Employee wages earned
              this week but not paid until next week.
            </p>
          </ContentCard>
          <ContentCard variant="neutral" title="Deferred (Unearned) Revenue">
            <p>
              Cash received for services not yet performed. It's a liability until you
              deliver what was promised. Example: Annual subscription paid upfront.
            </p>
          </ContentCard>
          <ContentCard variant="neutral" title="Prepaid Expenses">
            <p>
              Expenses paid in advance. It's an asset until the benefit is received.
              Example: 12-month insurance policy paid upfront.
            </p>
          </ContentCard>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Pros and Cons
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <ContentCard variant="success" title="✓ Advantages">
            <ul className="space-y-1">
              <li>• More accurate picture of profitability</li>
              <li>• Matches revenues with related expenses</li>
              <li>• Required by GAAP and IFRS</li>
              <li>• Better for financial planning</li>
              <li>• Shows true economic activity</li>
            </ul>
          </ContentCard>
          <ContentCard variant="error" title="✗ Disadvantages">
            <ul className="space-y-1">
              <li>• More complex to implement</li>
              <li>• Requires adjusting entries</li>
              <li>• Doesn't show actual cash position</li>
              <li>• Higher accounting costs</li>
              <li>• Can show profit without cash</li>
            </ul>
          </ContentCard>
        </div>
      </section>

      {/* Section 10.4 */}
      <section id="section-10-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          10.4 Side-by-Side Comparison
        </h2>

        <ComparisonTable
          headers={['Aspect', 'Cash Basis', 'Accrual Basis']}
          rows={[
            ['Revenue Recognition', 'When cash received', 'When earned'],
            ['Expense Recognition', 'When cash paid', 'When incurred'],
            ['Complexity', 'Simple', 'More complex'],
            ['Accuracy', 'Shows cash position', 'Shows economic reality'],
            ['GAAP Compliant', 'No', 'Yes'],
            ['Best For', 'Small, simple businesses', 'Growing/larger businesses'],
            ['Accounts Receivable', 'Not tracked', 'Tracked as asset'],
            ['Accounts Payable', 'Not tracked', 'Tracked as liability'],
          ]}
        />

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-6">
          The Same Year, Two Different Stories
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 my-6">
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
            A consultant has these transactions in their first year:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 text-sm list-disc pl-5 mb-4 space-y-1">
            <li>Performed $100,000 of services</li>
            <li>Collected $75,000 (still owed $25,000)</li>
            <li>Incurred $60,000 of expenses</li>
            <li>Paid $50,000 (still owes $10,000)</li>
          </ul>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 rounded p-4">
              <p className="font-semibold text-green-800 dark:text-green-200 mb-2">Cash Basis</p>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Revenue: $75,000<br />
                Expenses: $50,000<br />
                <strong>Profit: $25,000</strong>
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded p-4">
              <p className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Accrual Basis</p>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                Revenue: $100,000<br />
                Expenses: $60,000<br />
                <strong>Profit: $40,000</strong>
              </p>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-4">
            Same business, same period—$15,000 difference in reported profit!
          </p>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Which is "right"?</strong> Accrual shows the true economic profit ($40K earned),
            while cash shows what's in the bank ($25K collected minus paid). Both perspectives
            are useful—that's why we have both the Income Statement and Cash Flow Statement.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 10.5 */}
      <section id="section-10-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          10.5 Which Method Should You Use?
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The choice depends on your business size, complexity, and legal requirements.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Decision Flowchart
        </h3>

        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 my-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Is your average annual gross receipts over $25 million?
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Yes → <strong>Must use accrual</strong> (IRS requirement)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Do you maintain inventory for sale?
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Significant inventory typically requires accrual for accuracy
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Do you offer credit to customers or receive credit from suppliers?
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Significant A/R or A/P suggests accrual is more useful
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">4</span>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  Do you need audited financial statements or investor reporting?
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Yes → <strong>Must use accrual</strong> (GAAP requirement)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">✓</span>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  None of the above?
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  You can choose. Cash is simpler; accrual is more accurate.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Typical Use Cases
        </h3>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <ContentCard variant="success" title="Cash Basis Works For">
            <ul className="space-y-1">
              <li>• Freelancers and consultants</li>
              <li>• Small service businesses</li>
              <li>• Side hustles and gig work</li>
              <li>• Businesses paid at time of service</li>
              <li>• Personal finance tracking</li>
            </ul>
          </ContentCard>
          <ContentCard variant="info" title="Accrual Basis Needed For">
            <ul className="space-y-1">
              <li>• Larger corporations</li>
              <li>• Businesses with inventory</li>
              <li>• Companies seeking investors</li>
              <li>• Subscription-based businesses</li>
              <li>• Anyone needing GAAP compliance</li>
            </ul>
          </ContentCard>
        </div>
      </section>

      {/* Section 10.6 */}
      <section id="section-10-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          10.6 Modified Cash Basis
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          There's a middle ground: <strong>modified cash basis</strong> combines elements of both.
        </p>

        <DefinitionCard
          term="Modified Cash Basis"
          definition="A hybrid accounting method that uses cash basis for most transactions but applies accrual treatment to specific long-term items like fixed assets, inventory, and long-term liabilities."
        />

        <ContentCard variant="info" title="Common Modified Cash Treatments" className="p-5 my-6">
          <ul className="space-y-2">
            <li><strong>Cash for:</strong> Day-to-day income and expenses</li>
            <li><strong>Accrual for:</strong> Long-term assets (depreciated over time)</li>
            <li><strong>Accrual for:</strong> Inventory (matched to sales)</li>
            <li><strong>Accrual for:</strong> Long-term liabilities (recognized over term)</li>
          </ul>
        </ContentCard>

        <TryItYourself>
          <p>
            Consider your current financial situation (personal or business). Which accounting
            method would you choose and why? What are the key factors influencing your decision?
          </p>
        </TryItYourself>
      </section>

      {/* Section 10.7 */}
      <section id="section-10-7" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          10.7 Adjusting Entries
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Accrual accounting requires <strong>adjusting entries</strong> at the end of each
          period to ensure revenues and expenses are recorded in the correct period.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Types of Adjusting Entries
        </h3>

        <div className="space-y-4 my-6">
          <ContentCard variant="info" title="1. Accrued Revenues">
            <p>
              Revenue earned but not yet billed or collected.
            </p>
            <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-2 mt-2 font-mono text-xs">
              Debit: Accounts Receivable<br />
              Credit: Service Revenue
            </div>
          </ContentCard>
          <ContentCard variant="info" title="2. Accrued Expenses">
            <p>
              Expenses incurred but not yet billed or paid.
            </p>
            <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-2 mt-2 font-mono text-xs">
              Debit: Wage Expense<br />
              Credit: Wages Payable
            </div>
          </ContentCard>
          <ContentCard variant="info" title="3. Deferred Revenues">
            <p>
              Cash received for services to be performed later.
            </p>
            <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-2 mt-2 font-mono text-xs">
              Debit: Unearned Revenue<br />
              Credit: Service Revenue
            </div>
          </ContentCard>
          <ContentCard variant="info" title="4. Prepaid Expenses">
            <p>
              Cash paid for expenses not yet consumed.
            </p>
            <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-2 mt-2 font-mono text-xs">
              Debit: Insurance Expense<br />
              Credit: Prepaid Insurance
            </div>
          </ContentCard>
        </div>

        <KeyTakeaway>
          <p>
            <strong>Adjusting entries are the "cleanup crew"</strong> at period-end. They ensure
            your financial statements accurately reflect what was earned and spent during the period.
          </p>
        </KeyTakeaway>
      </section>

      {/* Knowledge Check */}
      <section id="section-10-8" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          10.8 Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of cash vs. accrual accounting.
        </p>
        <KnowledgeCheck moduleId={10} title="Module 10: Cash vs. Accrual Accounting" questions={module10Quiz} />
      </section>

      {/* Summary */}
      <section id="section-10-9" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-gradient-to-r from-green-50 to-purple-50 dark:from-green-900/20 dark:to-purple-900/20 rounded-lg p-6 my-6">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Key Takeaways</h3>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Cash basis records when money moves; accrual records when economic activity occurs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Accrual accounting follows the matching principle—matching expenses to related revenues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Cash basis is simpler; accrual is more accurate for showing true profitability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Large businesses and public companies must use accrual (GAAP requirement)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Key accrual concepts: A/R, A/P, accrued expenses, deferred revenue, prepaid expenses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Modified cash basis offers a middle-ground approach for some businesses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Adjusting entries are needed in accrual accounting to finalize period-end statements</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
