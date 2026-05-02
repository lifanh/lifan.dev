import { CheckCircle2, ChevronRight, RotateCcw, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useProgressStore } from '../../../store';
import type { QuizAnswer, QuizQuestion } from '../../../types';

interface KnowledgeCheckProps {
  moduleId: number;
  title: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export function KnowledgeCheck({ moduleId, title, questions, onComplete }: KnowledgeCheckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const completeQuiz = useProgressStore((s) => s.completeQuiz);
  const completeModule = useProgressStore((s) => s.completeModule);

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (answer: string | number) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correct: isCorrect,
    };

    setAnswers([...answers.filter((a) => a.questionId !== currentQuestion.id), newAnswer]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      const correctCount = answers.filter((a) => a.correct).length;
      const percentage = Math.round((correctCount / questions.length) * 100);

      completeQuiz(moduleId, percentage);
      if (percentage >= 80) {
        completeModule(moduleId);
      }

      onComplete?.(correctCount, questions.length);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsComplete(false);
  };

  const score = answers.filter((a) => a.correct).length;
  const percentage = Math.round((score / questions.length) * 100);

  if (isComplete) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden" role="status" aria-live="polite">
        <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">{title} - Results</h3>
        </div>
        <div className="p-8 text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
            percentage >= 80 ? 'bg-green-100 dark:bg-green-900/30' : percentage >= 60 ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-red-100 dark:bg-red-900/30'
          }`}>
            <span className={`text-3xl font-bold ${
              percentage >= 80 ? 'text-green-600 dark:text-green-400' : percentage >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {percentage}%
            </span>
          </div>
          <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
          </h4>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You got {score} out of {questions.length} questions correct.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1 bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={questions.length}
          aria-label={`Question ${currentIndex + 1} of ${questions.length}`}
        />
      </div>

      <div className="p-6">
        {/* Question */}
        <p className="text-lg text-slate-900 dark:text-white mb-6">{currentQuestion.question}</p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options?.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showResult = showExplanation;

            let optionClass = 'border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600';
            if (isSelected && !showResult) {
              optionClass = 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
            } else if (showResult && isCorrect) {
              optionClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            } else if (showResult && isSelected && !isCorrect) {
              optionClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showExplanation}
                className={`w-full flex items-center gap-3 p-4 text-left border-2 rounded-lg transition-colors ${optionClass} disabled:cursor-default`}
              >
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-slate-700 dark:text-slate-300">{option}</span>
                {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            role="status"
            aria-live="polite"
            className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
            }`}
          >
            <p className={`text-sm font-medium mb-1 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'text-green-700 dark:text-green-300'
                : 'text-amber-700 dark:text-amber-300'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Not quite'}
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!showExplanation ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
