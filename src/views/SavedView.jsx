import React from 'react';
import { Bookmark, Sparkles, ArrowRight } from 'lucide-react';
import { CompanyGrid } from '../components/company/CompanyGrid';

export function SavedView({ companies, bookmarks, onToggleBookmark, onSelectCompany, onExplore }) {
  if (companies.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200 dark:border-amber-800 flex items-center justify-center mx-auto">
          <Bookmark className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">No saved portals yet</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          Click the bookmark icon on any company card to save official portals for quick access during your job search.
        </p>
        <button
          onClick={onExplore}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-md transition"
        >
          Explore All Companies <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-2">
          <Bookmark className="w-3.5 h-3.5" fill="currentColor" /> Saved Shortlist
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Bookmarked Portals ({companies.length})
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Your bookmarked corporate portals saved for instant access.
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
