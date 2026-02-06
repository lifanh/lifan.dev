import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, ModuleProgress } from '../types';
import { DEFAULT_PROGRESS } from '../types/user';

interface ProgressState {
  progress: UserProgress;
  setCurrentModule: (moduleId: number) => void;
  completeModule: (moduleId: number) => void;
  updateModuleProgress: (moduleId: number, sectionId: string) => void;
  completeQuiz: (moduleId: number, score: number) => void;
  addTimeSpent: (seconds: number) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: DEFAULT_PROGRESS,

      setCurrentModule: (moduleId: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            currentModule: moduleId,
            lastVisited: new Date().toISOString(),
          },
        }));
      },

      completeModule: (moduleId: number) => {
        set((state) => {
          const completedModules = state.progress.completedModules.includes(moduleId)
            ? state.progress.completedModules
            : [...state.progress.completedModules, moduleId];
          return {
            progress: {
              ...state.progress,
              completedModules,
            },
          };
        });
      },

      updateModuleProgress: (moduleId: number, sectionId: string) => {
        set((state) => {
          const existing: ModuleProgress = state.progress.moduleProgress[moduleId] || {
            moduleId,
            sectionsCompleted: [],
            quizCompleted: false,
            quizScore: null,
            timeSpent: 0,
            lastAccessed: new Date().toISOString(),
          };

          const sectionsCompleted = existing.sectionsCompleted.includes(sectionId)
            ? existing.sectionsCompleted
            : [...existing.sectionsCompleted, sectionId];

          return {
            progress: {
              ...state.progress,
              moduleProgress: {
                ...state.progress.moduleProgress,
                [moduleId]: {
                  ...existing,
                  sectionsCompleted,
                  lastAccessed: new Date().toISOString(),
                },
              },
            },
          };
        });
      },

      completeQuiz: (moduleId: number, score: number) => {
        set((state) => {
          const existing: ModuleProgress = state.progress.moduleProgress[moduleId] || {
            moduleId,
            sectionsCompleted: [],
            quizCompleted: false,
            quizScore: null,
            timeSpent: 0,
            lastAccessed: new Date().toISOString(),
          };

          return {
            progress: {
              ...state.progress,
              moduleProgress: {
                ...state.progress.moduleProgress,
                [moduleId]: {
                  ...existing,
                  quizCompleted: true,
                  quizScore: score,
                  lastAccessed: new Date().toISOString(),
                },
              },
            },
          };
        });
      },

      addTimeSpent: (seconds: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            totalTimeSpent: state.progress.totalTimeSpent + seconds,
          },
        }));
      },

      resetProgress: () => {
        set({ progress: DEFAULT_PROGRESS });
      },
    }),
    {
      name: 'philosophy-intro:progress',
    }
  )
);
