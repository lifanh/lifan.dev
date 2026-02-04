# Learning Tool Generator

## Description

Generates interactive learning platforms for new educational topics following the established architecture from the Accounting Fundamentals platform. This droid creates comprehensive, well-structured learning tools with modules, interactive components, quizzes, and progress tracking.

## Activation

Use this droid when:
- User wants to create a new interactive learning tool
- User asks to build an educational platform for a new topic
- User wants to add a study playground for a specific subject
- Creating curriculum-based learning content

Keywords: learning tool, study playground, educational platform, interactive learning, course builder, curriculum

## Workflow

### Phase 1: Topic Analysis & Planning

1. **Gather Requirements**
   - What is the learning topic/domain?
   - Who is the target audience (beginners, intermediate, advanced)?
   - What are the primary learning goals?
   - How many modules should the curriculum have?
   - What interactive tools would be most valuable?

2. **Review Architecture**
   - Read the abstract specification: `docs/interactive-learning-platform-spec.md`
   - Study the reference implementation: `src/tools/accounting-intro/`
   - Understand the project design system: `GUIDELINE.md` and `AGENTS.md`

3. **Create Specification Document**
   - Draft a spec document at `docs/{topic-slug}-spec.md`
   - Include:
     - Overview and vision
     - Target audience
     - Curriculum structure (Parts and Modules)
     - Module details with learning objectives and sections
     - Interactive tools specification
     - Technical implementation plan
   - Get user approval before proceeding

### Phase 2: Scaffold Project Structure

1. **Create Directory Structure**
   ```
   src/tools/{topic-slug}/
   ├── components/
   │   ├── {Topic}Platform.tsx
   │   ├── layout/
   │   ├── content/
   │   ├── interactive/
   │   │   ├── calculators/
   │   │   ├── simulators/
   │   │   ├── visualizers/
   │   │   └── assessments/
   │   ├── charts/
   │   └── export/
   ├── content/
   │   └── quizzes/
   ├── store/
   └── types/
   ```

2. **Create Type Definitions**
   - Copy and adapt from `src/tools/accounting-intro/types/`
   - Define domain-specific types
   - Create module structure with MODULES and PARTS constants

3. **Set Up State Management**
   - Create progress store with localStorage persistence
   - Create calculator/data store if needed
   - Use storage key: `{topic-slug}:progress`

### Phase 3: Build Core Components

1. **Layout Components** (can often reuse from accounting-intro)
   - ModuleNavigation
   - ProgressBar
   - ModuleHeader

2. **Content Components** (can often reuse)
   - DefinitionCard
   - KeyTakeaway
   - ComparisonTable
   - TryItYourself

3. **Main Platform Shell**
   - Create `{Topic}Platform.tsx`
   - Implement module switching with lazy loading
   - Add responsive sidebar navigation
   - Include navigation buttons

### Phase 4: Create Module Content

For each module:

1. **Create Module{N}Content.tsx**
   - Structure with semantic sections
   - Use content components for definitions, takeaways
   - Add "Try it yourself" prompts before interactive tools
   - Include real-world scenarios
   - Add module summary

2. **Create Quiz Data**
   - Create `content/quizzes/module-{nn}-quiz.ts`
   - Include 5-15 questions per module
   - Mix difficulty levels
   - Write clear explanations
   - Export from `content/quizzes/index.ts`

3. **Add Knowledge Check**
   - Import KnowledgeCheck component
   - Pass module ID and quiz data

### Phase 5: Build Interactive Tools

For each calculator/simulator/visualizer:

1. **Create Component**
   - Follow the calculator pattern from spec
   - Include header with icon, title, reset button
   - Input section with proper form controls
   - Results display with visualizations
   - Use design system tokens

2. **Add Tests**
   - Create `.test.tsx` file alongside component
   - Test rendering, user interactions, calculations
   - Use Vitest and Testing Library

3. **Export and Integrate**
   - Export from `interactive/index.ts`
   - Import in relevant module content
   - Add TryItYourself prompt before tool

