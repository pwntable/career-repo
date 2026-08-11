import React, { useState } from 'react';
import { Search, Sparkles, ShieldCheck, Briefcase, GraduationCap, ArrowRight, Building2, TrendingUp } from 'lucide-react';
import { CompanyCard } from '../components/company/CompanyCard';

export function HomeView({
  companies,
  featuredCompanies,
  categories,
  onSearchSubmit,
  onCategorySelect,
  onSelectCompany,
  bookmarks,
  onToggleBookmark,
  onExploreInternships,
}) {
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onSearchSubmit(heroSearch);
    }
  };

  const topCategoryIcons = {
    'Technology': '💻',
    'Oil & Gas': '⚡',
    'Banking': '🏦',
    'FMCG': '🛒',
    'Government': '🏛️',
    'Fintech': '💳',
    'Automotive': '🚗',
    'Healthcare': '🏥',
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-brand-50/80 via-slate-50 to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-brand-700 dark:text-brand-300 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Official Corporate Portal Directory • Malaysia 2026</span>
          </div>

          {/* Main Title */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Direct Access to Official <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">Career Portals</span> in Malaysia
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Skip third-party job boards. Connect directly with 86+ leading MNCs, GLCs, statutory bodies, and tech hubs across Kuala Lumpur, Cyberjaya, Penang, and Malaysia.
            </p>
          </div>

          {/* Hero Search Input */}
          <form onSubmit={handleHeroSearchSubmit} className="max-w-xl mx-auto relative">
            <div className="flex items-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus-within:border-brand-500 rounded-2xl p-2 shadow-xl transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3 mr-2" />
              <input
                type="text"
                placeholder="Search company (e.g. Petronas, Shell, Maybank, Intel)..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none pr-2"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition flex-shrink-0"
              >
                Search Directory
              </button>
            </div>
          </form>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
            <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
              <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">{companies.length}</div>
              <div className="text-[11px] text-slate-500">Corporate Portals</div>
            </div>
            <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
              <div className="text-lg sm:text-xl font-black text-emerald-600">100%</div>
              <div className="text-[11px] text-slate-500">Verified Web Links</div>
            </div>
            <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
              <div className="text-lg sm:text-xl font-black text-brand-600">
                {companies.filter(c => c.internship_url).length}
              </div>
              <div className="text-[11px] text-slate-500">Internship Programs</div>
            </div>
            <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
              <div className="text-lg sm:text-xl font-black text-purple-600">
                {companies.filter(c => c.graduate_url).length}
              </div>
              <div className="text-[11px] text-slate-500">Graduate Trainees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand-600" /> Explore Key Sectors
          </h2>
          <button
            onClick={() => onSearchSubmit('')}
            className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
          >
            View All Sectors <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.filter(c => c !== 'All').slice(0, 8).map(cat => (
            <div
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-brand-500 hover:shadow-lg transition cursor-pointer group flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                {topCategoryIcons[cat] || '🏢'}
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:hover:text-brand-400 transition">
                  {cat}
                </h4>
                <p className="text-[10px] text-slate-500">
                  {companies.filter(c => c.category === cat).length} Companies
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Companies Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" /> Featured Corporate Employers
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Leading employers hiring top graduates and experienced professionals in Malaysia.
            </p>
          </div>
          <button
            onClick={() => onSearchSubmit('')}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition font-semibold"
          >
            Explore All ({companies.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCompanies.map(company => (
            <CompanyCard
              key={company.id}
              company={company}
              isBookmarked={bookmarks.includes(company.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectCompany={onSelectCompany}
            />
          ))}
        </div>
      </section>

      {/* Quick Callout Cards for Students */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Internship Callout */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">Students & Internships Directory</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Filter companies offering official university internship placements, industrial training programs, and summer attachments.
              </p>
            </div>
            <button
              onClick={onExploreInternships}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-800 rounded-xl text-xs font-bold shadow hover:bg-emerald-50 transition w-fit"
            >
              Browse Internship Portals <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Graduate Trainee Callout */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">Graduate Management Trainees</h3>
              <p className="text-xs text-indigo-100 leading-relaxed">
                Direct links to accelerated management associate & early talent programs across Maybank, Petronas, CIMB, Shell, and MNCs.
              </p>
            </div>
            <button
              onClick={onExploreInternships}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-800 rounded-xl text-xs font-bold shadow hover:bg-indigo-50 transition w-fit"
            >
              Browse Graduate Trainees <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
