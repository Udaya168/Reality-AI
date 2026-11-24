import React from 'react';
import { SellerListingItem } from '../../../types/dashboard';
import { ListingActions } from './ListingActions';
import { formatINR } from '../../../lib/formatCurrency';

export interface ListingTableProps {
  listings: SellerListingItem[];
  onEdit: (listing: SellerListingItem) => void;
  onToggleSold: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ListingTable: React.FC<ListingTableProps> = ({
  listings,
  onEdit,
  onToggleSold,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-[#E7E6DF] overflow-hidden rounded-3xl">
      <table className="w-full text-left text-xs">
        <thead className="bg-[#F7F6F2] border-b border-[#E7E6DF] text-[10px] font-mono uppercase tracking-wider text-[#737970]">
          <tr>
            <th className="p-3 pl-4">Property</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
            <th className="p-3">Views</th>
            <th className="p-3">Inquiries</th>
            <th className="p-3 text-right pr-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E7E6DF]">
          {listings.map((item) => (
            <tr key={item.id} className="hover:bg-[#F7F6F2]/50">
              <td className="p-3 pl-4">
                <div className="font-medium text-[#202520]">{item.title}</div>
                <div className="text-[11px] text-[#737970]">{item.location}</div>
              </td>
              <td className="p-3 font-serif font-semibold text-[#183D30]">
                {formatINR(item.price)}
              </td>
              <td className="p-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#E8EDE7] text-[#183D30]">
                  {item.status}
                </span>
              </td>
              <td className="p-3 font-mono">{item.views}</td>
              <td className="p-3 font-mono">{item.enquiriesCount}</td>
              <td className="p-3 text-right pr-4">
                <ListingActions
                  listingId={item.id}
                  status={item.status}
                  onEdit={() => onEdit(item)}
                  onToggleSold={() => onToggleSold(item.id)}
                  onDelete={() => onDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
