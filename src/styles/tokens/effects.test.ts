/**
 * Property-Based Tests for Effects System Tokens
 * 
 * Feature: design-guideline
 * Tests validate correctness properties from the design document.
 */

import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

// Read and parse the effects.css file
const effectsPath = path.join(__dirname, 'effects.css');
const effectsCSS = fs.readFileSync(effectsPath, 'utf-8');

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
 * Parse a duration value to milliseconds
 * Supports: 150ms, 0.15s, etc.
 */
function parseDurationToMs(duration: string): number | null {
  // Match milliseconds (e.g., "150ms")
  const msMatch = duration.match(/^(\d+(?:\.\d+)?)\s*ms/);
  if (msMatch) {
    return parseFloat(msMatch[1]);
  }
  
  // Match seconds (e.g., "0.15s")
  const sMatch = duration.match(/^(\d+(?:\.\d+)?)\s*s/);
  if (sMatch) {
    return parseFloat(sMatch[1]) * 1000;
  }
  
  return null;
}

/**
 * Extract duration from a transition value
 * e.g., "150ms ease" -> 150
 */
function extractDurationFromTransition(transition: string): number | null {
  // Try to find duration in the transition value
  const parts = transition.split(/\s+/);
  for (const part of parts) {
    const duration = parseDurationToMs(part);
    if (duration !== null) {
      return duration;
    }
  }
  return null;
}

// Extract variables from :root
const rootVariables = extractCSSVariables(effectsCSS, ':root');

// Get all transition and duration tokens
const transitionTokens: Array<{ name: string; value: string; durationMs: number }> = [];

for (const [key, value] of rootVariables) {
  if (key.includes('transition') || key.includes('duration')) {
    const duration = key.includes('duration') 
      ? parseDurationToMs(value) 
      : extractDurationFromTransition(value);
    
    if (duration !== null) {
      transitionTokens.push({ name: key, value, durationMs: duration });
    }
  }
}

describe('Effects System Properties', () => {
  /**
   * Feature: design-guideline, Property 2: Transition Duration Bounds
   * 
   * *For any* transition duration defined in the design system, that duration 
   * SHALL be between 150ms and 300ms inclusive.
   * 
   * **Validates: Requirements 4.4, 5.2**
   */
  describe('Property 2: Transition Duration Bounds', () => {
    const MIN_DURATION = 150;
    const MAX_DURATION = 300;

    it('should ensure all transition durations are between 150ms and 300ms', () => {
      // Ensure we have tokens to test
      expect(transitionTokens.length).toBeGreaterThan(0);

      fc.assert(
        fc.property(
          fc.constantFrom(...transitionTokens),
          (token) => {
            const isWithinBounds = token.durationMs >= MIN_DURATION && token.durationMs <= MAX_DURATION;
            expect(isWithinBounds).toBe(true);
            return isWithinBounds;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should verify fast transition is 150ms', () => {
      const fastTransition = transitionTokens.find(t => t.name === '--transition-fast');
      const fastDuration = transitionTokens.find(t => t.name === '--duration-fast');
      
      expect(fastTransition).toBeDefined();
      expect(fastTransition?.durationMs).toBe(150);
      
      expect(fastDuration).toBeDefined();
      expect(fastDuration?.durationMs).toBe(150);
    });

    it('should verify default transition is 200ms', () => {
      const defaultTransition = transitionTokens.find(t => t.name === '--transition-default');
      const defaultDuration = transitionTokens.find(t => t.name === '--duration-default');
      
      expect(defaultTransition).toBeDefined();
      expect(defaultTransition?.durationMs).toBe(200);
      
      expect(defaultDuration).toBeDefined();
      expect(defaultDuration?.durationMs).toBe(200);
    });

    it('should verify slow transition is 300ms', () => {
      const slowTransition = transitionTokens.find(t => t.name === '--transition-slow');
      const slowDuration = transitionTokens.find(t => t.name === '--duration-slow');
      
      expect(slowTransition).toBeDefined();
      expect(slowTransition?.durationMs).toBe(300);
      
      expect(slowDuration).toBeDefined();
      expect(slowDuration?.durationMs).toBe(300);
    });

    it('should have exactly 3 transition speed variants', () => {
      const transitionVariants = transitionTokens.filter(t => t.name.startsWith('--transition-'));
      expect(transitionVariants.length).toBe(3);
    });
  });
});
