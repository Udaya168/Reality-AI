/**
 * User and authentication types
 */
export type UserRole =
  | 'Member'
  | 'Owner'
  | 'Agent'
  | 'Builder'
  | 'Buyer'
  | 'Admin'
  | 'Developer'
  | 'member'
  | 'buyer'
  | 'seller'
  | 'admin'
  | 'developer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  agencyName?: string;
  avatar?: string;
  isVerified: boolean;
  joinedDate: string;
}

export interface AuthSession {
  user: UserProfile | null;
  isAuthenticated: boolean;
  token?: string;
}
