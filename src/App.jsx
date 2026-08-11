import React, { useState, useMemo } from 'react';
import { useCompanies } from './hooks/useCompanies';
import { useFilters } from './hooks/useFilters';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { CompanyDetailModal } from './components/company/CompanyDetailModal';

import { HomeView } from './views/HomeView';
import { DirectoryView } from './views/DirectoryView';
import { InternshipView } from './views/InternshipView';
import { GraduateView } from './views/GraduateView';
import { SavedView } from './views/SavedView';
import { AiHubView } from './views/AiHubView';

export default function App() {
  const {
    companies,
    bookmarks,
    theme,
    toast,
    showToast,
    toggleBookmark,
    toggleTheme,
    addCompany,
    updateCompany,
    deleteCompany,
    toggleVerified,
    toggleFeatured,
    resetDataset,
    importDataset,
  } = useCompanies();

  const filterState = useFilters(companies);

  const [activeTab, setActiveTab] = useState('home'); // 'home', 'companies', 'internships', 'graduate', 'saved', 'admin'
  const [selectedCompany, setSelectedCompany] = useState(null);

  const featuredCompanies = useMemo(() => {
    return companies.filter(c => c.is_featured).slice(0, 8);
  }, [companies]);

  const internshipCompanies = useMemo(() => {
    return companies.filter(c => Boolean(c.internship_url));
  }, [companies]);

  const graduateCompanies = useMemo(() => {
    return companies.filter(c => Boolean(c.graduate_url));
  }, [companies]);

  const bookmarkedCompanies = useMemo(() => {
    return companies.filter(c => bookmarks.includes(c.id));
  }, [companies, bookmarks]);

  const handleCategorySelect = (category) => {
    filterState.setSelectedCategory(category);
    setActiveTab('companies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearchSubmit = (query) => {
    filterState.setSearchQuery(query);
    setActiveTab('companies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalCompaniesCount={companies.length}
        internshipsCount={internshipCompanies.length}
        graduateCount={graduateCompanies.length}
        bookmarksCount={bookmarks.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOnlyInternships={() => filterState.setOnlyInternships(true)}
        onOnlyGraduate={() => filterState.setOnlyGraduate(true)}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            companies={companies}
            featuredCompanies={featuredCompanies}
            categories={filterState.categories}
            onSearchSubmit={handleHeroSearchSubmit}
            onCategorySelect={handleCategorySelect}
            onSelectCompany={setSelectedCompany}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onExploreInternships={() => {
              filterState.setOnlyInternships(true);
              setActiveTab('internships');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'companies' && (
          <DirectoryView
            companies={filterState.filteredCompanies}
            totalCount={companies.length}
            searchQuery={filterState.searchQuery}
            setSearchQuery={filterState.setSearchQuery}
            selectedCategory={filterState.selectedCategory}
            setSelectedCategory={filterState.setSelectedCategory}
            selectedCompanyType={filterState.selectedCompanyType}
            setSelectedCompanyType={filterState.setSelectedCompanyType}
            selectedLocation={filterState.selectedLocation}
            setSelectedLocation={filterState.setSelectedLocation}
            onlyInternships={filterState.onlyInternships}
            setOnlyInternships={filterState.setOnlyInternships}
            onlyGraduate={filterState.onlyGraduate}
            setOnlyGraduate={filterState.setOnlyGraduate}
            onlyVerified={filterState.onlyVerified}
            setOnlyVerified={filterState.setOnlyVerified}
            sortBy={filterState.sortBy}
            setSortBy={filterState.setSortBy}
            categories={filterState.categories}
            companyTypes={filterState.companyTypes}
            locations={filterState.locations}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onSelectCompany={setSelectedCompany}
            resetFilters={filterState.resetFilters}
          />
        )}

        {activeTab === 'internships' && (
          <InternshipView
            companies={internshipCompanies}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onSelectCompany={setSelectedCompany}
          />
        )}

        {activeTab === 'graduate' && (
          <GraduateView
            companies={graduateCompanies}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onSelectCompany={setSelectedCompany}
          />
        )}

        {activeTab === 'saved' && (
          <SavedView
            companies={bookmarkedCompanies}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onSelectCompany={setSelectedCompany}
            onExplore={() => setActiveTab('companies')}
          />
        )}

        {activeTab === 'ai-hub' && (
          <AiHubView companies={companies} showToast={showToast} />
        )}
      </main>

      {/* Footer */}
      <Footer totalCount={companies.length} onCategorySelect={handleCategorySelect} />

      {/* Company Detail Modal */}
      {selectedCompany && (
        <CompanyDetailModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          isBookmarked={bookmarks.includes(selectedCompany.id)}
          onToggleBookmark={() => toggleBookmark(selectedCompany.id, selectedCompany.name)}
        />
      )}

      {/* Toast Notification Container */}
      <Toast toast={toast} />
    </div>
  );
}
