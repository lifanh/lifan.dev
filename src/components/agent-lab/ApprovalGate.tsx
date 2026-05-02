import { ShieldAlert } from 'lucide-react';
import type { PendingApproval } from '../../lib/agent-lab/types';

type ApprovalGateProps = {
  pendingApproval?: PendingApproval;
  isRunning: boolean;
  onApprove: () => void;
  onReject: () => void;
};

export function ApprovalGate({ pendingApproval, isRunning, onApprove, onReject }: ApprovalGateProps) {
  if (!pendingApproval) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-300 bg-slate-100 p-4 dark:border-slate-600 dark:bg-slate-800">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
          <ShieldAlert className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">Human approval required</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{pendingApproval.reason}</p>
          <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            Proposed action: {pendingApproval.toolName}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onApprove}
              disabled={isRunning}
              className="min-h-[44px] rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:focus-visible:ring-offset-slate-900"
            >
              Approve ticket
            </button>
            <button
              type="button"
              onClick={onReject}
              disabled={isRunning}
              className="min-h-[44px] rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
