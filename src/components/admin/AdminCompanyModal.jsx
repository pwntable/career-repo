import React, { useState, useEffect } from 'react';
import { X, Check, Building, Link2, MapPin, AlignLeft, ShieldCheck, Star } from 'lucide-react';

export function AdminCompanyModal({ editingCompany, isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    category: 'Technology',
    industry: 'Software & Technology',
    company_type: 'MNC',
    location: 'Kuala Lumpur',
    career_url: '',
    internship_url: '',
    graduate_url: '',
    description: '',
    is_verified: true,
    is_featured: false,
    logo_bg: '#1e3a8a',
  });

  useEffect(() => {
    if (editingCompany) {
      setFormData({
        name: editingCompany.name || '',
        category: editingCompany.category || 'Technology',
        industry: editingCompany.industry || '',
        company_type: editingCompany.company_type || 'MNC',
        location: editingCompany.location || 'Kuala Lumpur',
        career_url: editingCompany.career_url || '',
        internship_url: editingCompany.internship_url || '',
        graduate_url: editingCompany.graduate_url || '',
        description: editingCompany.description || '',
        is_verified: editingCompany.is_verified ?? true,
        is_featured: editingCompany.is_featured ?? false,
        logo_bg: editingCompany.logo_bg || '#1e3a8a',
      });
    } else {
      setFormData({
        name: '',
        category: 'Technology',
        industry: 'Software & Technology',
        company_type: 'MNC',
        location: 'Kuala Lumpur',
        career_url: '',
        internship_url: '',
        graduate_url: '',
        description: '',
        is_verified: true,
        is_featured: false,
        logo_bg: '#1e3a8a',
      });
    }
  }, [editingCompany]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = formData.name.substring(0, 2).toUpperCase();
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const companyData = {
      ...formData,
      id: editingCompany ? editingCompany.id : String(Date.now()),
      slug,
      initials,
      country: 'Malaysia',
      updated_at: new Date().toISOString().split('T')[0],
      internship_url: formData.internship_url || null,
      graduate_url: formData.graduate_url || null,
    };
    onSave(companyData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl relative my-8"
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {editingCompany ? `Edit ${editingCompany.name}` : 'Add New Company Listing'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Malayan Banking Berhad (Maybank)"
              className="w-full p-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <input
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Technology, Banking, Oil & Gas"
                className="w-full p-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Industry Spec</label>
              <input
                required
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="Software, Retail Banking"
                className="w-full p-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Type</label>
              <select
                value={formData.company_type}
                onChange={(e) => setFormData({ ...formData, company_type: e.target.value })}
                className="w-full p-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="MNC">MNC</option>
                <option value="GLC">GLC</option>
                <option value="Local Company">Local Company</option>
                <option value="Fintech">Fintech</option>
                <option value="Government">Government</option>
                <option value="Startup">Startup</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Hub Location</label>
              <input
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Kuala Lumpur, Penang"
                className="w-full p-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Career URL (https://)</label>
            <input
              required
              type="url"
              value={formData.career_url}
              onChange={(e) => setFormData({ ...formData, career_url: e.target.value })}
              placeholder="https://company.com/careers"
              className="w-full p-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Internship URL (Optional)</label>
            <input
              type="url"
              value={formData.internship_url}
              onChange={(e) => setFormData({ ...formData, internship_url: e.target.value })}
              placeholder="https://company.com/internships"
              className="w-full p-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Graduate Trainee URL (Optional)</label>
            <input
              type="url"
              value={formData.graduate_url}
              onChange={(e) => setFormData({ ...formData, graduate_url: e.target.value })}
              placeholder="https://company.com/graduates"
              className="w-full p-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Corporate Summary</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of operations in Malaysia..."
              className="w-full p-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={formData.is_verified}
                onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Mark Verified</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="rounded text-amber-500 focus:ring-amber-500"
              />
              <span>Mark Featured</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-md transition"
          >
            {editingCompany ? 'Save Changes' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
