import { initialSellerListings, initialSellerEnquiries } from '../../../data/mock/mockDashboard';
import { SellerListingItem, SellerEnquiryItem } from '../../../types/dashboard';

export const dashboardService = {
  getListings(): Promise<SellerListingItem[]> {
    return Promise.resolve(initialSellerListings);
  },
  getEnquiries(): Promise<SellerEnquiryItem[]> {
    return Promise.resolve(initialSellerEnquiries);
  },
};
