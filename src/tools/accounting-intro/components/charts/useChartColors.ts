import { useEffect, useState } from 'react';

const FALLBACK_COLORS = [
  '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'
];

function readChartColors(): string[] {
  if (typeof window === 'undefined') return FALLBACK_COLORS;
  const style = getComputedStyle(document.documentElement);
  return Array.from({ length: 6 }, (_, i) => {
    const value = style.getPropertyValue(`--chart-color-${i + 1}`).trim();
    return value || FALLBACK_COLORS[i];
  });
}

export function useChartColors(): string[] {
  const [colors, setColors] = useState<string[]>(() => readChartColors());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setColors(readChartColors());

    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setColors(readChartColors());
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    return () => observer.disconnect();
  }, []);

  return colors;
}

export function useChartColor(index: number = 0): string {
  const colors = useChartColors();
  return colors[index] || FALLBACK_COLORS[0];
}
