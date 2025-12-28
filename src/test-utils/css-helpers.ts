/**
 * Shared CSS parsing utility functions for tests
 */

/**
 * Extract CSS custom property values from CSS content
 * Uses brace-matching to correctly handle nested CSS blocks
 */
export function extractCSSVariables(css: string, selector: string = ':root'): Map<string, string> {
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
