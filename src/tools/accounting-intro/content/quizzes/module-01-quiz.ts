import type { QuizQuestion } from '../../types';

export const module01Quiz: QuizQuestion[] = [
  {
    id: 'm1-q1',
    type: 'multiple-choice',
    question: 'What is the primary purpose of accounting?',
    options: [
      'To make businesses look profitable',
      'To record, classify, summarize, and interpret financial transactions',
      'To calculate taxes only',
      'To create complicated spreadsheets',
    ],
    correctAnswer: 1,
    explanation: 'Accounting is the systematic process of recording, classifying, summarizing, and interpreting financial transactions to provide useful information for decision-making.',
    difficulty: 'easy',
  },
  {
    id: 'm1-q2',
    type: 'multiple-choice',
    question: 'Which branch of accounting focuses on external reporting and standardized statements?',
    options: [
      'Tax Accounting',
      'Managerial Accounting',
      'Financial Accounting',
      'Cost Accounting',
    ],
    correctAnswer: 2,
    explanation: 'Financial Accounting focuses on external reporting using standardized statements for investors, creditors, and regulators.',
    difficulty: 'easy',
  },
  {
    id: 'm1-q3',
    type: 'multiple-choice',
    question: 'Who primarily uses managerial accounting information?',
    options: [
      'The IRS and tax authorities',
      'External investors and creditors',
      'Internal managers and business owners',
      'The general public',
    ],
    correctAnswer: 2,
    explanation: 'Managerial Accounting is used internally by managers and business owners for decision-making and cost analysis.',
    difficulty: 'easy',
  },
  {
    id: 'm1-q4',
    type: 'multiple-choice',
    question: 'Why are accounting standards (like GAAP) important?',
    options: [
      'They make accounting more complicated',
      'They ensure consistency so financial information is comparable across companies',
      'They are only required for large corporations',
      'They eliminate the need for accountants',
    ],
    correctAnswer: 1,
    explanation: 'Accounting standards ensure consistency and comparability. When you read different companies\' financial statements, you can trust that terms like "revenue" mean the same thing.',
    difficulty: 'medium',
  },
  {
    id: 'm1-q5',
    type: 'multiple-choice',
    question: 'Which of the following is an example of using accounting in daily life?',
    options: [
      'Checking your bank balance before a purchase',
      'Reading a novel',
      'Watching television',
      'Going for a walk',
    ],
    correctAnswer: 0,
    explanation: 'Checking your bank balance before making a purchase is an informal application of accounting principles—you\'re assessing your financial position before a transaction.',
    difficulty: 'easy',
  },
];
