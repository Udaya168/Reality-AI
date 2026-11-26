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
    session: Session;
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
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const purgeLegacyDemoStorage = () => {
  try {
    localStorage.removeItem('reality_ai_auth_session_v1');
    localStorage.removeItem('reality_ai_auth_user');
  } catch {
    // Ignore storage access errors in restricted browsing modes
  }
};

/**
 * Determines destination portal based strictly on verified database role.
 * - Normal users ('Member'/'buyer'/'seller') land on '/' (Normal Portal).
 * - 'Admin' lands on '/admin' (Admin Portal).
 * - 'Developer' lands on '/developer' (Developer Portal).
 */
export const getRedirectPathForRole = (role: UserRole | string): string => {
  const normalized = role.toLowerCase();
  if (normalized === 'admin') {
    return '/admin';
  }
  if (normalized === 'developer') {
    return '/developer';
  }
  return '/';
};

/**
 * Maps Supabase User & Database Profile to UI UserProfile.
 * Security enforcement: NEVER trust client-controlled user_metadata for role elevation.
 * Roles ('admin', 'developer') are accepted strictly from public.profiles (RLS + trigger protected).
 */
const buildUserProfile = (authUser: User, dbProfile: AuthProfile | null): UserProfile => {
  const metadata = authUser.user_metadata || {};

  const dbRoleLower = dbProfile?.role?.toLowerCase();
  let normalizedRole: UserRole = 'Member';
  if (dbRoleLower === 'admin') {
    normalizedRole = 'Admin';
  } else if (dbRoleLower === 'developer') {
    normalizedRole = 'Developer';
  }

  const fullName =
    dbProfile?.fullName ||
    metadata.full_name ||
    metadata.name ||
    (authUser.email ? authUser.email.split('@')[0] : 'Reality Member');

  const phone = dbProfile?.phone || metadata.phone || '';

  return {
    id: authUser.id,
    name: fullName,
    email: dbProfile?.email || authUser.email || '',
    phone,
    role: normalizedRole,
    agencyName: dbProfile?.agencyName || metadata.agency_name,
    avatar: dbProfile?.avatarUrl || metadata.avatar_url || metadata.picture,
    isVerified: Boolean(authUser.email_confirmed_at || dbProfile?.isVerified),
    joinedDate: authUser.created_at
      ? authUser.created_at.split('T')[0]
      : new Date().toISOString().split('T')[0],
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  // isLoading tracks ONLY initial session bootstrap so route guards do not unmount forms on failed logins
  const [isLoading, setIsLoading] = useState(true);

  const activeFetchUserIdRef = useRef<string | null>(null);
  const lastProfileRefreshRef = useRef<number>(0);

  const clearAuthState = useCallback(() => {
    activeFetchUserIdRef.current = null;
    setSupabaseUser(null);
    setSession(null);
    setProfile(null);
    setUser(null);
  }, []);

  const syncProfile = useCallback(
    async (currentAuthUser: User | null): Promise<{ profile: AuthProfile | null; userProfile: UserProfile | null }> => {
      if (!currentAuthUser) {
        activeFetchUserIdRef.current = null;
        setProfile(null);
        setUser(null);
        return { profile: null, userProfile: null };
      }

      const userId = currentAuthUser.id;
      activeFetchUserIdRef.current = userId;

      try {
        const fetchedProfile = await authService.getProfile(userId);
        const mappedUser = buildUserProfile(currentAuthUser, fetchedProfile);

        if (activeFetchUserIdRef.current === userId) {
          lastProfileRefreshRef.current = Date.now();
          setProfile(fetchedProfile);
          setUser(mappedUser);
        }
        return { profile: fetchedProfile, userProfile: mappedUser };
      } catch (err) {
        console.warn('[AuthProvider] Unable to fetch user profile:', err);
        const fallbackUser = buildUserProfile(currentAuthUser, null);
        if (activeFetchUserIdRef.current === userId) {
          setProfile(null);
          setUser(fallbackUser);
        }
        return { profile: null, userProfile: fallbackUser };
      }
    },
    []
  );

  const refreshProfile = useCallback(async () => {
    if (!supabaseConfig.isConfigured || !supabaseUser || !session?.access_token) {
      return;
    }
    await syncProfile(supabaseUser);
  }, [supabaseUser, session, syncProfile]);

  // Initialize Supabase Auth session and single authoritative auth state listener
  useEffect(() => {
    let mounted = true;
    purgeLegacyDemoStorage();

    if (!supabaseConfig.isConfigured) {
      clearAuthState();
      setIsLoading(false);
      return;
    }

    // Initial hydration settles cleanly only after getSession() and syncProfile() complete
    supabase.auth
      .getSession()
      .then(async ({ data, error }) => {
        if (!mounted) return;
        if (error || !data.session?.access_token || !data.session?.user) {
          if (error) {
            console.warn('[AuthProvider] Initial session check error:', error.message);
          }
          clearAuthState();
          setIsLoading(false);
          return;
        }
        setSession(data.session);
        setSupabaseUser(data.session.user);
        await syncProfile(data.session.user);
        if (mounted) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('[AuthProvider] Session hydration error:', err);
        if (mounted) {
          clearAuthState();
          setIsLoading(false);
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, newSession: Session | null) => {
      if (!mounted || event === 'INITIAL_SESSION') return;

      const currentUser = newSession?.user ?? null;
      const hasValidSession = Boolean(newSession?.access_token && currentUser);

      if (event === 'SIGNED_OUT' || !hasValidSession || !currentUser) {
        clearAuthState();
        setIsLoading(false);
        return;
      }

      setSession(newSession);
      setSupabaseUser(currentUser);
      await syncProfile(currentUser);
      if (mounted) {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      activeFetchUserIdRef.current = null;
      subscription?.unsubscribe();
    };
  }, [clearAuthState, syncProfile]);

  // Re-sync database role when user returns to browser tab (reflects Supabase Dashboard role changes live)
  useEffect(() => {
    if (!supabaseConfig.isConfigured || !supabaseUser || !session?.access_token) {
      return;
    }

    const handleFocusOrVisible = () => {
      if (document.visibilityState === 'hidden') return;
      const now = Date.now();
      if (now - lastProfileRefreshRef.current < 3000) return;
      void syncProfile(supabaseUser);
    };

    window.addEventListener('focus', handleFocusOrVisible);
    document.addEventListener('visibilitychange', handleFocusOrVisible);

    return () => {
      window.removeEventListener('focus', handleFocusOrVisible);
      document.removeEventListener('visibilitychange', handleFocusOrVisible);
    };
  }, [supabaseUser, session, syncProfile]);

  // Sign Up with Supabase
  const signUp = useCallback(
    async (params: SignUpParams) => {
      const result = await authService.signUp(params);
      const createdUser = result.user;
      const newSession = result.session;

      const hasSession = Boolean(createdUser && newSession?.access_token);
      if (hasSession && createdUser && newSession) {
        setSupabaseUser(createdUser);
        setSession(newSession);
        await syncProfile(createdUser);
      } else {
        clearAuthState();
      }

      const needsEmailVerification = !hasSession && Boolean(createdUser && !createdUser.email_confirmed_at);

      return {
        user: createdUser,
        session: newSession,
        needsEmailVerification,
      };
    },
    [clearAuthState, syncProfile]
  );

  // Sign In with email and password strictly via Supabase Auth
  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await authService.signIn({ email, password });
        const authenticatedUser = result.user;
        const activeSession = result.session;

        if (!authenticatedUser || !activeSession?.access_token) {
          clearAuthState();
          throw new Error('Invalid login credentials');
        }

        const { userProfile } = await syncProfile(authenticatedUser);
        setSupabaseUser(authenticatedUser);
        setSession(activeSession);

        const resolvedRole: UserRole = userProfile?.role || 'Member';
        const redirectPath = getRedirectPathForRole(resolvedRole);

        return {
          user: authenticatedUser,
          session: activeSession,
          role: resolvedRole,
          redirectPath,
        };
      } catch (err) {
        clearAuthState();
        throw err;
      }
    },
    [clearAuthState, syncProfile]
  );

  // Sign In with Google OAuth
  const signInWithGoogle = useCallback(
    async (options?: { accountType?: UserAccountType; redirectTo?: string }) => {
      await authService.signInWithGoogle(options);
    },
    []
  );

  // Sign Out
  const logout = useCallback(async () => {
    try {
      await authService.signOut();
    } catch (err) {
      console.warn('[AuthProvider] Sign out error:', err);
    } finally {
      purgeLegacyDemoStorage();
      clearAuthState();
    }
  }, [clearAuthState]);

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

  // Update User Profile (only permitted non-privileged fields; DB trigger blocks client role modifications)
  const updateUser = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!supabaseUser || !session?.access_token) {
        throw new Error('You must be signed in to update your profile.');
      }

      const profileUpdates: Partial<AuthProfile> = {};
      if (updates.name !== undefined) profileUpdates.fullName = updates.name;
      if (updates.phone !== undefined) profileUpdates.phone = updates.phone;
      if (updates.avatar !== undefined) profileUpdates.avatarUrl = updates.avatar;
      if (updates.agencyName !== undefined) profileUpdates.agencyName = updates.agencyName;

      await authService.updateProfile(supabaseUser.id, profileUpdates);
      await syncProfile(supabaseUser);
    },
    [supabaseUser, session, syncProfile]
  );

  const role: UserRole = useMemo(() => {
    return user?.role || 'Member';
  }, [user]);

  const isAuthenticated = Boolean(
    supabaseConfig.isConfigured &&
    supabaseUser &&
    session &&
    session.access_token &&
    user
  );

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      supabaseUser,
      session,
      profile,
      role,
      isAuthenticated,
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
      refreshProfile,
    }),
    [
      user,
      supabaseUser,
      session,
      profile,
      role,
      isAuthenticated,
      isLoading,
      signUp,
      signIn,
      signInWithGoogle,
      logout,
      sendPasswordReset,
      updatePassword,
      resendVerification,
      updateUser,
      refreshProfile,
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
