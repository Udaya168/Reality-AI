import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { SellerListingItem, ListingStatusType } from '../../../types/dashboard';
import { Button } from '../../../components/ui';

interface EditListingModalProps {
  listing: SellerListingItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<SellerListingItem>) => void;
}

export const EditListingModal: React.FC<EditListingModalProps> = ({
  listing,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(listing.title);
  const [price, setPrice] = useState(listing.price.toString());
  const [status, setStatus] = useState<ListingStatusType>(listing.status);
  const [locality, setLocality] = useState(listing.locality);
  const [city, setCity] = useState(listing.city);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = parseFloat(price);
    if (!title.trim() || isNaN(numPrice)) return;

    onSave(listing.id, {
      title,
      price: numPrice,
      status,
      locality,
      city,
      location: `${locality}, ${city}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg bg-white border border-[#183653] shadow-2xl p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#D9E0E6]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#354B60]">
              Edit Property &bull; ID: {listing.id}
            </span>
            <h3 className="font-serif text-2xl text-[#183653]">
              Update Listing Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#354B60] hover:text-[#102B46] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#354B60] mb-1">
              Listing Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#354B60] mb-1">
                Asking Price (INR)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2.5 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#354B60] mb-1">
                Listing Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ListingStatusType)}
                className="w-full p-2.5 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl bg-white cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending Review</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#354B60] mb-1">
                Locality / Area
              </label>
              <input
                type="text"
                required
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full p-2.5 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#354B60] mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 text-sm border border-[#D9E0E6] focus:outline-none focus:border-[#183653] rounded-2xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D9E0E6]">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
