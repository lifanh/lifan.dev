import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useProgressStore } from '../../../store';
import type { QuizQuestion } from '../../../types';
import { KnowledgeCheck } from './KnowledgeCheck';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  localStorage.clear();
  useProgressStore.getState().resetProgress();
});

describe('KnowledgeCheck', () => {
  it('completes quiz and updates progress store when score is at least 80%', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What is 2 + 2?',
        options: ['4', '5'],
        correctAnswer: 0,
        explanation: '2 + 2 = 4',
        difficulty: 'easy',
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'What is 1 + 1?',
        options: ['1', '2'],
        correctAnswer: 1,
        explanation: '1 + 1 = 2',
        difficulty: 'easy',
      },
    ];

    render(<KnowledgeCheck moduleId={1} title="Test Quiz" questions={questions} />);

    fireEvent.click(screen.getByRole('button', { name: /4/i }));
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next Question/i }));

    fireEvent.click(screen.getByRole('button', { name: /2/i }));
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    fireEvent.click(screen.getByRole('button', { name: /See Results/i }));

    expect(screen.getByText('100%')).toBeTruthy();

    const progress = useProgressStore.getState().progress;
    expect(progress.moduleProgress[1]?.quizCompleted).toBe(true);
    expect(progress.moduleProgress[1]?.quizScore).toBe(100);
    expect(progress.completedModules).toContain(1);
  });

  it('records quiz but does not complete module when score is below 80%', () => {
    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Pick A',
        options: ['Option A', 'Option B'],
        correctAnswer: 0,
        explanation: 'A is correct',
        difficulty: 'easy',
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Pick A again',
        options: ['Option A', 'Option B'],
        correctAnswer: 0,
        explanation: 'A is correct',
        difficulty: 'easy',
      },
    ];

    render(<KnowledgeCheck moduleId={2} title="Test Quiz" questions={questions} />);

    fireEvent.click(screen.getByRole('button', { name: /Option B/i }));
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    fireEvent.click(screen.getByRole('button', { name: /Next Question/i }));

    fireEvent.click(screen.getByRole('button', { name: /Option A/i }));
    fireEvent.click(screen.getByRole('button', { name: /Check Answer/i }));
    fireEvent.click(screen.getByRole('button', { name: /See Results/i }));

    expect(screen.getByText('50%')).toBeTruthy();

    const progress = useProgressStore.getState().progress;
    expect(progress.moduleProgress[2]?.quizCompleted).toBe(true);
    expect(progress.moduleProgress[2]?.quizScore).toBe(50);
    expect(progress.completedModules).not.toContain(2);
  });
});
