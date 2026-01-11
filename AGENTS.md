# AI Agents Guidelines

Instructions for AI coding assistants working on this codebase.

---

## Project Overview

**Lifan Dev** is a personal developer tools platform built with Astro. The design philosophy is **minimalist elegance**—achieving visual sophistication through restraint.

### Tech Stack

- **Framework**: Astro
- **Styling**: TailwindCSS with CSS custom properties
- **Testing**: Vitest
- **Deployment**: Cloudflare (via Wrangler)

---

## Key Files

| File | Purpose |
|------|---------|
| `GUIDELINE.md` | Design system reference (colors, typography, spacing, components) |
| `src/styles/global.css` | Global styles and CSS custom properties |
| `src/styles/tokens/` | Design token definitions |
| `src/layouts/Layout.astro` | Base page layout |
| `src/components/` | Reusable UI components |

---

## Code Style

### General

- Use TypeScript for type safety
- Follow existing code patterns and conventions
- Keep components small and focused
- Prefer composition over inheritance

### Styling

- **Always use design tokens** from `GUIDELINE.md` (e.g., `var(--spacing-4)`, `var(--color-accent)`)
- Use TailwindCSS utility classes aligned with the design system
- Never use arbitrary color values—reference the neutral or accent palette
- Maintain WCAG AA contrast ratios (4.5:1 minimum)

### Components

- Place reusable components in `src/components/`
- Include unit tests for interactive components (`.test.ts` files)
- Follow the interactive states pattern: default → hover → focus → active → disabled

---

## Design Principles

1. **Restraint over complexity**: Use minimal colors, limited font weights, generous whitespace
2. **Accent is for interaction only**: Blue accent color is reserved for buttons, links, and focus states
3. **Neutral foundation**: Use the slate scale for backgrounds, text, and borders
4. **Consistent spacing**: All spacing uses the 4px base unit scale
5. **Accessibility first**: Visible focus rings, sufficient contrast, touch-friendly targets (44x44px min)

---

## Do's and Don'ts

### ✅ Do

- Reference `GUIDELINE.md` before creating UI components
- Use CSS custom properties for all design values
- Support both light and dark mode via `.dark` class
- Keep transitions under 300ms for micro-interactions
- Test components with Vitest

### ❌ Don't

- Use hardcoded colors or spacing values
- Add decorative use of accent colors
- Create more than 4 heading levels
- Use font weights other than 400, 500, or 700
- Skip focus states on interactive elements

---

## Testing

Run tests with:

```bash
npm test
```

### Test-First for Interactive Components

- **Write tests before implementation** for all interactive components
- **Run tests after every change** to ensure nothing breaks
- Ensure new interactive components have corresponding `.test.ts` files
- Never merge code with failing tests

---

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```
