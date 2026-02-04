# Interactive Learning Tool Framework

> **Abstract framework for building educational study playgrounds**
> 
> Based on patterns extracted from the Accounting Fundamentals platform

---

## Overview

This framework defines the architecture, patterns, and conventions for building interactive learning tools (study playgrounds) within the Lifan Dev platform. Each learning tool follows a modular, progressive curriculum structure with embedded interactive components.

---

## Core Architecture

### Directory Structure

```
src/tools/{tool-name}/
├── components/
│   ├── {ToolName}Platform.tsx      # Main React shell
│   ├── layout/                     # Navigation, progress, headers
│   │   ├── ModuleNavigation.tsx
│   │   ├── ProgressBar.tsx
│   │   └── ModuleHeader.tsx
│   ├── content/                    # Reusable content components
│   │   ├── DefinitionCard.tsx
│   │   ├── KeyTakeaway.tsx
│   │   ├── ComparisonTable.tsx
│   │   └── TryItYourself.tsx
│   ├── interactive/                # Interactive tools
│   │   ├── calculators/            # Data input/output tools
│   │   ├── simulators/             # Step-by-step simulations
│   │   ├── visualizers/            # Data visualization
│   │   └── assessments/            # Quizzes, knowledge checks
│   ├── charts/                     # Recharts wrappers (lazy-loaded)
│   └── export/                     # PDF/CSV export functionality
├── content/
│   ├── Module{N}Content.tsx        # Module content components
│   └── quizzes/                    # Quiz data files
│       └── module-{n}-quiz.ts
├── store/
│   ├── useProgressStore.ts         # Progress tracking (Zustand)
│   └── useCalculatorStore.ts       # Calculator data persistence
└── types/
    ├── index.ts
    ├── module.ts                   # Module, Section definitions
    ├── quiz.ts                     # Quiz question types
    ├── user.ts                     # Progress, preferences
    └── {domain}.ts                 # Domain-specific types
```

### Astro Page Entry

```astro
// src/pages/tools/{tool-name}.astro
---
import Layout from '../../layouts/Layout.astro';
import { ToolPlatform } from '../../tools/{tool-name}/components/ToolPlatform';
---

<Layout title="Tool Title | Lifan Dev">
  <div class="max-w-7xl mx-auto">
    <ToolPlatform client:idle />
  </div>
</Layout>
```

---

## Data Models

### Module Definition

```typescript
interface Module {
  id: number;
  title: string;
  shortTitle: string;
  part: number;
  partTitle: string;
  description: string;
  estimatedTime: number;  // minutes
  objectives: string[];
  sections: ModuleSection[];
}

interface ModuleSection {
  id: string;           // e.g., '1.1', '1.2'
  title: string;
  type: 'content' | 'interactive' | 'quiz' | 'resources';
}
```

### Parts (Curriculum Organization)

```typescript
const PARTS = [
  { id: 1, title: 'Part Name', modules: [1, 2, 3] },
  { id: 2, title: 'Part Name', modules: [4, 5, 6] },
  // ...
];
```

### Quiz Question

```typescript
interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  relatedConcept?: string;
}
```

### User Progress

```typescript
interface UserProgress {
  currentModule: number;
  completedModules: number[];
  moduleProgress: Record<number, ModuleProgress>;
  totalTimeSpent: number;
  lastVisited: string;
  streak: number;
  longestStreak: number;
}

interface ModuleProgress {
  moduleId: number;
  sectionsCompleted: string[];
  quizCompleted: boolean;
  quizScore: number | null;
  timeSpent: number;
  lastAccessed: string;
}
```

---

## Component Patterns

### Platform Shell

The main platform component manages:
- Module navigation (sidebar)
- Progress tracking (top bar)
- Lazy-loaded module content
- Previous/Next navigation

```tsx
export function ToolPlatform() {
  const { progress, setCurrentModule } = useProgressStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Top Progress Bar */}
      <div className="sticky top-0 z-40 ...">
        <ProgressBar />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Sidebar */}
          <aside>
            <ModuleNavigation
              currentModule={progress.currentModule}
              onModuleSelect={handleModuleSelect}
            />
          </aside>

          {/* Main Content */}
          <main>
            <ModuleHeader module={currentModule} />
            <Suspense fallback={<ModuleLoadingFallback />}>
              {renderModuleContent()}
            </Suspense>
            {/* Navigation Buttons */}
          </main>
        </div>
      </div>
    </div>
  );
}
```

### Content Components

**DefinitionCard**: Highlight key terms
```tsx
<DefinitionCard
  term="Term Name"
  definition="Clear explanation of the term."
/>
```

**KeyTakeaway**: Emphasize important concepts
```tsx
<KeyTakeaway>
  <p>The most important point from this section...</p>
</KeyTakeaway>
```

**ComparisonTable**: Side-by-side comparisons
```tsx
<ComparisonTable
  headers={['Column 1', 'Column 2', 'Column 3']}
  rows={[
    ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
    ['Row 2 Col 1', 'Row 2 Col 2', 'Row 2 Col 3'],
  ]}
/>
```

**TryItYourself**: Prompt for interactive tools
```tsx
<TryItYourself>
  Use the calculator below to practice the concept.
</TryItYourself>
```

### Calculator Pattern

Calculators are interactive tools for data input/output:

```tsx
export function SomeCalculator() {
  const [data, setData] = useState(initialData);
  const results = useMemo(() => calculate(data), [data]);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header with title and reset */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b ...">
        <h3>Calculator Title</h3>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="p-6">
        {/* Input sections */}
        <InputSection data={data} onChange={setData} />
        
        {/* Results display */}
        <ResultsDisplay results={results} />
        
        {/* Visualization (optional) */}
        <Visualization data={data} results={results} />
      </div>
    </div>
  );
}
```

