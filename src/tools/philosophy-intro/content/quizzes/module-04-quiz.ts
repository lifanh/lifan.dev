import type { QuizQuestion } from '../../types';

export const module04Quiz: QuizQuestion[] = [
  {
    id: 'm4-q1',
    type: 'multiple-choice',
    question: 'How did Aristotle\'s view of universals differ from Plato\'s?',
    options: [
      'Aristotle denied that universals exist',
      'Aristotle believed universals exist in particular things, not a separate realm',
      'Aristotle agreed completely with Plato',
      'Aristotle believed only universals exist',
    ],
    correctAnswer: 1,
    explanation: 'Unlike Plato, Aristotle believed that universals (forms) exist within particular things themselves, not in a separate realm of Forms.',
    difficulty: 'medium',
  },
  {
    id: 'm4-q2',
    type: 'multiple-choice',
    question: 'What are Aristotle\'s four causes?',
    options: [
      'Earth, water, fire, air',
      'Material, formal, efficient, final',
      'Physical, mental, spiritual, divine',
      'Past, present, future, eternal',
    ],
    correctAnswer: 1,
    explanation: 'Aristotle\'s four causes explain why something exists: material (what it\'s made of), formal (its shape/essence), efficient (what made it), and final (its purpose).',
    difficulty: 'easy',
  },
  {
    id: 'm4-q3',
    type: 'multiple-choice',
    question: 'According to Aristotle\'s virtue ethics, virtue is:',
    options: [
      'Following divine commands',
      'A mean between extremes',
      'Always doing what makes you happy',
      'Obeying the law',
    ],
    correctAnswer: 1,
    explanation: 'Aristotle taught that virtue is a "golden mean" between two extremes. For example, courage is the mean between cowardice and recklessness.',
    difficulty: 'easy',
  },
  {
    id: 'm4-q4',
    type: 'multiple-choice',
    question: 'What did Aristotle consider the highest human good (eudaimonia)?',
    options: [
      'Wealth',
      'Pleasure',
      'Flourishing through virtuous activity',
      'Fame',
    ],
    correctAnswer: 2,
    explanation: 'Eudaimonia (often translated as happiness or flourishing) is achieved through living virtuously and realizing one\'s full potential as a rational being.',
    difficulty: 'medium',
  },
  {
    id: 'm4-q5',
    type: 'multiple-choice',
    question: 'Aristotle developed the system of logic based on:',
    options: [
      'Mathematical proofs',
      'Syllogisms',
      'Empirical observation only',
      'Divine revelation',
    ],
    correctAnswer: 1,
    explanation: 'Aristotle created formal logic based on syllogisms, which are arguments with two premises and a conclusion (e.g., All men are mortal; Socrates is a man; therefore Socrates is mortal).',
    difficulty: 'easy',
  },
];
