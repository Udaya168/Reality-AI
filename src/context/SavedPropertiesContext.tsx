import React, { createContext, useContext } from 'react';
import { useProperties } from '../hooks/useProperties';
import { Property } from '../types/property';

interface SavedPropertiesContextType {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaveProperty: (id: string) => void;
  savedProperties: Property[];
}

const SavedPropertiesContext = createContext<SavedPropertiesContextType | undefined>(undefined);

export const SavedPropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { savedIds, isSaved, toggleSaveProperty, getSavedProperties } = useProperties();

  const savedProperties = getSavedProperties();

  return (
    <SavedPropertiesContext.Provider
      value={{
        savedIds,
        isSaved,
        toggleSaveProperty,
        savedProperties,
      }}
    >
      {children}
    </SavedPropertiesContext.Provider>
  );
};

export const useSavedProperties = () => {
  const ctx = useContext(SavedPropertiesContext);
  if (!ctx) throw new Error('useSavedProperties must be used within SavedPropertiesProvider');
  return ctx;
};
