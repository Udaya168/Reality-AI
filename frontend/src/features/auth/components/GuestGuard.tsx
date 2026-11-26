import React from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth, getRedirectPathForRole } from '../../../context/AuthContext';
import { Spinner } from '../../../components/ui/Spinner';
import { resolvePostAuthRedirect } from '../utils/redirect';

interface GuestGuardProps {
  children: React.ReactNode;
}

export const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7F3]">
        <Spinner size="md" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    const roleFallback = getRedirectPathForRole(user.role);
    const destination = resolvePostAuthRedirect(location.state, searchParams, roleFallback);
    return <Navigate to={destination} replace />;
  }

  return <>{children}</>;
};