### Phase 6: Create Entry Point

1. **Create Astro Page**
   ```astro
   ---
   import Layout from '../../layouts/Layout.astro';
   import { {Topic}Platform } from '../../tools/{topic-slug}/components/{Topic}Platform';
   ---

   <Layout title="{Topic Title} | Lifan Dev">
     <div class="max-w-7xl mx-auto">
       <{Topic}Platform client:idle />
     </div>
   </Layout>
   ```

2. **Add to Navigation** (if applicable)
   - Update home page or tools index
   - Add link card with description

### Phase 7: Testing & Polish

1. **Run Tests**
   ```bash
   npm test
   ```

2. **Verify Functionality**
   - Test progress tracking persists
   - Verify quiz completion marks modules
   - Check responsive design
   - Test keyboard navigation
   - Verify accessibility (ARIA labels)

3. **Run Build**
   ```bash
   npm run build
   ```

4. **Create Progress Document**
   - Create `docs/{topic-slug}-progress.md`
   - Track implementation status

## Code Examples

### Type Definition Template

```typescript
// types/module.ts
export interface Module {
  id: number;
  title: string;
  shortTitle: string;
  part: number;
  partTitle: string;
  description: string;
  estimatedTime: number;
  objectives: string[];
  sections: ModuleSection[];
}

export const MODULES: Module[] = [
  {
    id: 1,
    title: 'Module Title',
    shortTitle: 'Short',
    part: 1,
    partTitle: 'Part Name',
    description: 'Description of what this module covers.',
    estimatedTime: 30,
    objectives: [
      'Learning objective 1',
      'Learning objective 2',
    ],
    sections: [
      { id: '1.1', title: 'Section Title', type: 'content' },
      { id: '1.2', title: 'Interactive Tool', type: 'interactive' },
      { id: '1.3', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  // More modules...
];

export const PARTS = [
  { id: 1, title: 'Part I: Foundations', modules: [1, 2, 3] },
  { id: 2, title: 'Part II: Application', modules: [4, 5, 6] },
];
```

### Quiz Template

```typescript
// content/quizzes/module-01-quiz.ts
import type { QuizQuestion } from '../../types';

export const module01Quiz: QuizQuestion[] = [
  {
    id: 'm1-q1',
    type: 'multiple-choice',
    question: 'Question text here?',
    options: [
      'Option A',
      'Option B',
      'Option C',
      'Option D',
    ],
    correctAnswer: 1, // Index of correct option (0-based)
    explanation: 'Explanation of why this answer is correct.',
    difficulty: 'easy',
  },
  // More questions...
];
```

### Calculator Template

```typescript
// components/interactive/calculators/{Name}Calculator.tsx
import { Calculator, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

interface CalculatorInput {
  id: string;
  name: string;
  value: string;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function {Name}Calculator() {
  const [inputs, setInputs] = useState<CalculatorInput[]>([
    { id: generateId(), name: '', value: '' },
  ]);

  const results = useMemo(() => {
    // Calculate results from inputs
    return { /* computed values */ };
  }, [inputs]);

  const reset = () => {
    setInputs([{ id: generateId(), name: '', value: '' }]);
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">{Title}</h3>
        </div>
        <button
          onClick={reset}
          className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Reset
        </button>
      </div>

      {/* Input Section */}
      <div className="p-6">
        {/* Input fields */}
      </div>

      {/* Results */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-6">
        {/* Results display */}
      </div>
    </div>
  );
}
```

## Guidelines

- Follow the project design system (GUIDELINE.md)
- Use existing components from accounting-intro as templates
- Write tests for all interactive components
- Ensure accessibility with proper ARIA labels
- Use lazy loading for module content
- Persist progress to localStorage
- Support both light and dark modes
- Make all interactive elements mobile-friendly (44px touch targets)

## References

- Abstract Specification: `docs/interactive-learning-platform-spec.md`
- Reference Implementation: `src/tools/accounting-intro/`
- Design System: `GUIDELINE.md`
- Project Guidelines: `AGENTS.md`
