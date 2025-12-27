import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

/** Storage key for theme persistence */
export const THEME_STORAGE_KEY = 'theme';

/** Valid theme values for localStorage */
export const VALID_THEMES: readonly Theme[] = ['light', 'dark', 'system'] as const;

/**
 * Reads the saved theme from localStorage.
 * Returns null if no valid theme is saved or localStorage is unavailable.
 */
export function getStoredTheme(): Theme | null {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return null;
  } catch {
    // localStorage unavailable (e.g., SSR, private browsing)
    return null;
  }
}

/**
 * Saves the theme to localStorage.
 * For 'system' theme, removes the stored preference.
 */
export function setStoredTheme(theme: Theme): void {
  try {
    if (theme === 'system') {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch {
    // localStorage unavailable - fail silently
  }
}

/**
 * Applies the theme to the document by toggling the 'dark' class.
 * Also enables smooth color transitions during theme switch.
 */
function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  
  // Enable smooth transitions for theme switching (uses --transition-default: 200ms)
  root.style.setProperty('transition', 'background-color var(--transition-default), color var(--transition-default)');
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    // System preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const savedTheme = getStoredTheme();
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const updateTheme = (newTheme: Theme) => {
    applyTheme(newTheme);
    setStoredTheme(newTheme);
    setTheme(newTheme);
  };

  // Transition classes using design tokens (--transition-default: 200ms ease)
  const transitionClasses = 'transition-all duration-[var(--duration-default)] ease-[var(--ease-default)]';

  return (
    <div 
      className={`flex items-center space-x-2 bg-slate-200 dark:bg-slate-700 rounded-full p-1 ${transitionClasses}`}
    >
      <button
        onClick={() => updateTheme('light')}
        className={`p-1.5 rounded-full ${transitionClasses} ${
          theme === 'light'
            ? 'bg-white text-yellow-500 shadow-[var(--shadow-soft)]'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
        }`}
        aria-label="Light Mode"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>
      <button
        onClick={() => updateTheme('system')}
        className={`p-1.5 rounded-full ${transitionClasses} ${
          theme === 'system'
            ? 'bg-white dark:bg-slate-600 text-blue-500 dark:text-blue-300 shadow-[var(--shadow-soft)]'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
        }`}
        aria-label="System Mode"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      </button>
      <button
        onClick={() => updateTheme('dark')}
        className={`p-1.5 rounded-full ${transitionClasses} ${
          theme === 'dark'
            ? 'bg-slate-600 text-slate-100 shadow-[var(--shadow-soft)]'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
        }`}
        aria-label="Dark Mode"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    </div>
  );
}
