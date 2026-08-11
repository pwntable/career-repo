import { useState, useMemo, useEffect } from 'react';

export function useFilters(companies) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCompanyType, setSelectedCompanyType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [onlyInternships, setOnlyInternships] = useState(false);
  const [onlyGraduate, setOnlyGraduate] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'name', 'recent'

  // Read deep links on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const cat = params.get('category');
    if (q) setSearchQuery(q);
    if (cat) setSelectedCategory(cat);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(companies.map(c => c.category));
    return ['All', ...Array.from(set).sort()];
  }, [companies]);

  const companyTypes = useMemo(() => {
    const set = new Set(companies.map(c => c.company_type));
    return ['All', ...Array.from(set).sort()];
  }, [companies]);

  const locations = useMemo(() => {
    const set = new Set(companies.map(c => c.location.split('/')[0].trim()));
    return ['All', ...Array.from(set).sort()];
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    return companies
      .filter(company => {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          company.name.toLowerCase().includes(query) ||
          company.category.toLowerCase().includes(query) ||
          company.industry.toLowerCase().includes(query) ||
          company.description.toLowerCase().includes(query);

        const matchesCategory = selectedCategory === 'All' || company.category === selectedCategory;
        const matchesType = selectedCompanyType === 'All' || company.company_type === selectedCompanyType;
        const matchesLocation = selectedLocation === 'All' || company.location.includes(selectedLocation);

        const matchesInternship = !onlyInternships || Boolean(company.internship_url);
        const matchesGraduate = !onlyGraduate || Boolean(company.graduate_url);
        const matchesVerified = !onlyVerified || company.is_verified;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesType &&
          matchesLocation &&
          matchesInternship &&
          matchesGraduate &&
          matchesVerified
        );
      })
      .sort((a, b) => {
        if (sortBy === 'featured') return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'recent') return new Date(b.updated_at) - new Date(a.updated_at);
        return 0;
      });
  }, [
    companies,
    searchQuery,
    selectedCategory,
    selectedCompanyType,
    selectedLocation,
    onlyInternships,
    onlyGraduate,
    onlyVerified,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCompanyType('All');
    setSelectedLocation('All');
    setOnlyInternships(false);
    setOnlyGraduate(false);
    setOnlyVerified(false);
    setSortBy('featured');
  };

  return {
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
    filteredCompanies,
    resetFilters,
  };
}
