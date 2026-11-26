import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Plus, Search, MapPin, Eye, MessageSquare,
  Trash2, CheckCircle2, ArrowUpRight, BedDouble, Bath, Maximize2, RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserListings, UserListingItem } from '../../../context/UserListingsContext';
import { formatINR } from '../../../data/mockProperties';
import { Container, Badge, Button } from '../../../components/ui';

export const MyPropertiesPage: React.FC = () => {
  const { myListings, deleteListing, toggleSoldStatus, resetToDefault } = useUserListings();
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Sold'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Compute summary metrics
  const activeCount = myListings.filter((l) => l.status === 'Active').length;
  const soldCount = myListings.filter((l) => l.status === 'Sold').length;
  const totalViews = myListings.reduce((sum, item) => sum + (item.views || 0), 0);
  const totalInquiries = myListings.reduce((sum, item) => sum + (item.inquiriesCount || 0), 0);

  // Filter listings
  const filteredListings = myListings.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.location.locality.toLowerCase().includes(q) ||
        item.location.city.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="py-8 sm:py-12 pb-24">
      <Container>
        {/* ========================================================= */}
        {/* PAGE HEADER                                               */}
        {/* ========================================================= */}
        <div className="border-b border-[#D9E0E6] pb-8 mb-8 space-y-4">
          <Badge variant="subtle" size="sm">
            Personal Portfolio &bull; Architectural Listings
          </Badge>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl sm:text-6xl text-[#183653] font-normal tracking-tight">
                My Properties
              </h1>
              <p className="text-[#354B60] text-sm sm:text-base max-w-2xl leading-relaxed mt-2 font-light">
                Manage the residences you have listed on Reality AI. Connect directly with verified patrons and track buyer engagement.
              </p>
            </div>

            {/* List Property Action CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 bg-[#183653] hover:bg-[#102B46] text-[#F8F7F3] px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>List New Property</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PORTFOLIO METRICS BAR                                     */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#D9E0E6]/80 p-5 rounded-3xl shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7896B2] block mb-1">
              Total Listed
            </span>
            <div className="font-serif text-3xl font-semibold text-[#183653]">
              {myListings.length}
            </div>
            <span className="text-xs text-[#354B60] mt-1 block">Your portfolio residences</span>
          </div>

          <div className="bg-white border border-[#D9E0E6]/80 p-5 rounded-3xl shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7896B2] block mb-1">
              Active Marketplace
            </span>
            <div className="font-serif text-3xl font-semibold text-emerald-700">
              {activeCount}
            </div>
            <span className="text-xs text-[#354B60] mt-1 block">Live to verified patrons</span>
          </div>

          <div className="bg-white border border-[#D9E0E6]/80 p-5 rounded-3xl shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7896B2] block mb-1">
              Buyer Inquiries
            </span>
            <div className="font-serif text-3xl font-semibold text-[#315D82]">
              {totalInquiries}
            </div>
            <span className="text-xs text-[#354B60] mt-1 block">Direct WhatsApp & calls</span>
          </div>

          <div className="bg-white border border-[#D9E0E6]/80 p-5 rounded-3xl shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7896B2] block mb-1">
              Completed Deals
            </span>
            <div className="font-serif text-3xl font-semibold text-slate-700">
              {soldCount}
            </div>
            <span className="text-xs text-[#354B60] mt-1 block">Marked as sold</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SEARCH AND STATUS FILTER BAR                              */}
        {/* ========================================================= */}
        <div className="bg-white border border-[#D9E0E6]/80 p-3 sm:p-4 mb-8 shadow-xs rounded-3xl flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#354B60] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your listed residences by title or locality..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm text-[#102B46] placeholder:text-[#7896B2] focus:outline-none bg-transparent"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 border-t md:border-t-0 md:border-l border-[#D9E0E6] pt-2 md:pt-0 md:pl-4">
            {(['all', 'Active', 'Sold'] as const).map((status) => {
              const label = status === 'all' ? `All (${myListings.length})` : status === 'Active' ? `Active (${activeCount})` : `Sold (${soldCount})`;
              const isSelected = statusFilter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#183653] text-white font-semibold shadow-xs'
                      : 'bg-[#F8F7F3] text-[#354B60] hover:text-[#183653]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* LISTINGS GRID                                             */}
        {/* ========================================================= */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((property) => (
              <div
                key={property.id}
                className="bg-white border border-[#D9E0E6] hover:border-[#183653] transition-all duration-300 rounded-3xl overflow-hidden shadow-xs hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  {/* Property Image & Status Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EDF2F6]">
                    <img
                      src={property.coverImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                      <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-[#183653]/90 text-white rounded-full backdrop-blur-xs">
                        {property.category}
                      </span>
                      <span
                        className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full font-semibold ${
                          property.status === 'Active'
                            ? 'bg-emerald-500 text-white'
                            : property.status === 'Sold'
                            ? 'bg-slate-800 text-white'
                            : 'bg-amber-500 text-white'
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>

                    {/* Asking Price Pill */}
                    <div className="absolute bottom-3.5 left-3.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl text-white">
                      <div className="font-serif text-lg font-bold">
                        {formatINR(property.price)}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#354B60] font-light">
                      <MapPin className="w-3.5 h-3.5 text-[#315D82] shrink-0" />
                      <span>{property.location.locality}, {property.location.city}</span>
                    </div>

                    <h2 className="font-serif text-xl text-[#102B46] font-semibold tracking-tight line-clamp-1">
                      {property.title}
                    </h2>

                    {property.tagline && (
                      <p className="text-xs text-[#354B60] line-clamp-2 leading-relaxed font-light">
                        {property.tagline}
                      </p>
                    )}

                    {/* Specifications */}
                    <div className="pt-3 border-t border-[#D9E0E6]/70 flex items-center gap-4 text-xs text-[#354B60] font-mono">
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5 text-[#7896B2]" />
                        <span>{property.features.bedrooms} BHK</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 text-[#7896B2]" />
                        <span>{property.features.areaSqFt.toLocaleString()} sq.ft</span>
                      </div>
                      <div className="flex items-center gap-1 ml-auto text-[10px] text-[#7896B2]">
                        <Eye className="w-3 h-3" />
                        <span>{property.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-[#F8F7F3] border-t border-[#D9E0E6] flex items-center justify-between gap-2">
                  {/* Toggle Sold / Active */}
                  <button
                    type="button"
                    onClick={() => toggleSoldStatus(property.id)}
                    className={`text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                      property.status === 'Active'
                        ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {property.status === 'Active' ? 'Mark as Sold' : 'Reactivate'}
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Delete Confirmation */}
                    {deleteConfirmId === property.id ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            deleteListing(property.id);
                            setDeleteConfirmId(null);
                          }}
                          className="px-2.5 py-1 text-[11px] font-mono uppercase bg-rose-600 text-white rounded-full hover:bg-rose-700 cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2.5 py-1 text-[11px] font-mono uppercase bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(property.id)}
                        className="p-2 text-[#7896B2] hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                        title="Delete listing"
                        aria-label="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white border border-[#D9E0E6]/80 rounded-3xl p-8 max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-14 h-14 bg-[#EDF2F6] text-[#183653] mx-auto flex items-center justify-center rounded-3xl font-serif text-2xl font-bold shadow-xs">
              <Building2 className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#183653]">
              {searchFilter ? 'No matching properties found' : 'No properties listed yet'}
            </h2>
            <p className="text-xs sm:text-sm text-[#354B60] leading-relaxed max-w-md mx-auto font-light">
              {searchFilter
                ? 'Try clearing your search query to see all listed residences.'
                : 'Have an exceptional villa, penthouse, estate, or land parcel to sell? List directly on Reality AI to reach verified patrons with zero brokerage.'}
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              {searchFilter ? (
                <Button variant="outline" size="sm" onClick={() => setSearchFilter('')}>
                  Clear Search Filter
                </Button>
              ) : (
                <Link
                  to="/sell"
                  className="inline-flex items-center gap-2 bg-[#183653] hover:bg-[#315D82] text-white px-7 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-full shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>List Your First Property</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
