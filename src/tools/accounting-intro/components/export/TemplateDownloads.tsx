import { Building2, Download, FileSpreadsheet, User } from 'lucide-react';
import { TEMPLATES, downloadTemplate, type TemplateInfo } from './templates';

interface TemplateDownloadsProps {
  category?: 'personal' | 'business' | 'both' | 'all';
}

function getCategoryIcon(category: TemplateInfo['category']) {
  switch (category) {
    case 'personal':
      return <User className="w-4 h-4 text-blue-500" />;
    case 'business':
      return <Building2 className="w-4 h-4 text-green-500" />;
    case 'both':
      return <FileSpreadsheet className="w-4 h-4 text-purple-500" />;
  }
}

function getCategoryLabel(category: TemplateInfo['category']) {
  switch (category) {
    case 'personal':
      return 'Personal';
    case 'business':
      return 'Business';
    case 'both':
      return 'Personal & Business';
  }
}

export function TemplateDownloads({ category = 'all' }: TemplateDownloadsProps) {
  const filteredTemplates =
    category === 'all'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === category || t.category === 'both');

  const handleDownload = (templateId: string) => {
    downloadTemplate(templateId);
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-lg font-semibold text-white">Downloadable Templates</h3>
            <p className="text-blue-100 text-sm">Ready-to-use spreadsheet templates for your finances</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filter Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" />
            <span className="text-slate-600 dark:text-slate-400">Personal</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-green-500" />
            <span className="text-slate-600 dark:text-slate-400">Business</span>
          </div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-purple-500" />
            <span className="text-slate-600 dark:text-slate-400">Both</span>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon(template.category)}
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">{template.name}</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {template.description}
                  </p>
                  <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded">
                    {getCategoryLabel(template.category)}
                  </span>
                </div>
                <button
                  onClick={() => handleDownload(template.id)}
                  className="flex-shrink-0 p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                  aria-label={`Download ${template.name}`}
                  title="Download CSV"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
            💡 Tips for Using Templates
          </h5>
          <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
            <li>• Templates download as CSV files, compatible with Excel, Google Sheets, and more.</li>
            <li>• Customize categories and rows to match your specific needs.</li>
            <li>• Save your work regularly and back up important financial documents.</li>
            <li>• Consider password-protecting sensitive financial files.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
