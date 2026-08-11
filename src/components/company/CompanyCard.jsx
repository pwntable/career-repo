import React from 'react';
import { Bookmark, ExternalLink, ShieldCheck, MapPin, Briefcase, GraduationCap, Star } from 'lucide-react';
import { Badge } from '../common/Badge';

export function CompanyCard({ company, isBookmarked, onToggleBookmark, onSelectCompany }) {
  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden">
      {/* Featured Ribbon / Highlight */}
      {company.is_featured && (
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-[9px] font-black text-white py-0.5 text-center shadow-md transform rotate-45 translate-x-4 translate-y-3 w-24">
            FEATURED
          </div>
        </div>
      )}

      <div>
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md flex-shrink-0"
              style={{ backgroundColor: company.logo_bg || '#1e3a8a' }}
            >
              {company.initials || company.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3
                onClick={() => onSelectCompany(company)}
                className="font-bold text-base text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer line-clamp-1 transition-colors flex items-center gap-1.5"
              >
                {company.name}
                {company.is_verified && (
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" title="Verified Portal" />
                )}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {company.location}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(company.id, company.name);
            }}
            className={`p-1.5 rounded-lg border transition ${
              isBookmarked
                ? 'bg-amber-50 border-amber-200 text-amber-500 dark:bg-amber-950/40 dark:border-amber-800'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title={isBookmarked ? "Remove bookmark" : "Save company"}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <Badge variant="brand">{company.category}</Badge>
          <Badge variant="default">{company.company_type}</Badge>
          {company.ats_type && (
            <Badge variant="amber" className="text-[9px]">
              ATS: {company.ats_type}
            </Badge>
          )}
          {company.internship_url && (
            <Badge variant="emerald" className="gap-1">
              <Briefcase className="w-2.5 h-2.5" /> Internship
            </Badge>
          )}
          {company.graduate_url && (
            <Badge variant="purple" className="gap-1">
              <GraduationCap className="w-2.5 h-2.5" /> Grad Trainee
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {company.description}
        </p>
      </div>

      {/* Action Links Row */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <button
          onClick={() => onSelectCompany(company)}
          className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium transition"
        >
          View Overview
        </button>

        <a
          href={company.career_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg shadow-sm hover:shadow transition"
        >
          <span>Career Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
