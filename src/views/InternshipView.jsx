import React from 'react';
import { Briefcase, ShieldCheck } from 'lucide-react';
import { CompanyGrid } from '../components/company/CompanyGrid';

export function InternshipView({ companies, bookmarks, onToggleBookmark, onSelectCompany }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Briefcase className="w-3.5 h-3.5" /> University Student Placements
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Official Internship Portals ({companies.length})
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Direct links to corporate student application pages for industrial attachment, undergraduate internships, and summer programs.
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
