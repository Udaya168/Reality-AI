import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, getRedirectPathForRole } from '../../../context/AuthContext';
import { Spinner } from '../../../components/ui/Spinner';

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7F3]">
        <Spinner size="md" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    // Sanitize destination to prevent open redirect vulnerabilities
    const rawFrom = (location.state as { from?: { pathname: string } })?.from?.pathname;
    const isSafeInternalPath =
      typeof rawFrom === 'string' &&
      rawFrom.startsWith('/') &&
      !rawFrom.startsWith('//') &&
      !rawFrom.startsWith('/login') &&
      !rawFrom.startsWith('/signup') &&
      !rawFrom.startsWith('/forgot-password') &&
      !rawFrom.startsWith('/reset-password');

    const destination = isSafeInternalPath ? rawFrom : getRedirectPathForRole(user.role);
    return <Navigate to={destination} replace />;
  }

  return <>{children}</>;
};
