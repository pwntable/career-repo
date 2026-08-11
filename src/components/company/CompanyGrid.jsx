import React from 'react';
import { CompanyCard } from './CompanyCard';
import { EmptyState } from '../common/EmptyState';

export function CompanyGrid({
  companies,
  bookmarks,
  onToggleBookmark,
  onSelectCompany,
  resetFilters,
}) {
  if (companies.length === 0) {
    return <EmptyState onReset={resetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map(company => (
        <CompanyCard
          key={company.id}
          company={company}
          isBookmarked={bookmarks.includes(company.id)}
          onToggleBookmark={onToggleBookmark}
          onSelectCompany={onSelectCompany}
        />
      ))}
    </div>
  );
}
