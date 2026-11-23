import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AdminPropertyItem,
  AdminUserItem,
  AdminReportItem,
  AdminStats,
  ModerationStatus,
} from '../types/admin';
import {
  initialAdminProperties,
  initialAdminUsers,
  initialAdminReports,
} from '../data/mockAdminData';

interface AdminContextType {
  properties: AdminPropertyItem[];
  users: AdminUserItem[];
  reports: AdminReportItem[];
  stats: AdminStats;
  activeTab: 'overview' | 'queue' | 'properties' | 'users' | 'reports';
  setActiveTab: (tab: 'overview' | 'queue' | 'properties' | 'users' | 'reports') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedProperty: AdminPropertyItem | null;
  setSelectedProperty: (p: AdminPropertyItem | null) => void;
  // Actions
  approveProperty: (id: string) => void;
  rejectProperty: (id: string, reason?: string) => void;
  deleteProperty: (id: string) => void;
  verifyUser: (id: string) => void;
  suspendUser: (id: string) => void;
  resolveReport: (id: string) => void;
  resetToDefault: () => void;
}

const STORAGE_KEYS = {
  PROPERTIES: 'reality_ai_admin_properties_v1',
  USERS: 'reality_ai_admin_users_v1',
  REPORTS: 'reality_ai_admin_reports_v1',
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<AdminPropertyItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      return saved ? JSON.parse(saved) : initialAdminProperties;
    } catch {
      return initialAdminProperties;
    }
  });

  const [users, setUsers] = useState<AdminUserItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : initialAdminUsers;
    } catch {
      return initialAdminUsers;
    }
  });

  const [reports, setReports] = useState<AdminReportItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
      return saved ? JSON.parse(saved) : initialAdminReports;
    } catch {
      return initialAdminReports;
    }
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'queue' | 'properties' | 'users' | 'reports'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<AdminPropertyItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    } catch (e) {
      console.warn('Failed to save admin properties to localStorage', e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to save admin users to localStorage', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.warn('Failed to save admin reports to localStorage', e);
    }
  }, [reports]);

  // Derived Stats
  const stats: AdminStats = {
    totalListings: properties.length,
    pendingApprovals: properties.filter((p) => p.status === 'Pending').length,
    approvedListings: properties.filter((p) => p.status === 'Approved').length,
    rejectedListings: properties.filter((p) => p.status === 'Rejected').length,
    totalUsers: users.length,
    reportedListings: reports.filter((r) => r.status !== 'Resolved').length,
  };

  const approveProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: 'Approved' as ModerationStatus, rejectionReason: undefined } : p
      )
    );
    if (selectedProperty?.id === id) {
      setSelectedProperty((prev) =>
        prev ? { ...prev, status: 'Approved', rejectionReason: undefined } : null
      );
    }
  };

  const rejectProperty = (id: string, reason = 'Did not meet architectural curation standards or required clear title documentation.') => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: 'Rejected' as ModerationStatus, rejectionReason: reason } : p
      )
    );
    if (selectedProperty?.id === id) {
      setSelectedProperty((prev) =>
        prev ? { ...prev, status: 'Rejected', rejectionReason: reason } : null
      );
    }
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    if (selectedProperty?.id === id) {
      setSelectedProperty(null);
    }
  };

  const verifyUser = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'Verified' as const } : u))
    );
  };

  const suspendUser = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Suspended' ? 'Verified' : 'Suspended' }
          : u
      )
    );
  };

  const resolveReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Resolved' as const } : r))
    );
  };

  const resetToDefault = () => {
    setProperties(initialAdminProperties);
    setUsers(initialAdminUsers);
    setReports(initialAdminReports);
    localStorage.removeItem(STORAGE_KEYS.PROPERTIES);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
  };

  return (
    <AdminContext.Provider
      value={{
        properties,
        users,
        reports,
        stats,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedProperty,
        setSelectedProperty,
        approveProperty,
        rejectProperty,
        deleteProperty,
        verifyUser,
        suspendUser,
        resolveReport,
        resetToDefault,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
