# Interactive Learning Platform - Abstract Specification

This document defines the abstract architecture for building interactive learning tools on the Lifan Dev platform. It is derived from the successful implementation of the Accounting Fundamentals platform.

---

## Overview

An **Interactive Learning Platform** is a self-contained educational module that combines:
- Structured curriculum content organized into modules and sections
- Interactive tools (calculators, simulators, visualizers) embedded within lessons
- Knowledge assessments with immediate feedback
- Progress tracking with localStorage persistence
- Downloadable resources and templates

---

## Core Architecture

### File Structure Template

```
src/
├── pages/
│   └── tools/
│       └── {topic-slug}.astro           # Landing page with React island
│
├── tools/
│   └── {topic-slug}/
│       ├── components/
│       │   ├── {Topic}Platform.tsx      # Main React shell
│       │   │
│       │   ├── layout/
│       │   │   ├── ModuleNavigation.tsx # Sidebar navigation
│       │   │   ├── ProgressBar.tsx      # Top progress indicator
│       │   │   └── ModuleHeader.tsx     # Module title, objectives
│       │   │
│       │   ├── content/
│       │   │   ├── DefinitionCard.tsx   # Term definitions
│       │   │   ├── KeyTakeaway.tsx      # Highlighted key points
│       │   │   ├── ComparisonTable.tsx  # Side-by-side comparisons
│       │   │   └── TryItYourself.tsx    # Interactive prompts
│       │   │
│       │   ├── interactive/
│       │   │   ├── calculators/         # Domain-specific calculators
│       │   │   ├── simulators/          # Interactive simulations
│       │   │   ├── visualizers/         # Data visualizations
│       │   │   └── assessments/
│       │   │       └── KnowledgeCheck.tsx
│       │   │
│       │   ├── charts/                  # Lazy-loaded chart components
│       │   └── export/                  # PDF/CSV export components
│       │
│       ├── content/
│       │   ├── Module{N}Content.tsx     # Module content components
│       │   └── quizzes/
│       │       └── module-{nn}-quiz.ts  # Quiz question data
│       │
│       ├── store/
│       │   ├── useProgressStore.ts      # Progress state (Zustand + persist)
│       │   └── useCalculatorStore.ts    # Calculator data persistence
│       │
│       └── types/
│           ├── index.ts
│           ├── module.ts                # Module/section definitions
│           ├── quiz.ts                  # Quiz types
│           ├── user.ts                  # User progress types
│           └── domain.ts                # Domain-specific types
```

---

## Type Definitions

### Module Structure

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
  id: string;            // e.g., '1.1', '2.3'
  title: string;
  type: 'content' | 'interactive' | 'quiz' | 'resources';
}

interface Part {
  id: number;
  title: string;
  modules: number[];     // Module IDs in this part
}
```

### Progress Tracking

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

### Quiz System

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

interface QuizAnswer {
  questionId: string;
  selectedAnswer: string | number;
  correct: boolean;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: QuizAnswer[];
  completedAt: string;
  timeSpent: number;
}
```

---

## Component Patterns

### Main Platform Shell

```tsx
function {Topic}Platform() {
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
          {/* Sidebar Navigation */}
          <aside>
            <ModuleNavigation
              currentModule={progress.currentModule}
              onModuleSelect={handleModuleSelect}
            />
          </aside>

          {/* Main Content */}
          <main>
            <ModuleHeader module={currentModule} />
            <Suspense fallback={<LoadingFallback />}>
              {renderModuleContent()}
            </Suspense>
            <NavigationButtons />
          </main>
        </div>
      </div>
    </div>
  );
}
```

### Content Components

**DefinitionCard**: Highlights key terms
```tsx
<DefinitionCard
  term="Term Name"
  definition="Clear, concise definition of the term."
/>
```

**KeyTakeaway**: Emphasizes important concepts
```tsx
<KeyTakeaway>
  <p>The most important point from this section...</p>
</KeyTakeaway>
```

**ComparisonTable**: Side-by-side comparisons
```tsx
<ComparisonTable
  headers={['Category', 'Option A', 'Option B']}
  rows={[
    ['Feature 1', 'Value A1', 'Value B1'],
    ['Feature 2', 'Value A2', 'Value B2'],
  ]}
/>
```

**TryItYourself**: Prompts for interactive tools
```tsx
<TryItYourself>
  <p>Use the calculator below to experiment with...</p>
</TryItYourself>
```

### Interactive Calculator Pattern

