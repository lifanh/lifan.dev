import { describe, expect, it } from 'vitest';
import { nextSectionIndex } from './useSectionTracker';

describe('nextSectionIndex', () => {
  it('returns -1 when there are no sections', () => {
    expect(nextSectionIndex(-1, 1, 0)).toBe(-1);
  });

  it('moves forward and backward within bounds', () => {
    expect(nextSectionIndex(0, 1, 5)).toBe(1);
    expect(nextSectionIndex(2, -1, 5)).toBe(1);
  });

  it('clamps at the first and last section', () => {
    expect(nextSectionIndex(0, -1, 5)).toBe(0);
    expect(nextSectionIndex(4, 1, 5)).toBe(4);
  });

  it('treats an unknown current (-1) as the first section', () => {
    expect(nextSectionIndex(-1, 1, 5)).toBe(1);
    expect(nextSectionIndex(-1, -1, 5)).toBe(0);
  });
});
