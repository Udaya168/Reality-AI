import React, { createContext, useContext, useState, useMemo } from 'react';
import { Property, PropertyCategory } from '../types/property';
import { mockProperties } from '../data/mockProperties';

interface PropertyContextType {
  properties: Property[];
  getPropertyById: (id: string) => Property | undefined;
  getPropertiesByCategory: (category: PropertyCategory | string) => Property[];
  featuredProperties: Property[];
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties] = useState<Property[]>(mockProperties);

  const getPropertyById = (id: string) => {
    return properties.find((p) => p.id === id);
  };

  const getPropertiesByCategory = (category: string) => {
    if (category === 'all') return properties;
    return properties.filter((p) => p.category === category);
  };

  const featuredProperties = useMemo(() => {
    return properties.filter((p) => p.isFeatured);
  }, [properties]);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        getPropertyById,
        getPropertiesByCategory,
        featuredProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error('usePropertyContext must be used within PropertyProvider');
  return ctx;
};
