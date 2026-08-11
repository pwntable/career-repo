import { useState, useEffect } from 'react';
import { companyService } from '../services/companyService';

export function useCompanies() {
  const [companies, setCompanies] = useState(() => companyService.getCompanies());
  const [bookmarks, setBookmarks] = useState(() => companyService.getBookmarks());
  const [theme, setTheme] = useState(() => companyService.getTheme());
  const [toast, setToast] = useState(null);

  useEffect(() => {
    companyService.saveCompanies(companies);
  }, [companies]);

  useEffect(() => {
    companyService.saveBookmarks(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    companyService.saveTheme(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleBookmark = (id, companyName) => {
    setBookmarks(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(`Removed ${companyName} from saved list`, 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast(`Saved ${companyName} to bookmarks`, 'success');
        return [...prev, id];
      }
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const addCompany = (companyData) => {
    setCompanies(prev => [companyData, ...prev]);
    showToast(`Added ${companyData.name} to directory`, 'success');
  };

  const updateCompany = (id, companyData) => {
    setCompanies(prev => prev.map(c => (c.id === id ? { ...c, ...companyData } : c)));
    showToast(`Updated ${companyData.name}`, 'info');
  };

  const deleteCompany = (id, companyName) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
    showToast(`Deleted ${companyName}`, 'warn');
  };

  const toggleVerified = (id) => {
    setCompanies(prev =>
      prev.map(c => {
        if (c.id === id) {
          const updated = !c.is_verified;
          showToast(`${c.name} verification: ${updated ? 'Verified' : 'Unverified'}`);
          return { ...c, is_verified: updated };
        }
        return c;
      })
    );
  };

  const toggleFeatured = (id) => {
    setCompanies(prev =>
      prev.map(c => {
        if (c.id === id) {
          const updated = !c.is_featured;
          showToast(`${c.name} featured status: ${updated ? 'Featured' : 'Standard'}`);
          return { ...c, is_featured: updated };
        }
        return c;
      })
    );
  };

  const resetDataset = () => {
    const seedData = companyService.resetToSeedData();
    setCompanies(seedData);
    showToast('Reset company dataset to original seed values', 'info');
  };

  const importDataset = (importedCompanies) => {
    setCompanies(importedCompanies);
    companyService.saveCompanies(importedCompanies);
    showToast(`Successfully imported ${importedCompanies.length} companies`, 'success');
  };

  return {
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
  };
}
