import { DefinitionCard, KeyTakeaway, TryItYourself } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { BookkeepingSimulator } from '../components/interactive/simulators/BookkeepingSimulator';
import { TransactionDecoder } from '../components/interactive/simulators/TransactionDecoder';
import { module03Quiz } from './quizzes';

export function Module3Content() {
  return (
    <div className="space-y-8">
      {/* Section 3.1 */}
      <section id="section-3-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          3.1 The Genius of Double-Entry
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Double-entry bookkeeping, developed in 15th century Italy, revolutionized commerce
          and remains the foundation of all modern accounting. Its elegance lies in its
          self-checking nature: errors become immediately apparent when the books don't balance.
        </p>

        <DefinitionCard
          term="Double-Entry Bookkeeping"
          definition="A system where every transaction affects at least two accounts, with equal debits and credits. This ensures the accounting equation always stays in balance."
        />

        <KeyTakeaway>
          <p>
            <strong>The Core Principle:</strong> Every transaction affects at least two accounts,
            with equal debits and credits. If the debits don't equal the credits, you know
            there's an error somewhere.
          </p>
        </KeyTakeaway>

        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
          Debits and Credits Demystified
        </h3>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The terms "debit" and "credit" simply mean "left" and "right" in accounting—their
          original Latin meanings. Whether a debit increases or decreases an account depends
          on the account type:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold">Account Type</th>
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center font-semibold">Debit (Left)</th>
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center font-semibold">Credit (Right)</th>
                <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center font-semibold">Normal Balance</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Assets</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-green-600">Increase ↑</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-red-600">Decrease ↓</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center">Debit</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Liabilities</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-red-600">Decrease ↓</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-green-600">Increase ↑</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center">Credit</td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Owner's Equity</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-red-600">Decrease ↓</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-green-600">Increase ↑</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center">Credit</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Revenue</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-red-600">Decrease ↓</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-green-600">Increase ↑</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center">Credit</td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-medium">Expenses</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-green-600">Increase ↑</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center text-red-600">Decrease ↓</td>
                <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-center">Debit</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 my-6">
          <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">Memory Device: DEALER</p>
          <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300 space-y-1">
            <li><strong>D</strong>ividends, <strong>E</strong>xpenses, <strong>A</strong>ssets = Debit to increase</li>
            <li><strong>L</strong>iabilities, <strong>E</strong>quity, <strong>R</strong>evenue = Credit to increase</li>
          </ul>
        </div>
      </section>

      {/* Section 3.2 */}
      <section id="section-3-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          3.2 The Chart of Accounts
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          A chart of accounts is the organized list of all accounts a business uses, typically
          numbered for easy reference:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-800 dark:text-slate-200 my-6 overflow-x-auto">
          <pre className="whitespace-pre-wrap">
{`1000-1999: Assets
  1010 Cash
  1020 Accounts Receivable
  1100 Inventory
  1500 Equipment

2000-2999: Liabilities
  2010 Accounts Payable
  2100 Credit Card Payable
  2500 Bank Loan

3000-3999: Owner's Equity
  3010 Owner's Capital
  3020 Retained Earnings

4000-4999: Revenue
  4010 Sales Revenue
  4020 Service Revenue

5000-5999: Expenses
  5010 Rent Expense
  5020 Utilities Expense
  5030 Salaries Expense`}
          </pre>
        </div>

        <KeyTakeaway>
          <p>
            The numbering system makes it easy to identify account types at a glance:
            1xxx = Assets, 2xxx = Liabilities, 3xxx = Equity, 4xxx = Revenue, 5xxx = Expenses.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 3.3 */}
      <section id="section-3-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          3.3 Journal Entries
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Journal entries are the chronological record of all transactions. They're the first
          step in recording financial activity.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          Standard Format:
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-800 dark:text-slate-200 my-6 overflow-x-auto">
          <pre className="whitespace-pre-wrap">
{`Date: January 15, 2026
Account                     Debit       Credit
─────────────────────────────────────────────────
Cash                        $5,000
    Service Revenue                     $5,000
(Received payment for consulting services)`}
          </pre>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          Journal Entry Rules:
        </h3>

        <ol className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li>Debits are listed first, flush left</li>
          <li>Credits are indented and listed second</li>
          <li>Total debits must equal total credits</li>
          <li>Include a brief description (memo)</li>
        </ol>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          More Examples:
        </h3>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Pay rent of $1,200:</p>
            <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
              <p>Rent Expense&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$1,200</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;Cash&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$1,200</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Purchase $500 supplies on credit:</p>
            <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
              <p>Supplies Expense&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$500</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;Accounts Payable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$500</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Customer pays $3,000 owed to us:</p>
            <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
              <p>Cash&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$3,000</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;Accounts Receivable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$3,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3.4 */}
      <section id="section-3-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          3.4 The General Ledger & T-Accounts
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The general ledger is the master record of all accounts, where journal entries are
          "posted" (transferred). Each account shows its running balance.
        </p>

        <DefinitionCard
          term="T-Account"
          definition="A visual representation of an account that looks like the letter T, with debits on the left and credits on the right. It's a simplified way to show how transactions affect individual accounts."
        />

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
          T-Account Format:
        </h3>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-800 dark:text-slate-200 my-6 overflow-x-auto">
          <pre className="whitespace-pre-wrap text-center">
{`         Cash (1010)
    ─────────┬─────────
    Debit    │  Credit
    ─────────┼─────────
    5,000    │    500
    3,000    │  1,200
             │
    ─────────┼─────────
    Balance: │  6,300`}
          </pre>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Since Cash is an asset (debit normal balance), we add debits and subtract credits.
          The balance is $5,000 + $3,000 - $500 - $1,200 = $6,300.
        </p>

        <KeyTakeaway>
          <p>
            T-accounts help visualize how transactions flow through the accounting system.
            After posting all journal entries to T-accounts, you can see the ending balance
            for each account.
          </p>
        </KeyTakeaway>
      </section>

      {/* Real-World Scenario */}
      <section id="section-3-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Real-World Scenario: A Week in the Life of a Freelancer
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Let's follow a freelance graphic designer through one week of transactions:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold">Day</th>
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold">Event</th>
                <th className="border border-slate-200 dark:border-slate-700 px-3 py-2 text-left font-semibold">Journal Entry</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Mon</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Received $2,500 client payment</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 font-mono text-xs">
                  Dr. Cash $2,500<br />Cr. Service Revenue $2,500
                </td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Tue</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Paid $150 for software subscription</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 font-mono text-xs">
                  Dr. Software Expense $150<br />Cr. Cash $150
                </td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Wed</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Bought $300 equipment on credit</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 font-mono text-xs">
                  Dr. Equipment $300<br />Cr. Accounts Payable $300
                </td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Thu</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Paid off equipment purchase</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 font-mono text-xs">
                  Dr. Accounts Payable $300<br />Cr. Cash $300
                </td>
              </tr>
              <tr>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Fri</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2">Invoiced client $1,800 (not yet paid)</td>
                <td className="border border-slate-200 dark:border-slate-700 px-3 py-2 font-mono text-xs">
                  Dr. Accounts Receivable $1,800<br />Cr. Service Revenue $1,800
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="font-medium text-slate-900 dark:text-white mb-3">End of Week Summary:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Cash:</strong> +$2,500 - $150 - $300 = +$2,050</li>
            <li><strong>Accounts Receivable:</strong> +$1,800</li>
            <li><strong>Equipment:</strong> +$300</li>
            <li><strong>Revenue:</strong> +$4,300 ($2,500 + $1,800)</li>
            <li><strong>Expenses:</strong> +$150</li>
            <li><strong>Net Income:</strong> $4,300 - $150 = $4,150</li>
          </ul>
        </div>
      </section>

      {/* Bookkeeping Simulator */}
      <section id="section-3-simulator" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Interactive Tool: Bookkeeping Simulator
        </h2>

        <TryItYourself>
          <p>
            Practice creating journal entries for common business transactions.
            Select the correct debit and credit accounts and amounts for each scenario.
          </p>
        </TryItYourself>

        <div className="my-6">
          <BookkeepingSimulator />
        </div>
      </section>

      <section id="section-3-decoder" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Interactive Tool: Transaction Decoder
        </h2>

        <TryItYourself>
          <p>
            Read the scenario and decide which accounts are affected, then enter the correct debit,
            credit, and amount.
          </p>
        </TryItYourself>

        <div className="my-6">
          <TransactionDecoder />
        </div>
      </section>

      {/* Module Summary */}
      <section id="section-3-summary" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            In this module, you learned:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Double-entry bookkeeping requires every transaction to have equal debits and credits</li>
            <li>The DEALER mnemonic helps remember which accounts increase with debits vs credits</li>
            <li>A chart of accounts organizes all accounts by category with a numbering system</li>
            <li>Journal entries record transactions chronologically with debits first, credits indented</li>
            <li>T-accounts visualize how transactions affect individual account balances</li>
            <li>The general ledger is the master record where all journal entries are posted</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 4, you'll learn about the Income Statement
          (Profit & Loss) and how to measure profitability over time.
        </p>
      </section>

      {/* Knowledge Check */}
      <section id="section-3-quiz" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of double-entry bookkeeping, debits, credits, and journal entries.
        </p>
        <KnowledgeCheck
          moduleId={3}
          title="Module 3: Double-Entry Bookkeeping"
          questions={module03Quiz}
        />
      </section>
    </div>
  );
}
