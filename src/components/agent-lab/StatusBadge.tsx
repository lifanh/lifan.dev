import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  XCircle,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { AgentRunResult } from '../../lib/agent-lab/types';

type StatusBadgeProps = {
  isRunning: boolean;
  result: AgentRunResult | null;
};

type Tone = 'neutral' | 'info' | 'good' | 'warn' | 'bad';

type Status = {
  label: string;
  icon: ReactNode;
  description: string;
  tone: Tone;
};

const TONE_CLASSES: Record<Tone, string> = {
  neutral:
    'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200',
  info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800/50 dark:bg-blue-950/30 dark:text-blue-200',
  good: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-200',
  warn: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/30 dark:text-amber-200',
  bad: 'border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-100',
};

function deriveStatus(props: StatusBadgeProps): Status {
  const { isRunning, result } = props;

  if (isRunning) {
    return {
      label: 'Running',
      icon: <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden="true" />,
      description: 'Agent loop in progress',
      tone: 'info',
    };
  }

  if (!result) {
    return {
      label: 'Idle',
      icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
      description: 'Pick a scenario and run the simulation',
      tone: 'neutral',
    };
  }

  if (result.status === 'error') {
    return {
      label: 'Error',
      icon: <AlertTriangle className="h-4 w-4" aria-hidden="true" />,
      description: 'Run aborted before producing a final answer',
      tone: 'warn',
    };
  }

  if (result.status === 'waiting_for_approval') {
    return {
      label: 'Awaiting human approval',
      icon: <Clock className="h-4 w-4" aria-hidden="true" />,
      description: 'A write action requires a human decision',
      tone: 'warn',
    };
  }

  // status === 'completed'
  const decision = result.recommendation.decision;

  if (decision === 'approve') {
    return {
      label: 'Auto-approved',
      icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
      description: 'Order can proceed without human approval',
      tone: 'good',
    };
  }

  if (decision === 'block') {
    return {
      label: 'Blocked',
      icon: <XCircle className="h-4 w-4" aria-hidden="true" />,
      description: 'Order cannot proceed under current policy',
      tone: 'bad',
    };
  }

  // decision === 'review_required' && completed → human approved/rejected
  if (result.ticket) {
    return {
      label: 'Approved with review ticket',
      icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
      description: 'Human approved; credit review ticket created',
      tone: 'info',
    };
  }

  return {
    label: 'Rejected by human',
    icon: <ShieldAlert className="h-4 w-4" aria-hidden="true" />,
    description: 'Human rejected the proposed write action',
    tone: 'warn',
  };
}

export function StatusBadge(props: StatusBadgeProps) {
  const status = deriveStatus(props);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex max-w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${TONE_CLASSES[status.tone]}`}
    >
      {status.icon}
      <span>{status.label}</span>
      <span className="hidden text-xs font-normal opacity-80 sm:inline">— {status.description}</span>
    </div>
  );
}
