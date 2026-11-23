import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthSession } from '../types/user.types';
import { DEMO_ACCOUNTS, DemoAccount } from '../data/mock/mockUsers';

const DEMO_AUTH_STORAGE_KEY = 'reality_ai_demo_auth_v1';

interface AuthContextType extends AuthSession {
  login: (email: string, role?: UserProfile['role']) => void;
  loginWithCredentials: (
    email: string,
    password: string
  ) => { success: boolean; error?: string; redirectPath?: string; user?: UserProfile };
  loginAsDemo: (role: 'Buyer' | 'Owner' | 'Admin') => string;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  demoAccounts: DemoAccount[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(DEMO_AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse demo auth from localStorage', e);
    }
    // Default to null so user can test login, or buyer if testing
    return null;
  });

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(DEMO_AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to save demo auth to localStorage', e);
    }
  }, [user]);

  const loginWithCredentials = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const account = DEMO_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === cleanEmail && acc.password === password
    );

    if (account) {
      setUser(account.user);
      return {
        success: true,
        redirectPath: account.redirectPath,
        user: account.user,
      };
    }

    return {
      success: false,
      error: 'Invalid demo credentials. Please use one of the provided demo accounts.',
    };
  };

  const loginAsDemo = (role: 'Buyer' | 'Owner' | 'Admin'): string => {
    const match = DEMO_ACCOUNTS.find((a) => a.user.role === role);
    if (match) {
      setUser(match.user);
      return match.redirectPath;
    }
    return '/';
  };

  const login = (email: string, role: UserProfile['role'] = 'Buyer') => {
    const existing = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      setUser(existing.user);
    } else {
      setUser({
        id: `USR-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '+91 98450 00000',
        role,
        isVerified: true,
        joinedDate: new Date().toISOString().split('T')[0],
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginWithCredentials,
        loginAsDemo,
        logout,
        updateUser,
        demoAccounts: DEMO_ACCOUNTS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
