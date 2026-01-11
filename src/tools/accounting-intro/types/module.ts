export interface Module {
  id: number;
  title: string;
  shortTitle: string;
  part: number;
  partTitle: string;
  description: string;
  estimatedTime: number;
  objectives: string[];
  sections: ModuleSection[];
}

export interface ModuleSection {
  id: string;
  title: string;
  type: 'content' | 'interactive' | 'quiz' | 'resources';
}

export interface ModuleProgress {
  moduleId: number;
  sectionsCompleted: string[];
  quizCompleted: boolean;
  quizScore: number | null;
  timeSpent: number;
  lastAccessed: string;
}

export const MODULES: Module[] = [
  {
    id: 1,
    title: 'Introduction to Accounting',
    shortTitle: 'Introduction',
    part: 1,
    partTitle: 'Foundations of Accounting',
    description: 'Discover what accounting is, why it matters, and how you already use it in daily life.',
    estimatedTime: 30,
    objectives: [
      'Define accounting and explain its purpose in personal and business contexts',
      'Distinguish between financial accounting, managerial accounting, and tax accounting',
      'Recognize how accounting information is used in daily decision-making',
      'Understand the role of accounting standards and why they matter',
    ],
    sections: [
      { id: '1.1', title: 'What is Accounting?', type: 'content' },
      { id: '1.2', title: 'The Accounting Cycle Overview', type: 'content' },
      { id: '1.3', title: 'Personal Finance Awareness Assessment', type: 'interactive' },
      { id: '1.4', title: 'The Coffee Shop Decision', type: 'content' },
      { id: '1.5', title: 'Knowledge Check', type: 'quiz' },
      { id: '1.6', title: 'Resources', type: 'resources' },
    ],
  },
  {
    id: 2,
    title: 'The Accounting Equation',
    shortTitle: 'Accounting Equation',
    part: 1,
    partTitle: 'Foundations of Accounting',
    description: 'Master the fundamental equation that underlies all accounting: Assets = Liabilities + Equity.',
    estimatedTime: 45,
    objectives: [
      'State and explain the fundamental accounting equation',
      'Define assets, liabilities, and equity with examples',
      'Calculate personal net worth using the accounting equation',
      'Understand how every transaction maintains the equation balance',
      'Apply the equation to analyze simple business scenarios',
    ],
    sections: [
      { id: '2.1', title: 'The Foundation of All Accounting', type: 'content' },
      { id: '2.2', title: 'The Equation Always Balances', type: 'content' },
      { id: '2.3', title: 'Net Worth Calculator', type: 'interactive' },
      { id: '2.4', title: 'Transaction Impact Visualizer', type: 'interactive' },
      { id: '2.5', title: 'First-Time Home Buyer Scenario', type: 'content' },
      { id: '2.6', title: 'Knowledge Check', type: 'quiz' },
      { id: '2.7', title: 'Resources', type: 'resources' },
    ],
  },
  {
    id: 3,
    title: 'Double-Entry Bookkeeping & The General Ledger',
    shortTitle: 'Double-Entry',
    part: 1,
    partTitle: 'Foundations of Accounting',
    description: 'Learn the universal standard of double-entry bookkeeping and how to record transactions.',
    estimatedTime: 60,
    objectives: [
      'Explain why double-entry bookkeeping is the universal standard',
      'Define debits and credits correctly for each account type',
      'Record transactions using proper journal entry format',
      'Understand the structure and purpose of a general ledger',
      'Post journal entries to T-accounts',
      'Identify and correct common recording errors',
    ],
    sections: [
      { id: '3.1', title: 'The Genius of Double-Entry', type: 'content' },
      { id: '3.2', title: 'The Chart of Accounts', type: 'content' },
      { id: '3.3', title: 'Journal Entries', type: 'content' },
      { id: '3.4', title: 'The General Ledger', type: 'content' },
      { id: '3.5', title: 'Bookkeeping Simulator', type: 'interactive' },
      { id: '3.6', title: 'Transaction Decoder', type: 'interactive' },
      { id: '3.7', title: 'Knowledge Check', type: 'quiz' },
      { id: '3.8', title: 'Resources', type: 'resources' },
    ],
  },
  {
    id: 4,
    title: 'The Income Statement (Profit & Loss)',
    shortTitle: 'Income Statement',
    part: 2,
    partTitle: 'Financial Statements',
    description: 'Understand how income statements reveal profitability over time.',
    estimatedTime: 45,
    objectives: [
      'Explain the purpose and structure of an income statement',
      'Distinguish between different types of revenue and expenses',
      'Calculate gross profit, operating income, and net income',
      'Analyze income statement ratios (profit margins)',
      'Create a personal or small business income statement',
      'Interpret income statements to make financial decisions',
    ],
    sections: [
      { id: '4.1', title: 'Understanding the Income Statement', type: 'content' },
      { id: '4.2', title: 'Personal Income Statement', type: 'content' },
      { id: '4.3', title: 'Analyzing Profitability', type: 'content' },
      { id: '4.4', title: 'Income Statement Builder', type: 'interactive' },
      { id: '4.5', title: 'Profit Margin Analyzer', type: 'interactive' },
      { id: '4.6', title: 'The Struggling Restaurant', type: 'content' },
      { id: '4.7', title: 'Knowledge Check', type: 'quiz' },
      { id: '4.8', title: 'Resources', type: 'resources' },
    ],
  },
  {
    id: 5,
    title: 'The Balance Sheet',
    shortTitle: 'Balance Sheet',
    part: 2,
    partTitle: 'Financial Statements',
    description: 'Learn to read and create balance sheets that show financial position at a point in time.',
    estimatedTime: 45,
    objectives: [
      'Explain the purpose and structure of a balance sheet',
      'Classify items as current vs. non-current assets/liabilities',
      'Understand shareholders equity components',
      'Analyze balance sheet ratios (liquidity, solvency)',
      'Read and interpret real balance sheets',
      'Create a personal balance sheet',
    ],
    sections: [
      { id: '5.1', title: 'The Financial Snapshot', type: 'content' },
      { id: '5.2', title: 'Key Balance Sheet Ratios', type: 'content' },
      { id: '5.3', title: 'Balance Sheet Builder', type: 'interactive' },
      { id: '5.4', title: 'Financial Health Dashboard', type: 'interactive' },
      { id: '5.5', title: 'Knowledge Check', type: 'quiz' },
      { id: '5.6', title: 'Resources', type: 'resources' },
    ],
  },
  {
    id: 6,
    title: 'The Cash Flow Statement',
    shortTitle: 'Cash Flow',
    part: 2,
    partTitle: 'Financial Statements',
    description: 'Discover why cash is king and how to track where money actually goes.',
    estimatedTime: 45,
    objectives: [
      'Explain why profitable businesses can run out of cash',
      'Distinguish between the three sections of cash flow statements',
      'Calculate cash flows from operations using indirect method',
      'Analyze cash flow patterns to assess business health',
      'Apply cash flow concepts to personal finance',
    ],
    sections: [
      { id: '6.1', title: 'Cash is King', type: 'content' },
      { id: '6.2', title: 'Three Sections of Cash Flow', type: 'content' },
      { id: '6.3', title: 'Cash Flow Forecaster', type: 'interactive' },
      { id: '6.4', title: 'The Cash Crunch', type: 'content' },
      { id: '6.5', title: 'Knowledge Check', type: 'quiz' },
      { id: '6.6', title: 'Resources', type: 'resources' },
    ],
  },
];

export const PARTS = [
  { id: 1, title: 'Foundations of Accounting', modules: [1, 2, 3] },
  { id: 2, title: 'Financial Statements', modules: [4, 5, 6] },
];
