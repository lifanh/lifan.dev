type Props = {
  visible: boolean;
  onApprove: () => void;
  onReject: () => void;
};

export default function ApprovalGate({ visible, onApprove, onReject }: Props) {
  if (!visible) {
    return null;
  }

  return (
    <div className="border border-blue-200 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/30">
      <p className="font-medium text-slate-900 dark:text-slate-100 mb-3">Approval required before write action.</p>
      <div className="flex gap-2">
        <button type="button" onClick={onApprove} className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors">
          Approve
        </button>
        <button type="button" onClick={onReject} className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 hover:border-blue-400 transition-colors">
          Reject
        </button>
      </div>
    </div>
  );
}
