import type { QuizQuestion } from '../../types';

export const module08Quiz: QuizQuestion[] = [
  {
    id: 'm8-q1',
    type: 'multiple-choice',
    question: 'Kant said that Hume\'s skepticism did what to him?',
    options: [
      'Put him to sleep',
      'Awakened him from dogmatic slumber',
      'Made him abandon philosophy',
      'Proved him right',
    ],
    correctAnswer: 1,
    explanation: 'Kant famously said that reading Hume "awakened him from his dogmatic slumber" and led him to develop his critical philosophy.',
    difficulty: 'easy',
  },
  {
    id: 'm8-q2',
    type: 'multiple-choice',
    question: 'What is the categorical imperative?',
    options: [
      'A scientific law',
      'A universal moral principle based on duty',
      'A suggestion for good behavior',
      'A religious commandment',
    ],
    correctAnswer: 1,
    explanation: 'The categorical imperative is Kant\'s supreme moral principle: act only according to rules you could will to be universal laws.',
    difficulty: 'medium',
  },
  {
    id: 'm8-q3',
    type: 'multiple-choice',
    question: 'According to Kant, what are phenomena?',
    options: [
      'Things as they are in themselves',
      'Things as they appear to us',
      'Illusions',
      'Pure concepts',
    ],
    correctAnswer: 1,
    explanation: 'Phenomena are things as they appear to us, shaped by our cognitive faculties. We cannot know things-in-themselves (noumena).',
    difficulty: 'medium',
  },
  {
    id: 'm8-q4',
    type: 'multiple-choice',
    question: 'How did Kant try to resolve the rationalism vs. empiricism debate?',
    options: [
      'He rejected both completely',
      'He sided with the rationalists',
      'He argued that both reason and experience are necessary for knowledge',
      'He proved empiricism correct',
    ],
    correctAnswer: 2,
    explanation: 'Kant argued that while knowledge begins with experience, the mind actively structures that experience through innate categories and concepts.',
    difficulty: 'medium',
  },
  {
    id: 'm8-q5',
    type: 'multiple-choice',
    question: 'What does it mean to treat someone as an "end in themselves"?',
    options: [
      'To use them for your purposes',
      'To respect their inherent dignity and rational agency',
      'To ignore them',
      'To put them last',
    ],
    correctAnswer: 1,
    explanation: 'Kant\'s second formulation of the categorical imperative says we must treat humanity, in ourselves and others, always as an end and never merely as a means.',
    difficulty: 'easy',
  },
];
