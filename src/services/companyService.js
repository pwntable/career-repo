import seedCompanies from '../data/companies.json';

const STORAGE_KEY_COMPANIES = 'ch_companies_v2';
const STORAGE_KEY_BOOKMARKS = 'ch_bookmarks';
const STORAGE_KEY_THEME = 'ch_theme';

export const companyService = {
  getCompanies: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPANIES);
      if (!saved) {
        localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(seedCompanies));
        return seedCompanies;
      }
      
      const parsedSaved = JSON.parse(saved);
      // Auto-merge any new seed companies added in code updates
      const savedSlugs = new Set(parsedSaved.map(c => c.slug || c.id));
      const missingSeedItems = seedCompanies.filter(c => !savedSlugs.has(c.slug) && !savedSlugs.has(c.id));
      
      if (missingSeedItems.length > 0) {
        const merged = [...parsedSaved, ...missingSeedItems];
        localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(merged));
        return merged;
      }

      return parsedSaved;
    } catch (e) {
      console.error('Failed to load companies from localStorage:', e);
      return seedCompanies;
    }
  },

  saveCompanies: (companies) => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(companies));
    } catch (e) {
      console.error('Failed to save companies to localStorage:', e);
    }
  },

  getBookmarks: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      return saved ? JSON.parse(saved) : ['1', '11', '51', '57', '69'];
    } catch (e) {
      console.error('Failed to load bookmarks:', e);
      return ['1', '11', '51', '57', '69'];
    }
  },

  saveBookmarks: (bookmarks) => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  },

  getTheme: () => {
    return localStorage.getItem(STORAGE_KEY_THEME) || 'light';
  },

  saveTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  },

  resetToSeedData: () => {
    localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(seedCompanies));
    return seedCompanies;
  },

  exportToJsonFile: (companies) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(companies, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `careerepo_companies_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  importFromJsonFile: (jsonString) => {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data)) {
      throw new Error("Invalid JSON structure. Root element must be an array of company objects.");
    }
    // Validate basic schema
    data.forEach(item => {
      if (!item.id || !item.name || !item.category || !item.career_url) {
        throw new Error(`Invalid company object schema: Missing required fields (id, name, category, career_url).`);
      }
    });
    return data;
  }
};
