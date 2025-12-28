# Lifan Dev Design Guideline

This document defines the design system for Lifan Dev, a personal developer tools platform. The design philosophy centers on **minimalist elegance**—achieving visual sophistication through restraint rather than complexity.

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Component Patterns](#component-patterns)

---

## Color System

The color palette is intentionally restrained, using neutral tones as the foundation with a single accent color for interactive elements.

### Neutral Palette (Slate Scale)

Neutrals form the backbone of the interface. Use them for backgrounds, text, and borders.

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-bg-primary` | `#f8fafc` (slate-50) | `#0f172a` (slate-900) | Main page background |
| `--color-bg-secondary` | `#f1f5f9` (slate-100) | `#1e293b` (slate-800) | Cards, sections |
| `--color-bg-tertiary` | `#e2e8f0` (slate-200) | `#334155` (slate-700) | Hover states, nested elements |
| `--color-text-primary` | `#0f172a` (slate-900) | `#f8fafc` (slate-50) | Headings, primary content |
| `--color-text-secondary` | `#475569` (slate-600) | `#cbd5e1` (slate-300) | Body text, descriptions |
| `--color-text-muted` | `#94a3b8` (slate-400) | `#64748b` (slate-500) | Placeholders, hints |

### When to Use Neutrals

- **Backgrounds**: Always use neutral backgrounds (`bg-primary`, `bg-secondary`, `bg-tertiary`)
- **Text**: Use `text-primary` for headings, `text-secondary` for body, `text-muted` for hints
- **Borders**: Use `border-subtle` for card edges, `border-default` for form inputs
- **Visual hierarchy**: Create depth through background layering, not color variation

### Accent Color

The accent color (blue) is reserved for **interactive elements only**. This creates clear visual affordance.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent-light` | `#60a5fa` | Hover states |
| `--color-accent` | `#3b82f6` | Primary buttons, links, focus rings |
| `--color-accent-dark` | `#2563eb` | Active/pressed states |

### When to Use Accent

✅ **Do use accent for:**
- Primary action buttons
- Links and interactive text
- Focus indicators
- Active/selected states
- Key focal points that need attention

❌ **Don't use accent for:**
- Decorative elements
- Background colors
- Non-interactive text
- Borders (except focus rings)

### Semantic Colors

Use semantic colors sparingly for status communication:

| State | Token | Usage |
|-------|-------|-------|
| Success | `--color-success` | Confirmations, completed actions |
| Warning | `--color-warning` | Cautions, pending states |
| Error | `--color-error` | Errors, destructive actions |
| Info | `--color-info` | Informational messages |


---

## Typography

The typography system prioritizes readability and elegance through restraint.

### Font Family

Use the system font stack for optimal performance and native feel:

```css
--font-family-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 
                    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Heading Hierarchy

Limited to **4 heading levels** for simplicity:

| Level | Size | Weight | Letter Spacing | Usage |
|-------|------|--------|----------------|-------|
| H1 | `2.25rem` (36px) | Bold (700) | Tight (-0.025em) | Page titles |
| H2 | `1.875rem` (30px) | Bold (700) | Tight (-0.025em) | Section headers |
| H3 | `1.5rem` (24px) | Medium (500) | Tight (-0.025em) | Subsections |
| H4 | `1.25rem` (20px) | Medium (500) | Normal (0) | Card titles, labels |

### Body Text Rules

| Property | Value | Rationale |
|----------|-------|-----------|
| Font size | `1rem` (16px) | Optimal reading size |
| Line height | `1.5` minimum | WCAG readability requirement |
| Letter spacing | `0` (normal) | Clean, natural reading |
| Font weight | `400` (normal) | Easy on the eyes |

### Font Weights

Only three weights are permitted:

| Weight | Token | Usage |
|--------|-------|-------|
| 400 | `--font-weight-normal` | Body text, descriptions |
| 500 | `--font-weight-medium` | Labels, buttons, emphasis |
| 700 | `--font-weight-bold` | Headings, strong emphasis |

### Typography Best Practices

1. **Maintain contrast**: All text must meet WCAG AA (4.5:1 minimum contrast ratio)
2. **Use weight for hierarchy**: Prefer weight changes over size changes for subtle emphasis
3. **Limit line length**: Use `--max-width-prose: 65ch` for optimal readability
4. **Consistent spacing**: Use the spacing scale for margins between text elements


---

## Spacing & Layout

The spacing system uses a **4px base unit** to create consistent, harmonious layouts.

### Spacing Scale

All spacing values are multiples of 4px:

| Token | Value | Common Usage |
|-------|-------|--------------|
| `--spacing-1` | 4px | Icon gaps, tight padding |
| `--spacing-2` | 8px | Button padding, small gaps |
| `--spacing-3` | 12px | Input padding, list gaps |
| `--spacing-4` | 16px | Card padding, section gaps |
| `--spacing-6` | 24px | Large card padding |
| `--spacing-8` | 32px | Section margins |
| `--spacing-12` | 48px | Page section gaps |
| `--spacing-16` | 64px | Major section breaks |
| `--spacing-24` | 96px | Hero sections, large gaps |

### Whitespace Principles

The minimalist aesthetic relies on **generous whitespace**:

1. **Embrace emptiness**: White space is not wasted space—it creates focus
2. **Consistent rhythm**: Use the spacing scale consistently throughout
3. **Group related items**: Tighter spacing within groups, larger spacing between groups
4. **Let content breathe**: When in doubt, add more space

### Content Width Constraints

| Token | Value | Usage |
|-------|-------|-------|
| `--max-width-prose` | 65ch | Body text, articles |
| `--max-width-sm` | 640px | Narrow containers |
| `--max-width-md` | 768px | Medium containers |
| `--max-width-lg` | 1024px | Wide containers |
| `--max-width-xl` | 1280px | Full-width content |

### Card Patterns

Cards use consistent padding based on content density:

| Variant | Padding | Usage |
|---------|---------|-------|
| `.card-sm` | 12px | Compact items, list cards |
| `.card` | 16px | Standard cards |
| `.card-lg` | 24px | Feature cards, prominent content |
| `.card-xl` | 32px | Hero cards, large features |

### Layout Guidelines

```css
/* Use CSS Grid or Flexbox with spacing tokens */
.grid-layout {
  display: grid;
  gap: var(--spacing-4);  /* Always use spacing tokens */
}

/* Center content with max-width */
.content-container {
  max-width: var(--max-width-lg);
  margin-inline: auto;
  padding-inline: var(--spacing-4);
}
```


---

## Component Patterns

Components follow consistent patterns for visual cohesion and accessibility.

### Interactive States

All interactive elements must have clear state differentiation:

| State | Visual Treatment |
|-------|------------------|
| Default | Base styling |
| Hover | Subtle background shift or elevation |
| Focus | Visible focus ring (accent color) |
| Active | Slight scale reduction (0.98) |
| Disabled | Reduced opacity, muted colors, `cursor: not-allowed` |

### Transitions

Use smooth, subtle transitions for all state changes:

| Token | Duration | Usage |
|-------|----------|-------|
| `--transition-fast` | 150ms | Hover states, color changes |
| `--transition-default` | 200ms | Most interactions |
| `--transition-slow` | 300ms | Complex animations, theme switching |

**Rule**: Never exceed 300ms for micro-interactions. Avoid jarring or excessive motion.

### Border Radius

Subtle rounded corners create an elegant feel:

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Small elements, tags |
| `--radius-default` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards, modals |
| `--radius-xl` | 16px | Large containers |
| `--radius-full` | 9999px | Pills, avatars |

### Shadows

Use soft, diffused shadows—never harsh drop shadows:

| Token | Usage |
|-------|-------|
| `--shadow-soft` | Subtle elevation, cards at rest |
| `--shadow-default` | Moderate elevation, hover states |
| `--shadow-elevated` | High elevation, modals, dropdowns |

### Buttons

Three button variants for different contexts:

```html
<!-- Primary: Main actions -->
<button class="btn btn-primary">Save Changes</button>

<!-- Secondary: Alternative actions -->
<button class="btn btn-secondary">Cancel</button>

<!-- Ghost: Minimal emphasis -->
<button class="btn btn-ghost">Learn More</button>
```

**Button sizes**: `.btn-sm`, `.btn` (default), `.btn-lg`

### Form Inputs

All inputs share consistent styling:

```html
<label class="label">Email Address</label>
<input type="email" class="input" placeholder="you@example.com" />
<p class="helper-text">We'll never share your email.</p>
```

**Input states**: `.input-error`, `.input-success`

### Cards

Three card variants for different elevation needs:

```html
<!-- Standard card with hover elevation -->
<div class="card">Content</div>

<!-- Pre-elevated card -->
<div class="card-elevated">Featured content</div>

<!-- Flat card (no shadow) -->
<div class="card-flat">Subtle content</div>
```

### Icons

Use consistent icon sizing aligned with the spacing system:

| Class | Size | Usage |
|-------|------|-------|
| `.icon-sm` | 16px | Inline with small text |
| `.icon-default` | 20px | Standard icons |
| `.icon-lg` | 24px | Prominent icons |

**Icon style**: Use outline/stroke-based icons only for consistency.

### Accessibility Requirements

1. **Focus indicators**: All interactive elements must have visible focus rings
2. **Color contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
3. **Touch targets**: Minimum 44x44px for touch interactions
4. **Motion**: Respect `prefers-reduced-motion` for animations

### Dark Mode

The design system fully supports dark mode:

- Toggle via `.dark` class on `<html>` element
- All tokens automatically adjust
- Theme preference persists to localStorage
- Smooth color transitions on theme switch

---

## Quick Reference

### CSS Custom Properties

```css
/* Colors */
var(--color-bg-primary)
var(--color-text-primary)
var(--color-accent)
var(--color-border-subtle)

/* Typography */
var(--font-size-base)
var(--font-weight-medium)
var(--line-height-normal)

/* Spacing */
var(--spacing-4)
var(--card-padding)
var(--max-width-prose)

/* Effects */
var(--shadow-soft)
var(--radius-lg)
var(--transition-default)
```

### Component Classes

```css
/* Cards */
.card, .card-elevated, .card-flat
.card-sm, .card-lg, .card-xl

/* Buttons */
.btn, .btn-primary, .btn-secondary, .btn-ghost
.btn-sm, .btn-lg

/* Forms */
.input, .textarea, .select
.input-error, .input-success
.label, .helper-text

/* Icons */
.icon, .icon-sm, .icon-default, .icon-lg
.icon-primary, .icon-secondary, .icon-muted, .icon-accent
```
