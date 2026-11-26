import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { PropertyProvider } from '../context/PropertyContext';
import { SavedPropertiesProvider } from '../context/SavedPropertiesContext';
import { UserListingsProvider } from '../context/UserListingsContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PropertyProvider>
          <SavedPropertiesProvider>
            <UserListingsProvider>
              {children}
            </UserListingsProvider>
          </SavedPropertiesProvider>
        </PropertyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
