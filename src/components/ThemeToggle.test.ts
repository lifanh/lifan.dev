/**
 * Unit tests for ThemeToggle theme persistence
 * 
 * Tests localStorage read/write functionality for theme preferences.
 * Requirements: 6.5 - THE Design_System SHALL persist user theme preference across sessions
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getStoredTheme, setStoredTheme, THEME_STORAGE_KEY } from './ThemeToggle';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

describe('Theme Persistence', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('getStoredTheme', () => {
    it('returns null when no theme is stored', () => {
      const result = getStoredTheme();
      expect(result).toBeNull();
      expect(localStorageMock.getItem).toHaveBeenCalledWith(THEME_STORAGE_KEY);
    });

    it('returns "light" when light theme is stored', () => {
      localStorageMock.setItem(THEME_STORAGE_KEY, 'light');
      const result = getStoredTheme();
      expect(result).toBe('light');
    });

    it('returns "dark" when dark theme is stored', () => {
      localStorageMock.setItem(THEME_STORAGE_KEY, 'dark');
      const result = getStoredTheme();
      expect(result).toBe('dark');
    });

    it('returns null for invalid stored values', () => {
      localStorageMock.setItem(THEME_STORAGE_KEY, 'invalid');
      const result = getStoredTheme();
      expect(result).toBeNull();
    });
  });

  describe('setStoredTheme', () => {
    it('stores "light" theme to localStorage', () => {
      setStoredTheme('light');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, 'light');
    });

    it('stores "dark" theme to localStorage', () => {
      setStoredTheme('dark');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, 'dark');
    });

    it('removes theme from localStorage when set to "system"', () => {
      setStoredTheme('system');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(THEME_STORAGE_KEY);
    });
  });

  describe('round-trip persistence', () => {
    it('persists and retrieves light theme correctly', () => {
      setStoredTheme('light');
      const retrieved = getStoredTheme();
      expect(retrieved).toBe('light');
    });

    it('persists and retrieves dark theme correctly', () => {
      setStoredTheme('dark');
      const retrieved = getStoredTheme();
      expect(retrieved).toBe('dark');
    });

    it('system theme clears storage and returns null', () => {
      setStoredTheme('dark');
      setStoredTheme('system');
      const retrieved = getStoredTheme();
      expect(retrieved).toBeNull();
    });
  });
});
