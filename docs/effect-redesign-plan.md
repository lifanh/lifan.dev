# Redesign Plan: Immersive "Zen Focus" Learning Experience

This document details the redesign plan to transform the learning tools in **Lifan Dev** (`Introduction to Philosophy` and `Accounting Fundamentals`) into a content-focused, immersive experience inspired by [effect.institute](https://www.effect.institute/).

---

## 1. Core Design Philosophy: Adapt, Don't Imitate

The redesign adapts the brilliant pedagogy and rhythmic flow of `effect.institute` while strictly adhering to the design principles in `GUIDELINE.md` and `AGENTS.md`.

| Principle | `effect.institute` Aesthetic | Lifan Dev "Zen Focus" Adaptation |
|-----------|-----------------------------|----------------------------------|
| **Color System** | Harsh black, pure white, neon yellow | Slate neutral scale, elegant blue interactive accent |
| **Typography** | Monospace heavy fonts, tight leading | Clean system sans, elegant line-height (`1.6`), max width (`65ch`) |
| **Pacing** | Hidden steps, heavy animations | Progressive disclosure, smooth viewport center snapping |
| **Navigation** | Command-palette, keyboard-heavy | Hybrid sidebar navigation (collapsible) and full keyboard hotkeys |

---

## 2. Key UX & UI Redesigns

The proposed experience centers on **Focus**, **Rhythm**, and **Active Recall**.

### A. Focus Mode Layout
1. **Collapsible Navigation Sidebar**:
   - Introduce a **Zen Toggle** (key: `f` or `F`). 
   - When toggled on, the 280px left sidebar slides completely out of view, and the main layout switches from a grid to a centered `max-w-prose` (65ch) reading lane.
2. **Fade-Away Float Header**:
   - The top navigation bar becomes transparent and absolute.
   - On scrolling down, the header gently fades out of view. On scrolling up or hovering at the very top of the viewport, it slides down with a fast 150ms transition.
3. **The Vertical Progress Rail**:
   - In place of standard scrolling, a thin vertical timeline line is placed on the left margin.
   - As sections (beats) are completed, the line fills with interactive blue accent color, giving a strong sense of spatial progress.

### B. Progressive Beat Disclosure (Active Progression)
To prevent cognitive overload, the learning modules will unfold sequentially.
1. **Dynamic Visual States**:
   - **Active Section**: At the center of the viewport, fully opaque (`opacity-100`), crisp, and highlighted.
   - **Unlocked Sections (Past)**: Fully legible, but slightly dimmer (`opacity-70`) to keep focus on the active point.
   - **Locked Sections (Future)**: Heavily dimmed (`opacity-15`) and slightly blurred (`blur-[1px]`), with a `pointer-events-none` state.
2. **Progressive Unlock Requirements**:
   - **Reading Beat**: Unlocks automatically once the reader centers it in the viewport or presses `Space`/`Enter` at the end of the previous beat.
   - **Assessment Beat (InlineCheck)**: The subsequent section is strictly locked until the `InlineCheck` is answered **correctly**. This enforces immediate recall and prevents scrolling past questions without active engagement.
   - On unlock, a clean CSS-animated ripple effects outward, and the blur and opacity transition smoothly (`transition-all duration-500`).

### C. Advanced Keyboard Engine
The entire tool becomes navigable without leaving the keyboard.

| Hotkey | Action | Contextual Behavior |
|--------|--------|---------------------|
| `Space` / `Enter` | **Progress / Act** | • If `InlineCheck` is active: Selects next choice. If choice is selected: Submits.<br>• If check is answered correctly: Scrolls to next section.<br>• If normal section: Scrolls to next section. |
| `ArrowDown` / `j` | **Step Down** | Smoothly scrolls viewport to center the next section. |
| `ArrowUp` / `k` | **Step Up** | Smoothly scrolls viewport to center the previous section. |
| `f` / `F` | **Zen Toggle** | Toggles full-width Zen Focus mode (collapses sidebar & header). |
| `r` / `R` | **Reset Check** | Resets and retries the active section's `InlineCheck`. |
| `?` | **Help** | Opens a minimalist overlays illustrating hotkeys. |

---

## 3. Architecture & Component Redesign

To achieve this cleanly, we build a set of shared, reusable React layers. Since philosophy and accounting are separate directories, we can place shared hooks or copy-paste clean implementations as per the codebase convention.

### A. Centralizing the Stepper Hook (`useSectionTracker.ts`)
We upgrade the scroll-spy tracker into an interactive stepper state machine:

```typescript
// Proposed updates to useSectionTracker.ts
export interface SectionState {
  id: string;
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
  hasAssessment: boolean;
  assessmentCompleted: boolean;
}

export function useSectionTracker(moduleId: number, containerRef: React.RefObject<HTMLElement | null>) {
  // 1. Scan for sections, check if they contain a child element with [data-inline-check]
  // 2. Track locked/unlocked state in real-time
  // 3. Coordinate keyboard listeners for Space, Enter, j/k, f
  // 4. Expose functions to manually unlock/complete a section (e.g. on correct InlineCheck answer)
}
```

### B. Upgrading `InlineCheck.tsx`
The new `InlineCheck` coordinates with the section tracker via data-attributes or a shared context to unlock the subsequent beat.

* **Keyboard Integration**: When an `InlineCheck` enters the viewport, it registers itself as the "active keyboard target". Buttons for choices are labeled with `[1]`, `[2]`, `[3]` indices, allowing the user to press numeric keys to pick an option instantly!
* **Success Feedback**: Completing a check displays a micro-animation (e.g. green border pulse, checklist completion checkmark sliding in).

```tsx
// Visual markup details for option select keyboard support
<button className="flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left">
  <kbd className="hidden sm:inline-flex h-5 w-5 items-center justify-center rounded border bg-slate-100 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:border-slate-700">
    {index + 1}
  </kbd>
  <span className="flex-1">{option}</span>
</button>
```

---

## 4. Technical Implementation Steps

### Step 1: Layout Wrapper & Zen Switcher
Modify `PhilosophyPlatform.tsx` and `AccountingPlatform.tsx` to read a `zenMode` boolean from a persistent UI state or local React state.

* Apply conditional Tailwind classes:
  - Sidebar: `transition-transform duration-300 ${zenMode ? '-translate-x-full absolute' : 'translate-x-0 relative'}`
  - Main panel: `transition-all duration-300 ${zenMode ? 'max-w-prose mx-auto px-6' : 'max-w-7xl px-4'}`
  - Floating header: `fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`

### Step 2: Scroll Snap & Blur Classes
* Map sections to apply dynamic classes based on locking state.
```tsx
// Example within ModuleContent wrapper
const sectionClass = `
  py-[12vh] transition-all duration-500 ease-out scroll-mt-[20vh]
  ${isLocked ? 'opacity-15 blur-[1.5px] pointer-events-none' : 'opacity-100'}
  ${isActive ? 'scale-[1.01]' : 'scale-100'}
`;
```

### Step 3: Centralized Keyboard Event Handler
Enhance the global keydown listener to capture `Space` and `Enter`, preventing default browser scrolling only when a custom interaction occurs, ensuring highly refined controls.

### Step 4: Delight & Micro-interactions
* **Sounds FX**: Inject a small web audio synthesizer (using `window.AudioContext` to avoid external mp3 file dependencies and keep it lightweight) to generate a quick, satisfying sinewave chime (e.g., 400Hz → 800Hz) when a question is answered correctly, or a soft click on section step.
* **Keyboard Hints**: Add a small floating pill at the bottom center of the screen: `Press [Space] to progress` when the current beat is completed but the user hasn't scrolled.

---

## 5. Summary of Impact

This redesign bridges the gap between traditional reading and game-like active recall:
- **Zero distraction**: Users focus entirely on content.
- **Higher engagement**: Interleaved recall locks progress until comprehension is demonstrated.
- **Rhythmic pacing**: Keyboard commands allow natural, fluid speed-reading.
- **Seamless integration**: Completely backwards-compatible with existing static modules and AST-based quizzes.
