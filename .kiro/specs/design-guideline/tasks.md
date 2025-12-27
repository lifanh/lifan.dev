# Implementation Plan: Design Guideline

## Overview

This plan implements the minimalist-elegant design system for Lifan Dev using Tailwind CSS v4's CSS-first configuration. Tasks are ordered to build foundational tokens first, then component styles, and finally integration.

## Tasks

- [x] 1. Set up design token file structure
  - Create `src/styles/tokens/` directory structure
  - Create placeholder files for colors.css, typography.css, spacing.css, effects.css
  - Update global.css to import token files
  - _Requirements: 1.1, 2.1, 3.1, 4.1_

- [x] 2. Implement color palette tokens
  - [x] 2.1 Define neutral slate color scale (50-950) as CSS custom properties
    - Define light mode background and text colors
    - Define dark mode background and text colors using `.dark` selector
    - _Requirements: 1.1, 1.5, 6.1_
  - [x] 2.2 Define accent color with light/default/dark variants
    - Single accent color for interactive elements
    - Both light and dark mode variants
    - _Requirements: 1.1, 1.6_
  - [x] 2.3 Define semantic color tokens (success, warning, error, info)
    - Both light and dark mode variants
    - _Requirements: 1.2, 1.3_
  - [x] 2.4 Write property test for dark mode non-black backgrounds
    - **Property 3: Dark Mode Background Non-Black**
    - **Validates: Requirements 6.1**
  - [x] 2.5 Write property test for color palette mode completeness
    - **Property 4: Color Palette Mode Completeness**
    - **Validates: Requirements 1.3, 6.3**

- [x] 3. Implement typography system
  - [x] 3.1 Define font family using system font stack
    - Single sans-serif font family
    - _Requirements: 2.2_
  - [x] 3.2 Define font size scale (xs through 4xl)
    - 4 heading levels (h1-h4) mapped to sizes
    - _Requirements: 2.1_
  - [x] 3.3 Define font weights (400, 500, 700 only)
    - _Requirements: 2.3_
  - [x] 3.4 Define line-height and letter-spacing tokens
    - Body text line-height minimum 1.5
    - Heading letter-spacing for elegance
    - _Requirements: 2.4, 2.5_
  - [x] 3.5 Write property test for WCAG contrast compliance
    - **Property 5: WCAG Contrast Compliance**
    - **Validates: Requirements 2.6**

- [x] 4. Implement spacing system
  - [x] 4.1 Define spacing scale as CSS custom properties
    - Base unit 4px with scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
    - _Requirements: 3.1_
  - [x] 4.2 Define max-width constraints for content
    - _Requirements: 3.2_
  - [x] 4.3 Define card padding tokens
    - _Requirements: 3.4_
  - [x] 4.4 Write property test for spacing base-4 invariant
    - **Property 1: Spacing Scale Base-4 Invariant**
    - **Validates: Requirements 3.1**

- [x] 5. Implement effects system (shadows, transitions, borders)
  - [x] 5.1 Define soft shadow scale (soft, default, elevated)
    - Diffused shadows with appropriate blur/spread
    - _Requirements: 4.3_
  - [x] 5.2 Define transition tokens (fast: 150ms, default: 200ms, slow: 300ms)
    - _Requirements: 4.4, 5.2_
  - [x] 5.3 Define border-radius scale (sm, default, lg, xl, full)
    - Subtle rounded corners for elegance
    - _Requirements: 4.1_
  - [x] 5.4 Define border tokens (1px subtle borders)
    - _Requirements: 4.2_
  - [x] 5.5 Write property test for transition duration bounds
    - **Property 2: Transition Duration Bounds**
    - **Validates: Requirements 4.4, 5.2**

- [x] 6. Checkpoint - Verify token definitions
  - Ensure all CSS custom properties are defined correctly
  - Verify dark mode variants work with `.dark` class
  - Ensure all tests pass, ask the user if questions arise

- [x] 7. Implement theme toggle enhancement
  - [x] 7.1 Update ThemeToggle component with smooth transitions
    - Apply transition tokens to theme switching
    - _Requirements: 6.4_
  - [x] 7.2 Ensure theme persistence to localStorage
    - _Requirements: 6.5_
  - [x] 7.3 Write unit test for theme persistence
    - Test localStorage read/write
    - _Requirements: 6.5_

- [x] 8. Create component utility classes
  - [x] 8.1 Define card component styles
    - Background differentiation, subtle borders, soft shadows
    - Hover states with transitions
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 7.2_
  - [x] 8.2 Define button component styles
    - Default, hover, active, disabled states
    - Focus ring for accessibility
    - _Requirements: 5.1, 5.3, 4.5_
  - [x] 8.3 Define form input styles
    - Focus states with elegant focus rings
    - _Requirements: 5.5_
  - [x] 8.4 Define icon sizing utilities
    - 16px, 20px, 24px standard sizes
    - _Requirements: 8.2, 8.3_

- [x] 9. Create GUIDELINE.md documentation
  - [x] 9.1 Document color usage guidelines
    - When to use neutrals vs accent
    - _Requirements: 1.5, 1.6_
  - [x] 9.2 Document typography guidelines
    - Heading hierarchy, body text rules
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  - [x] 9.3 Document spacing and layout guidelines
    - Whitespace principles, card patterns
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [x] 9.4 Document component patterns
    - Interactive states, accessibility requirements
    - _Requirements: 4.1-4.6, 5.1-5.5_

- [x] 10. Final checkpoint - Complete integration
  - Verify all tokens integrate with existing components
  - Ensure dark mode works across all pages
  - Ensure all tests pass, ask the user if questions arise

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
