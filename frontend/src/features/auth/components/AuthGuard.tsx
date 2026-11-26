import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Spinner } from '../../../components/ui/Spinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'member' | 'buyer' | 'seller' | 'developer' | 'admin' | 'any';
  allowedRoles?: string[];
  redirectTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRole = 'any',
  allowedRoles,
  redirectTo,
}) => {
  const { isAuthenticated, isLoading, user, session } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7F3]">
        <div className="w-10 h-10 rounded-full bg-[#183653] text-[#F8F7F3] flex items-center justify-center font-serif text-lg font-bold mb-4 shadow-md">
          R
        </div>
        <Spinner size="md" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#4A647D] mt-3">
          Verifying Authentication...
        </span>
      </div>
    );
  }

  // Fail closed: require verified session token and resolved profile
  if (!isAuthenticated || !session?.access_token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = (user.role || 'Member').toLowerCase();

  if (allowedRoles && allowedRoles.length > 0) {
    const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());
    if (!normalizedAllowed.includes(userRole)) {
      return (
        <Navigate
          to={redirectTo || '/'}
          state={{
            accessDenied: allowedRoles.join(', '),
            currentRole: user.role,
            attemptedPath: location.pathname,
          }}
          replace
        />
      );
    }
  }

  if (requiredRole !== 'any') {
    // Admin portal: strictly Admin role only
    if (requiredRole === 'admin' && userRole !== 'admin') {
      return (
        <Navigate
          to={redirectTo || '/'}
          state={{
            accessDenied: 'admin',
            currentRole: user.role,
            attemptedPath: location.pathname,
          }}
          replace
        />
      );
    }

    // Developer portal: strictly Developer role only
    if (requiredRole === 'developer' && userRole !== 'developer') {
      return (
        <Navigate
          to={redirectTo || '/'}
          state={{
            accessDenied: 'developer',
            currentRole: user.role,
            attemptedPath: location.pathname,
          }}
          replace
        />
      );
    }

    if (
      requiredRole === 'seller' &&
      !['member', 'seller', 'owner', 'agent', 'builder', 'admin'].includes(userRole)
    ) {
      return <Navigate to={redirectTo || '/my-properties'} replace />;
    }
  }

  return <>{children}</>;
};
