import type { QuizQuestion } from '../../types';

export const module03Quiz: QuizQuestion[] = [
  {
    id: 'm3-q1',
    type: 'multiple-choice',
    question: 'According to Plato\'s Theory of Forms, what are Forms?',
    options: [
      'Physical objects in the world',
      'Perfect, eternal, unchanging templates of things',
      'Human inventions and concepts',
      'Religious symbols',
    ],
    correctAnswer: 1,
    explanation: 'Forms are perfect, eternal, and unchanging templates or essences that exist in a realm beyond the physical world. Physical objects are imperfect copies of these Forms.',
    difficulty: 'medium',
  },
  {
    id: 'm3-q2',
    type: 'multiple-choice',
    question: 'In the Allegory of the Cave, what do the shadows on the wall represent?',
    options: [
      'The Forms',
      'The physical world as we perceive it',
      'True knowledge',
      'The soul',
    ],
    correctAnswer: 1,
    explanation: 'The shadows represent our ordinary perception of the physical world, which is only an imperfect reflection of true reality (the Forms).',
    difficulty: 'easy',
  },
  {
    id: 'm3-q3',
    type: 'multiple-choice',
    question: 'What does the sun represent in the Allegory of the Cave?',
    options: [
      'Physical light',
      'The Form of the Good',
      'The visible world',
      'Religious faith',
    ],
    correctAnswer: 1,
    explanation: 'The sun represents the Form of the Good, the highest Form that illuminates all other Forms and makes knowledge possible.',
    difficulty: 'medium',
  },
  {
    id: 'm3-q4',
    type: 'multiple-choice',
    question: 'In Plato\'s Republic, who should rule the ideal state?',
    options: [
      'The wealthy',
      'The military',
      'Philosopher-kings',
      'The common people',
    ],
    correctAnswer: 2,
    explanation: 'Plato believed that philosopher-kings should rule because only those who understand the Forms, especially the Form of the Good, can govern justly.',
    difficulty: 'easy',
  },
  {
    id: 'm3-q5',
    type: 'multiple-choice',
    question: 'How did Plato distinguish between knowledge and opinion?',
    options: [
      'Knowledge is about the physical world; opinion is about the Forms',
      'Knowledge is about Forms; opinion is about the changing physical world',
      'There is no difference between them',
      'Knowledge comes from the senses; opinion from reason',
    ],
    correctAnswer: 1,
    explanation: 'Plato believed that true knowledge (episteme) is only possible of the eternal Forms, while opinion (doxa) is what we have about the changing physical world.',
    difficulty: 'medium',
  },
];