### Assessment Pattern (KnowledgeCheck)

Quiz component with progress tracking:

```tsx
<KnowledgeCheck
  moduleId={1}
  title="Module 1: Topic Name"
  questions={moduleQuiz}
  onComplete={(score, total) => { /* optional callback */ }}
/>
```

Features:
- Step-through questions with progress bar
- Immediate feedback with explanations
- Score tracking and persistence
- Retry functionality
- Auto-completion when score >= 80%

---

## State Management

### Progress Store (Zustand + localStorage)

```typescript
export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: DEFAULT_PROGRESS,
      setCurrentModule: (moduleId) => set(...),
      completeModule: (moduleId) => set(...),
      completeQuiz: (moduleId, score) => set(...),
      resetProgress: () => set({ progress: DEFAULT_PROGRESS }),
    }),
    { name: '{tool-name}:progress' }
  )
);
```

### Calculator Store (optional)

For persisting calculator data across sessions:

```typescript
export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      data: DEFAULT_DATA,
      updateData: (key, value) => set(...),
      reset: () => set({ data: DEFAULT_DATA }),
    }),
    { name: '{tool-name}:calculator-data' }
  )
);
```

---

## Technology Stack

| Layer | Technology | Usage |
|-------|------------|-------|
| Framework | Astro + React Islands | Static content with interactive islands |
| Styling | Tailwind CSS | Design system compliance |
| State | Zustand | Lightweight, persistent state |
| Charts | Recharts (lazy-loaded) | Data visualization |
| Animations | Framer Motion or CSS | Micro-interactions |
| Forms | React Hook Form + Zod | Input validation |
| PDF Export | @react-pdf/renderer | Report generation |
| Testing | Vitest + Testing Library | Component and logic tests |
| Icons | Lucide React | Consistent iconography |

---

## Design Guidelines

Follow the project's design system from `GUIDELINE.md`:

1. **Colors**: Neutral backgrounds, accent blue for CTAs only
2. **Typography**: H1 for module title, H2 for sections, prose for body
3. **Spacing**: 4px base unit, generous whitespace
4. **Cards**: `.card-lg` for tools, `.card` for callouts
5. **Transitions**: 200ms hover, 300ms for sections
6. **Accessibility**: ARIA labels, focus rings, 44px touch targets

---

## Module Content Template

```tsx
export function Module{N}Content() {
  return (
    <div className="space-y-8">
      {/* Section X.1 */}
      <section id="section-{n}-1">
        <h2>X.1 Section Title</h2>
        <p>Instructional content...</p>
        <DefinitionCard term="..." definition="..." />
        <KeyTakeaway>Key point...</KeyTakeaway>
      </section>

      {/* Interactive Tool */}
      <section id="section-{n}-tool">
        <h2>Interactive Tool</h2>
        <TryItYourself>Instructions...</TryItYourself>
        <SomeCalculator />
      </section>

      {/* Real-World Scenario */}
      <section id="section-{n}-scenario">
        <h2>Real-World Scenario</h2>
        <div className="bg-slate-50 ...">
          <p className="italic">Scenario description...</p>
        </div>
        {/* Discussion points */}
      </section>

      {/* Summary */}
      <section id="section-{n}-summary">
        <h2>Module Summary</h2>
        <ul>
          <li>Key learning 1</li>
          <li>Key learning 2</li>
        </ul>
        <p><strong>Next up:</strong> Module X+1...</p>
      </section>

      {/* Knowledge Check */}
      <section id="section-{n}-quiz">
        <h2>Knowledge Check</h2>
        <KnowledgeCheck moduleId={n} title="..." questions={moduleQuiz} />
      </section>
    </div>
  );
}
```

---

## Creating a New Learning Tool

1. **Planning Phase**
   - Define topic and learning objectives
   - Structure curriculum into parts and modules
   - Identify interactive tools needed
   - Write quiz questions

2. **Setup Phase**
   - Create directory structure under `src/tools/{tool-name}/`
   - Define types (modules, quiz, domain-specific)
   - Set up Zustand stores
   - Create Astro page entry

3. **Implementation Phase**
   - Build platform shell with navigation
   - Create content components (if new ones needed)
   - Implement module content (ModuleNContent.tsx)
   - Build interactive calculators/simulators
   - Write quiz data files
   - Add charts and visualizations

4. **Polish Phase**
   - Add PDF/CSV export
   - Implement responsive design
   - Accessibility audit
   - Write tests for interactive components

5. **Integration Phase**
   - Add to site navigation
   - Create spec and progress docs
   - Link from home page if appropriate

---

## Example Tool Ideas

| Topic | Interactive Tools | Key Features |
|-------|-------------------|--------------|
| Personal Finance 101 | Budget planner, Savings calculator, Debt payoff tracker | Goal setting, scenario modeling |
| Basic Statistics | Distribution visualizer, Hypothesis tester, Correlation analyzer | Real-time graphs, sample data |
| Music Theory | Chord builder, Scale visualizer, Interval trainer | Audio playback, piano keyboard |
| Photography Basics | Exposure triangle simulator, Composition guides | Image examples, camera settings |
| Cooking Fundamentals | Recipe scaler, Conversion calculator, Timer | Nutrition facts, substitutions |

---

## Testing Requirements

Per `AGENTS.md`, write tests before implementation for interactive components:

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders initial state correctly', () => {...});
  it('handles user input', () => {...});
  it('calculates results correctly', () => {...});
  it('validates input', () => {...});
});
```

Run tests with: `npm test`

---

## References

- Accounting Intro Implementation: `src/tools/accounting-intro/`
- Design System: `GUIDELINE.md`
- Project Guidelines: `AGENTS.md`
- Spec Example: `docs/accounting-intro-spec.md`
