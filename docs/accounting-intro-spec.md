# Comprehensive Accounting Instruction Platform Specification

## Overview

A full-featured accounting instruction platform at `/tools/accounting-intro` that serves as a **complete educational resource** for learning accounting from zero. This is not a simple demonstration tool—it is a comprehensive instructional document with embedded interactive tools, real-world scenarios, downloadable templates, and progressive mastery tracking.

The platform combines:
- **In-depth instructional content** covering foundational to intermediate accounting concepts
- **Interactive calculators and simulators** embedded within each learning module
- **Real-life case studies** that demonstrate practical application
- **Downloadable templates** for personal and small business use
- **Self-assessment quizzes** to reinforce learning
- **Progressive curriculum** with clear learning outcomes

---

## Vision Statement

In today's complex financial landscape, understanding accounting is essential for personal financial health, business success, and informed decision-making. This platform empowers users to not just understand accounting mechanics, but to **master them creatively and effectively**.

Unlike basic proof-of-concept tools, this platform provides:
- Thorough explanations with multiple examples
- Hands-on practice with immediate feedback
- Real-world context that connects theory to daily life
- Professional-grade templates users can apply immediately
- A structured learning path from novice to competent practitioner

---

## Goals

1. **Comprehensive Education**: Provide complete coverage of foundational accounting topics equivalent to an introductory course
2. **Practical Mastery**: Enable users to immediately apply knowledge to personal finances and small business scenarios
3. **Interactive Learning**: Every concept reinforced with hands-on tools, not passive reading
4. **Real-World Application**: Connect every principle to tangible daily-life situations
5. **Professional Preparation**: Prepare users to communicate with accountants, understand financial documents, and make informed decisions
6. **Self-Paced Progression**: Allow learners to move at their own speed with clear progress indicators
7. **Resource Library**: Provide downloadable templates, checklists, and reference materials

---

## MVP Scope

To ensure feasible delivery within the 16-week timeline, features are prioritized as follows:

### MVP (Minimum Viable Product)

| Category | Included |
|----------|----------|
| **Modules** | Modules 1-6 (Parts I & II: Foundations + Financial Statements) |
| **Core Calculators** | Net Worth Calculator, Income Statement Builder, Balance Sheet Builder, Budget Builder |
| **Visualizers** | Accounting Equation Viz, T-Account Display, basic charts (Pie, Bar, Line) |
| **Assessments** | Knowledge Check quizzes for each module |
| **Templates** | 8 core templates (Net Worth, Ledger, Journal, P&L, Balance Sheet, Cash Flow, Budget, Expense Log) |
| **Features** | Progress tracking, localStorage persistence, PDF export, responsive design |

### Post-MVP (Phase 2)

| Category | Deferred |
|----------|----------|
| **Modules** | Modules 7-12 (Parts III & IV: Practical Skills + Applied Accounting) |
| **Advanced Tools** | Bank Reconciliation Simulator, Decision Simulator, Tax Estimator, Method Comparison Sim |
| **Enhancements** | Kelly Blue Book integration, historical net worth tracking charts, scenario modeling |
| **Templates** | Remaining 7 templates (Zero-Based Budget, Reconciliation, Loan Comparison, etc.) |
| **Features** | User accounts, cloud sync, certificates, video content |

> **Rationale**: Modules 1-6 provide complete foundational accounting education. Users can understand and apply the accounting equation, double-entry bookkeeping, and read/create all three core financial statements. This represents a complete, valuable learning experience.

---

## Target Audience

### Primary Audiences

| Audience | Needs | Success Criteria |
|----------|-------|------------------|
| **Complete Beginners** | Zero accounting knowledge, need fundamentals | Can explain the accounting equation, read basic financial statements |
| **Small Business Owners** | Practical bookkeeping, financial decision-making | Can maintain books, generate reports, understand profitability |
| **Personal Finance Enthusiasts** | Budgeting, net worth tracking, financial planning | Can create budgets, track spending, calculate true costs |
| **Career Changers** | Foundation for finance/accounting roles | Prepared for entry-level positions or further study |

### Secondary Audiences

- Students exploring business/finance as a field
- Managers needing to understand departmental budgets
- Freelancers managing their own finances
- Anyone preparing for conversations with accountants/financial advisors

---

## Curriculum Structure

The curriculum is organized into **4 Parts** containing **12 Modules**, progressing from foundational concepts to practical application. Each module includes:

- **Learning Objectives**: Clear outcomes for each section
- **Instructional Content**: Thorough explanations with examples
- **Interactive Tools**: Hands-on calculators, simulators, and exercises
- **Real-World Scenarios**: Case studies connecting theory to practice
- **Knowledge Checks**: Quizzes to reinforce understanding
- **Downloadable Resources**: Templates and reference materials

**Estimated Total Learning Time**: 8-12 hours (self-paced)

---

# PART I: FOUNDATIONS OF ACCOUNTING

## Module 1: Introduction to Accounting

**Learning Objectives:**
- Define accounting and explain its purpose in personal and business contexts
- Distinguish between financial accounting, managerial accounting, and tax accounting
- Recognize how accounting information is used in daily decision-making
- Understand the role of accounting standards and why they matter

### 1.1 What is Accounting?

**Full Instructional Content:**

Accounting is the systematic process of recording, classifying, summarizing, and interpreting financial transactions. Often called the "language of business," accounting provides a standardized way to communicate financial information.

But accounting isn't just for businesses. Every time you:
- Check your bank balance before making a purchase
- Decide whether you can afford a vacation
- Compare the cost of renting vs. buying a home
- Track your monthly spending

...you're engaging in accounting principles, even if informally.

**The Three Branches of Accounting:**

| Branch | Purpose | Who Uses It |
|--------|---------|-------------|
| **Financial Accounting** | External reporting, standardized statements | Investors, creditors, regulators |
| **Managerial Accounting** | Internal decision-making, cost analysis | Managers, business owners |
| **Tax Accounting** | Compliance with tax laws, minimizing liability | Individuals, businesses, tax authorities |

**Why Standards Matter:**
Accounting standards (like GAAP in the US or IFRS internationally) ensure consistency. When you read a company's financial statements, you can trust that "revenue" means the same thing across all companies.

### 1.2 The Accounting Cycle Overview

The accounting cycle is the complete process of recording financial activity:

```
Transaction → Journal Entry → Ledger → Trial Balance →
Adjustments → Financial Statements → Closing
```

We'll explore each step in detail throughout this curriculum.

### Interactive Tool 1.1: Personal Finance Awareness Assessment

**Purpose**: Help users recognize the accounting they already do and identify gaps.

**Features:**
- Questionnaire about current financial habits (15 questions)
- Categories: Income tracking, expense monitoring, debt awareness, savings goals
- Visual radar chart showing strengths and areas for improvement
- Personalized learning path recommendations based on results
- Benchmarking against "financially healthy" patterns

**Sample Questions:**
1. "Do you know your exact monthly take-home income?" (Always / Usually / Sometimes / Rarely)
2. "Could you list your recurring monthly expenses within $50 accuracy?"
3. "Do you know your current total debt balance?"
4. "Have you calculated your net worth in the past year?"

### Real-World Scenario 1.1: The Coffee Shop Decision

**Scenario**: Maria is considering opening a small coffee shop. She has $50,000 in savings and is wondering if she can afford it.

**Discussion Points:**
- What financial questions should Maria answer before deciding?
- How would accounting help her make this decision?
- What ongoing accounting will she need once the shop opens?

**Interactive Element**: Decision tree walkthrough where users explore different paths and see the accounting implications of each choice.

### Knowledge Check 1

5 multiple-choice questions testing:
- Definition of accounting
- Differences between accounting branches
- Recognition of accounting in daily life
- Purpose of accounting standards

### Downloadable Resources

- **Checklist**: "20 Signs You Need Better Financial Tracking"
- **Worksheet**: Personal Finance Audit Template
- **Reference Card**: Accounting Terms Glossary (Module 1)

---

## Module 2: The Accounting Equation

**Learning Objectives:**
- State and explain the fundamental accounting equation
- Define assets, liabilities, and equity with examples
- Calculate personal net worth using the accounting equation
- Understand how every transaction maintains the equation's balance
- Apply the equation to analyze simple business scenarios

### 2.1 The Foundation of All Accounting

**Full Instructional Content:**

Every accounting system ever created rests on one elegant equation:

**Assets = Liabilities + Owner's Equity**

This isn't just a formula to memorize—it's a fundamental truth about how value works.

**Understanding Each Component:**

**ASSETS: What You Own or Control**
Assets are resources with economic value that you own or have the right to use.

| Asset Type | Personal Examples | Business Examples |
|------------|-------------------|-------------------|
| **Current Assets** (convert to cash within 1 year) | Checking account, savings, investments you could sell | Cash, accounts receivable, inventory |
| **Fixed Assets** (long-term) | Home, car, furniture | Equipment, buildings, land |
| **Intangible Assets** | — | Patents, trademarks, goodwill |

**LIABILITIES: What You Owe**
Liabilities are obligations to pay money or provide services to others.

| Liability Type | Personal Examples | Business Examples |
|----------------|-------------------|-------------------|
| **Current Liabilities** (due within 1 year) | Credit card balance, bills due | Accounts payable, short-term loans |
| **Long-term Liabilities** | Mortgage, student loans, car loan | Bank loans, bonds payable |

