import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export function EmptyState({ onReset }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4 shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
        No companies match your filters
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
        Try clearing your search keyword, adjusting industry filters, or turning off specific badge toggles.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All Filters
        </button>
      )}
    </div>
  );
}
