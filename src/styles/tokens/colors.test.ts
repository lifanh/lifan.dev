/**
 * Property-Based Tests for Color Palette Tokens
 * 
 * Feature: design-guideline
 * Tests validate correctness properties from the design document.
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

// Read and parse the colors.css file
const colorsPath = path.join(__dirname, 'colors.css');
const colorsCSS = fs.readFileSync(colorsPath, 'utf-8');

/**
 * Extract CSS custom property values from the CSS content
 */
function extractCSSVariables(css: string, selector: string = ':root'): Map<string, string> {
  const variables = new Map<string, string>();
  
  // Find the selector block
  const selectorRegex = new RegExp(`${selector.replace('.', '\\.')}\\s*\\{([^}]+)\\}`, 'g');
  const matches = css.matchAll(selectorRegex);
  
  for (const match of matches) {
    const block = match[1];
    const varRegex = /--([\w-]+):\s*([^;]+);/g;
    let varMatch;
    while ((varMatch = varRegex.exec(block)) !== null) {
      variables.set(`--${varMatch[1]}`, varMatch[2].trim());
    }
  }
  
  return variables;
}

/**
 * Parse a color value to RGB components
 * Supports hex colors (#RGB, #RRGGBB)
 */
function parseColorToRGB(color: string): { r: number; g: number; b: number } | null {
  // Handle hex colors
  const hexMatch = color.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    } else {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }
  }
  return null;
}

/**
 * Check if a color is pure black
 */
function isPureBlack(color: string): boolean {
  const rgb = parseColorToRGB(color);
  if (!rgb) return false;
  return rgb.r === 0 && rgb.g === 0 && rgb.b === 0;
}

// Extract variables from both :root and .dark selectors
const rootVariables = extractCSSVariables(colorsCSS, ':root');
const darkVariables = extractCSSVariables(colorsCSS, '.dark');

// Get dark mode background colors
const darkBgColors: string[] = [];
for (const [key, value] of darkVariables) {
  if (key.includes('bg') && !value.startsWith('var(')) {
    darkBgColors.push(value);
  }
}

// For dark mode, we need to resolve the var() references
// The dark mode backgrounds reference neutral colors from :root
const darkBgPrimary = rootVariables.get('--color-neutral-900') || '';
const darkBgSecondary = rootVariables.get('--color-neutral-800') || '';
const darkBgTertiary = rootVariables.get('--color-neutral-700') || '';
const resolvedDarkBgColors = [darkBgPrimary, darkBgSecondary, darkBgTertiary].filter(Boolean);

describe('Color Palette Properties', () => {
  /**
   * Feature: design-guideline, Property 3: Dark Mode Background Non-Black
   * 
   * *For any* background color defined for dark mode, that color SHALL NOT 
   * be pure black (#000000 or rgb(0,0,0)).
   * 
   * **Validates: Requirements 6.1**
   */
  describe('Property 3: Dark Mode Background Non-Black', () => {
    it('should ensure no dark mode background is pure black', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...resolvedDarkBgColors),
          (bgColor) => {
            const isBlack = isPureBlack(bgColor);
            expect(isBlack).toBe(false);
            return !isBlack;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should verify all dark mode backgrounds are dark slate colors', () => {
      for (const bgColor of resolvedDarkBgColors) {
        expect(isPureBlack(bgColor)).toBe(false);
        // Verify it's a dark color (not too light)
        const rgb = parseColorToRGB(bgColor);
        expect(rgb).not.toBeNull();
        if (rgb) {
          // Dark colors should have low luminance but not be pure black
          const luminance = (rgb.r + rgb.g + rgb.b) / 3;
          expect(luminance).toBeGreaterThan(0); // Not pure black
          expect(luminance).toBeLessThan(128); // Still dark
        }
      }
    });
  });


  /**
   * Feature: design-guideline, Property 4: Color Palette Mode Completeness
   * 
   * *For any* semantic color token (bg, text, border, accent), both light mode 
   * and dark mode variants SHALL be defined.
   * 
   * **Validates: Requirements 1.3, 6.3**
   */
  describe('Property 4: Color Palette Mode Completeness', () => {
    // Semantic tokens that must exist in both modes
    const semanticTokens = [
      '--color-bg-primary',
      '--color-bg-secondary',
      '--color-bg-tertiary',
      '--color-text-primary',
      '--color-text-secondary',
      '--color-text-muted',
      '--color-border-subtle',
      '--color-border-default',
      '--color-accent',
      '--color-accent-light',
      '--color-accent-default',
      '--color-accent-dark',
      '--color-success',
      '--color-warning',
      '--color-error',
      '--color-info',
    ];

    it('should have all semantic tokens defined in light mode (:root)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...semanticTokens),
          (token) => {
            const hasToken = rootVariables.has(token);
            expect(hasToken).toBe(true);
            return hasToken;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should have all semantic tokens defined in dark mode (.dark)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...semanticTokens),
          (token) => {
            const hasToken = darkVariables.has(token);
            expect(hasToken).toBe(true);
            return hasToken;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should ensure mode completeness for all semantic tokens', () => {
      for (const token of semanticTokens) {
        expect(rootVariables.has(token)).toBe(true);
        expect(darkVariables.has(token)).toBe(true);
      }
    });
  });
});
