export type ModerationStatus = 'Pending' | 'Approved' | 'Rejected';

export interface AdminPropertyItem {
  id: string;
  title: string;
  category: string;
  sellerName: string;
  sellerType: 'Owner' | 'Agent' | 'Builder';
  sellerPhone: string;
  sellerEmail: string;
  location: string;
  locality: string;
  city: string;
  price: number;
  dateSubmitted: string;
  status: ModerationStatus;
  image: string;
  areaSqFt: number;
  reportCount?: number;
  rejectionReason?: string;
  documentStatus: 'Verified Title' | 'Pending Title Check' | 'Discrepancy';
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Owner' | 'Agent' | 'Builder' | 'Buyer';
  status: 'Verified' | 'Unverified' | 'Suspended';
  propertiesCount: number;
  joinedDate: string;
}

export interface AdminReportItem {
  id: string;
  propertyId: string;
  propertyTitle: string;
  reporterName: string;
  reason: string;
  reportedAt: string;
  status: 'Open' | 'Investigating' | 'Resolved';
}

export interface AdminStats {
  totalListings: number;
  pendingApprovals: number;
  approvedListings: number;
  rejectedListings: number;
  totalUsers: number;
  reportedListings: number;
}
