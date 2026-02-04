import type { ModuleProgress } from './module';

export interface UserProgress {
  currentModule: number;
  completedModules: number[];
  moduleProgress: Record<number, ModuleProgress>;
  totalTimeSpent: number;
  lastVisited: string;
  streak: number;
  longestStreak: number;
}

export interface UserPreferences {
  darkMode: boolean;
  animationsEnabled: boolean;
  showHints: boolean;
}

export const DEFAULT_PROGRESS: UserProgress = {
  currentModule: 1,
  completedModules: [],
  moduleProgress: {},
  totalTimeSpent: 0,
  lastVisited: new Date().toISOString(),
  streak: 0,
  longestStreak: 0,
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  darkMode: false,
  animationsEnabled: true,
  showHints: true,
};
