import React from 'react';
import { Search, RotateCcw, Filter, Check, Briefcase, GraduationCap, ShieldCheck } from 'lucide-react';

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCompanyType,
  setSelectedCompanyType,
  selectedLocation,
  setSelectedLocation,
  onlyInternships,
  setOnlyInternships,
  onlyGraduate,
  setOnlyGraduate,
  onlyVerified,
  setOnlyVerified,
  sortBy,
  setSortBy,
  categories,
  companyTypes,
  locations,
  resetFilters,
  resultCount,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
      {/* Top Search & Sort Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, industry, keywords (e.g. Petronas, Cloud, Banking)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Dropdowns & Sort */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap sm:flex-nowrap">
          {/* Company Type Selector */}
          <select
            value={selectedCompanyType}
            onChange={(e) => setSelectedCompanyType(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="All">All Types</option>
            {companyTypes.filter(t => t !== 'All').map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Location Selector */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="All">All Locations</option>
            {locations.filter(l => l !== 'All').map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="featured">Sort: Featured First</option>
            <option value="name">Sort: Name (A-Z)</option>
            <option value="recent">Sort: Recently Updated</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 pt-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Toggles & Counter Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={onlyInternships}
              onChange={(e) => setOnlyInternships(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-emerald-500" /> Internship Portals
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={onlyGraduate}
              onChange={(e) => setOnlyGraduate(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-purple-500" /> Graduate Trainee
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Verified Only
            </span>
          </label>
        </div>

        <div className="text-slate-500 dark:text-slate-400 font-semibold">
          Showing <span className="text-brand-600 dark:text-brand-400 font-bold">{resultCount}</span> listings
        </div>
      </div>
    </div>
  );
}
