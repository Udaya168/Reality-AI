import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Spinner } from '../../../components/ui/Spinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'buyer' | 'seller' | 'developer' | 'admin' | 'any';
  allowedRoles?: string[];
  redirectTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRole = 'any',
  allowedRoles,
  redirectTo,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7F3]">
        <div className="w-10 h-10 rounded-full bg-[#183653] text-[#F8F7F3] flex items-center justify-center font-serif text-lg font-bold mb-4 shadow-md">
          R
        </div>
        <Spinner size="md" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#4A647D] mt-3">
          Verifying Reality Authentication...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve attempted destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role authorization validation
  if (user) {
    const userRole = (user.role || 'Buyer').toLowerCase();

    // Check custom allowedRoles list if explicitly provided
    if (allowedRoles && allowedRoles.length > 0) {
      const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());
      if (!normalizedAllowed.includes(userRole)) {
        return <Navigate to={redirectTo || '/'} replace />;
      }
    }

    // Role-specific enforcement
    if (requiredRole !== 'any') {
      if (requiredRole === 'admin' && userRole !== 'admin') {
        // Only admins can access
        return <Navigate to={redirectTo || '/'} replace />;
      }

      if (requiredRole === 'developer') {
        // Only developers and admins can access Developer Portal
        // Buyers and Sellers are strictly denied
        if (userRole !== 'developer' && userRole !== 'admin') {
          return <Navigate to={redirectTo || '/'} replace />;
        }
      }

      if (
        requiredRole === 'seller' &&
        !['seller', 'owner', 'agent', 'builder', 'admin'].includes(userRole)
      ) {
        // Non-sellers attempting seller dashboard
        return <Navigate to={redirectTo || '/sell'} replace />;
      }
    }
  }

  return <>{children}</>;
};
