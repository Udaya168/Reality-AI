import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Property } from '../types/property.types';

export function usePropertyFilters(properties: Property[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('search') || searchParams.get('location') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedLocation, setSelectedLocation] = useState<string>(searchParams.get('loc') || 'all');
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>(searchParams.get('budget') || 'all');
  const [selectedAreaTier, setSelectedAreaTier] = useState<string>(searchParams.get('area') || 'all');
  const [selectedBHK, setSelectedBHK] = useState<string>(searchParams.get('bhk') || 'all');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'recent');

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchesQuery =
          property.title.toLowerCase().includes(q) ||
          property.location.locality.toLowerCase().includes(q) ||
          property.location.city.toLowerCase().includes(q) ||
          property.description.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }
      if (selectedCategory !== 'all') {
        const matchesCat =
          property.category === selectedCategory ||
          (selectedCategory === 'plot' && property.category === 'land') ||
          (selectedCategory === 'land' && property.category === 'plot');
        if (!matchesCat) return false;
      }
      if (selectedLocation !== 'all' && property.location.locality !== selectedLocation) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area-desc') return b.features.areaSqFt - a.features.areaSqFt;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [properties, query, selectedCategory, selectedLocation, sortBy]);

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedPriceTier('all');
    setSelectedAreaTier('all');
    setSelectedBHK('all');
    setSortBy('recent');
    setSearchParams({});
  };

  return {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    selectedPriceTier,
    setSelectedPriceTier,
    selectedAreaTier,
    setSelectedAreaTier,
    selectedBHK,
    setSelectedBHK,
    sortBy,
    setSortBy,
    filteredProperties,
    clearFilters,
  };
}
