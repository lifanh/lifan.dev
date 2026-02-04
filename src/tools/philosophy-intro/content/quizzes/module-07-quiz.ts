import type { QuizQuestion } from '../../types';

export const module07Quiz: QuizQuestion[] = [
  {
    id: 'm7-q1',
    type: 'multiple-choice',
    question: 'What is Locke\'s "tabula rasa" theory?',
    options: [
      'The mind has innate ideas',
      'The mind starts as a blank slate, filled by experience',
      'Reality is an illusion',
      'Knowledge is impossible',
    ],
    correctAnswer: 1,
    explanation: 'Locke argued that the mind at birth is a "tabula rasa" (blank slate), and all our ideas come from sensory experience.',
    difficulty: 'easy',
  },
  {
    id: 'm7-q2',
    type: 'multiple-choice',
    question: 'Berkeley\'s idealism claims that:',
    options: [
      'Ideas are the only reality; material objects exist only as perceptions',
      'Reality is completely material',
      'Both mind and matter exist independently',
      'We can never know anything',
    ],
    correctAnswer: 0,
    explanation: 'Berkeley argued "to be is to be perceived" - physical objects have no existence independent of being perceived by minds.',
    difficulty: 'medium',
  },
  {
    id: 'm7-q3',
    type: 'multiple-choice',
    question: 'What did Hume argue about causation?',
    options: [
      'Causation is proven by science',
      'We never observe causation, only constant conjunction of events',
      'Everything has a cause',
      'Causation is created by God',
    ],
    correctAnswer: 1,
    explanation: 'Hume argued we never actually perceive causation itself, only that one event regularly follows another (constant conjunction). Causation is a habit of mind.',
    difficulty: 'medium',
  },
  {
    id: 'm7-q4',
    type: 'multiple-choice',
    question: 'Empiricists generally reject the idea of:',
    options: [
      'Sensory experience',
      'Innate ideas',
      'Scientific method',
      'Logic',
    ],
    correctAnswer: 1,
    explanation: 'Empiricists argue against innate ideas (ideas we are born with), claiming all knowledge derives from sensory experience.',
    difficulty: 'easy',
  },
  {
    id: 'm7-q5',
    type: 'multiple-choice',
    question: 'Hume\'s problem of induction questions whether:',
    options: [
      'Deductive reasoning is valid',
      'We can justify believing the future will resemble the past',
      'Mathematical truths are certain',
      'Morality is objective',
    ],
    correctAnswer: 1,
    explanation: 'Hume pointed out that we cannot rationally justify our belief that the future will be like the past (the basis of all scientific prediction).',
    difficulty: 'hard',
  },
];
