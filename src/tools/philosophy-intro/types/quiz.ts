export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  relatedConcept?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: QuizAnswer[];
  completedAt: string;
  timeSpent: number;
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string | number;
  correct: boolean;
}

export interface Quiz {
  moduleId: number;
  title: string;
  questions: QuizQuestion[];
}
