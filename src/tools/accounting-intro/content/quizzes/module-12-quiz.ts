import type { QuizQuestion } from '../../types/quiz';

export const module12Quiz: QuizQuestion[] = [
  {
    id: 'mod12-q1',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is the primary purpose of GAAP (Generally Accepted Accounting Principles)?',
    options: [
      'To calculate taxes owed',
      'To provide a consistent framework for financial reporting',
      'To maximize business profits',
      'To reduce accounting fees'
    ],
    correctAnswer: 1,
    explanation: 'GAAP provides a standardized framework for financial reporting, ensuring consistency and comparability across companies and industries.'
  },
  {
    id: 'mod12-q2',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'What is the difference between tax avoidance and tax evasion?',
    options: [
      'They are the same thing',
      'Tax avoidance is legal; tax evasion is illegal',
      'Tax evasion is legal; tax avoidance is illegal',
      'Both are illegal but tax evasion is worse'
    ],
    correctAnswer: 1,
    explanation: 'Tax avoidance uses legal methods to minimize tax liability (like deductions and credits). Tax evasion involves illegal methods like hiding income or falsifying records.'
  },
  {
    id: 'mod12-q3',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is a W-2 form used for in the United States?',
    options: [
      'Reporting business income',
      'Reporting employee wages and taxes withheld',
      'Claiming tax deductions',
      'Paying quarterly estimated taxes'
    ],
    correctAnswer: 1,
    explanation: 'A W-2 form reports wages earned and taxes withheld by an employer. Employees receive it annually and use it to file their tax returns.'
  },
  {
    id: 'mod12-q4',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is the standard deduction?',
    options: [
      'A fixed amount all taxpayers must pay',
      'A reduction in taxable income available to all taxpayers',
      'The amount withheld from each paycheck',
      'The fee for filing taxes'
    ],
    correctAnswer: 1,
    explanation: 'The standard deduction is a fixed dollar amount that reduces your taxable income. You can take it instead of itemizing individual deductions.'
  },
  {
    id: 'mod12-q5',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'What is the purpose of quarterly estimated tax payments?',
    options: [
      'To pay for health insurance',
      'To pay income tax throughout the year when taxes are not withheld',
      'To pay property taxes',
      'To contribute to a retirement account'
    ],
    correctAnswer: 1,
    explanation: 'Quarterly estimated taxes are paid by self-employed individuals and others who don\'t have taxes withheld from their income. This prevents a large tax bill at year-end.'
  },
  {
    id: 'mod12-q6',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is the purpose of an audit?',
    options: [
      'To calculate the amount of taxes owed',
      'To verify the accuracy and completeness of financial records',
      'To prepare financial statements',
      'To set next year\'s budget'
    ],
    correctAnswer: 1,
    explanation: 'An audit examines and verifies financial records for accuracy, completeness, and compliance with accounting standards and regulations.'
  },
  {
    id: 'mod12-q7',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'What is the difference between a tax deduction and a tax credit?',
    options: [
      'They are different terms for the same thing',
      'A deduction reduces taxable income; a credit directly reduces taxes owed',
      'A credit reduces taxable income; a deduction directly reduces taxes owed',
      'Deductions are for businesses; credits are for individuals'
    ],
    correctAnswer: 1,
    explanation: 'A tax deduction reduces your taxable income (saving you money at your tax rate). A tax credit directly reduces your tax bill dollar-for-dollar, making credits generally more valuable.'
  },
  {
    id: 'mod12-q8',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'How long should you generally keep tax records?',
    options: [
      '1 year',
      '3 years',
      'At least 7 years',
      'Forever'
    ],
    correctAnswer: 2,
    explanation: 'The IRS recommends keeping tax records for at least 7 years. This covers the 3-year statute of limitations for audits, plus extra time for special circumstances like unreported income.'
  },
  {
    id: 'mod12-q9',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is a 1099 form used for?',
    options: [
      'Reporting employee wages',
      'Reporting non-employee income like freelance work or interest',
      'Filing for a tax extension',
      'Reporting business expenses'
    ],
    correctAnswer: 1,
    explanation: 'A 1099 form reports various types of non-employee income including freelance/contract work (1099-NEC), interest (1099-INT), dividends (1099-DIV), and more.'
  },
  {
    id: 'mod12-q10',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'What are internal controls?',
    options: [
      'Government regulations for businesses',
      'Policies and procedures to safeguard assets and ensure accurate records',
      'Tax preparation software features',
      'Employee performance reviews'
    ],
    correctAnswer: 1,
    explanation: 'Internal controls are policies, procedures, and practices designed to safeguard assets, prevent fraud, ensure accurate financial records, and promote operational efficiency.'
  },
  {
    id: 'mod12-q11',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is the filing deadline for personal income taxes in the United States?',
    options: [
      'January 15',
      'March 31',
      'April 15',
      'December 31'
    ],
    correctAnswer: 2,
    explanation: 'The standard deadline for filing personal income tax returns in the U.S. is April 15. If it falls on a weekend or holiday, the deadline moves to the next business day.'
  },
  {
    id: 'mod12-q12',
    type: 'multiple-choice',
    difficulty: 'hard',
    question: 'What is the purpose of segregation of duties in internal controls?',
    options: [
      'To ensure everyone has equal work',
      'To prevent fraud by requiring multiple people for sensitive transactions',
      'To reduce training costs',
      'To speed up transaction processing'
    ],
    correctAnswer: 1,
    explanation: 'Segregation of duties prevents fraud and errors by ensuring no single person controls all aspects of a financial transaction. For example, one person authorizes, another records, and another reconciles.'
  }
];
