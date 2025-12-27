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

// Read and parse the colors.css file for contrast testing
const colorsPath = path.join(__dirname, 'colors.css');
const colorsCSS = fs.readFileSync(colorsPath, 'utf-8');

/**
 * Extract CSS custom property values from the CSS content
 */
function extractCSSVariables(css: string, selector: string = ':root'): Map<string, string> {
  const variables = new Map<string, string>();
  
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
 * Calculate relative luminance according to WCAG 2.1
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const sRGB = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
  const [r, g, b] = sRGB.map((c) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors according to WCAG 2.1
 * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
function getContrastRatio(color1: string, color2: string): number | null {
  const rgb1 = parseColorToRGB(color1);
  const rgb2 = parseColorToRGB(color2);
  
  if (!rgb1 || !rgb2) return null;
  
  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

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
