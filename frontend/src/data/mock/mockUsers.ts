import { UserProfile } from '../../types/user.types';

/**
 * Sample user profiles retained strictly for UI testing and mock property/admin tables.
 * Authentication demo accounts and hardcoded passwords have been removed;
 * all sign-in and sign-up flows authenticate exclusively through Supabase Auth.
 */
export const mockUsers: UserProfile[] = [
  {
    id: 'USR-001',
    name: 'Aditya Sharma',
    email: 'aditya.sharma@example.in',
    phone: '+91 98450 77112',
    role: 'Member',
    isVerified: true,
    joinedDate: '2024-06-15',
  },
  {
    id: 'USR-002',
    name: 'Aditi Varma',
    email: 'aditi.varma@primeproperties.in',
    phone: '+91 99801 44550',
    role: 'Member',
    agencyName: 'Prime Properties Karnataka',
    isVerified: true,
    joinedDate: '2024-05-18',
  },
  {
    id: 'USR-003',
    name: 'Prestige Signature Realty',
    email: 'concierge@prestigesignature.com',
    phone: '+91 80 4123 9000',
    role: 'Member',
    agencyName: 'Prestige Signature Group',
    isVerified: true,
    joinedDate: '2023-11-04',
  },
  {
    id: 'USR-004',
    name: 'Dr. Srinivas Murthy',
    email: 'srinivas.murthy@yahoo.co.in',
    phone: '+91 94480 55120',
    role: 'Member',
    isVerified: true,
    joinedDate: '2024-01-20',
  },
];
