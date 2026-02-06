import type { QuizQuestion } from '../../types';

export const module02Quiz: QuizQuestion[] = [
  {
    id: 'm2-q1',
    type: 'multiple-choice',
    question: 'What is the Socratic method primarily characterized by?',
    options: [
      'Giving long lectures on philosophy',
      'Asking probing questions to examine beliefs',
      'Writing detailed philosophical texts',
      'Conducting scientific experiments',
    ],
    correctAnswer: 1,
    explanation: 'The Socratic method involves asking a series of questions to stimulate critical thinking and expose contradictions in one\'s beliefs.',
    difficulty: 'easy',
  },
  {
    id: 'm2-q2',
    type: 'multiple-choice',
    question: 'What did Socrates mean by "I know that I know nothing"?',
    options: [
      'He was uneducated',
      'True wisdom begins with recognizing our ignorance',
      'Knowledge is impossible to attain',
      'He was being modest',
    ],
    correctAnswer: 1,
    explanation: 'Socrates believed that recognizing the limits of one\'s knowledge is the beginning of wisdom. He was wiser than others because he knew he didn\'t know.',
    difficulty: 'medium',
  },
  {
    id: 'm2-q3',
    type: 'multiple-choice',
    question: 'Socrates was charged with which of the following crimes?',
    options: [
      'Theft and fraud',
      'Corrupting the youth and impiety',
      'Treason against Athens',
      'Practicing medicine without a license',
    ],
    correctAnswer: 1,
    explanation: 'Socrates was charged with corrupting the youth of Athens and not believing in the gods of the city (impiety).',
    difficulty: 'easy',
  },
  {
    id: 'm2-q4',
    type: 'multiple-choice',
    question: 'According to Socrates, how is virtue related to knowledge?',
    options: [
      'They are unrelated',
      'Virtue is knowledge; no one does wrong knowingly',
      'Knowledge prevents virtue',
      'Virtue comes from faith, not knowledge',
    ],
    correctAnswer: 1,
    explanation: 'Socrates believed that virtue is a form of knowledge. If someone truly knows what is good, they will do it. Wrongdoing is a result of ignorance.',
    difficulty: 'medium',
  },
  {
    id: 'm2-q5',
    type: 'multiple-choice',
    question: 'Why did Socrates accept his death sentence rather than escape?',
    options: [
      'He was too old to run',
      'He believed in obeying the laws of Athens',
      'His friends refused to help him',
      'He wanted to become a martyr',
    ],
    correctAnswer: 1,
    explanation: 'Socrates believed that as a citizen who benefited from Athens\' laws, he had an obligation to accept their judgment, even if unjust.',
    difficulty: 'medium',
  },
];
