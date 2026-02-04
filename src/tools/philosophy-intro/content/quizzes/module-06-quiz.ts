import type { QuizQuestion } from '../../types';

export const module06Quiz: QuizQuestion[] = [
  {
    id: 'm6-q1',
    type: 'multiple-choice',
    question: 'What was Descartes\' method of doubt designed to achieve?',
    options: [
      'To prove nothing can be known',
      'To find a foundation of certain knowledge',
      'To criticize the Church',
      'To support scientific theories',
    ],
    correctAnswer: 1,
    explanation: 'Descartes used systematic doubt to strip away all uncertain beliefs and find something absolutely certain that could serve as a foundation for knowledge.',
    difficulty: 'medium',
  },
  {
    id: 'm6-q2',
    type: 'multiple-choice',
    question: 'What does "Cogito ergo sum" mean?',
    options: [
      'Knowledge is power',
      'I think, therefore I am',
      'God exists',
      'The world is real',
    ],
    correctAnswer: 1,
    explanation: '"Cogito ergo sum" means "I think, therefore I am." Descartes concluded that even if deceived about everything, the fact that he thinks proves he exists.',
    difficulty: 'easy',
  },
  {
    id: 'm6-q3',
    type: 'multiple-choice',
    question: 'What is the mind-body problem that Descartes\' philosophy raises?',
    options: [
      'Whether the body can exist without food',
      'How mental and physical substances interact',
      'Whether the mind can read other minds',
      'How to keep the body healthy',
    ],
    correctAnswer: 1,
    explanation: 'Descartes\' dualism (mind and body as separate substances) raises the question of how two fundamentally different things can interact with each other.',
    difficulty: 'medium',
  },
  {
    id: 'm6-q4',
    type: 'multiple-choice',
    question: 'Rationalists believe that knowledge primarily comes from:',
    options: [
      'Sensory experience',
      'Reason and innate ideas',
      'Divine revelation',
      'Experimentation',
    ],
    correctAnswer: 1,
    explanation: 'Rationalists like Descartes believed that the most important knowledge comes from reason and that some ideas are innate (present from birth).',
    difficulty: 'easy',
  },
  {
    id: 'm6-q5',
    type: 'multiple-choice',
    question: 'The evil demon hypothesis in Descartes\' Meditations suggests:',
    options: [
      'Demons are real',
      'We cannot trust our senses or reasoning because we might be deceived',
      'God is actually evil',
      'Science is unreliable',
    ],
    correctAnswer: 1,
    explanation: 'The evil demon is a thought experiment: even if a powerful deceiver tricks us about everything, we can still be certain we exist (as thinking things).',
    difficulty: 'medium',
  },
];
