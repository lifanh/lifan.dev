import { pdf } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { FinancialStatementPDF } from './index';

interface PDFExportProps {
  data: any;
  type: 'income-statement' | 'balance-sheet' | 'cash-flow' | 'budget';
  title: string;
}

export function PDFExport({ data, type, title }: PDFExportProps) {
  const handleExport = async () => {
    try {
      const doc = <FinancialStatementPDF data={data} type={type} title={title} />;
      const blob = await pdf(doc).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      type="button"
    >
      <Download className="w-4 h-4" />
      Export PDF
    </button>
  );
}
