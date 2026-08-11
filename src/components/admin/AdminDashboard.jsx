import React, { useState } from 'react';
import { Plus, Search, CheckCircle, Star, Edit, Trash2, ShieldCheck, Briefcase } from 'lucide-react';

export function AdminDashboard({
  companies,
  onAddNew,
  onEdit,
  onDelete,
  onToggleVerified,
  onToggleFeatured,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Listed</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{companies.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Verified Portals</div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {companies.filter(c => c.is_verified).length}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">With Internships</div>
          <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400 mt-1">
            {companies.filter(c => Boolean(c.internship_url)).length}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Featured Portals</div>
          <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
            {companies.filter(c => c.is_featured).length}
          </div>
        </div>
      </div>

      {/* Dashboard Data Table Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter admin database..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <button
          onClick={onAddNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-md transition"
        >
          <Plus className="w-4 h-4" /> Add New Company
        </button>
      </div>

      {/* Data Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Company</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Internship</th>
                <th className="p-3.5">Verified</th>
                <th className="p-3.5">Featured</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">
                    <div>{c.name}</div>
                    <div className="text-[10px] font-normal text-slate-400">{c.location}</div>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{c.category}</td>
                  <td className="p-3.5">
                    {c.internship_url ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => onToggleVerified(c.id)}
                      className="font-medium hover:underline text-xs"
                    >
                      {c.is_verified ? '✅ Verified' : '❌ Unverified'}
                    </button>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => onToggleFeatured(c.id)}
                      className="font-medium hover:underline text-xs"
                    >
                      {c.is_featured ? '⭐ Featured' : '☆ Standard'}
                    </button>
                  </td>
                  <td className="p-3.5 text-right space-x-3">
                    <button
                      onClick={() => onEdit(c)}
                      className="text-brand-600 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${c.name} from directory?`)) {
                          onDelete(c.id, c.name);
                        }
                      }}
                      className="text-rose-600 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
