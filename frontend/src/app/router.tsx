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
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage';
import { VerifyEmailPage } from '../features/auth/pages/VerifyEmailPage';
import { SavedPropertiesPage } from '../features/saved/pages/SavedPropertiesPage';
import { DashboardOverviewPage } from '../features/dashboard/pages/DashboardOverviewPage';
import { DashboardListingsPage } from '../features/dashboard/pages/DashboardListingsPage';
import { DashboardSettingsPage } from '../features/dashboard/pages/DashboardSettingsPage';
import { AdminPage } from '../features/admin/pages/AdminPage';
import { DesignSystemPage } from '../features/design-system/pages/DesignSystemPage';
import { AuthGuard } from '../features/auth/components/AuthGuard';
import { GuestGuard } from '../features/auth/components/GuestGuard';

// Developer Portal components
import {
  DeveloperLayout,
  DeveloperOverview,
  APIKeys,
  APIDocs,
  APIPlayground,
  APIActivity,
} from '../components/developer/DeveloperPortal';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public Marketplace Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="properties" element={<PropertiesPage />} />
        <Route path="explore" element={<PropertiesPage />} />
        <Route path="property/:id" element={<PropertyDetailsPage />} />
        
        {/* Sell Property - requires authentication */}
        <Route
          path="sell"
          element={
            <AuthGuard requiredRole="any">
              <SellPropertyPage />
            </AuthGuard>
          }
        />

        {/* Guest-only Auth Routes (redirects logged-in users) */}
        <Route
          path="login"
          element={
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          }
        />
        <Route
          path="signup"
          element={
            <GuestGuard>
              <SignupPage />
            </GuestGuard>
          }
        />
        <Route
          path="forgot-password"
          element={
            <GuestGuard>
              <ForgotPasswordPage />
            </GuestGuard>
          }
        />

        {/* Password Recovery & Email Verification Confirmation */}
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />

        {/* Saved Properties - requires authentication */}
        <Route
          path="saved"
          element={
            <AuthGuard requiredRole="any">
              <SavedPropertiesPage />
            </AuthGuard>
          }
        />

        <Route path="design-system" element={<DesignSystemPage />} />
      </Route>

      {/* Developer Portal - Protected Platform (Developer & Admin only) */}
      <Route
        path="/developer"
        element={
          <AuthGuard requiredRole="developer">
            <DeveloperLayout />
          </AuthGuard>
        }
      >
        <Route index element={<DeveloperOverview />} />
        <Route path="api-keys" element={<APIKeys />} />
        <Route path="docs" element={<APIDocs />} />
        <Route path="playground" element={<APIPlayground />} />
        <Route path="activity" element={<APIActivity />} />
      </Route>

      {/* Seller Dashboard - Protected for Sellers/Owners/Agents */}
      <Route
        path="/dashboard"
        element={
          <AuthGuard requiredRole="seller">
            <DashboardLayout />
          </AuthGuard>
        }
      >
        <Route index element={<DashboardOverviewPage />} />
        <Route path="listings" element={<DashboardListingsPage />} />
        <Route path="settings" element={<DashboardSettingsPage />} />
      </Route>

      {/* Internal Admin Console - Protected strictly for Admin role */}
      <Route
        path="/admin"
        element={
          <AuthGuard requiredRole="admin">
            <AdminPage />
          </AuthGuard>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
