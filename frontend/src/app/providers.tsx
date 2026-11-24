import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { PropertyProvider } from '../context/PropertyContext';
import { SavedPropertiesProvider } from '../context/SavedPropertiesContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PropertyProvider>
          <SavedPropertiesProvider>
            {children}
          </SavedPropertiesProvider>
        </PropertyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
