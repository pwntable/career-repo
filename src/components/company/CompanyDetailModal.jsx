import React from 'react';
import { X, ExternalLink, ShieldCheck, MapPin, Briefcase, GraduationCap, Bookmark, Building2, Calendar } from 'lucide-react';
import { Badge } from '../common/Badge';

export function CompanyDetailModal({ company, onClose, isBookmarked, onToggleBookmark }) {
  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 pr-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg flex-shrink-0"
            style={{ backgroundColor: company.logo_bg || '#1e3a8a' }}
          >
            {company.initials || company.name.substring(0, 2).toUpperCase()}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {company.name}
              </h2>
              {company.is_verified && (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span>{company.industry}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> {company.location}
              </span>
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="brand">{company.category}</Badge>
          <Badge variant="default">{company.company_type}</Badge>
          <Badge variant="default" className="gap-1">
            <Building2 className="w-3 h-3 text-slate-400" /> {company.country} Hub
          </Badge>
          {company.updated_at && (
            <Badge variant="default" className="gap-1 text-slate-400">
              <Calendar className="w-3 h-3" /> Verified {company.updated_at}
            </Badge>
          )}
        </div>

        {/* Overview Box */}
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            About {company.name}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {company.description}
          </p>
        </div>

        {/* Verified Portals Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Official Portal Directory Links
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Primary Career Portal */}
            <a
              href={company.career_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-md transition group"
            >
              <div className="space-y-0.5">
                <div className="text-xs font-bold">General Careers</div>
                <div className="text-[10px] text-brand-100">Official Portal</div>
              </div>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Internship Portal */}
            {company.internship_url ? (
              <a
                href={company.internship_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> Internship
                  </div>
                  <div className="text-[10px] text-emerald-100">Student Portal</div>
                </div>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ) : (
              <div className="p-3.5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl text-xs flex flex-col justify-center">
                <span className="font-semibold">Internship Portal</span>
                <span className="text-[10px] opacity-75">Not explicitly listed</span>
              </div>
            )}

            {/* Graduate Portal */}
            {company.graduate_url ? (
              <a
                href={company.graduate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md transition group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" /> Graduate
                  </div>
                  <div className="text-[10px] text-purple-100">Trainee Program</div>
                </div>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            ) : (
              <div className="p-3.5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl text-xs flex flex-col justify-center">
                <span className="font-semibold">Graduate Trainee</span>
                <span className="text-[10px] opacity-75">Not explicitly listed</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => onToggleBookmark(company.id, company.name)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              isBookmarked
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
            {isBookmarked ? 'Bookmarked' : 'Save to Bookmarks'}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
