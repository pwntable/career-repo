import React, { useState } from 'react';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { DataBackupManager } from '../components/admin/DataBackupManager';
import { AdminCompanyModal } from '../components/admin/AdminCompanyModal';

export function AdminView({
  companies,
  onAddCompany,
  onUpdateCompany,
  onDeleteCompany,
  onToggleVerified,
  onToggleFeatured,
  onResetDataset,
  onImportDataset,
  showToast,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const handleAddNew = () => {
    setEditingCompany(null);
    setIsModalOpen(true);
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleSaveModal = (companyData) => {
    if (editingCompany) {
      onUpdateCompany(editingCompany.id, companyData);
    } else {
      onAddCompany(companyData);
    }
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Management Portal</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage corporate directory listings, verify career links, feature key employers, and manage database backups.
        </p>
      </div>

      <AdminDashboard
        companies={companies}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={onDeleteCompany}
        onToggleVerified={onToggleVerified}
        onToggleFeatured={onToggleFeatured}
      />

      <DataBackupManager
        companies={companies}
        onImport={onImportDataset}
        onReset={onResetDataset}
        showToast={showToast}
      />

      <AdminCompanyModal
        editingCompany={editingCompany}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
      />
    </div>
  );
}
