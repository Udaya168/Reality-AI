export type ListingStatusType = 'Active' | 'Pending' | 'Sold';

export interface SellerListingItem {
  id: string;
  title: string;
  category: string;
  price: number;
  location: string;
  locality: string;
  city: string;
  status: ListingStatusType;
  views: number;
  enquiriesCount: number;
  image: string;
  areaSqFt: number;
  bedrooms?: number;
  createdAt: string;
}

export interface SellerEnquiryItem {
  id: string;
  propertyId: string;
  propertyTitle: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  message: string;
  receivedAt: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface DashboardStats {
  totalProperties: number;
  activeListings: number;
  pendingListings: number;
  soldProperties: number;
  totalViews: number;
  totalEnquiries: number;
}
