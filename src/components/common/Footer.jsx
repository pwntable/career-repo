import React from 'react';
import { ExternalLink, Heart, ShieldCheck } from 'lucide-react';

export function Footer({ totalCount, onCategorySelect }) {
  const popularCategories = ['Technology', 'Oil & Gas', 'Banking', 'FMCG', 'Government', 'Fintech'];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
              <span className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white text-sm font-black">
                C
              </span>
              CareerHub Malaysia
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Curated official corporate career and internship portal directory in Malaysia. Directly access verified corporate application pages for MNCs, GLCs, statutory bodies, and tech leaders.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{totalCount} Verified Official Portals</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Explore Industry Sectors
            </h4>
            <ul className="space-y-2 text-xs">
              {popularCategories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => onCategorySelect && onCategorySelect(cat)}
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition"
                  >
                    {cat} Careers
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              About & Disclaimer
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              CareerHub Malaysia is an independent directory service linking candidates directly to corporate career web pages. All trademarks belong to their respective corporate owners.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} CareerHub MY Directory. Built for Malaysian Talents.</p>
          <div className="flex items-center gap-1.5 text-xs">
            <span>Developed by</span>
            <a
              href="https://github.com/pwntable"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition underline decoration-brand-500/50 flex items-center gap-1"
            >
              pwntable
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
