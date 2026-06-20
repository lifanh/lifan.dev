import { Footprints, RotateCcw, Waves } from 'lucide-react';
import { useState } from 'react';

type Perspective = 'heraclitus' | 'parmenides';

const DROPLET_COUNT = 9;
const DROPLET_TONES = [
  'bg-blue-300 dark:bg-blue-500/70',
  'bg-blue-400 dark:bg-blue-400/70',
  'bg-cyan-300 dark:bg-cyan-500/70',
  'bg-sky-300 dark:bg-sky-500/70',
];

/**
 * An interactive demonstration of the Heraclitus vs. Parmenides debate from
 * Module 1: "you cannot step into the same river twice" (flux) versus "what is,
 * is" (permanence). Stepping into the river swaps the water, while a perspective
 * toggle reframes whether that change makes it a different river.
 */
export function ChangeVsPermanenceDemo() {
  const [steps, setSteps] = useState(1);
  const [perspective, setPerspective] = useState<Perspective>('heraclitus');

  const isHeraclitus = perspective === 'heraclitus';

  const droplets = Array.from(
    { length: DROPLET_COUNT },
    (_, i) => DROPLET_TONES[(i + steps) % DROPLET_TONES.length],
  );

  return (
    <div className="my-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <Waves className="h-4 w-4 text-blue-500" />
        Explore: The River of Change
      </div>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        Step into the river, then switch perspectives. Does the moving water make it a
        <em> different</em> river each time?
      </p>

      {/* The river: a constant "form" (banks) holding ever-changing water. */}
      <div
        className={`relative overflow-hidden rounded-lg border-2 p-4 transition-colors duration-300 ${
          isHeraclitus
            ? 'border-slate-200 dark:border-slate-700'
            : 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900'
        }`}
        aria-hidden="true"
      >
        {!isHeraclitus && (
          <span className="absolute right-2 top-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            The form endures
          </span>
        )}
        <div className="flex items-end justify-between gap-1.5">
          {droplets.map((tone, i) => (
            <div
              key={i}
              className={`h-10 flex-1 rounded-md transition-all duration-500 ${tone} ${
                isHeraclitus ? 'opacity-100' : 'opacity-40'
              }`}
              style={{ height: `${28 + ((i + steps) % 4) * 6}px` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSteps((s) => s + 1)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 min-h-[44px] text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800"
        >
          <Footprints className="h-4 w-4" />
          Step into the river
        </button>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 tabular-nums">
          Step {steps}
        </span>
        {steps > 1 && (
          <button
            type="button"
            onClick={() => setSteps(1)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Perspective toggle */}
      <div
        className="mt-4 inline-flex rounded-lg border border-slate-200 p-1 dark:border-slate-700"
        role="group"
        aria-label="Philosophical perspective"
      >
        <button
          type="button"
          onClick={() => setPerspective('heraclitus')}
          aria-pressed={isHeraclitus}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            isHeraclitus
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          Heraclitus
        </button>
        <button
          type="button"
          onClick={() => setPerspective('parmenides')}
          aria-pressed={!isHeraclitus}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            !isHeraclitus
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          Parmenides
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-900/50 dark:text-slate-300"
      >
        {isHeraclitus ? (
          <p>
            You have stepped in <strong>{steps}</strong>{' '}
            {steps === 1 ? 'time' : 'times'}. Each time, the water has flowed on. For{' '}
            <strong>Heraclitus</strong>, this is a different river at every moment —{' '}
            <em>"you cannot step into the same river twice."</em> Reality is constant flux.
          </p>
        ) : (
          <p>
            Though the water keeps moving, the river's <strong>form</strong> persists — the same
            banks, the same channel. For <strong>Parmenides</strong>, the change you perceive is
            mere appearance; <em>"what is, is."</em> True reality is unchanging and one.
          </p>
        )}
      </div>

      <p className="mt-3 text-xs italic text-slate-500 dark:text-slate-400">
        Reflect: which is more "real" — the flowing water, or the enduring form?
      </p>
    </div>
  );
}
