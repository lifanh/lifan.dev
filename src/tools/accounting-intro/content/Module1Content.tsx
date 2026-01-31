import { ComparisonTable, DefinitionCard, KeyTakeaway } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { module01Quiz } from './quizzes';

export function Module1Content() {
  return (
    <div className="space-y-8">
      {/* Section 1.1 */}
      <section id="section-1-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          1.1 What is Accounting?
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Accounting is the systematic process of recording, classifying, summarizing, and
          interpreting financial transactions. Often called the "language of business,"
          accounting provides a standardized way to communicate financial information.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          But accounting isn't just for businesses. Every time you:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li>Check your bank balance before making a purchase</li>
          <li>Decide whether you can afford a vacation</li>
          <li>Compare the cost of renting vs. buying a home</li>
          <li>Track your monthly spending</li>
        </ul>

        <p className="text-slate-700 dark:text-slate-300 mb-6">
          ...you're engaging in accounting principles, even if informally.
        </p>

        <DefinitionCard
          term="Accounting"
          definition="The systematic process of recording, classifying, summarizing, and interpreting financial transactions to provide useful information for decision-making."
        />

        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
          The Three Branches of Accounting
        </h3>

        <ComparisonTable
          headers={['Branch', 'Purpose', 'Who Uses It']}
          rows={[
            ['Financial Accounting', 'External reporting, standardized statements', 'Investors, creditors, regulators'],
            ['Managerial Accounting', 'Internal decision-making, cost analysis', 'Managers, business owners'],
            ['Tax Accounting', 'Compliance with tax laws, minimizing liability', 'Individuals, businesses, tax authorities'],
          ]}
        />

        <KeyTakeaway>
          <p>
            Accounting standards (like GAAP in the US or IFRS internationally) ensure consistency.
            When you read a company's financial statements, you can trust that "revenue" means the
            same thing across all companies.
          </p>
        </KeyTakeaway>
      </section>

      {/* Section 1.2 */}
      <section id="section-1-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          1.2 The Accounting Cycle Overview
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The accounting cycle is the complete process of recording financial activity:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm text-slate-800 dark:text-slate-200 my-6 overflow-x-auto">
          <code>
            Transaction → Journal Entry → Ledger → Trial Balance →<br />
            Adjustments → Financial Statements → Closing
          </code>
        </div>

        <p className="text-slate-700 dark:text-slate-300">
          We'll explore each step in detail throughout this curriculum. By the end, you'll
          understand how a simple transaction like buying coffee becomes part of a company's
          financial statements.
        </p>
      </section>

      {/* Real-World Scenario */}
      <section id="section-1-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Real-World Scenario: The Coffee Shop Decision
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
            Maria is considering opening a small coffee shop. She has $50,000 in savings and
            is wondering if she can afford it.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          Discussion Points:
        </h3>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li>
            <strong>What financial questions should Maria answer before deciding?</strong>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Startup costs, monthly operating expenses, expected revenue, break-even point
            </p>
          </li>
          <li>
            <strong>How would accounting help her make this decision?</strong>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Pro forma income statements, cash flow projections, balance sheet planning
            </p>
          </li>
          <li>
            <strong>What ongoing accounting will she need once the shop opens?</strong>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Daily sales tracking, expense management, payroll, tax preparation
            </p>
          </li>
        </ul>

        <KeyTakeaway>
          <p>
            Whether you're planning a business or managing personal finances, accounting provides
            the framework to answer critical questions: Can I afford this? Am I making money?
            Where is my money going?
          </p>
        </KeyTakeaway>
      </section>

      {/* Summary */}
      <section id="section-1-summary" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            In this module, you learned:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Accounting is the "language of business" that helps communicate financial information</li>
            <li>There are three main branches: financial, managerial, and tax accounting</li>
            <li>You already use accounting principles in your daily financial decisions</li>
            <li>The accounting cycle transforms transactions into meaningful financial statements</li>
            <li>Accounting standards ensure consistency and comparability</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 2, you'll learn the fundamental accounting equation
          that underlies all of accounting: Assets = Liabilities + Owner's Equity.
        </p>
      </section>

      {/* Knowledge Check */}
      <section id="section-1-quiz" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the concepts covered in this module.
        </p>
        <KnowledgeCheck
          moduleId={1}
          title="Module 1: Introduction to Accounting"
          questions={module01Quiz}
        />
      </section>
    </div>
  );
}
