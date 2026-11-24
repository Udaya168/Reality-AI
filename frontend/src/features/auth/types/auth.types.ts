import { User, Session } from '@supabase/supabase-js';

export type UserAccountType = 'buyer' | 'seller';

export type UserRole =
  | 'Owner'
  | 'Agent'
  | 'Builder'
  | 'Buyer'
  | 'Admin'
  | 'Developer'
  | 'buyer'
  | 'seller'
  | 'admin'
  | 'developer';

export interface AuthProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  accountType: UserAccountType;
  role: UserRole;
  avatarUrl?: string;
  agencyName?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  accountType: UserAccountType;
  agencyName?: string;
}

export interface SignInParams {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  user: User | null;
  profile: AuthProfile | null;
  session: Session | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
}

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  color: string;
  feedback: string[];
}