**OWNER'S EQUITY: What's Truly Yours**
Equity represents your ownership stake—what would remain if you sold all assets and paid all debts.

For individuals: **Net Worth = Assets - Liabilities**
For businesses: **Owner's Equity = Initial Investment + Retained Earnings**

### 2.2 The Equation Always Balances

Every financial transaction affects at least two elements while keeping the equation in balance.

**Example Transactions:**

| Transaction | Effect on Assets | Effect on Liabilities | Effect on Equity | Still Balanced? |
|-------------|------------------|----------------------|------------------|-----------------|
| Receive $1,000 paycheck | Cash +$1,000 | — | Revenue +$1,000 | ✓ |
| Pay $500 rent | Cash -$500 | — | Expense +$500 (reduces equity) | ✓ |
| Buy $300 groceries on credit card | — | Credit Card +$300 | Expense +$300 (reduces equity) | ✓ |
| Pay off $200 credit card | Cash -$200 | Credit Card -$200 | — | ✓ |
| Buy $20,000 car with $5,000 down + loan | Car +$20,000, Cash -$5,000 | Loan +$15,000 | — | ✓ |

### Interactive Tool 2.1: Comprehensive Net Worth Calculator

**Purpose**: Calculate personal net worth with detailed categorization and tracking.

**Features:**

**Asset Input Section:**
- **Cash & Bank Accounts**
  - Checking accounts (add multiple)
  - Savings accounts
  - Money market accounts
  - Cash on hand
- **Investments**
  - Retirement accounts (401k, IRA, pension)
  - Brokerage accounts
  - Cryptocurrency
  - Other investments
- **Property**
  - Primary residence (current market value)
  - Other real estate
  - Vehicles (Kelly Blue Book lookup integration concept)
  - Valuable personal property (jewelry, art, collectibles)
- **Other Assets**
  - Business ownership value
  - Money owed to you
  - Other assets

**Liability Input Section:**
- **Secured Debt**
  - Mortgage balance(s)
  - Auto loan(s)
  - Home equity loans/lines
- **Unsecured Debt**
  - Credit cards (add multiple with names)
  - Personal loans
  - Student loans
  - Medical debt
- **Other Obligations**
  - Taxes owed
  - Other liabilities

**Output & Visualization:**
- Large net worth display with trend indicator
- Animated balance scale visualization showing Assets vs Liabilities
- Pie chart breakdown of asset categories
- Pie chart breakdown of liability categories
- Asset-to-liability ratio with health indicator
- "What if" scenario modeler (e.g., "What if I paid off my credit cards?")
- Historical tracking (localStorage) with line chart over time
- Export to PDF/CSV functionality
- Comparison to age-based benchmarks (optional)

**Educational Annotations:**
- Info tooltips explaining each category
- "Why this matters" explanations for key ratios
- Suggestions based on results (e.g., "Your liquid assets are low relative to monthly expenses")

### Interactive Tool 2.2: Transaction Impact Visualizer

**Purpose**: Show how transactions affect the accounting equation in real-time.

**Features:**
- Start with a baseline scenario (personal or business)
- Enter transactions from a list or create custom
- Watch animated changes to Assets, Liabilities, and Equity
- Visual proof that equation always balances
- Running transaction log
- "Undo" capability to experiment

### Real-World Scenario 2.1: First-Time Home Buyer

