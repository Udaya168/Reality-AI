import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, Search, Edit, Trash2, Eye, Plus
} from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';
import { SellerListingItem, ListingStatusType } from '../../../types/dashboard';
import { EditListingModal } from '../components/EditListingModal';
import { formatINR, formatPerSqFt } from '../../../lib/formatCurrency';
import { Button, Badge } from '../../../components/ui';
import {
  getPropertyAreaLabel,
  isResidentialPropertyCategory,
  PropertyCardFrame,
  PropertyCardImage,
  PropertyCardInformation,
} from '../../properties/components/PropertyCard';

export const DashboardListingsPage: React.FC = () => {
  const { listings, deleteListing, toggleSoldStatus, updateListing, stats } = useDashboard();

  // Search & Filter state
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Edit Modal state
  const [editingListing, setEditingListing] = useState<SellerListingItem | null>(null);

  // Filter listings
  const filteredListings = listings.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.locality.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Controls: Search, Status Filter, and New Property Button */}
      <div className="bg-white border border-[#D9E0E6]/80 p-4 rounded-3xl flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#354B60] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search your listings by title, locality or city..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm text-[#102B46] placeholder:text-[#7896B2] focus:outline-none"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 text-xs">
          {[
            { label: 'All', value: 'all', count: listings.length },
            { label: 'Active', value: 'Active', count: stats.activeListings },
            { label: 'Pending', value: 'Pending', count: stats.pendingListings },
            { label: 'Sold', value: 'Sold', count: stats.soldProperties },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1.5 rounded-2xl font-mono uppercase tracking-wider text-[11px] transition-colors cursor-pointer ${
                statusFilter === tab.value
                  ? 'bg-[#183653] text-white font-bold'
                  : 'bg-[#F8F7F3] text-[#354B60] hover:text-[#102B46]'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Listings Table / Cards List */}
      <div className="space-y-4">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <PropertyCardFrame
              key={listing.id}
              className="flex flex-col items-start justify-between gap-5 p-4 sm:p-5 md:flex-row md:items-center"
            >
              {/* Left Property Visual & Info */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1 min-w-0">
                <PropertyCardImage
                  imageSrc={listing.image}
                  title={listing.title}
                  category={listing.category}
                  statusLabel={listing.status}
                  priceText={Number.isFinite(listing.price) && listing.price > 0 ? formatINR(listing.price) : 'Price on request'}
                  pricePerAreaText={
                    Number.isFinite(listing.price) &&
                    listing.price > 0 &&
                    Number.isFinite(listing.areaSqFt) &&
                    listing.areaSqFt > 0
                      ? formatPerSqFt(listing.price, listing.areaSqFt)
                      : undefined
                  }
                  showWishlist={false}
                  containerClassName="w-full aspect-[16/11] shrink-0 rounded-2xl sm:w-36"
                />
                <PropertyCardInformation
                  title={listing.title}
                  detailHref={`/property/${listing.id}`}
                  location={[listing.locality, listing.city].filter(Boolean).join(', ') || listing.location || undefined}
                  areaSqFt={listing.areaSqFt}
                  areaLabel={getPropertyAreaLabel(listing.category)}
                  bedrooms={listing.bedrooms}
                  showResidentialSpecs={isResidentialPropertyCategory(listing.category)}
                  className="min-w-0 flex-1"
                />
              </div>

              {/* Middle Metrics: Views & Enquiries */}
              <div               className="flex sm:flex-row items-center gap-6 py-2 md:py-0 border-t md:border-t-0 border-b md:border-b-0 border-[#E6E2D9] w-full md:w-auto justify-between md:justify-start">
                <div className="text-left sm:text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] block">
                    Views
                  </span>
                  <span className="font-serif text-lg font-semibold text-[#102B46]">
                    {listing.views}
                  </span>
                </div>

                <div className="text-left sm:text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] block">
                    Enquiries
                  </span>
                  <span className="font-serif text-lg font-semibold text-[#183653]">
                    {listing.enquiriesCount}
                  </span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div               className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                {/* View Listing */}
                <Link
                  to={`/property/${listing.id}`}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#183653] px-3.5 text-[10px] font-mono uppercase tracking-wider text-white transition-colors hover:bg-[#315D82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D82] focus-visible:ring-offset-2"
              aria-label={`View details for ${listing.title}`}
                >
                  <Eye className="w-4 h-4" />
              <span>View Details</span>
                </Link>

                {/* Edit Listing */}
                <button
                  type="button"
                  onClick={() => setEditingListing(listing)}
                  className="p-2 rounded-full border border-[#E6E2D9] text-[#354B60] transition-colors hover:border-[#183653] hover:text-[#183653] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D82] focus-visible:ring-offset-2"
                  title="Edit Listing Details"
                >
                  <Edit className="w-4 h-4" />
                </button>

                {/* Mark as Sold Toggle */}
                <button
                  type="button"
                  onClick={() => toggleSoldStatus(listing.id)}
                  className={`min-h-10 rounded-full border px-3 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D82] focus-visible:ring-offset-2 ${
                    listing.status === 'Sold'
                      ? 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'border-[#315D82] text-[#183653] hover:bg-[#183653] hover:text-white'
                  }`}
                  title={listing.status === 'Sold' ? 'Reactivate Listing' : 'Mark as Sold'}
                >
                  {listing.status === 'Sold' ? 'Mark Active' : 'Mark Sold'}
                </button>

                {/* Delete Listing */}
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to remove "${listing.title}" from your listings?`)) {
                      deleteListing(listing.id);
                    }
                  }}
                  className="p-2 rounded-full border border-transparent text-red-700 transition-colors hover:border-red-200 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700 focus-visible:ring-offset-2"
                  title="Delete Listing"
                  aria-label={`Delete ${listing.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </PropertyCardFrame>
          ))
        ) : (
          <div className="text-center py-20 bg-white border border-[#D9E0E6] p-8 max-w-md mx-auto space-y-3">
            <Building className="w-10 h-10 text-[#354B60] mx-auto opacity-40" />
            <h3 className="font-serif text-2xl text-[#183653]">No Listings Found</h3>
            <p className="text-xs text-[#354B60] font-light leading-relaxed">
              No properties matched your search query or status filter.
            </p>
            <div className="pt-2">
              <Link
                to="/sell"
                className="inline-flex items-center gap-1.5 py-2.5 px-5 bg-[#183653] text-white text-xs font-mono uppercase tracking-wider rounded-2xl"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Listing</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingListing && (
        <EditListingModal
          listing={editingListing}
          isOpen={!!editingListing}
          onClose={() => setEditingListing(null)}
          onSave={updateListing}
        />
      )}
    </div>
  );
};
