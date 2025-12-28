/**
 * Property-Based Tests for Spacing System Tokens
 * 
 * Feature: design-guideline
 * Tests validate correctness properties from the design document.
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

// Read and parse the spacing.css file
const spacingPath = path.join(__dirname, 'spacing.css');
const spacingCSS = fs.readFileSync(spacingPath, 'utf-8');

/**
 * Extract CSS custom property values from the CSS content
 * Uses brace-matching to correctly handle nested CSS blocks
 */
function extractCSSVariables(css: string, selector: string = ':root'): Map<string, string> {
  const variables = new Map<string, string>();
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const selectorRegex = new RegExp(`${escapedSelector}\\s*\\{`, 'g');
  
  let match;
  while ((match = selectorRegex.exec(css)) !== null) {
    // Find matching closing brace with proper nesting
    let depth = 1;
    const start = match.index + match[0].length;
    let i = start;
    
    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}') depth--;
      i++;
    }
    
    const block = css.slice(start, i - 1);
    const varRegex = /--([\w-]+):\s*([^;]+);/g;
    let varMatch;
    while ((varMatch = varRegex.exec(block)) !== null) {
      variables.set(`--${varMatch[1]}`, varMatch[2].trim());
    }
  }
  
  return variables;
}

/**
 * Parse a pixel value to a number
 * Returns null if not a valid pixel value
 */
function parsePixelValue(value: string): number | null {
  // Handle var() references - skip these as they reference other spacing tokens
  if (value.startsWith('var(')) {
    return null;
  }
  
  const match = value.match(/^(\d+)px$/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

// Extract all spacing variables from :root
const rootVariables = extractCSSVariables(spacingCSS, ':root');

// Get all spacing scale values (--spacing-* tokens with pixel values)
const spacingValues: { name: string; value: number }[] = [];
for (const [key, value] of rootVariables) {
  if (key.startsWith('--spacing-')) {
    const pixelValue = parsePixelValue(value);
    if (pixelValue !== null) {
      spacingValues.push({ name: key, value: pixelValue });
    }
  }
}

describe('Spacing System Properties', () => {
  /**
   * Feature: design-guideline, Property 1: Spacing Scale Base-4 Invariant
   * 
   * *For any* spacing value defined in the spacing system, that value SHALL 
   * be a multiple of 4 pixels.
   * 
   * **Validates: Requirements 3.1**
   */
  describe('Property 1: Spacing Scale Base-4 Invariant', () => {
    it('should ensure all spacing values are multiples of 4px', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...spacingValues),
          (spacing) => {
            const isMultipleOf4 = spacing.value % 4 === 0;
            expect(isMultipleOf4, `${spacing.name}: ${spacing.value}px is not a multiple of 4`).toBe(true);
            return isMultipleOf4;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should verify all spacing tokens individually', () => {
      for (const spacing of spacingValues) {
        expect(
          spacing.value % 4,
          `${spacing.name}: ${spacing.value}px should be a multiple of 4`
        ).toBe(0);
      }
    });

    it('should have the expected spacing scale values', () => {
      const expectedScale = [0, 4, 8, 12, 16, 24, 32, 48, 64, 96];
      const actualValues = spacingValues.map((s) => s.value).sort((a, b) => a - b);
      
      expect(actualValues).toEqual(expectedScale);
    });
  });
});
