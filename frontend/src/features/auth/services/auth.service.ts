import { supabase } from '../../../services/supabase/client';
import { supabaseConfig } from '../../../services/supabase/config';
import {
  SignUpParams,
  SignInParams,
  AuthProfile,
  UserRole,
  UserAccountType,
} from '../types/auth.types';

export const authService = {
  isConfigured(): boolean {
    return supabaseConfig.isConfigured;
  },

  /**
   * Register a new user with Supabase Auth
   */
  async signUp(params: SignUpParams) {
    const { email, password, fullName, phone, accountType, agencyName } = params;

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          phone: phone.trim(),
          account_type: accountType,
          agency_name: agencyName?.trim() || null,
        },
        emailRedirectTo: `${window.location.origin}/login?verified=true`,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * Authenticate user with Email and Password
   */
  async signIn(params: SignInParams) {
    const { email, password } = params;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * Authenticate with Google via Supabase OAuth
   */
  async signInWithGoogle(options?: {
    accountType?: UserAccountType;
    redirectTo?: string;
  }) {
    const origin = window.location.origin;
    let targetRedirect = options?.redirectTo || `${origin}/login`;

    if (options?.accountType && !targetRedirect.includes('account_type=')) {
      const separator = targetRedirect.includes('?') ? '&' : '?';
      targetRedirect = `${targetRedirect}${separator}account_type=${encodeURIComponent(options.accountType)}`;
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: targetRedirect,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * Sign out current user session
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  },

  /**
   * Send password reset email
   */
  async resetPasswordForEmail(email: string) {
    const redirectTo = `${window.location.origin}/reset-password`;
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo }
    );

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * Update user password (used after following reset link)
   */
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * Resend signup verification email
   */
  async resendVerificationEmail(email: string) {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim().toLowerCase(),
    });

    if (error) {
      throw error;
    }

    return data;
  },

  /**
   * Fetch user profile from public.profiles table
   */
  async getProfile(userId: string): Promise<AuthProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('[authService] Error fetching profile from Supabase:', error.message);
        return null;
      }

      if (!data) return null;

      return {
        id: data.id,
        email: data.email,
        fullName: data.full_name,
        phone: data.phone,
        accountType: data.account_type,
        role: data.role as UserRole,
        avatarUrl: data.avatar_url,
        agencyName: data.agency_name,
        isVerified: data.is_verified ?? false,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch (err) {
      console.warn('[authService] Failed to load profile:', err);
      return null;
    }
  },

  /**
   * Update profile information
   */
  async updateProfile(userId: string, updates: Partial<AuthProfile>): Promise<void> {
    const payload: Record<string, unknown> = {};
    if (updates.fullName !== undefined) payload.full_name = updates.fullName;
    if (updates.phone !== undefined) payload.phone = updates.phone;
    if (updates.avatarUrl !== undefined) payload.avatar_url = updates.avatarUrl;
    if (updates.agencyName !== undefined) payload.agency_name = updates.agencyName;

    const { error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', userId);

    if (error) {
      throw error;
    }
  },
};