```tsx
function {Domain}Calculator() {
  const [data, setData] = useState<CalculatorData>(defaultData);
  
  const results = useMemo(() => {
    // Domain-specific calculations
    return calculateResults(data);
  }, [data]);

  return (
    <div className="bg-white dark:bg-slate-800 border rounded-xl overflow-hidden">
      {/* Header with title and reset button */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b px-6 py-4 flex justify-between">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <button onClick={reset}>Reset</button>
      </div>

      {/* Input Section */}
      <div className="p-6">
        <InputFields data={data} onChange={setData} />
      </div>

      {/* Results Display */}
      <div className="border-t p-6">
        <ResultsDisplay results={results} />
      </div>
    </div>
  );
}
```

### Knowledge Check Pattern

```tsx
<KnowledgeCheck
  moduleId={moduleNumber}
  title="Module X: Topic Name"
  questions={moduleQuiz}
  onComplete={(score, total) => {
    // Optional callback
  }}
/>
```

---

## State Management

### Progress Store (Zustand)

```typescript
interface ProgressState {
  progress: UserProgress;
  setCurrentModule: (moduleId: number) => void;
  completeModule: (moduleId: number) => void;
  updateModuleProgress: (moduleId: number, sectionId: string) => void;
  completeQuiz: (moduleId: number, score: number) => void;
  addTimeSpent: (seconds: number) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      // Implementation
    }),
    {
      name: '{topic-slug}:progress',
    }
  )
);
```

### Calculator Store (optional)

For tools that need data persistence across sessions:

```typescript
interface CalculatorState {
  data: Record<string, CalculatorData>;
  setData: (key: string, data: CalculatorData) => void;
  clearData: (key: string) => void;
  clearAll: () => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    // Implementation
    { name: '{topic-slug}:data' }
  )
);
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Astro + React Islands | Static content with interactive islands |
| Styling | Tailwind CSS | Design system alignment |
| State | Zustand + persist | Lightweight, persistent state |
| Charts | Recharts (lazy-loaded) | Data visualization |
| Animations | Framer Motion or CSS | Smooth interactions |
| Forms | React state or react-hook-form | Input handling |
| PDF Export | @react-pdf/renderer | Downloadable reports |
| Testing | Vitest + Testing Library | Component and logic tests |

---

## Design Guidelines

Follow the project's design system (GUIDELINE.md):

1. **Colors**: Use design tokens, accent only for CTAs
2. **Typography**: H1 for module, H2 for sections, H3 for subsections
3. **Spacing**: 4px base unit, generous whitespace
4. **Cards**: `.card-lg` for interactive tools
5. **Transitions**: 200-300ms for micro-interactions
6. **Accessibility**: ARIA labels, focus states, 44px touch targets

---

## Creating a New Learning Platform

### Step 1: Define Curriculum Structure

1. Identify the subject domain
2. Break into 4-6 logical parts
3. Create 8-12 modules total
4. Define learning objectives for each module
5. Plan 3-8 sections per module

### Step 2: Design Interactive Tools

For each module, identify:
- **Calculators**: Tools for computing domain-specific values
- **Simulators**: Practice scenarios with feedback
- **Visualizers**: Dynamic representations of concepts

### Step 3: Create Quiz Questions

- 5-15 questions per module
- Mix of difficulty levels
- Clear explanations for each answer
- Cover all module objectives

### Step 4: Implement Components

1. Set up file structure
2. Create types and stores
3. Build content components
4. Implement interactive tools
5. Add quiz data
6. Wire up the platform shell

### Step 5: Test and Polish

- Run all unit tests
- Verify progress persistence
- Test responsive design
- Check accessibility
- Optimize bundle size

---

## Example Domains

This architecture can be applied to various learning topics:

| Domain | Example Modules | Example Tools |
|--------|-----------------|---------------|
| **Personal Finance** | Budgeting, Investing, Taxes | Budget Planner, Investment Calculator |
| **Programming** | Variables, Functions, OOP | Code Runner, Debugger Simulator |
| **Statistics** | Probability, Distributions, Hypothesis | Distribution Visualizer, Sample Calculator |
| **Music Theory** | Scales, Chords, Harmony | Scale Builder, Chord Progression Player |
| **Language Learning** | Grammar, Vocabulary, Conjugation | Verb Conjugator, Vocabulary Quiz |
| **Chemistry** | Atoms, Bonding, Reactions | Periodic Table Explorer, Reaction Balancer |

---

## References

- Implementation: `src/tools/accounting-intro/`
- Spec Document: `docs/accounting-intro-spec.md`
- Progress Tracking: `docs/accounting-intro-progress.md`
