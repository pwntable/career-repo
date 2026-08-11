import React, { useState } from 'react';
import { Sun, Moon, Menu, Bookmark, Building, GraduationCap, Briefcase, ShieldCheck, X } from 'lucide-react';

export function Navbar({
  activeTab,
  setActiveTab,
  totalCompaniesCount,
  internshipsCount,
  graduateCount,
  bookmarksCount,
  theme,
  onToggleTheme,
  onOnlyInternships,
  onOnlyGraduate,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab, action) => {
    setActiveTab(tab);
    if (action) action();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-indigo-600 flex items-center justify-center text-white shadow-md font-extrabold text-xl group-hover:scale-105 transition-transform">
            C
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              CareeRepo{' '}
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 font-semibold">
                MY
              </span>
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 hidden sm:block">
              Official Corporate Career Directory
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'home'
                ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('companies')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'companies'
                ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            All Companies ({totalCompaniesCount})
          </button>

          <button
            onClick={() => handleNavClick('internships', onOnlyInternships)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'internships'
                ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Internships
          </button>

          <button
            onClick={() => handleNavClick('graduate', onOnlyGraduate)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'graduate'
                ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            Graduate Programs
          </button>

          <button
            onClick={() => handleNavClick('saved')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <span>Saved</span>
            {bookmarksCount > 0 && (
              <span className="px-1.5 py-0.2 text-xs rounded-full bg-brand-600 text-white font-semibold">
                {bookmarksCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('ai-hub')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
              activeTab === 'ai-hub'
                ? 'bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <span>AI & API Hub</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-purple-600 text-white font-bold tracking-wider uppercase">
              AI Ready
            </span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Toggle light/dark mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left px-3 py-2 text-sm rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('companies')}
            className="block w-full text-left px-3 py-2 text-sm rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            All Companies ({totalCompaniesCount})
          </button>
          <button
            onClick={() => handleNavClick('internships', onOnlyInternships)}
            className="block w-full text-left px-3 py-2 text-sm rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Internship Portals ({internshipsCount})
          </button>
          <button
            onClick={() => handleNavClick('graduate', onOnlyGraduate)}
            className="block w-full text-left px-3 py-2 text-sm rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Graduate Programmes ({graduateCount})
          </button>
          <button
            onClick={() => handleNavClick('saved')}
            className="block w-full text-left px-3 py-2 text-sm rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Saved Companies ({bookmarksCount})
          </button>
          <button
            onClick={() => handleNavClick('ai-hub')}
            className="block w-full text-left px-3 py-2 text-sm rounded-md font-semibold text-purple-600 dark:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            🤖 AI Agent & Developer Hub
          </button>
        </div>
      )}
    </header>
  );
}
