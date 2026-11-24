import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { DeveloperLayout } from './layouts/DeveloperLayout';
import { DeveloperOverview } from './pages/DeveloperOverview';
import { APIKeys } from './pages/APIKeys';
import { APIDocs } from './pages/APIDocs';
import { APIPlayground } from './pages/APIPlayground';
import { APIActivity } from './pages/APIActivity';

export { DeveloperLayout, DeveloperOverview, APIKeys, APIDocs, APIPlayground, APIActivity };

/**
 * DeveloperPortal entry component containing internal sub-routes
 * Strictly protected for Developer and Admin roles
 */
export const DeveloperPortal: React.FC = () => {
  return (
    <AuthGuard requiredRole="developer">
      <Routes>
        <Route element={<DeveloperLayout />}>
          <Route index element={<DeveloperOverview />} />
          <Route path="api-keys" element={<APIKeys />} />
          <Route path="docs" element={<APIDocs />} />
          <Route path="playground" element={<APIPlayground />} />
          <Route path="activity" element={<APIActivity />} />
          <Route path="*" element={<Navigate to="/developer" replace />} />
        </Route>
      </Routes>
    </AuthGuard>
  );
};
