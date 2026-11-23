import { UserProfile } from '../../types/user.types';

export interface DemoAccount {
  email: string;
  password: string;
  user: UserProfile;
  redirectPath: string;
  description: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'buyer@demo.com',
    password: 'Buyer123',
    redirectPath: '/',
    description: 'Explore residences, save favourite properties, enquiry directly',
    user: {
      id: 'USR-BUYER-01',
      name: 'Aditya Sharma',
      email: 'buyer@demo.com',
      phone: '+91 98450 77112',
      role: 'Buyer',
      isVerified: true,
      joinedDate: '2024-06-15',
    },
  },
  {
    email: 'seller@demo.com',
    password: 'Seller123',
    redirectPath: '/dashboard',
    description: 'Manage property listings, view metrics, review buyer inquiries',
    user: {
      id: 'USR-SELLER-01',
      name: 'Rohan Kothari',
      email: 'seller@demo.com',
      phone: '+91 98450 12890',
      role: 'Owner',
      agencyName: 'Kothari Estate Properties',
      isVerified: true,
      joinedDate: '2024-03-12',
    },
  },
  {
    email: 'admin@demo.com',
    password: 'Admin123',
    redirectPath: '/admin',
    description: 'Internal moderation console, listing verification, user control',
    user: {
      id: 'USR-ADMIN-01',
      name: 'Siddharth Rao',
      email: 'admin@demo.com',
      phone: '+91 80 4910 8800',
      role: 'Admin',
      agencyName: 'Reality AI Operations',
      isVerified: true,
      joinedDate: '2023-01-01',
    },
  },
];

export const mockUsers: UserProfile[] = [
  DEMO_ACCOUNTS[0].user,
  DEMO_ACCOUNTS[1].user,
  DEMO_ACCOUNTS[2].user,
  {
    id: 'USR-002',
    name: 'Aditi Varma',
    email: 'aditi.varma@primeproperties.in',
    phone: '+91 99801 44550',
    role: 'Agent',
    agencyName: 'Prime Properties Karnataka',
    isVerified: true,
    joinedDate: '2024-05-18',
  },
  {
    id: 'USR-003',
    name: 'Prestige Signature Realty',
    email: 'concierge@prestigesignature.com',
    phone: '+91 80 4123 9000',
    role: 'Builder',
    agencyName: 'Prestige Signature Group',
    isVerified: true,
    joinedDate: '2023-11-04',
  },
  {
    id: 'USR-004',
    name: 'Dr. Srinivas Murthy',
    email: 'srinivas.murthy@yahoo.co.in',
    phone: '+91 94480 55120',
    role: 'Owner',
    isVerified: true,
    joinedDate: '2024-01-20',
  },
];