**Scenario**: Alex has $40,000 saved and is buying a $300,000 home with a 20% down payment ($60,000 needed—so he's short!).

**Guided Analysis:**
1. Current net worth calculation
2. Impact of taking out a mortgage
3. How home equity builds over time
4. Comparison: Renting vs. owning from an accounting perspective

**Interactive Element**: Home purchase calculator showing before/after net worth, monthly payment breakdown, and equity accumulation over 30 years.

### Real-World Scenario 2.2: Starting a Side Business

**Scenario**: Jamie invests $5,000 of personal savings into starting a freelance consulting business.

**Analysis Path:**
- Personal vs. business entity separation
- Initial business balance sheet
- First client payment impact
- First expense impact

### Knowledge Check 2

10 questions including:
- Classify items as assets, liabilities, or equity
- Calculate net worth from given data
- Predict equation impact of transactions
- Identify errors in unbalanced scenarios

### Downloadable Resources

- **Template**: Comprehensive Net Worth Tracker (Excel/Google Sheets)
- **Worksheet**: Asset Inventory Checklist
- **Reference**: Common Assets & Liabilities Classification Guide

---

## Module 3: Double-Entry Bookkeeping & The General Ledger

**Learning Objectives:**
- Explain why double-entry bookkeeping is the universal standard
- Define debits and credits correctly for each account type
- Record transactions using proper journal entry format
- Understand the structure and purpose of a general ledger
- Post journal entries to T-accounts
- Identify and correct common recording errors

### 3.1 The Genius of Double-Entry

**Full Instructional Content:**

Double-entry bookkeeping, developed in 15th century Italy, revolutionized commerce and remains the foundation of all modern accounting. Its elegance lies in its self-checking nature: errors become immediately apparent when the books don't balance.

**The Core Principle:**
Every transaction affects at least two accounts, with equal debits and credits.

**Debits and Credits Demystified:**

The terms "debit" and "credit" simply mean "left" and "right" in accounting—their original Latin meanings. Whether a debit increases or decreases an account depends on the account type:

| Account Type | Debit (Left) | Credit (Right) | Normal Balance |
|--------------|--------------|----------------|----------------|
| **Assets** | Increase ↑ | Decrease ↓ | Debit |
| **Liabilities** | Decrease ↓ | Increase ↑ | Credit |
| **Owner's Equity** | Decrease ↓ | Increase ↑ | Credit |
| **Revenue** | Decrease ↓ | Increase ↑ | Credit |
| **Expenses** | Increase ↑ | Decrease ↓ | Debit |

**Memory Device**: **DEALER**
- **D**ividends, **E**xpenses, **A**ssets = Debit to increase
- **L**iabilities, **E**quity, **R**evenue = Credit to increase

### 3.2 The Chart of Accounts

A chart of accounts is the organized list of all accounts a business uses, typically numbered for easy reference:

```
1000-1999: Assets
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
  5030 Salaries Expense
```

### 3.3 Journal Entries

Journal entries are the chronological record of all transactions:

**Standard Format:**
```
Date: January 15, 2026
Account                     Debit       Credit
─────────────────────────────────────────────────
Cash                        $5,000
    Service Revenue                     $5,000
(Received payment for consulting services)
```

**Rules:**
1. Debits are listed first, flush left
2. Credits are indented and listed second
3. Total debits must equal total credits
4. Include a brief description

### 3.4 The General Ledger

The general ledger is the master record of all accounts, where journal entries are "posted" (transferred). Each account shows its running balance.

**T-Account Format:**
```
         Cash (1010)
    ─────────┬─────────
    Debit    │  Credit
    ─────────┼─────────
    5,000    │    500
    3,000    │  1,200
             │
    ─────────┼─────────
    Balance: │  6,300
```

### Interactive Tool 3.1: Complete Bookkeeping Simulator

**Purpose**: Practice recording transactions with immediate feedback and error detection.

**Features:**

**Scenario Selection:**
- Personal checkbook (simplified)
- Freelancer/sole proprietor
- Small retail business
- Service-based business

**Transaction Recording Interface:**
- Transaction description input
- Date picker
- Account selection dropdowns (from chart of accounts)
- Debit/credit amount fields
- Auto-validation: "Debits don't equal credits!" warning
- Submit and see immediate posting

**Visual Ledger Display:**
- Animated T-accounts that update when entries are posted
- Running balance calculation
- Color-coded: assets (blue), liabilities (red), equity (green), revenue (purple), expenses (orange)
- Expandable to see full transaction history per account

**Guided Practice Mode:**
- Step-by-step tutorials for common transactions
- Hints available
- Explanation of correct answer after each entry

**Free Practice Mode:**
- Blank slate to experiment
- Pre-loaded scenario data
- Reset capability

**Challenge Mode:**
- Timed transaction entry
- Error detection exercises ("Find the mistake in these entries")
- Increasing difficulty levels

### Interactive Tool 3.2: Transaction Decoder

**Purpose**: Given a real-world event, determine the correct journal entry.

**Features:**
- Scenario description (e.g., "You purchase $500 of office supplies on your business credit card")
- Multiple choice: Select the accounts affected
- Input: Enter debit/credit amounts
- Immediate feedback with explanation
- 50+ pre-built scenarios covering common situations
- Categories: Cash transactions, credit transactions, payroll, inventory, loans

### Real-World Scenario 3.1: A Week in the Life of a Freelancer

**Detailed Walkthrough**: Follow a freelance graphic designer through one week of transactions:

| Day | Event | Journal Entry Required |
|-----|-------|------------------------|
| Mon | Received $2,500 client payment | Cash ↑, Revenue ↑ |
| Tue | Paid $150 for software subscription | Expense ↑, Cash ↓ |
| Wed | Bought $300 equipment on credit | Equipment ↑, Accounts Payable ↑ |
| Thu | Paid $50 credit card from Tuesday's software | Accounts Payable ↓, Cash ↓ |
| Fri | Invoiced client for $1,800 (not yet paid) | Accounts Receivable ↑, Revenue ↑ |

**Interactive Element**: Users record each entry, see T-accounts update, verify trial balance at end of week.

### Knowledge Check 3

15 questions including:
- Identify correct debit/credit for account types
- Record journal entries from descriptions
- Find errors in given entries
- Post entries to T-accounts
- Calculate account balances

### Downloadable Resources

- **Template**: General Ledger Template (Excel with formulas)
- **Template**: Journal Entry Log Template
- **Reference**: Chart of Accounts Examples (Personal, Freelancer, Small Business)
- **Cheat Sheet**: Debit/Credit Rules Quick Reference Card

---

# PART II: FINANCIAL STATEMENTS

## Module 4: The Income Statement (Profit & Loss)

**Learning Objectives:**
- Explain the purpose and structure of an income statement
- Distinguish between different types of revenue and expenses
- Calculate gross profit, operating income, and net income
- Analyze income statement ratios (profit margins)
- Create a personal or small business income statement
- Interpret income statements to make financial decisions

### 4.1 Understanding the Income Statement

**Full Instructional Content:**

The income statement answers the fundamental question: **"Did we make money or lose money over this period?"**

Unlike the balance sheet (a snapshot), the income statement covers a **period of time** (month, quarter, year).

**Basic Structure:**
```
Revenue (Sales)
- Cost of Goods Sold
────────────────────
= Gross Profit

- Operating Expenses
────────────────────
= Operating Income

+/- Other Income/Expenses
────────────────────
= Income Before Taxes

- Income Tax Expense
────────────────────
= Net Income (Bottom Line)
```

**Key Terms Explained:**

| Term | Definition | Example |
|------|------------|---------|
| **Revenue** | Money earned from primary business activities | Sales of products, service fees |
| **Cost of Goods Sold (COGS)** | Direct costs to produce/acquire what was sold | Materials, manufacturing labor |
| **Gross Profit** | Revenue minus COGS | What's left after direct costs |
| **Operating Expenses** | Costs of running the business | Rent, utilities, salaries, marketing |
| **Operating Income** | Gross profit minus operating expenses | Profit from core operations |
| **Net Income** | Final profit after all expenses and taxes | "The bottom line" |

### 4.2 Personal Income Statement

Individuals can apply the same concept:

```
INCOME
  Salary (after taxes)           $5,000
  Side gig income                  $500
  Investment dividends             $100
────────────────────────────────────────
  Total Income                   $5,600

EXPENSES
  Housing (rent/mortgage)        $1,500
  Utilities                        $200
  Transportation                   $400
  Food & Groceries                 $600
  Insurance                        $300
  Entertainment                    $200
  Other                            $300
────────────────────────────────────────
  Total Expenses                 $3,500

────────────────────────────────────────
  NET SAVINGS (Income - Expenses) $2,100
```

### 4.3 Analyzing Profitability

**Key Ratios:**

| Ratio | Formula | What It Tells You |
|-------|---------|-------------------|
| **Gross Profit Margin** | Gross Profit / Revenue × 100 | Efficiency of production/sourcing |
| **Operating Margin** | Operating Income / Revenue × 100 | Core business profitability |
| **Net Profit Margin** | Net Income / Revenue × 100 | Overall profitability |

**Industry Benchmarks:**
- Grocery stores: 2-3% net margin (high volume, low margin)
- Software companies: 20-30% net margin (low COGS)
- Restaurants: 3-9% net margin (high labor and food costs)

### Interactive Tool 4.1: Income Statement Builder

**Purpose**: Create and analyze income statements for personal finances or small businesses.

**Features:**

**Mode Selection:**
- Personal monthly income statement
- Small business monthly/quarterly/annual
- Comparative (current vs. previous period)

**Input Interface:**
- **Revenue Section**
  - Add income sources with categories
  - Recurring vs. one-time toggle
  - Year-over-year comparison inputs

- **COGS Section** (business mode)
  - Direct costs input
  - Inventory cost calculator

- **Expense Section**
  - Pre-defined categories with customization
  - Recurring expense scheduler
  - Categorization suggestions

**Output & Analysis:**
- Formatted income statement display
- Automatic ratio calculations
- Visual: Waterfall chart showing flow from revenue to net income
- Visual: Expense breakdown pie chart
- Trend analysis (with historical data)
- Red flags: "Your dining expenses are 25% of income—national average is 10%"
- Export to PDF

### Interactive Tool 4.2: Profit Margin Analyzer

**Purpose**: Understand how changes in revenue, COGS, and expenses affect profitability.

**Features:**
- Adjustable sliders for: Revenue, COGS %, each major expense category
- Real-time updating income statement
- Margin calculations update live
- Scenario comparison: "What if I reduce COGS by 5%?"
- Break-even analysis integration
- Goal seeking: "What revenue do I need for $50,000 profit?"

### Real-World Scenario 4.1: The Struggling Restaurant

**Case Study**: Tony's Pizza has revenue of $500,000 but is barely profitable.

**Given Data:**
- Revenue: $500,000
- Food costs: $175,000 (35%)
- Labor: $150,000 (30%)
- Rent: $60,000 (12%)
- Utilities: $24,000 (4.8%)
- Other: $80,000 (16%)
- Net income: $11,000 (2.2%)

**Analysis Exercises:**
1. Calculate all profit margins
2. Identify the largest cost areas
3. Propose changes to improve margins
4. Model the impact of a 10% price increase with 5% volume decrease

### Real-World Scenario 4.2: Freelancer Annual Review

**Scenario**: Review a freelancer's annual income statement and identify opportunities.

### Knowledge Check 4

12 questions on:
- Income statement components
- Calculating profits at each level
- Ratio interpretation
- Decision-making from income statement data

### Downloadable Resources

- **Template**: Personal Monthly Income Statement (Excel)
- **Template**: Small Business Income Statement (Excel with formulas)
- **Reference**: Expense Categories Guide
- **Checklist**: Monthly Financial Review Process

---

## Module 5: The Balance Sheet

**Learning Objectives:**
- Explain the purpose and structure of a balance sheet
- Classify items as current vs. non-current assets/liabilities
- Understand shareholders' equity components
- Analyze balance sheet ratios (liquidity, solvency)
- Read and interpret real balance sheets
- Create a personal balance sheet

### 5.1 The Financial Snapshot

**Full Instructional Content:**

The balance sheet shows your **financial position at a specific moment in time**—like a photograph of your finances.

It always reflects the accounting equation:
**Assets = Liabilities + Owner's Equity**

**Standard Structure:**
```
ASSETS
  Current Assets
    Cash                           $10,000
    Accounts Receivable             $5,000
    Inventory                       $8,000
    Prepaid Expenses                $1,000
    ────────────────────────────────────────
    Total Current Assets           $24,000

  Non-Current Assets
    Property, Plant & Equipment   $100,000
    Less: Accumulated Depreciation ($20,000)
    Intangible Assets              $15,000
    ────────────────────────────────────────
    Total Non-Current Assets       $95,000

────────────────────────────────────────
TOTAL ASSETS                      $119,000
════════════════════════════════════════

LIABILITIES
  Current Liabilities
    Accounts Payable                $6,000
    Short-term Debt                 $4,000
    Accrued Expenses                $2,000
    ────────────────────────────────────────
    Total Current Liabilities      $12,000

  Non-Current Liabilities
    Long-term Debt                 $50,000
    ────────────────────────────────────────
    Total Non-Current Liabilities  $50,000

────────────────────────────────────────
TOTAL LIABILITIES                  $62,000

OWNER'S EQUITY
  Owner's Capital                  $30,000
  Retained Earnings                $27,000
────────────────────────────────────────
TOTAL OWNER'S EQUITY               $57,000

────────────────────────────────────────
TOTAL LIABILITIES + EQUITY        $119,000
════════════════════════════════════════
```

### 5.2 Key Balance Sheet Ratios

| Ratio | Formula | Healthy Range | What It Measures |
|-------|---------|---------------|------------------|
| **Current Ratio** | Current Assets / Current Liabilities | 1.5 - 3.0 | Short-term liquidity |
| **Quick Ratio** | (Current Assets - Inventory) / Current Liabilities | > 1.0 | Immediate liquidity |
| **Debt-to-Equity** | Total Liabilities / Total Equity | < 2.0 (varies by industry) | Financial leverage |
| **Debt Ratio** | Total Liabilities / Total Assets | < 0.5 | Solvency |

### Interactive Tool 5.1: Balance Sheet Builder & Analyzer

**Purpose**: Create balance sheets and analyze financial health.

**Features:**
- Complete balance sheet input form with all categories
- Auto-calculation of totals and equation verification
- Ratio calculations with health indicators (green/yellow/red)
- Comparative analysis (two time periods)
- Industry benchmark comparisons
- Visual representations: Stacked bar chart of assets/liabilities

### Interactive Tool 5.2: Financial Health Dashboard

**Purpose**: Ongoing personal financial health monitoring.

**Features:**
- Connects to Module 2 Net Worth Calculator data
- Adds income/expense tracking from Module 4
- Calculates personal versions of business ratios:
  - Emergency fund ratio (liquid assets / monthly expenses)
  - Debt-to-income ratio
  - Savings rate
- Visual dashboard with gauges
- Goal setting and progress tracking
- Alerts for concerning trends

### Knowledge Check 5

12 questions covering all balance sheet concepts

### Downloadable Resources

- **Template**: Personal Balance Sheet (Excel)
- **Template**: Small Business Balance Sheet (Excel)
- **Reference**: Balance Sheet Ratio Interpretation Guide

---

## Module 6: The Cash Flow Statement

**Learning Objectives:**
- Explain why profitable businesses can run out of cash
- Distinguish between the three sections of cash flow statements
- Calculate cash flows from operations using indirect method
- Analyze cash flow patterns to assess business health
- Apply cash flow concepts to personal finance

### 6.1 Cash is King

**Full Instructional Content:**

A business can be profitable on paper but still go bankrupt. How? **Cash timing**.

**Example:**
- You sell $100,000 of products in January (on credit, customers pay in 60 days)
- Your suppliers demand payment in 30 days ($60,000)
- Rent and payroll are due: $30,000
- You have $50,000 cash on hand

**Income Statement says:** $100,000 revenue - $90,000 expenses = $10,000 profit! 🎉
**Bank Account says:** $50,000 - $90,000 = -$40,000 😱

The cash flow statement bridges this gap.

### 6.2 Three Sections of Cash Flow

**Operating Activities**: Cash from core business operations
- Cash received from customers
- Cash paid to suppliers and employees
- Interest and taxes paid

**Investing Activities**: Cash for long-term assets
- Purchase/sale of equipment
- Purchase/sale of investments
- Acquisitions

**Financing Activities**: Cash from/to owners and creditors
- Loans received/repaid
- Equity issued/repurchased
- Dividends paid

### Interactive Tool 6.1: Cash Flow Forecaster

**Purpose**: Project future cash positions based on expected transactions.

**Features:**
- 12-month rolling forecast
- Input recurring and one-time cash flows
- Visual timeline of cash position
- Warning when cash goes negative
- Scenario modeling: "What if a client pays late?"
- Break-even timing analysis

### Real-World Scenario 6.1: The Cash Crunch

**Case Study**: A growing business with increasing sales but shrinking cash.

### Knowledge Check 6

10 questions on cash flow concepts

### Downloadable Resources

- **Template**: Personal Cash Flow Forecast (Excel)
- **Template**: Business Cash Flow Statement (Excel)
- **Reference**: Cash Flow Analysis Guide

---

# PART III: PRACTICAL ACCOUNTING SKILLS

## Module 7: Budgeting Mastery

**Learning Objectives:**
- Create effective budgets using multiple methodologies
- Implement variance analysis to track performance
- Adjust budgets based on actual results
- Apply zero-based budgeting principles
- Use budgets as decision-making tools

### 7.1 Budgeting Methodologies

**Traditional Budgeting**: Base next year on this year + adjustments
**Zero-Based Budgeting**: Justify every expense from scratch each period
**50/30/20 Rule**: 50% needs, 30% wants, 20% savings (personal)
**Envelope System**: Allocate cash to categories, stop when empty

### Interactive Tool 7.1: Comprehensive Budget Builder

**Purpose**: Create, track, and analyze budgets with multiple methodologies.

**Features:**

**Setup Phase:**
- Income input (multiple sources)
- Methodology selection with explanation
- Category customization
- Goal setting (savings targets, debt payoff)

**Allocation Phase:**
- Drag-and-drop budget allocation
- Real-time percentage calculations
- Visual pie chart updating live
- Recommendations based on methodology
- Comparison to recommended allocations

**Tracking Phase:**
- Actual expense logging
- Variance calculations (budget vs. actual)
- Visual: Budget vs. actual bar chart
- Category drill-down
- Trend analysis over time

**Analysis Phase:**
- Variance analysis with explanations
- Actionable recommendations
- Next month adjustments
- Progress toward goals

### Interactive Tool 7.2: Variance Analysis Explainer

**Purpose**: Understand why actual results differ from budget.

**Features:**
- Input budget and actual figures
- Automatic variance calculation
- Classification: Favorable vs. unfavorable
- Root cause analysis prompts
- Action item suggestions

### Real-World Scenario 7.1: The First Budget

**Walkthrough**: Create a complete personal budget from scratch.

### Knowledge Check 7

10 questions on budgeting concepts

### Downloadable Resources

- **Template**: Personal Monthly Budget (Excel with tracking)
- **Template**: Annual Budget Planner
- **Template**: Zero-Based Budget Worksheet
- **Checklist**: Budget Review Process

---

## Module 8: Recording & Organizing Transactions

**Learning Objectives:**
- Maintain organized financial records
- Use accounting software effectively
- Reconcile bank statements
- Establish bookkeeping routines
- Prepare for tax time efficiently

### 8.1 Record-Keeping Best Practices

**Full Instructional Content covering:**
- Document retention policies
- Digital vs. paper records
- Categorization systems
- Receipt management
- Backup strategies

### Interactive Tool 8.1: Bank Reconciliation Simulator

**Purpose**: Practice reconciling bank statements with book records.

**Features:**
- Sample bank statement
- Sample general ledger cash account
- Step-by-step reconciliation process
- Common discrepancy identification
- Practice finding errors

### Interactive Tool 8.2: Document Decoder

**Purpose**: Learn to read financial documents.

**Features:**
- Interactive annotated samples of:
  - Bank statements
  - Pay stubs
  - Credit card statements
  - Investment statements
  - Tax forms (W-2, 1099)
- Click any element for explanation
- Quiz mode: "What does this line mean?"

### Knowledge Check 8

10 questions on record-keeping

### Downloadable Resources

- **Checklist**: Document Retention Guide
- **Template**: Expense Tracking Log
- **Reference**: Common Financial Documents Explained

---

## Module 9: Accounting for Loans & Interest

**Learning Objectives:**
- Calculate simple and compound interest
- Understand amortization schedules
- Evaluate loan offers effectively
- Account for debt correctly
- Make informed borrowing decisions

### 9.1 The Time Value of Money

**Full Instructional Content:**
- Present value vs. future value
- Interest rate fundamentals
- Compound interest power
- APR vs. APY explained

### Interactive Tool 9.1: Loan Comparison Calculator

**Purpose**: Compare different loan offers side-by-side.

**Features:**
- Input multiple loan scenarios
- Amortization schedule generation
- Total interest calculations
- Monthly payment calculations
- Visual: Principal vs. interest over time
- Early payoff modeling
- Refinancing analysis

### Interactive Tool 9.2: Compound Interest Visualizer

**Purpose**: Demonstrate the power of compound interest over time.

**Features:**
- Initial investment input
- Interest rate slider
- Time period slider
- Visual: Exponential growth chart
- Comparison: Simple vs. compound
- Rule of 72 calculator

### Real-World Scenario 9.1: Choosing a Mortgage

**Case Study**: Compare 15-year vs. 30-year mortgage options.

### Knowledge Check 9

10 questions on loans and interest

### Downloadable Resources

- **Template**: Loan Comparison Worksheet
- **Template**: Debt Payoff Tracker
- **Calculator**: Amortization Schedule Generator

---

## Module 10: Cash vs. Accrual Accounting

**Learning Objectives:**
- Explain the difference between cash and accrual methods
- Determine which method is appropriate for different situations
- Convert between cash and accrual statements
- Understand tax implications of each method

### 10.1 Two Ways to Record Reality

**Full Instructional Content with detailed examples and comparisons**

### Interactive Tool 10.1: Method Comparison Simulator

**Purpose**: See the same transactions under both methods.

**Features:**
- Input a series of transactions
- Side-by-side income statements (cash vs. accrual)
- Timeline visualization showing timing differences
- Cumulative comparison over multiple periods
- Discussion of which gives "truer" picture

### Knowledge Check 10

8 questions on accounting methods

### Downloadable Resources

- **Reference**: Cash vs. Accrual Decision Guide
- **Template**: Accrual Adjustment Worksheet

---

# PART IV: APPLIED ACCOUNTING

## Module 11: Financial Analysis & Decision Making

**Learning Objectives:**
- Analyze financial statements to make decisions
- Calculate and interpret key financial ratios
- Identify financial red flags and opportunities
- Use accounting data for strategic planning
- Communicate financial insights effectively

### 11.1 Bringing It All Together

**Full Instructional Content:**
- Integrated financial analysis
- Trend analysis techniques
- Benchmarking methods
- Decision frameworks

### Interactive Tool 11.1: Complete Financial Analysis Dashboard

**Purpose**: Comprehensive analysis of a complete set of financial statements.

**Features:**
- Input all three financial statements
- Automatic ratio calculations (20+ ratios)
- Trend analysis across periods
- Industry comparison
- Red flag alerts
- Opportunity identification
- Executive summary generation
- Custom report builder

### Interactive Tool 11.2: Business Decision Simulator

**Purpose**: Practice making decisions based on financial data.

**Features:**
- Scenario-based decision challenges:
  - Should we hire another employee?
  - Should we purchase or lease equipment?
  - Should we raise prices?
  - Should we expand to a new location?
- Financial data provided
- Multiple choice decisions
- See consequences of each choice
- Learn from outcomes

### Real-World Scenario 11.1: Annual Business Review

**Comprehensive case study**: Full analysis of a small business

### Knowledge Check 11

15 questions covering all analysis concepts

### Downloadable Resources

- **Template**: Financial Analysis Report Template
- **Reference**: Ratio Quick Reference Card
- **Checklist**: Annual Financial Review Process

---

## Module 12: Compliance & Tax Basics

**Learning Objectives:**
- Understand basic tax concepts for individuals and businesses
- Recognize major compliance requirements
- Know when to seek professional help
- Maintain tax-ready records
- Calculate estimated tax obligations

### 12.1 Taxes Demystified

**Full Instructional Content:**
- Tax brackets and marginal rates
- Deductions vs. credits
- Self-employment tax basics
- Quarterly estimated taxes
- Record-keeping for tax purposes

### 12.2 When to Get Professional Help

**Guidance on:**
- DIY vs. professional tax preparation
- Finding a good accountant
- Questions to ask
- What to prepare for meetings

### Interactive Tool 12.1: Tax Estimation Calculator

**Purpose**: Estimate tax liability for planning purposes.

**Features:**
- Income input by source
- Deduction estimation
- Tax calculation (federal)
- Quarterly payment calculator
- Comparison: Standard vs. itemized deductions
- Self-employment tax calculator

### Interactive Tool 12.2: Tax Document Organizer

**Purpose**: Ensure all necessary documents are ready for tax time.

**Features:**
- Interactive checklist by situation
- Document upload/tracking capability
- Deadline reminders
- Missing document alerts

### Knowledge Check 12

10 questions on tax basics

### Downloadable Resources

- **Checklist**: Tax Preparation Document List
- **Template**: Estimated Tax Payment Tracker
- **Reference**: Common Tax Deductions Guide
- **Calendar**: Important Tax Deadlines

---

## Technical Implementation

### Architecture Overview

This is a **content-rich educational platform**, not a simple demo. The architecture must support:
- Extensive prose content with embedded interactive components
- Progress tracking across 12 modules
- Data persistence for user inputs across sessions
- Downloadable resources (PDFs, Excel templates)
- Quiz/assessment functionality
- Responsive design for all device sizes

### File Structure

```
src/
├── pages/
│   └── tools/
│       ├── accounting-intro.astro           # Landing/overview page
│       └── accounting-intro/
│           ├── [module].astro               # Dynamic module pages
│           └── resources.astro              # Downloadable resources hub
│
├── tools/
│   └── accounting-intro/
│       ├── AccountingPlatform.tsx           # Main React shell
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── ModuleNavigation.tsx     # Sidebar navigation
│       │   │   ├── ProgressBar.tsx          # Top progress indicator
│       │   │   ├── ModuleHeader.tsx         # Module title, objectives
│       │   │   └── TableOfContents.tsx      # In-module navigation
│       │   │
│       │   ├── content/
│       │   │   ├── ProseSection.tsx         # Styled text content
│       │   │   ├── KeyTakeaway.tsx          # Highlighted key points
│       │   │   ├── DefinitionCard.tsx       # Term definitions
│       │   │   ├── ExampleBox.tsx           # Worked examples
│       │   │   ├── ComparisonTable.tsx      # Side-by-side comparisons
│       │   │   └── CaseStudy.tsx            # Real-world scenario container
│       │   │
│       │   ├── interactive/
│       │   │   ├── calculators/
│       │   │   │   ├── NetWorthCalculator.tsx
│       │   │   │   ├── IncomeStatementBuilder.tsx
│       │   │   │   ├── BalanceSheetBuilder.tsx
│       │   │   │   ├── CashFlowForecaster.tsx
│       │   │   │   ├── BudgetBuilder.tsx
│       │   │   │   ├── LoanComparisonCalculator.tsx
│       │   │   │   ├── CompoundInterestVisualizer.tsx
│       │   │   │   └── TaxEstimator.tsx
│       │   │   │
│       │   │   ├── simulators/
│       │   │   │   ├── TransactionSimulator.tsx
│       │   │   │   ├── BookkeepingSimulator.tsx
│       │   │   │   ├── BankReconciliationSim.tsx
│       │   │   │   ├── MethodComparisonSim.tsx
│       │   │   │   └── DecisionSimulator.tsx
│       │   │   │
│       │   │   ├── visualizers/
│       │   │   │   ├── AccountingEquationViz.tsx
│       │   │   │   ├── TAccountDisplay.tsx
│       │   │   │   ├── WaterfallChart.tsx
│       │   │   │   ├── BalanceScaleViz.tsx
│       │   │   │   └── TimelineViz.tsx
│       │   │   │
│       │   │   └── assessments/
│       │   │       ├── FinanceAwarenessQuiz.tsx
│       │   │       ├── KnowledgeCheck.tsx
│       │   │       ├── TransactionDecoder.tsx
│       │   │       └── DocumentDecoder.tsx
│       │   │
│       │   ├── charts/
│       │   │   ├── PieChart.tsx
│       │   │   ├── BarChart.tsx
│       │   │   ├── LineChart.tsx
│       │   │   └── RadarChart.tsx
│       │   │
│       │   └── ui/
│       │       ├── Tooltip.tsx
│       │       ├── Modal.tsx
│       │       ├── Tabs.tsx
│       │       ├── Accordion.tsx
│       │       ├── InputField.tsx
│       │       ├── CurrencyInput.tsx
│       │       ├── Slider.tsx
│       │       └── ProgressRing.tsx
│       │
│       ├── content/
│       │   ├── modules/
│       │   │   ├── module-01-introduction.mdx
│       │   │   ├── module-02-equation.mdx
│       │   │   ├── module-03-double-entry.mdx
│       │   │   ├── module-04-income-statement.mdx
│       │   │   ├── module-05-balance-sheet.mdx
│       │   │   ├── module-06-cash-flow.mdx
│       │   │   ├── module-07-budgeting.mdx
│       │   │   ├── module-08-record-keeping.mdx
│       │   │   ├── module-09-loans-interest.mdx
│       │   │   ├── module-10-cash-accrual.mdx
│       │   │   ├── module-11-analysis.mdx
│       │   │   └── module-12-compliance.mdx
│       │   │
│       │   ├── scenarios/
│       │   │   ├── coffee-shop-decision.json
│       │   │   ├── home-buyer.json
│       │   │   ├── freelancer-week.json
│       │   │   ├── struggling-restaurant.json
│       │   │   └── ... (20+ scenarios)
│       │   │
│       │   ├── quizzes/
│       │   │   ├── module-01-quiz.json
│       │   │   ├── module-02-quiz.json
│       │   │   └── ... (12 quiz files)
│       │   │
│       │   └── glossary.json
│       │
│       ├── hooks/
│       │   ├── useLocalStorage.ts
│       │   ├── useProgress.ts
│       │   ├── useQuiz.ts
│       │   └── useCalculator.ts
│       │
│       ├── utils/
│       │   ├── calculations/
│       │   │   ├── netWorth.ts
│       │   │   ├── ratios.ts
│       │   │   ├── amortization.ts
│       │   │   ├── compoundInterest.ts
│       │   │   └── taxes.ts
│       │   ├── formatting.ts
│       │   ├── validation.ts
│       │   └── export.ts
│       │
│       └── types/
│           ├── financial.ts
│           ├── module.ts
│           ├── quiz.ts
│           └── user.ts
│
├── assets/
│   └── accounting-intro/
│       ├── templates/              # Excel/Google Sheets templates
│       ├── checklists/             # PDF checklists
│       ├── reference-cards/        # Quick reference PDFs
│       └── sample-documents/       # Annotated financial documents
```

### Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Astro + React Islands | Static content with interactive islands |
| **Content** | MDX | Rich content with embedded components; requires `@astrojs/mdx` integration |
| **Styling** | Tailwind CSS | Consistent with design system |
| **UI Components** | shadcn/ui | Accessible, customizable primitives; accelerates development |
| **State Management** | Zustand | Lightweight, persistent state across modules |
| **Charts** | Recharts | Full-featured, React-native charting (lazy-load to manage bundle size) |
| **Animations** | Framer Motion | Smooth, accessible animations |
| **Forms** | React Hook Form + Zod | Robust input handling and validation |
| **PDF Generation** | @react-pdf/renderer | Export statements and reports |
| **Testing** | Vitest + Testing Library | Component and calculation testing |

### Data Architecture

```typescript
// User progress and data stored in localStorage
interface UserProgress {
  currentModule: number;
  completedModules: Set<number>;
  quizScores: Record<number, QuizResult>;
  lastVisited: Date;
  totalTimeSpent: number; // minutes
}

interface SavedCalculatorData {
  netWorth: NetWorthData | null;
  incomeStatement: IncomeStatementData | null;
  balanceSheet: BalanceSheetData | null;
  budget: BudgetData | null;
  // ... other calculator data
}

interface UserPreferences {
  currency: 'USD' | 'EUR' | 'GBP' | string;
  darkMode: boolean;
  animationsEnabled: boolean;
}

// Quiz question schema
interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  relatedConcept?: string; // Links to glossary term
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: { questionId: string; correct: boolean; selectedAnswer: string }[];
  completedAt: string;
  timeSpent: number; // seconds
}

// Stored under keys:
// 'accounting-intro:progress'
// 'accounting-intro:data'
// 'accounting-intro:preferences'
```

### Component Architecture

```tsx
// Page structure (Astro)
<Layout title="Accounting Introduction">
  <AccountingPlatform client:load initialModule={1}>
    {/* React takes over from here */}
  </AccountingPlatform>
</Layout>

// Main platform shell
function AccountingPlatform({ initialModule }) {
  return (
    <ProgressProvider>
      <div className="grid grid-cols-[280px_1fr] gap-8">
        <aside>
          <ModuleNavigation />
          <ProgressSummary />
        </aside>

        <main>
          <ModuleHeader />
          <ModuleContent>
            {/* MDX content renders here with embedded components */}
            <MDXRemote
              source={moduleContent}
              components={interactiveComponents}
            />
          </ModuleContent>
          <ModuleFooter>
            <KnowledgeCheck moduleId={currentModule} />
            <DownloadableResources moduleId={currentModule} />
            <NavigationButtons />
          </ModuleFooter>
        </main>
      </div>
    </ProgressProvider>
  );
}
```

### Interactive Component Patterns

**Calculator Pattern:**
```tsx
function NetWorthCalculator() {
  const { data, updateData } = useCalculatorData('netWorth');
  const totals = useNetWorthCalculations(data);

  return (
    <CalculatorCard title="Net Worth Calculator" onReset={reset}>
      <CalculatorSection title="Assets">
        <AssetInputs data={data.assets} onChange={updateAssets} />
      </CalculatorSection>

      <CalculatorSection title="Liabilities">
        <LiabilityInputs data={data.liabilities} onChange={updateLiabilities} />
      </CalculatorSection>

      <ResultsPanel>
        <NetWorthDisplay value={totals.netWorth} trend={totals.trend} />
        <BalanceScaleVisualization assets={totals.assets} liabilities={totals.liabilities} />
        <InsightsPanel insights={generateInsights(totals)} />
      </ResultsPanel>

      <ExportActions onExportPDF={exportPDF} onExportCSV={exportCSV} />
    </CalculatorCard>
  );
}
```

**Quiz Pattern:**
```tsx
function KnowledgeCheck({ moduleId }) {
  const questions = useQuizQuestions(moduleId);
  const { submitAnswer, results, isComplete } = useQuiz(moduleId);

  return (
    <QuizContainer>
      {!isComplete ? (
        <QuestionFlow
          questions={questions}
          onAnswer={submitAnswer}
          showExplanations={true}
        />
      ) : (
        <QuizResults
          results={results}
          onRetry={reset}
          onContinue={goToNextModule}
        />
      )}
    </QuizContainer>
  );
}

---

## UI/UX Design

### Overall Layout

The platform uses a **learning management system (LMS) style layout** optimized for educational content consumption:

```
┌────────────────────────────────────────────────────────────────────────┐
│  [Logo]  Accounting Fundamentals           Progress: ████████░░ 67%   │
├──────────────┬─────────────────────────────────────────────────────────┤
│              │                                                         │
│  PART I      │  Module 3: Double-Entry Bookkeeping                    │
│  ─────────   │  ═══════════════════════════════════                   │
│  ✓ Module 1  │                                                         │
│  ✓ Module 2  │  Learning Objectives                                   │
│  ● Module 3  │  ┌─────────────────────────────────────────────────┐   │
│  ○ Module 4  │  │ • Explain why double-entry is universal         │   │
│              │  │ • Define debits and credits correctly           │   │
│  PART II     │  │ • Record transactions in journal format         │   │
│  ─────────   │  └─────────────────────────────────────────────────┘   │
│  ○ Module 5  │                                                         │
│  ○ Module 6  │  [In-page Table of Contents]                           │
│  ○ Module 7  │                                                         │
│              │  ─────────────────────────────────────────────────────  │
│  PART III    │                                                         │
│  ─────────   │  3.1 The Genius of Double-Entry                        │
│  ○ Module 8  │                                                         │
│  ○ Module 9  │  [Prose content with embedded examples, tables,        │
│  ○ Module 10 │   definitions, and key takeaway boxes...]              │
│              │                                                         │
│  PART IV     │  ─────────────────────────────────────────────────────  │
│  ─────────   │                                                         │
│  ○ Module 11 │  Interactive Tool: Bookkeeping Simulator               │
│  ○ Module 12 │  ┌─────────────────────────────────────────────────┐   │
│              │  │                                                 │   │
│  ─────────── │  │  [Full-featured interactive component]          │   │
│  📚 Resources│  │                                                 │   │
│  📖 Glossary │  └─────────────────────────────────────────────────┘   │
│              │                                                         │
│              │  ─────────────────────────────────────────────────────  │
│              │                                                         │
│              │  Knowledge Check                                        │
│              │  [Quiz component with progress]                         │
│              │                                                         │
│              │  ─────────────────────────────────────────────────────  │
│              │                                                         │
│              │  Downloadable Resources                                 │
│              │  [Template cards with download buttons]                 │
│              │                                                         │
│              │  ─────────────────────────────────────────────────────  │
│              │                                                         │
│              │  [← Previous Module]              [Next Module →]       │
│              │                                                         │
└──────────────┴─────────────────────────────────────────────────────────┘
```

### Design Principles (per GUIDELINE.md)

| Principle | Implementation |
|-----------|----------------|
| **Color** | Neutral backgrounds (`slate-50`/`slate-900`), accent blue only for CTAs and progress |
| **Typography** | H1 for module title, H2 for sections, H3 for subsections, prose for body |
| **Spacing** | 4px base unit, generous whitespace between sections (48-64px) |
| **Cards** | `.card-lg` for interactive tools, `.card` for content callouts |
| **Transitions** | 200ms for hover states, 300ms for section transitions |

### Content Component Styling

**Definition Card:**
```
┌─────────────────────────────────────────────────┐
│  📘 DEFINITION                                  │
│  ─────────────────────────────────────────────  │
│  **Asset**: A resource with economic value      │
│  that an individual or entity owns or controls  │
│  with the expectation of future benefit.        │
└─────────────────────────────────────────────────┘
```

**Key Takeaway Box:**
```
┌─────────────────────────────────────────────────┐
│  💡 KEY TAKEAWAY                                │
│  ─────────────────────────────────────────────  │
│  Every transaction affects at least two         │
│  accounts. Debits must always equal credits.    │
│  This self-balancing nature is what makes       │
│  double-entry bookkeeping reliable.             │
└─────────────────────────────────────────────────┘
```

**Try It Yourself Prompt:**
```
┌─────────────────────────────────────────────────┐
│  🎯 TRY IT YOURSELF                             │
│  ─────────────────────────────────────────────  │
│  Use the calculator below to record some        │
│  transactions and watch how the T-accounts      │
│  update in real-time.                           │
│                                                 │
│  [Launch Interactive Tool ↓]                    │
└─────────────────────────────────────────────────┘
```

### Interactive Tool Styling

**Calculator Tools** (Net Worth, Budget, Statements):
```
┌─────────────────────────────────────────────────────────────────┐
│  📊 Net Worth Calculator                          [Reset] [?]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────┐   ┌─────────────────────────┐     │
│  │  ASSETS                 │   │  LIABILITIES            │     │
│  │  ───────────────────    │   │  ───────────────────    │     │
│  │                         │   │                         │     │
│  │  Cash & Bank Accounts   │   │  Secured Debt           │     │
│  │  ┌─────────────────┐    │   │  ┌─────────────────┐    │     │
│  │  │ Checking  $5,000│    │   │  │ Mortgage $180,000│   │     │
│  │  │ Savings  $12,000│    │   │  │ Car Loan  $8,500│    │     │
│  │  │ [+ Add]         │    │   │  │ [+ Add]         │    │     │
│  │  └─────────────────┘    │   │  └─────────────────┘    │     │
│  │                         │   │                         │     │
│  │  Investments            │   │  Unsecured Debt         │     │
│  │  ┌─────────────────┐    │   │  ┌─────────────────┐    │     │
│  │  │ 401(k)   $45,000│    │   │  │ Credit Card $3,200│  │     │
│  │  │ Brokerage $8,000│    │   │  │ Student    $22,000│  │     │
│  │  │ [+ Add]         │    │   │  │ [+ Add]         │    │     │
│  │  └─────────────────┘    │   │  └─────────────────┘    │     │
│  │                         │   │                         │     │
│  │  Property               │   │                         │     │
│  │  ┌─────────────────┐    │   │                         │     │
│  │  │ Home    $250,000│    │   │                         │     │
│  │  │ Car      $15,000│    │   │                         │     │
│  │  │ [+ Add]         │    │   │                         │     │
│  │  └─────────────────┘    │   │                         │     │
│  │                         │   │                         │     │
│  │  ─────────────────────  │   │  ─────────────────────  │     │
│  │  TOTAL: $335,000        │   │  TOTAL: $213,700        │     │
│  └─────────────────────────┘   └─────────────────────────┘     │
│                                                                 │
│  ═══════════════════════════════════════════════════════════   │
│                                                                 │
│       YOUR NET WORTH                                           │
│       ┌─────────────────────────────────────────────────┐      │
│       │              $121,300                           │      │
│       │         ▲ +$4,200 from last month               │      │
│       └─────────────────────────────────────────────────┘      │
│                                                                 │
│       [Visual: Animated balance scale]                         │
│                                                                 │
│  ═══════════════════════════════════════════════════════════   │
│                                                                 │
│  💡 Insights:                                                  │
│  • Your liquid assets cover 2.1 months of typical expenses    │
│  • Recommendation: Build emergency fund to 6 months           │
│  • Your debt-to-asset ratio is 64% (aim for <50%)             │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  [📄 Export PDF]  [📊 Export CSV]  [📈 View History]          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Quiz/Assessment Styling

```
┌─────────────────────────────────────────────────────────────────┐
│  ✍️ Knowledge Check                              Question 3/10  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  You purchase office supplies for $200 using your business     │
│  credit card. Which accounts are affected?                     │
│                                                                 │
│  ○ A) Cash decreases, Supplies increases                       │
│  ● B) Accounts Payable increases, Supplies Expense increases   │
│  ○ C) Cash decreases, Accounts Payable increases               │
│  ○ D) Supplies increases, Owner's Equity decreases             │
│                                                                 │
│  [Check Answer]                                                 │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ✅ Correct!                                                   │
│                                                                 │
│  When you buy on credit:                                       │
│  • No cash changes hands yet                                   │
│  • You now owe the credit card company (Accounts Payable ↑)    │
│  • You've incurred an expense (Supplies Expense ↑)             │
│                                                                 │
│  [Continue →]                                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| **Keyboard Navigation** | All interactive elements focusable, logical tab order, skip links |
| **Screen Readers** | ARIA labels, live regions for dynamic content, proper heading hierarchy |
| **Color Independence** | Icons + text for all status indicators, not just color |
| **Focus Indicators** | Visible 2px blue outline on all focusable elements |
| **Motion** | Respect `prefers-reduced-motion`, provide toggle in settings |
| **Contrast** | WCAG AA minimum (4.5:1 normal text, 3:1 large text) |
| **Touch Targets** | Minimum 44x44px for all interactive elements |

### Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| **Desktop** (≥1024px) | Sidebar + main content, side-by-side calculator inputs |
| **Tablet** (768-1023px) | Collapsible sidebar, stacked calculator sections |
| **Mobile** (< 768px) | Bottom navigation bar, full-width content, accordion sections |

---

## User Progress & Data

### Comprehensive Data Model

```typescript
// Primary storage interface
interface AccountingPlatformData {
  // User progress
  progress: {
    currentModule: number;
    currentSection: string;
    completedModules: number[];
    moduleProgress: Record<number, ModuleProgress>;
    totalTimeSpent: number; // seconds
    lastVisited: string; // ISO date
    streak: number; // consecutive days
    longestStreak: number;
  };

  // Quiz/assessment results
  assessments: {
    awarenessQuiz: AwarenessQuizResult | null;
    moduleQuizzes: Record<number, QuizResult>;
  };

  // Saved calculator data
  calculatorData: {
    netWorth: NetWorthData | null;
    incomeStatement: IncomeStatementData | null;
    balanceSheet: BalanceSheetData | null;
    budget: BudgetData | null;
    cashFlowForecast: CashFlowData | null;
    loanComparisons: LoanComparisonData[] | null;
  };

  // Historical tracking
  history: {
    netWorthHistory: { date: string; value: number }[];
    budgetHistory: { month: string; planned: number; actual: number }[];
  };

  // User preferences
  preferences: {
    currency: string;
    locale: string;
    darkMode: boolean;
    animationsEnabled: boolean;
    showHints: boolean;
  };
}

interface ModuleProgress {
  sectionsCompleted: string[];
  interactiveToolsUsed: string[];
  quizAttempts: number;
  bestQuizScore: number;
  timeSpent: number;
  completedAt: string | null;
}

// QuizQuestion and QuizResult interfaces defined in Data Architecture section above
```

### Data Persistence Features

- **Auto-save**: All calculator inputs saved on change (debounced 500ms)
- **Session resumption**: "Continue where you left off" on return visits
- **Progress sync**: Module completion triggers progress update
- **Data export**: JSON export of all saved data
- **Data reset**: Clear all data with confirmation modal
- **Offline support**: Full functionality without network connection

### Data Privacy & Security

Since users may enter sensitive financial information, the platform implements the following safeguards:

| Concern | Implementation |
|---------|----------------|
| **Data Location** | All data stored locally in browser localStorage—never transmitted to servers |
| **Transparency** | Clear messaging: "Your financial data stays on your device and is never uploaded" |
| **User Control** | One-click "Clear All Data" with confirmation; JSON export for backup |
| **No Tracking** | No analytics on specific financial values entered—only aggregate usage (module visits, tool usage counts) |
| **Session Security** | Recommend users clear data on shared/public computers |

**UI Implementation:**
- Privacy notice displayed on first visit (dismissible, stored in preferences)
- "Your data is private" indicator in footer
- Settings panel with data management options (view, export, delete)

> **Note**: localStorage is not encrypted. For MVP, this is acceptable as data never leaves the device. Post-MVP cloud sync would require encryption and authentication.

---

## Content Guidelines

### Tone & Voice

| Attribute | Description | Example |
|-----------|-------------|---------|
| **Friendly** | Conversational, not academic | "Think of it like..." not "One must consider..." |
| **Encouraging** | Celebrate small wins | "Great job! You've mastered the accounting equation." |
| **Practical** | Always connect to real life | "Next time you check your bank balance, you're doing accounting!" |
| **Clear** | No unexplained jargon | Define every term before using it |
| **Humble** | Acknowledge complexity | "This can feel tricky at first, but it will click with practice." |

### Content Formatting Standards

**Paragraphs:**
- Maximum 4 sentences per paragraph
- One main idea per paragraph
- Use transition phrases between paragraphs

**Lists:**
- Use bullet points for unordered information
- Use numbered lists only for sequential steps
- Maximum 7 items per list

**Tables:**
- Use for comparisons and structured data
- Always include header row
- Keep to 4 columns maximum

**Code/Examples:**
- Use monospace for all numbers in examples
- Show calculations step-by-step
- Include "check your work" verification

### Content Components

**Definition Card**: First use of any technical term
**Example Box**: Worked examples with step-by-step solutions
**Real-World Scenario**: Extended case studies with discussion
**Key Takeaway**: Essential points to remember (end of sections)
**Try It Yourself**: Prompt before interactive tools
**Common Mistakes**: What to avoid
**Pro Tip**: Advanced insights for motivated learners

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-3)
**Goal**: Core platform with first 3 modules functional

| Task | Priority | Effort |
|------|----------|--------|
| Project setup, Astro + React configuration | P0 | 2d |
| Core layout components (navigation, progress, header) | P0 | 3d |
| Module content framework (MDX integration) | P0 | 2d |
| Module 1 content: Introduction to Accounting | P0 | 2d |
| Module 2 content: The Accounting Equation | P0 | 2d |
| Net Worth Calculator (full-featured) | P0 | 4d |
| Transaction Impact Visualizer | P1 | 3d |
| Basic progress tracking | P0 | 2d |
| Responsive layout (desktop + mobile) | P0 | 2d |

**Deliverable**: Functional platform with Modules 1-2, Net Worth Calculator

### Phase 2: Core Accounting (Weeks 4-6)
**Goal**: Complete Part I (Foundations) + begin Part II

| Task | Priority | Effort |
|------|----------|--------|
| Module 3 content: Double-Entry Bookkeeping | P0 | 3d |
| Bookkeeping Simulator (journal entries, T-accounts) | P0 | 5d |
| Transaction Decoder quiz component | P0 | 3d |
| Module 4 content: Income Statement | P0 | 3d |
| Income Statement Builder | P0 | 4d |
| Profit Margin Analyzer | P1 | 2d |
| Knowledge Check quiz component | P0 | 3d |
| Quiz data persistence | P0 | 1d |

**Deliverable**: Modules 1-4 complete with all interactive tools

### Phase 3: Financial Statements (Weeks 7-9)
**Goal**: Complete Part II (Financial Statements)

| Task | Priority | Effort |
|------|----------|--------|
| Module 5 content: Balance Sheet | P0 | 3d |
| Balance Sheet Builder | P0 | 4d |
| Financial Health Dashboard | P1 | 3d |
| Module 6 content: Cash Flow Statement | P0 | 3d |
| Cash Flow Forecaster | P0 | 4d |
| Chart components (Recharts integration) | P0 | 3d |
| PDF export functionality | P1 | 3d |

**Deliverable**: Modules 1-6 complete with charting and export

### Phase 4: Practical Skills (Weeks 10-12)
**Goal**: Complete Part III (Practical Accounting Skills)

| Task | Priority | Effort |
|------|----------|--------|
| Module 7 content: Budgeting Mastery | P0 | 3d |
| Comprehensive Budget Builder | P0 | 5d |
| Variance Analysis tool | P1 | 2d |
| Module 8 content: Recording & Organizing | P0 | 2d |
| Bank Reconciliation Simulator | P0 | 3d |
| Document Decoder (annotated samples) | P0 | 4d |
| Module 9 content: Loans & Interest | P0 | 2d |
| Loan Comparison Calculator | P0 | 3d |
| Compound Interest Visualizer | P0 | 2d |
| Module 10 content: Cash vs. Accrual | P0 | 2d |
| Method Comparison Simulator | P0 | 3d |

**Deliverable**: Modules 1-10 complete

### Phase 5: Applied Accounting (Weeks 13-14)
**Goal**: Complete Part IV (Applied Accounting) + polish

| Task | Priority | Effort |
|------|----------|--------|
| Module 11 content: Financial Analysis | P0 | 3d |
| Complete Financial Analysis Dashboard | P0 | 4d |
| Business Decision Simulator | P1 | 3d |
| Module 12 content: Compliance & Tax | P0 | 2d |
| Tax Estimation Calculator | P0 | 3d |
| Glossary page implementation | P1 | 2d |
| Resources hub (all downloadables) | P0 | 2d |

**Deliverable**: All 12 modules complete

### Phase 6: Polish & Launch (Weeks 15-16)
**Goal**: Production-ready platform

| Task | Priority | Effort |
|------|----------|--------|
| Comprehensive accessibility audit (WAVE, axe) | P0 | 2d |
| Cross-browser testing (Chrome, Firefox, Safari, Edge) | P0 | 2d |
| Performance optimization (bundle size, lazy loading) | P0 | 2d |
| Animation polish (Framer Motion) | P1 | 2d |
| Mobile experience refinement | P0 | 2d |
| Downloadable templates creation (Excel, PDF) | P0 | 5d |
| Documentation and README | P1 | 1d |
| Bug fixes and QA | P0 | 3d |

> **Note on Templates**: 3 days is insufficient for 15+ professional templates. Revised to 5 days for MVP templates (8 core). Consider outsourcing template design or using existing open-source templates as starting points. Remaining templates can be added incrementally post-launch.

**Deliverable**: Production-ready platform

---

## Success Metrics

### Engagement Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Module completion rate** | >60% complete Module 1 | localStorage progress data |
| **Platform completion rate** | >20% complete all 12 modules | localStorage progress data |
| **Average session duration** | >10 minutes | Time tracking in localStorage |
| **Return visit rate** | >40% return within 7 days | Last visited date tracking |
| **Interactive tool usage** | >80% use at least one calculator | Tool interaction logging |

### Learning Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Quiz pass rate** | >70% score ≥80% on first attempt | Quiz result data |
| **Quiz retry rate** | <30% need multiple attempts | Quiz attempt counting |
| **Concept progression** | Users who complete Module 2 quiz ≥80% should score ≥70% on Module 4 | Cross-module performance |

### Satisfaction Metrics (Future)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **User feedback rating** | >4.0/5.0 average | In-platform feedback form |
| **Recommendation likelihood** | NPS >40 | Survey at platform completion |
| **Feature requests** | Track top requested features | Feedback form analysis |

---

## Downloadable Resources Inventory

### Templates (Excel/Google Sheets)

| Template | Module | Description |
|----------|--------|-------------|
| Personal Net Worth Tracker | 2 | Comprehensive asset/liability tracking with charts |
| General Ledger Template | 3 | T-account format with running balances |
| Journal Entry Log | 3 | Chronological transaction recording |
| Personal Income Statement | 4 | Monthly income/expense tracking |
| Small Business P&L | 4 | Full business income statement |
| Personal Balance Sheet | 5 | Point-in-time financial position |
| Small Business Balance Sheet | 5 | Standard business format |
| Cash Flow Forecast | 6 | 12-month projection template |
| Personal Monthly Budget | 7 | Category-based budget with variance tracking |
| Annual Budget Planner | 7 | Year-at-a-glance budget |
| Zero-Based Budget | 7 | Every-dollar allocation template |
| Expense Tracking Log | 8 | Daily expense recording |
| Bank Reconciliation | 8 | Statement reconciliation worksheet |
| Loan Comparison | 9 | Side-by-side loan analysis |
| Debt Payoff Tracker | 9 | Snowball/avalanche method tracking |

### Reference Cards (PDF)

| Card | Module | Description |
|------|--------|-------------|
| Accounting Terms Glossary | All | Comprehensive term definitions |
| Debit/Credit Rules | 3 | Quick reference for DEALER rule |
| Chart of Accounts Examples | 3 | Sample charts for different entity types |
| Financial Ratio Reference | 5, 11 | All ratios with formulas and interpretations |
| Cash vs. Accrual Guide | 10 | Decision flowchart and comparison |

### Checklists (PDF)

| Checklist | Module | Description |
|-----------|--------|-------------|
| 20 Signs You Need Better Tracking | 1 | Self-assessment checklist |
| Asset Inventory Checklist | 2 | Comprehensive asset categories |
| Document Retention Guide | 8 | What to keep and for how long |
| Monthly Financial Review | 4, 11 | Step-by-step monthly review process |
| Tax Preparation Documents | 12 | What to gather for tax time |

---

## Resolved Design Decisions

| Question | Decision | Rationale |
|----------|----------|-----------|
| Include glossary page? | **Yes** | Essential for beginners; implemented as searchable sidebar + dedicated page |
| Gamification elements? | **Minimal** | Progress tracking and completion badges only; avoid distracting from learning |
| Downloadable templates? | **Yes, comprehensive** | High practical value; see inventory above |
| Multiple currencies? | **Yes, with USD default** | Format numbers according to user preference; store in cents/base units |
| Dark mode for charts? | **Yes, automatic** | Charts use CSS variables that respond to theme |

---

## Future Enhancements (Post-Launch)

| Enhancement | Priority | Description |
|-------------|----------|-------------|
| **User accounts** | P1 | Cloud sync of progress and data |
| **Community features** | P2 | Discussion forums, Q&A |
| **Certificate of completion** | P1 | Downloadable PDF certificate |
| **Advanced modules** | P2 | Inventory accounting, depreciation, payroll |
| **Video content** | P2 | Optional video explanations for each concept |
| **Practice problem sets** | P1 | Additional exercises beyond quizzes |
| **Mobile app** | P3 | Native iOS/Android apps |
| **API for banks** | P3 | Connect real bank data (Plaid integration) |

---

## References

### Internal

- `@/GUIDELINE.md` - Design system reference
- `@/src/tools/economic-sim/` - Reference implementation pattern (note: accounting platform is more comprehensive)

### External

- Khan Academy Accounting - Content inspiration, pedagogical approach
- Accounting Coach - Beginner resources, explanation styles
- Investopedia - Definition accuracy
- FASB/GAAP - Technical accuracy for standards
- WCAG 2.1 - Accessibility guidelines

---

## Appendix A: Sample Content

### Module 2, Section 2.1: The Accounting Equation (Full Sample)

```mdx
## 2.1 The Foundation of All Accounting

Every accounting system ever created—from ancient Mesopotamian clay tablets to
modern enterprise software—rests on one elegant equation:

<DefinitionCard term="The Accounting Equation">
  **Assets = Liabilities + Owner's Equity**
</DefinitionCard>

This isn't just a formula to memorize for a test. It's a fundamental truth about
how value works in our world.

### Understanding Each Component

Let's break down what each piece means:

<Tabs defaultValue="assets">
  <Tab value="assets" label="Assets">
    **Assets** are resources with economic value that you own or have the right to use.

    Think of assets as "things that could become money" or "things that help you
    make money."

    | Type | Personal Examples | Business Examples |
    |------|-------------------|-------------------|
    | **Current** (can convert to cash within 1 year) | Checking account, savings | Cash, inventory, receivables |
    | **Fixed** (long-term) | Home, car | Equipment, buildings |
    | **Intangible** | — | Patents, trademarks |
  </Tab>

  <Tab value="liabilities" label="Liabilities">
    **Liabilities** are obligations—money you owe to others.

    Think of liabilities as "promises to pay" that you've made.

    | Type | Personal Examples | Business Examples |
    |------|-------------------|-------------------|
    | **Current** (due within 1 year) | Credit card balance | Accounts payable |
    | **Long-term** | Mortgage, student loans | Bank loans, bonds |
  </Tab>

  <Tab value="equity" label="Owner's Equity">
    **Owner's Equity** is what remains after subtracting liabilities from assets.

    For individuals, we usually call this **net worth**.

    For businesses: **Owner's Equity = Initial Investment + Retained Earnings**
  </Tab>
</Tabs>

### Why Does the Equation Always Balance?

Here's the key insight: **Every asset came from somewhere.**

If you have $10,000 in your bank account, that money either:
- Came from debt (a loan = liability), OR
- Came from your own resources (savings, earnings = equity)

There's no third option. This is why the equation always balances.

<ExampleBox title="Real-Life Example: Buying a Home">
  Sarah buys a $300,000 home with a $60,000 down payment and a $240,000 mortgage.

  **Before the purchase:**
  - Assets: $60,000 (cash)
  - Liabilities: $0
  - Equity: $60,000
  - Check: $60,000 = $0 + $60,000 ✓

  **After the purchase:**
  - Assets: $300,000 (home)
  - Liabilities: $240,000 (mortgage)
  - Equity: $60,000 (unchanged)
  - Check: $300,000 = $240,000 + $60,000 ✓

  Sarah's equity (net worth) stayed the same—she just converted cash into home equity.
</ExampleBox>

<KeyTakeaway>
  The accounting equation isn't just a formula—it's a fundamental truth about
  how value works. Everything you own (assets) was either financed by debt
  (liabilities) or is truly yours (equity).
</KeyTakeaway>

<TryItYourself>
  Use the Net Worth Calculator below to see your personal accounting equation
  in action. Enter your assets and liabilities, and watch the equation balance
  in real-time.
</TryItYourself>

<NetWorthCalculator />
```

---

## Revision History

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 2026-01-11 | 1.0 | — | Initial specification draft |
| 2026-01-11 | 2.0 | — | Expanded to comprehensive platform specification with 12 modules, detailed interactive tools, implementation roadmap, and full content guidelines |
