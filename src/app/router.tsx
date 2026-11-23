import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { HomePage } from '../features/home/pages/HomePage';
import { PropertiesPage } from '../features/properties/pages/PropertiesPage';
import { PropertyDetailsPage } from '../features/properties/pages/PropertyDetailsPage';
import { SellPropertyPage } from '../features/listing/pages/SellPropertyPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { SignupPage } from '../features/auth/pages/SignupPage';
import { SavedPropertiesPage } from '../features/saved/pages/SavedPropertiesPage';
import { DashboardOverviewPage } from '../features/dashboard/pages/DashboardOverviewPage';
import { DashboardListingsPage } from '../features/dashboard/pages/DashboardListingsPage';
import { DashboardSettingsPage } from '../features/dashboard/pages/DashboardSettingsPage';
import { AdminPage } from '../features/admin/pages/AdminPage';
import { DesignSystemPage } from '../features/design-system/pages/DesignSystemPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public Marketplace Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="properties" element={<PropertiesPage />} />
        <Route path="explore" element={<PropertiesPage />} />
        <Route path="property/:id" element={<PropertyDetailsPage />} />
        <Route path="sell" element={<SellPropertyPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="saved" element={<SavedPropertiesPage />} />
        <Route path="design-system" element={<DesignSystemPage />} />
      </Route>

      {/* Seller Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverviewPage />} />
        <Route path="listings" element={<DashboardListingsPage />} />
        <Route path="settings" element={<DashboardSettingsPage />} />
      </Route>

      {/* Internal Admin Console */}
      <Route path="/admin" element={<AdminPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
