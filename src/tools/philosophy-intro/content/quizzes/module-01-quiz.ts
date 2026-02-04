import type { QuizQuestion } from '../../types';

export const module01Quiz: QuizQuestion[] = [
  {
    id: 'm1-q1',
    type: 'multiple-choice',
    question: 'What does the word "philosophy" literally mean in Greek?',
    options: [
      'Study of nature',
      'Love of wisdom',
      'Search for truth',
      'Way of life',
    ],
    correctAnswer: 1,
    explanation: 'Philosophy comes from the Greek words "philos" (love) and "sophia" (wisdom), meaning "love of wisdom."',
    difficulty: 'easy',
  },
  {
    id: 'm1-q2',
    type: 'multiple-choice',
    question: 'Which philosopher is credited with being the first to seek natural explanations for phenomena?',
    options: [
      'Socrates',
      'Plato',
      'Thales of Miletus',
      'Aristotle',
    ],
    correctAnswer: 2,
    explanation: 'Thales of Miletus (c. 624-546 BCE) is considered the first philosopher because he sought natural rather than mythological explanations for the world.',
    difficulty: 'easy',
  },
  {
    id: 'm1-q3',
    type: 'multiple-choice',
    question: 'What was Heraclitus famous for saying about the nature of reality?',
    options: [
      'Everything is made of atoms',
      'Everything is one',
      'Everything flows (panta rhei)',
      'Everything is illusion',
    ],
    correctAnswer: 2,
    explanation: 'Heraclitus believed that change is the fundamental nature of reality, famously stating "panta rhei" (everything flows) and that you cannot step into the same river twice.',
    difficulty: 'medium',
  },
  {
    id: 'm1-q4',
    type: 'multiple-choice',
    question: 'Parmenides argued that change is:',
    options: [
      'The most fundamental aspect of reality',
      'An illusion because reality is unchanging',
      'Caused by the gods',
      'Only possible in the physical world',
    ],
    correctAnswer: 1,
    explanation: 'Parmenides argued that change is impossible and illusory, and that "What Is" must be eternal, unchanging, and one.',
    difficulty: 'medium',
  },
  {
    id: 'm1-q5',
    type: 'multiple-choice',
    question: 'What major shift did the Pre-Socratic philosophers represent?',
    options: [
      'From polytheism to monotheism',
      'From mythological to rational explanation',
      'From oral to written tradition',
      'From Eastern to Western thought',
    ],
    correctAnswer: 1,
    explanation: 'The Pre-Socratics marked a crucial shift from explaining the world through myths and gods to seeking rational, natural explanations for phenomena.',
    difficulty: 'easy',
  },
];
