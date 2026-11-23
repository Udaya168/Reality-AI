import React, { createContext, useContext, useState, useEffect } from 'react';
import { SellerListingItem, SellerEnquiryItem, DashboardStats, ListingStatusType } from '../types/dashboard';
import { initialSellerListings, initialSellerEnquiries } from '../data/mockDashboardData';

interface DashboardContextType {
  listings: SellerListingItem[];
  enquiries: SellerEnquiryItem[];
  stats: DashboardStats;
  deleteListing: (id: string) => void;
  toggleSoldStatus: (id: string) => void;
  updateListing: (id: string, updates: Partial<SellerListingItem>) => void;
  markEnquiryStatus: (id: string, status: 'New' | 'Contacted' | 'Closed') => void;
  resetToDefault: () => void;
}

const STORAGE_KEY_LISTINGS = 'reality_ai_seller_listings_v1';
const STORAGE_KEY_ENQUIRIES = 'reality_ai_seller_enquiries_v1';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<SellerListingItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LISTINGS);
      return saved ? JSON.parse(saved) : initialSellerListings;
    } catch {
      return initialSellerListings;
    }
  });

  const [enquiries, setEnquiries] = useState<SellerEnquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENQUIRIES);
      return saved ? JSON.parse(saved) : initialSellerEnquiries;
    } catch {
      return initialSellerEnquiries;
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(listings));
    } catch (e) {
      console.error('Failed to sync listings', e);
    }
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.error('Failed to sync enquiries', e);
    }
  }, [enquiries]);

  // Compute stats dynamically
  const stats: DashboardStats = {
    totalProperties: listings.length,
    activeListings: listings.filter((l) => l.status === 'Active').length,
    pendingListings: listings.filter((l) => l.status === 'Pending').length,
    soldProperties: listings.filter((l) => l.status === 'Sold').length,
    totalViews: listings.reduce((acc, curr) => acc + curr.views, 0),
    totalEnquiries: listings.reduce((acc, curr) => acc + curr.enquiriesCount, 0),
  };

  // Actions
  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const toggleSoldStatus = (id: string) => {
    setListings((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const nextStatus: ListingStatusType = l.status === 'Sold' ? 'Active' : 'Sold';
          return { ...l, status: nextStatus };
        }
        return l;
      })
    );
  };

  const updateListing = (id: string, updates: Partial<SellerListingItem>) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
    );
  };

  const markEnquiryStatus = (id: string, status: 'New' | 'Contacted' | 'Closed') => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const resetToDefault = () => {
    setListings(initialSellerListings);
    setEnquiries(initialSellerEnquiries);
    localStorage.removeItem(STORAGE_KEY_LISTINGS);
    localStorage.removeItem(STORAGE_KEY_ENQUIRIES);
  };

  return (
    <DashboardContext.Provider
      value={{
        listings,
        enquiries,
        stats,
        deleteListing,
        toggleSoldStatus,
        updateListing,
        markEnquiryStatus,
        resetToDefault,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
