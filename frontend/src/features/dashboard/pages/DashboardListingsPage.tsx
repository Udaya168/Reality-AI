import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, Search, Filter, Edit, Trash2, CheckCircle2, 
  Eye, ArrowUpRight, Plus, MapPin, Tag, RefreshCw, X 
} from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';
import { SellerListingItem, ListingStatusType } from '../../../types/dashboard';
import { EditListingModal } from '../components/EditListingModal';
import { formatINR } from '../../../data/mockProperties';
import { Button, Badge } from '../../../components/ui';

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
      <div className="bg-white border border-[#E7E6DF]/80 p-4 rounded-3xl flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#737970] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search your listings by title, locality or city..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm text-[#202520] placeholder:text-[#A7B9A5] focus:outline-none"
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
                  ? 'bg-[#183D30] text-white font-bold'
                  : 'bg-[#F7F6F2] text-[#737970] hover:text-[#202520]'
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
            <div
              key={listing.id}
              className="bg-white border border-[#E7E6DF] hover:border-[#183D30] transition-colors p-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between rounded-2xl"
            >
              {/* Left Property Visual & Info */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1 min-w-0">
                <div className="relative w-full sm:w-36 aspect-[16/11] shrink-0 bg-[#F0EFE9] overflow-hidden border border-[#E7E6DF] rounded-2xl">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-2xl ${
                      listing.status === 'Active'
                        ? 'bg-[#183D30] text-white'
                        : listing.status === 'Sold'
                        ? 'bg-gray-800 text-white'
                        : 'bg-amber-700 text-white'
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737970]">
                      {listing.category}
                    </span>
                    <span className="text-gray-300">&bull;</span>
                    <span className="text-[10px] font-mono text-[#737970] flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-[#315B49] shrink-0" />
                      <span>{listing.location}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#202520] truncate">
                    {listing.title}
                  </h3>

                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="font-serif text-xl font-bold text-[#183D30]">
                      {formatINR(listing.price)}
                    </span>
                    <span className="text-xs text-[#737970] font-mono">
                      {listing.areaSqFt.toLocaleString('en-IN')} sq.ft
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Metrics: Views & Enquiries */}
              <div className="flex sm:flex-row items-center gap-6 py-2 md:py-0 border-t md:border-t-0 border-b md:border-b-0 border-[#E7E6DF] w-full md:w-auto justify-between md:justify-start">
                <div className="text-left sm:text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#737970] block">
                    Views
                  </span>
                  <span className="font-serif text-lg font-semibold text-[#202520]">
                    {listing.views}
                  </span>
                </div>

                <div className="text-left sm:text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#737970] block">
                    Enquiries
                  </span>
                  <span className="font-serif text-lg font-semibold text-[#183D30]">
                    {listing.enquiriesCount}
                  </span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                {/* View Listing */}
                <Link
                  to={`/property/${listing.id}`}
                  className="p-2 border border-[#E7E6DF] hover:border-[#183D30] text-[#202520] hover:text-[#183D30] rounded-2xl transition-colors"
                  title="View Public Listing"
                >
                  <Eye className="w-4 h-4" />
                </Link>

                {/* Edit Listing */}
                <button
                  type="button"
                  onClick={() => setEditingListing(listing)}
                  className="p-2 border border-[#E7E6DF] hover:border-[#183D30] text-[#202520] hover:text-[#183D30] rounded-2xl transition-colors cursor-pointer"
                  title="Edit Listing Details"
                >
                  <Edit className="w-4 h-4" />
                </button>

                {/* Mark as Sold Toggle */}
                <button
                  type="button"
                  onClick={() => toggleSoldStatus(listing.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-2xl transition-colors cursor-pointer border ${
                    listing.status === 'Sold'
                      ? 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'border-[#315B49] text-[#183D30] hover:bg-[#183D30] hover:text-white'
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
                  className="p-2 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-2xl transition-colors cursor-pointer"
                  title="Delete Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white border border-[#E7E6DF] p-8 max-w-md mx-auto space-y-3">
            <Building className="w-10 h-10 text-[#737970] mx-auto opacity-40" />
            <h3 className="font-serif text-2xl text-[#183D30]">No Listings Found</h3>
            <p className="text-xs text-[#737970] font-light leading-relaxed">
              No properties matched your search query or status filter.
            </p>
            <div className="pt-2">
              <Link
                to="/sell"
                className="inline-flex items-center gap-1.5 py-2.5 px-5 bg-[#183D30] text-white text-xs font-mono uppercase tracking-wider rounded-2xl"
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
