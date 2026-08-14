import React, { useRef } from 'react';
import { Download, Upload, RotateCcw, ShieldAlert, FileText } from 'lucide-react';
import { companyService } from '../../services/companyService';

export function DataBackupManager({ companies, onImport, onReset, showToast }) {
  const fileInputRef = useRef(null);

  const handleExport = () => {
    companyService.exportToJsonFile(companies);
    showToast('Exported company database to JSON file', 'success');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = companyService.importFromJsonFile(event.target.result);
        onImport(imported);
      } catch (err) {
        showToast(err.message || 'Failed to parse JSON file', 'warn');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" /> Data Backup & System Management
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Export company directory as JSON, load custom database backups, or reset to original seed dataset.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {/* Export Card */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between gap-3">
          <div>
            <div className="font-bold text-slate-900 dark:text-white mb-1">Export Database JSON</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Download current ({companies.length}) listings as a structured JSON file for backup or code deployment.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition"
          >
            <Download className="w-3.5 h-3.5" /> Export JSON File
          </button>
        </div>

        {/* Import Card */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between gap-3">
          <div>
            <div className="font-bold text-slate-900 dark:text-white mb-1">Import Database JSON</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Upload a previously exported JSON backup to overwrite local database.
            </p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 font-semibold rounded-lg transition"
          >
            <Upload className="w-3.5 h-3.5" /> Choose JSON File
          </button>
        </div>

        {/* Reset Card */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between gap-3">
          <div>
            <div className="font-bold text-slate-900 dark:text-white mb-1">Reset to Seed Data</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Restore initial seed dataset ({companies.length} portals) and discard local changes.
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all companies to seed data?")) {
                onReset();
              }
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Seed Data
          </button>
        </div>
      </div>
    </div>
  );
}
