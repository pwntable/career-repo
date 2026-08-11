import React from 'react';
import { FilterBar } from '../components/company/FilterBar';
import { CompanyGrid } from '../components/company/CompanyGrid';

export function DirectoryView({
  companies,
  totalCount,
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
  bookmarks,
  onToggleBookmark,
  onSelectCompany,
  resetFilters,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* View Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Malaysia Corporate Career Directory
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Explore official career application portals across {totalCount} leading enterprises, MNCs, and GLCs.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCompanyType={selectedCompanyType}
        setSelectedCompanyType={setSelectedCompanyType}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onlyInternships={onlyInternships}
        setOnlyInternships={setOnlyInternships}
        onlyGraduate={onlyGraduate}
        setOnlyGraduate={setOnlyGraduate}
        onlyVerified={onlyVerified}
        setOnlyVerified={setOnlyVerified}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        companyTypes={companyTypes}
        locations={locations}
        resetFilters={resetFilters}
        resultCount={companies.length}
      />

      {/* Company Grid */}
      <CompanyGrid
        companies={companies}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
        onSelectCompany={onSelectCompany}
        resetFilters={resetFilters}
      />
    </div>
  );
}
