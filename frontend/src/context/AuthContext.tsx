import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '../services/supabase/client';
import { supabaseConfig } from '../services/supabase/config';
import { authService } from '../features/auth/services/auth.service';
import {
  AuthProfile,
  SignUpParams,
  UserRole,
  UserAccountType,
} from '../features/auth/types/auth.types';
import { UserProfile } from '../types/user.types';

export interface AuthContextType {
  user: UserProfile | null;
  supabaseUser: User | null;
  session: Session | null;
  profile: AuthProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  signUp: (params: SignUpParams) => Promise<{
    user: User | null;
    session: Session | null;
    needsEmailVerification: boolean;
  }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    user: User;
    session: Session | null;
    role: UserRole;
    redirectPath: string;
  }>;
  signInWithGoogle: (options?: {
    accountType?: UserAccountType;
    redirectTo?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to determine destination route based on role
export const getRedirectPathForRole = (role: UserRole | string): string => {
  const normalized = role.toLowerCase();
  if (normalized === 'admin') {
    return '/admin';
  }
  if (normalized === 'developer') {
    return '/developer';
  }
  if (normalized === 'seller' || normalized === 'owner' || normalized === 'agent' || normalized === 'builder') {
    return '/dashboard';
  }
  return '/';
};

/**
 * Securely maps Supabase User & Database Profile to UI UserProfile.
 * Security enforcement: NEVER trust client-controlled user_metadata.role for privilege escalation.
 * Role is strictly sourced from dbProfile (verified database record) or defaults to safe 'Buyer'.
 */
const buildUserProfile = (authUser: User, dbProfile: AuthProfile | null): UserProfile => {
  const metadata = authUser.user_metadata || {};

  // Privilege control: Role MUST come from validated database profile
  let roleRaw = 'buyer';
  if (dbProfile?.role) {
    roleRaw = dbProfile.role;
  } else if (metadata.account_type === 'seller') {
    // Unpersisted fallback strictly bounded to 'seller' (never 'admin')
    roleRaw = 'seller';
  } else {
    roleRaw = 'buyer';
  }

  // Normalize role for UI consumption
  let normalizedRole: UserRole = 'Buyer';
  const roleLower = roleRaw.toLowerCase();
  if (roleLower === 'admin') {
    normalizedRole = 'Admin';
  } else if (roleLower === 'developer') {
    normalizedRole = 'Developer';
  } else if (roleLower === 'seller' || roleLower === 'owner') {
    normalizedRole = 'Owner';
  } else if (roleLower === 'agent') {
    normalizedRole = 'Agent';
  } else if (roleLower === 'builder') {
    normalizedRole = 'Builder';
  }

  const fullName =
    dbProfile?.fullName ||
    metadata.full_name ||
    metadata.name ||
    (authUser.email ? authUser.email.split('@')[0] : 'Reality User');

  const phone = dbProfile?.phone || metadata.phone || '';

  return {
    id: authUser.id,
    name: fullName,
    email: authUser.email || '',
    phone,
    role: normalizedRole,
    agencyName: dbProfile?.agencyName || metadata.agency_name,
    avatar: dbProfile?.avatarUrl || metadata.avatar_url || metadata.picture,
    isVerified: Boolean(authUser.email_confirmed_at || dbProfile?.isVerified),
    joinedDate: authUser.created_at ? authUser.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Track active fetch user ID to prevent race conditions during rapid state transitions
  const activeFetchUserIdRef = useRef<string | null>(null);

  // Sync profile data given an authenticated Supabase user
  const syncProfile = useCallback(async (currentAuthUser: User | null): Promise<AuthProfile | null> => {
    if (!currentAuthUser) {
      activeFetchUserIdRef.current = null;
      setProfile(null);
      setUser(null);
      return null;
    }

    const userId = currentAuthUser.id;
    activeFetchUserIdRef.current = userId;

    try {
      const fetchedProfile = await authService.getProfile(userId);

      // Guard against race conditions: only update state if this request matches active user
      if (activeFetchUserIdRef.current === userId) {
        setProfile(fetchedProfile);
        const mappedUser = buildUserProfile(currentAuthUser, fetchedProfile);
        setUser(mappedUser);
      }
      return fetchedProfile;
    } catch (err) {
      console.warn('[AuthProvider] Unable to fetch user profile:', err);
      if (activeFetchUserIdRef.current === userId) {
        const fallbackUser = buildUserProfile(currentAuthUser, null);
        setUser(fallbackUser);
      }
      return null;
    }
  }, []);

  // Initialize Supabase Auth Session and listener
  useEffect(() => {
    let mounted = true;

    // Supabase onAuthStateChange acts as the single authoritative lifecycle listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, newSession: Session | null) => {
      if (!mounted) return;

      setSession(newSession);
      const currentUser = newSession?.user ?? null;
      setSupabaseUser(currentUser);

      if (event === 'SIGNED_OUT' || !currentUser) {
        activeFetchUserIdRef.current = null;
        setProfile(null);
        setUser(null);
        setIsLoading(false);
      } else {
        await syncProfile(currentUser);
        if (mounted) {
          setIsLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      activeFetchUserIdRef.current = null;
      subscription.unsubscribe();
    };
  }, [syncProfile]);

  // Sign Up with Supabase
  const signUp = useCallback(
    async (params: SignUpParams) => {
      setIsLoading(true);
      try {
        const result = await authService.signUp(params);
        const createdUser = result.user;
        const newSession = result.session;

        setSupabaseUser(createdUser);
        setSession(newSession);

        const needsEmailVerification = !newSession && Boolean(createdUser && !createdUser.email_confirmed_at);

        if (createdUser && newSession) {
          await syncProfile(createdUser);
        }

        return {
          user: createdUser,
          session: newSession,
          needsEmailVerification,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [syncProfile]
  );

  // Sign In with email and password
  const signIn = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const result = await authService.signIn({ email, password });
        const authenticatedUser = result.user;
        const activeSession = result.session;

        setSupabaseUser(authenticatedUser);
        setSession(activeSession);

        const fetchedProfile = await syncProfile(authenticatedUser);
        const resolvedRole: UserRole = (fetchedProfile?.role ||
          (authenticatedUser.user_metadata?.account_type === 'seller' ? 'seller' : 'buyer')) as UserRole;

        const redirectPath = getRedirectPathForRole(resolvedRole);

        return {
          user: authenticatedUser,
          session: activeSession,
          role: resolvedRole,
          redirectPath,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [syncProfile]
  );

  // Sign In with Google OAuth
  const signInWithGoogle = useCallback(
    async (options?: { accountType?: UserAccountType; redirectTo?: string }) => {
      setIsLoading(true);
      try {
        await authService.signInWithGoogle(options);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  // Sign Out
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
    } catch (err) {
      console.warn('[AuthProvider] Sign out error:', err);
    } finally {
      activeFetchUserIdRef.current = null;
      setSupabaseUser(null);
      setSession(null);
      setProfile(null);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  // Send Password Reset
  const sendPasswordReset = useCallback(async (email: string) => {
    await authService.resetPasswordForEmail(email);
  }, []);

  // Update Password
  const updatePassword = useCallback(async (newPassword: string) => {
    await authService.updatePassword(newPassword);
  }, []);

  // Resend Email Verification
  const resendVerification = useCallback(async (email: string) => {
    await authService.resendVerificationEmail(email);
  }, []);

  // Update User Profile (only permitted editable fields)
  const updateUser = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!supabaseUser) return;

      const profileUpdates: Partial<AuthProfile> = {};
      if (updates.name !== undefined) profileUpdates.fullName = updates.name;
      if (updates.phone !== undefined) profileUpdates.phone = updates.phone;
      if (updates.avatar !== undefined) profileUpdates.avatarUrl = updates.avatar;
      if (updates.agencyName !== undefined) profileUpdates.agencyName = updates.agencyName;

      await authService.updateProfile(supabaseUser.id, profileUpdates);
      await syncProfile(supabaseUser);
    },
    [supabaseUser, syncProfile]
  );

  const role: UserRole = useMemo(() => {
    return user?.role || 'Buyer';
  }, [user]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      supabaseUser,
      session,
      profile,
      role,
      isAuthenticated: Boolean(supabaseUser && session),
      isLoading,
      isConfigured: supabaseConfig.isConfigured,
      signUp,
      signIn,
      signInWithGoogle,
      logout,
      sendPasswordReset,
      updatePassword,
      resendVerification,
      updateUser,
    }),
    [
      user,
      supabaseUser,
      session,
      profile,
      role,
      isLoading,
      signUp,
      signIn,
      signInWithGoogle,
      logout,
      sendPasswordReset,
      updatePassword,
      resendVerification,
      updateUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
