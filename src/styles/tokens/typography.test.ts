/**
 * Property-Based Tests for Typography System Tokens
 *
 * Feature: design-guideline
 * Tests validate correctness properties from the design document.
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { getContrastRatio } from '../../test-utils/color-helpers';
import { extractCSSVariables } from '../../test-utils/css-helpers';

// Read and parse the colors.css file for contrast testing
const colorsPath = path.join(__dirname, 'colors.css');
const colorsCSS = fs.readFileSync(colorsPath, 'utf-8');

// Extract variables from both :root and .dark selectors
const rootVariables = extractCSSVariables(colorsCSS, ':root');
const darkVariables = extractCSSVariables(colorsCSS, '.dark');

/**
 * Resolve a CSS variable value, handling var() references
 */
function resolveVariable(value: string, variables: Map<string, string>, rootVars: Map<string, string>): string {
  const varMatch = value.match(/var\(--([^)]+)\)/);
  if (varMatch) {
    const varName = `--${varMatch[1]}`;
    // First try the current scope, then fall back to root
    return variables.get(varName) || rootVars.get(varName) || value;
  }
  return value;
}

// Define text/background color pairs for light mode
const lightModeColorPairs = [
  { text: '--color-text-primary', bg: '--color-bg-primary', name: 'Primary text on primary bg' },
  { text: '--color-text-primary', bg: '--color-bg-secondary', name: 'Primary text on secondary bg' },
  { text: '--color-text-primary', bg: '--color-bg-tertiary', name: 'Primary text on tertiary bg' },
  { text: '--color-text-secondary', bg: '--color-bg-primary', name: 'Secondary text on primary bg' },
  { text: '--color-text-secondary', bg: '--color-bg-secondary', name: 'Secondary text on secondary bg' },
];

// Define text/background color pairs for dark mode
const darkModeColorPairs = [
  { text: '--color-text-primary', bg: '--color-bg-primary', name: 'Primary text on primary bg (dark)' },
  { text: '--color-text-primary', bg: '--color-bg-secondary', name: 'Primary text on secondary bg (dark)' },
  { text: '--color-text-primary', bg: '--color-bg-tertiary', name: 'Primary text on tertiary bg (dark)' },
  { text: '--color-text-secondary', bg: '--color-bg-primary', name: 'Secondary text on primary bg (dark)' },
  { text: '--color-text-secondary', bg: '--color-bg-secondary', name: 'Secondary text on secondary bg (dark)' },
];

// Resolve all color pairs to actual hex values
const resolvedLightPairs = lightModeColorPairs.map((pair) => {
  const textValue = rootVariables.get(pair.text) || '';
  const bgValue = rootVariables.get(pair.bg) || '';
  return {
    name: pair.name,
    textColor: resolveVariable(textValue, rootVariables, rootVariables),
    bgColor: resolveVariable(bgValue, rootVariables, rootVariables),
  };
}).filter((p) => p.textColor && p.bgColor);

const resolvedDarkPairs = darkModeColorPairs.map((pair) => {
  const textValue = darkVariables.get(pair.text) || '';
  const bgValue = darkVariables.get(pair.bg) || '';
  return {
    name: pair.name,
    textColor: resolveVariable(textValue, darkVariables, rootVariables),
    bgColor: resolveVariable(bgValue, darkVariables, rootVariables),
  };
}).filter((p) => p.textColor && p.bgColor);

// WCAG AA minimum contrast ratio for normal text
const WCAG_AA_CONTRAST_RATIO = 4.5;

describe('Typography Properties', () => {
  /**
   * Feature: design-guideline, Property 5: WCAG Contrast Compliance
   *
   * *For any* text color and background color combination in the design system,
   * the contrast ratio SHALL be at least 4.5:1 for normal text.
   *
   * **Validates: Requirements 2.6**
   */
  describe('Property 5: WCAG Contrast Compliance', () => {
    it('should ensure all light mode text/background combinations meet WCAG AA contrast ratio', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...resolvedLightPairs),
          (colorPair) => {
            const ratio = getContrastRatio(colorPair.textColor, colorPair.bgColor);
            expect(ratio).not.toBeNull();
            if (ratio !== null) {
              expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST_RATIO);
              return ratio >= WCAG_AA_CONTRAST_RATIO;
            }
            return false;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should ensure all dark mode text/background combinations meet WCAG AA contrast ratio', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...resolvedDarkPairs),
          (colorPair) => {
            const ratio = getContrastRatio(colorPair.textColor, colorPair.bgColor);
            expect(ratio).not.toBeNull();
            if (ratio !== null) {
              expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST_RATIO);
              return ratio >= WCAG_AA_CONTRAST_RATIO;
            }
            return false;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should verify specific contrast ratios for all defined color pairs', () => {
      const allPairs = [...resolvedLightPairs, ...resolvedDarkPairs];

      for (const pair of allPairs) {
        const ratio = getContrastRatio(pair.textColor, pair.bgColor);
        expect(ratio).not.toBeNull();
        if (ratio !== null) {
          expect(
            ratio,
            `${pair.name}: ${pair.textColor} on ${pair.bgColor} has ratio ${ratio.toFixed(2)}`
          ).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST_RATIO);
        }
      }
    });
  });
});
