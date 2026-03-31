import type { ReactNode } from 'react';

type CardVariant = 'info' | 'warning' | 'success' | 'error' | 'neutral';

interface ContentCardProps {
  variant?: CardVariant;
  title?: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<CardVariant, { bg: string; border: string; title: string; text: string }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    title: 'text-blue-800 dark:text-blue-200',
    text: 'text-blue-700 dark:text-blue-300',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    title: 'text-amber-800 dark:text-amber-200',
    text: 'text-amber-700 dark:text-amber-300',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    title: 'text-green-800 dark:text-green-200',
    text: 'text-green-700 dark:text-green-300',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    title: 'text-red-800 dark:text-red-200',
    text: 'text-red-700 dark:text-red-300',
  },
  neutral: {
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    border: 'border-slate-200 dark:border-slate-700',
    title: 'text-slate-800 dark:text-slate-200',
    text: 'text-slate-700 dark:text-slate-300',
  },
};

export function ContentCard({ variant = 'neutral', title, icon, children, className = '' }: ContentCardProps) {
  const styles = variantStyles[variant];
  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 ${className}`}>
      {title && (
        <h4 className={`font-medium ${styles.title} mb-2`}>
          {icon && <span className="mr-1.5" role="img" aria-hidden="true">{icon}</span>}
          {title}
        </h4>
      )}
      <div className={`text-sm ${styles.text}`}>{children}</div>
    </div>
  );
}
