import { useMemo } from 'react';

const FALLBACK_COLORS = [
  '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'
];

export function useChartColors(): string[] {
  return useMemo(() => {
    if (typeof window === 'undefined') return FALLBACK_COLORS;
    const style = getComputedStyle(document.documentElement);
    return Array.from({ length: 6 }, (_, i) => {
      const value = style.getPropertyValue(`--chart-color-${i + 1}`).trim();
      return value || FALLBACK_COLORS[i];
    });
  }, []);
}

export function useChartColor(index: number = 0): string {
  const colors = useChartColors();
  return colors[index] || FALLBACK_COLORS[0];
}
