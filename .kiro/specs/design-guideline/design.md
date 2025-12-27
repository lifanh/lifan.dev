# Design Document: Design Guideline

## Overview

This design document establishes the technical implementation of the minimalist-yet-elegant design system for Lifan Dev. The system leverages Tailwind CSS v4's CSS-first configuration approach, defining design tokens as CSS custom properties that integrate seamlessly with the existing Astro + React stack.

The core philosophy is "sophisticated restraint"—achieving visual elegance through careful curation rather than addition. Every design decision prioritizes clarity, consistency, and intentionality.

## Architecture

The design system follows a token-based architecture with three layers:

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│              (Components, Pages, Layouts)                │
├─────────────────────────────────────────────────────────┤
│                   Component Layer                        │
│         (Reusable UI patterns and utilities)            │
├─────────────────────────────────────────────────────────┤
│                     Token Layer                          │
│    (Colors, Typography, Spacing, Shadows, Transitions)  │
└─────────────────────────────────────────────────────────┘
```

### File Structure

```
src/
├── styles/
│   ├── global.css          # Base styles and CSS custom properties
│   └── tokens/
│       ├── colors.css      # Color palette definitions
│       ├── typography.css  # Typography scale and styles
│       ├── spacing.css     # Spacing scale
│       └── effects.css     # Shadows, transitions, borders
└── components/
    └── ui/                 # Shared UI components
```

## Components and Interfaces

### Design Token Interface

All design tokens are exposed as CSS custom properties following a consistent naming convention:

```css
--{category}-{variant}-{modifier}
```

Examples:
- `--color-bg-primary`
- `--color-text-secondary`
- `--spacing-4`
- `--shadow-soft`

### Color System Interface

```typescript
interface ColorPalette {
  // Base neutrals (slate scale)
  neutral: {
    50: string;   // Lightest
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;  // Darkest
  };
  
  // Accent color (single, used sparingly)
  accent: {
    light: string;
    DEFAULT: string;
    dark: string;
  };
  
  // Semantic colors
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}
```

### Typography System Interface

```typescript
interface TypographySystem {
  fontFamily: {
    sans: string;  // System font stack
  };
  
  fontSize: {
    xs: string;    // 12px
    sm: string;    // 14px
    base: string;  // 16px
    lg: string;    // 18px
    xl: string;    // 20px
    '2xl': string; // 24px
    '3xl': string; // 30px
    '4xl': string; // 36px
  };
  
  fontWeight: {
    normal: 400;
    medium: 500;
    bold: 700;
  };
  
  lineHeight: {
    tight: 1.25;
    normal: 1.5;
    relaxed: 1.75;
  };
  
  letterSpacing: {
    tight: '-0.025em';
    normal: '0';
    wide: '0.025em';
  };
}
```

### Spacing System Interface

```typescript
interface SpacingSystem {
  0: '0px';
  1: '4px';
  2: '8px';
  3: '12px';
  4: '16px';
  6: '24px';
  8: '32px';
  12: '48px';
  16: '64px';
  24: '96px';
}
```

## Data Models

### Theme Configuration Model

```typescript
interface ThemeConfig {
  mode: 'light' | 'dark';
  colors: {
    bg: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: {
      subtle: string;
      DEFAULT: string;
    };
    accent: string;
  };
}
```

### Component Style Model

```typescript
interface ComponentStyles {
  borderRadius: {
    sm: '6px';
    DEFAULT: '8px';
    lg: '12px';
    xl: '16px';
    full: '9999px';
  };
  
  shadow: {
    none: 'none';
    soft: '0 2px 8px -2px rgba(0, 0, 0, 0.08)';
    DEFAULT: '0 4px 12px -4px rgba(0, 0, 0, 0.1)';
    elevated: '0 8px 24px -8px rgba(0, 0, 0, 0.12)';
  };
  
  transition: {
    fast: '150ms ease';
    DEFAULT: '200ms ease';
    slow: '300ms ease';
  };
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Spacing Scale Base-4 Invariant

*For any* spacing value defined in the spacing system, that value SHALL be a multiple of 4 pixels.

**Validates: Requirements 3.1**

### Property 2: Transition Duration Bounds

*For any* transition duration defined in the design system, that duration SHALL be between 150ms and 300ms inclusive.

**Validates: Requirements 4.4, 5.2**

### Property 3: Dark Mode Background Non-Black

*For any* background color defined for dark mode, that color SHALL NOT be pure black (#000000 or rgb(0,0,0)).

**Validates: Requirements 6.1**

### Property 4: Color Palette Mode Completeness

*For any* semantic color token (bg, text, border, accent), both light mode and dark mode variants SHALL be defined.

**Validates: Requirements 1.3, 6.3**

### Property 5: WCAG Contrast Compliance

*For any* text color and background color combination in the design system, the contrast ratio SHALL be at least 4.5:1 for normal text.

**Validates: Requirements 2.6**

## Error Handling

### Theme Persistence Errors

- If localStorage is unavailable, fall back to system preference via `prefers-color-scheme`
- If theme value is corrupted, reset to system preference
- Provide graceful degradation—never break the UI due to theme errors

### Missing Token Fallbacks

All CSS custom properties should have fallback values:

```css
color: var(--color-text-primary, #1e293b);
```

## Testing Strategy

### Unit Tests

Unit tests will verify specific configuration values and edge cases:

- Verify color palette contains exactly 5 base colors
- Verify typography defines exactly 4 heading levels (h1-h4)
- Verify font weights are limited to 400, 500, 700
- Verify icon sizes are 16px, 20px, 24px
- Verify theme persistence to localStorage

### Property-Based Tests

Property-based tests will validate universal properties across all design tokens:

1. **Spacing invariant test**: Generate random spacing tokens and verify all are multiples of 4
2. **Transition bounds test**: Generate random transition definitions and verify all durations are 150-300ms
3. **Dark mode non-black test**: Generate random dark mode background colors and verify none are pure black
4. **Mode completeness test**: For each semantic token, verify both light and dark variants exist
5. **Contrast compliance test**: For each text/background combination, calculate and verify contrast ratio ≥ 4.5:1

### Testing Framework

- Use Vitest for unit and property-based testing
- Use `fast-check` library for property-based test generation
- Minimum 100 iterations per property test
- Tag format: **Feature: design-guideline, Property {number}: {property_text}**

### Visual Regression Testing (Manual)

- Review color palette in both light and dark modes
- Verify typography hierarchy is visually clear
- Check component states (hover, focus, active, disabled)
- Validate spacing consistency across layouts
