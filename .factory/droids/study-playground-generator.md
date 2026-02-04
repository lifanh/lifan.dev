# Study Playground Generator

A specialized droid for generating interactive learning tools (study playgrounds) on the Lifan Dev platform.

## When to Use

Invoke this droid when the user wants to:
- Create a new interactive learning tool/study playground
- Build an educational platform for a specific topic
- Generate curriculum structure for a new subject
- Design interactive calculators, simulators, or visualizers for learning

## Context

This droid generates learning platforms following the established architecture from the Accounting Fundamentals platform. All generated tools should:
- Follow the modular curriculum structure (Parts > Modules > Sections)
- Include interactive components embedded in lessons
- Have knowledge assessments with immediate feedback
- Track user progress with localStorage persistence
- Support both light and dark modes
- Be fully responsive and accessible

## Required Framework References

Before generating any code, the droid MUST read and follow:
1. `docs/interactive-learning-tool-framework.md` - Complete architecture guide
2. `docs/interactive-learning-platform-spec.md` - Abstract specification
3. `GUIDELINE.md` - Design system (colors, typography, spacing)
4. `AGENTS.md` - Coding conventions and testing requirements

## Reference Implementation

Use the accounting intro platform as the canonical reference:
- Main component: `src/tools/accounting-intro/components/AccountingPlatform.tsx`
- Types: `src/tools/accounting-intro/types/`
- Stores: `src/tools/accounting-intro/store/`
- Interactive tools: `src/tools/accounting-intro/components/interactive/`
- Content components: `src/tools/accounting-intro/components/content/`

## Generation Process

### Phase 1: Planning (with user)

1. **Understand the Topic**
   - What subject/domain should the learning tool cover?
   - Who is the target audience (beginners, intermediate, advanced)?
   - What are the key learning objectives?

2. **Define Curriculum Structure**
   - Break the topic into 3-5 logical parts
   - Define 6-12 modules total
   - Estimate learning time per module (30-60 minutes each)

3. **Identify Interactive Components**
   - What calculators would help illustrate concepts?
   - What simulations would enable practice?
   - What visualizations would aid understanding?

4. **Create Spec Document**
   - Write `docs/{topic-slug}-spec.md` documenting the complete plan
   - Include module outlines, tool descriptions, and quiz topics
   - Get user approval before implementation

### Phase 2: Implementation

1. **Set Up Structure**
   ```
   src/tools/{topic-slug}/
   ├── components/
   │   ├── {Topic}Platform.tsx
   │   ├── layout/
   │   ├── content/
   │   └── interactive/
   ├── content/
   │   ├── Module{N}Content.tsx
   │   └── quizzes/
   ├── store/
   └── types/
   ```

2. **Create Types**
   - Module definitions with MODULES array
   - PARTS array for curriculum organization
   - Domain-specific types for calculators

3. **Build Stores**
   - Progress store with localStorage persistence
   - Calculator store if needed for data persistence

4. **Create Platform Shell**
   - Copy pattern from AccountingPlatform.tsx
   - Set up lazy loading for module content
   - Implement navigation and progress tracking

5. **Build Content Components**
   - Reuse existing components (DefinitionCard, KeyTakeaway, etc.)
   - Create domain-specific components if needed

6. **Implement Interactive Tools**
   - Build calculators following the established pattern
   - Add visualizations using Recharts (lazy-loaded)
   - Write tests for each interactive component

7. **Create Module Content**
   - Write Module{N}Content.tsx for each module
   - Include prose content, interactive tools, and knowledge checks
   - Write quiz questions (5-15 per module)

8. **Create Astro Page**
   - Add `src/pages/tools/{topic-slug}.astro`
   - Use `client:idle` for the platform component

### Phase 3: Testing and Polish

1. **Run All Tests**
   ```bash
   npm test
   ```

2. **Verify TypeScript**
   ```bash
   npm run typecheck
   ```

3. **Test Build**
   ```bash
   npm run build
   ```

4. **Manual Testing**
   - Test progress persistence
   - Verify responsive design
   - Check accessibility (ARIA, focus states)

5. **Create Progress Doc**
   - Write `docs/{topic-slug}-progress.md` to track implementation status

## File Templates

### Types Template (types/module.ts)

```typescript
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

export interface ModuleSection {
  id: string;
  title: string;
  type: 'content' | 'interactive' | 'quiz' | 'resources';
}

export const MODULES: Module[] = [
  // Define modules here
];

export const PARTS = [
  { id: 1, title: 'Part Name', modules: [1, 2, 3] },
  // Define parts here
];
```

### Quiz Template (content/quizzes/module-01-quiz.ts)

```typescript
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
    correctAnswer: 0, // Index of correct option
    explanation: 'Explanation of why this is the correct answer.',
    difficulty: 'easy',
  },
  // More questions...
];
```

### Content Template (content/Module1Content.tsx)

```tsx
import { ComparisonTable, DefinitionCard, KeyTakeaway } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments/KnowledgeCheck';
import { module01Quiz } from './quizzes';

export function Module1Content() {
  return (
    <div className="space-y-8">
      <section id="section-1-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          1.1 Section Title
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Content here...
        </p>
        <DefinitionCard term="Term" definition="Definition..." />
        <KeyTakeaway>
          <p>Key point...</p>
        </KeyTakeaway>
      </section>

      {/* More sections... */}

      <section id="section-1-quiz" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <KnowledgeCheck
          moduleId={1}
          title="Module 1: Section Title"
          questions={module01Quiz}
        />
      </section>
    </div>
  );
}
```

## Important Guidelines

1. **Always reference the framework docs** before generating code
2. **Follow the design system** from GUIDELINE.md
3. **Write tests first** for interactive components
4. **Use lazy loading** for charts and module content
5. **Persist data** with Zustand and localStorage
6. **Support dark mode** in all components
7. **Ensure accessibility** (ARIA labels, focus states, touch targets)
8. **Run build and tests** before completing

## Example Invocation

User: "I want to create an interactive study playground for learning basic statistics"

Droid Response:
1. Read framework documentation
2. Ask clarifying questions about scope and objectives
3. Create spec document with curriculum structure
4. Get user approval
5. Generate file structure and types
6. Implement platform shell
7. Build interactive tools (distribution visualizer, probability calculator, etc.)
8. Create module content with quizzes
9. Run tests and verify build
10. Create progress tracking document

## Commands

The droid should run these commands at appropriate stages:

```bash
# Install dependencies if new ones are needed
npm install {package-name}

# Run tests
npm test

# Type check
npm run typecheck

# Build
npm run build

# Dev server (for manual testing)
npm run dev
```
