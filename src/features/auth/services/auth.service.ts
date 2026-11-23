import { UserProfile } from '../../../types/user.types';

export const authService = {
  login(email: string): Promise<UserProfile> {
    return Promise.resolve({
      id: 'USR-001',
      name: 'Rohan Kothari',
      email,
      phone: '+91 98450 12890',
      role: 'Owner',
      isVerified: true,
      joinedDate: '2024-03-12',
    });
  },
  logout(): Promise<void> {
    return Promise.resolve();
  },
};
