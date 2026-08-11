import React from 'react';
import { GraduationCap } from 'lucide-react';
import { CompanyGrid } from '../components/company/CompanyGrid';

export function GraduateView({ companies, bookmarks, onToggleBookmark, onSelectCompany }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
          <GraduationCap className="w-3.5 h-3.5" /> Early Talent & Management Associates
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Graduate Trainee Programs ({companies.length})
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Structured leadership development programs, management associate tracks, and early career entry pathways.
        </p>
      </div>

      <CompanyGrid
        companies={companies}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
        onSelectCompany={onSelectCompany}
      />
    </div>
  );
}
