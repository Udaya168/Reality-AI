import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserListingItem {
  id: string;
  title: string;
  tagline?: string;
  category: string;
  price: number;
  location: {
    locality: string;
    city: string;
    state?: string;
    address?: string;
    pincode?: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    areaSqFt: number;
    facing?: string;
    propertyAge?: string;
    amenities?: string[];
  };
  coverImage: string;
  images: string[];
  status: 'Active' | 'Under Review' | 'Sold';
  views: number;
  inquiriesCount: number;
  createdAt: string;
}

interface UserListingsContextType {
  myListings: UserListingItem[];
  addListing: (listing: Omit<UserListingItem, 'id' | 'createdAt' | 'views' | 'inquiriesCount'> & Partial<UserListingItem>) => UserListingItem;
  deleteListing: (id: string) => void;
  toggleSoldStatus: (id: string) => void;
  updateListing: (id: string, updates: Partial<UserListingItem>) => void;
  myListingsCount: number;
  resetToDefault: () => void;
}

const STORAGE_KEY = 'reality_ai_my_properties_v1';

export const INITIAL_USER_LISTINGS: UserListingItem[] = [
  {
    id: 'LIST-101',
    title: 'The Courtyard Villa at Sadashivanagar',
    tagline: 'Private architectural residence with central rain court & bespoke teak joinery',
    category: 'Villa',
    price: 185000000,
    location: {
      locality: 'Sadashivanagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      address: 'Near Sankey Tank, Sadashivanagar',
      pincode: '560080',
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 6200,
      facing: 'East',
      propertyAge: '1-3 years',
      amenities: ['Central Rain Court', '24/7 Concierge Security', 'Power Backup', 'Private Lift', 'Italian Marble'],
    },
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'Active',
    views: 148,
    inquiriesCount: 12,
    createdAt: '2024-10-15',
  },
  {
    id: 'LIST-102',
    title: 'Prestige Golfshire Signature Residence',
    tagline: 'Championship golf view villa at the foot of Nandi Hills with heated plunge pool',
    category: 'Villa',
    price: 240000000,
    location: {
      locality: 'Nandi Hills',
      city: 'Devanahalli',
      state: 'Karnataka',
      address: 'Prestige Golfshire, Devanahalli',
      pincode: '562110',
    },
    features: {
      bedrooms: 5,
      bathrooms: 5,
      areaSqFt: 8500,
      facing: 'North',
      propertyAge: 'Under 1 year',
      amenities: ['Golf Course Panorama', 'Heated Plunge Pool', 'Solar Integration', 'Home Automation', '3-Car Pavilion'],
    },
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    status: 'Active',
    views: 92,
    inquiriesCount: 7,
    createdAt: '2024-11-02',
  },
];

const UserListingsContext = createContext<UserListingsContextType | undefined>(undefined);

export const UserListingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [myListings, setMyListings] = useState<UserListingItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_USER_LISTINGS;
    } catch {
      return INITIAL_USER_LISTINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(myListings));
    } catch (e) {
      console.error('Failed to sync user listings to localStorage', e);
    }
  }, [myListings]);

  const addListing = (
    data: Omit<UserListingItem, 'id' | 'createdAt' | 'views' | 'inquiriesCount'> & Partial<UserListingItem>
  ): UserListingItem => {
    const newListing: UserListingItem = {
      id: data.id || `LIST-${Math.floor(100000 + Math.random() * 900000)}`,
      title: data.title,
      tagline: data.tagline,
      category: data.category || 'Villa',
      price: data.price || 0,
      location: data.location || { locality: '', city: 'Bengaluru' },
      features: data.features || { bedrooms: 4, bathrooms: 4, areaSqFt: 3000 },
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      images: data.images && data.images.length > 0 ? data.images : [data.coverImage],
      status: data.status || 'Active',
      views: data.views ?? 1,
      inquiriesCount: data.inquiriesCount ?? 0,
      createdAt: data.createdAt || new Date().toISOString().split('T')[0],
    };

    setMyListings((prev) => [newListing, ...prev]);
    return newListing;
  };

  const deleteListing = (id: string) => {
    setMyListings((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleSoldStatus = (id: string) => {
    setMyListings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'Sold' ? 'Active' : 'Sold';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const updateListing = (id: string, updates: Partial<UserListingItem>) => {
    setMyListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const resetToDefault = () => {
    setMyListings(INITIAL_USER_LISTINGS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UserListingsContext.Provider
      value={{
        myListings,
        addListing,
        deleteListing,
        toggleSoldStatus,
        updateListing,
        myListingsCount: myListings.length,
        resetToDefault,
      }}
    >
      {children}
    </UserListingsContext.Provider>
  );
};

export const useUserListings = () => {
  const ctx = useContext(UserListingsContext);
  if (!ctx) {
    throw new Error('useUserListings must be used within a UserListingsProvider');
  }
  return ctx;
};
