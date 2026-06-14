import { CheckCircle2, HelpCircle, RotateCcw, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface InlineCheckProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  prompt?: string;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

/**
 * A lightweight single-question comprehension check meant to be embedded
 * inline between content sections, interleaving active recall with reading
 * rather than deferring all assessment to the end-of-module quiz.
 */
export function InlineCheck({
  question,
  options,
  correctAnswer,
  explanation,
  prompt = 'Quick check',
}: InlineCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isCorrect = selected === correctAnswer;

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
  };

  const handleReset = () => {
    setSelected(null);
    setRevealed(false);
  };

  // Monitor visibility of the check to bind keyboard shortcuts
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      { threshold: [0, 0.15, 0.5, 1], rootMargin: '-10% 0px -10% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Listen to numeric keypresses (1, 2, 3...) when check is active and on screen
  useEffect(() => {
    if (!isIntersecting || revealed) return;

    const handleKeys = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= options.length) {
        e.preventDefault();
        handleSelect(num - 1);
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isIntersecting, revealed, options.length]);

  return (
    <div
      ref={containerRef}
      data-inline-check
      data-completed={revealed && isCorrect}
      className="my-6 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50 transition-all duration-300"
    >
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
        <HelpCircle className="h-4 w-4" />
        {prompt}
        {isIntersecting && !revealed && (
          <span className="hidden sm:inline-flex text-xs font-normal text-slate-400 dark:text-slate-500 normal-case ml-auto">
            Press numeric key [1-{options.length}] to answer
          </span>
        )}
      </div>

      <p className="mb-4 text-base font-medium text-slate-900 dark:text-white">{question}</p>

      <div className="space-y-2" role="group" aria-label={question}>
        {options.map((option, index) => {
          const isChoice = selected === index;
          const isAnswer = index === correctAnswer;

          let optionClass =
            'border-slate-200 hover:border-blue-300 dark:border-slate-600 dark:hover:border-blue-600';
          if (revealed && isAnswer) {
            optionClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
          } else if (revealed && isChoice && !isAnswer) {
            optionClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
          } else if (isChoice) {
            optionClass = 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(index)}
              disabled={revealed}
              aria-pressed={isChoice}
              className={`flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left text-sm text-slate-700 transition-colors disabled:cursor-default dark:text-slate-300 ${optionClass}`}
            >
              {!revealed && (
                <kbd className="hidden sm:inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-200 bg-white text-[10px] font-medium text-slate-400 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
                  {index + 1}
                </kbd>
              )}
              <span className="flex-1">{option}</span>
              {revealed && isAnswer && <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />}
              {revealed && isChoice && !isAnswer && (
                <XCircle className="h-5 w-5 shrink-0 text-red-500" />
              )}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-4 rounded-lg border p-3 ${
            isCorrect
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
              : 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20'
          }`}
        >
          <p
            className={`mb-1 text-sm font-medium ${
              isCorrect
                ? 'text-green-700 dark:text-green-300'
                : 'text-amber-700 dark:text-amber-300'
            }`}
          >
            {isCorrect ? 'Correct!' : 'Not quite'}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">{explanation}</p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
