import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ListingActionsProps {
  listingId: string;
  status: string;
  onEdit: () => void;
  onToggleSold: () => void;
  onDelete: () => void;
}

export const ListingActions: React.FC<ListingActionsProps> = ({
  listingId,
  status,
  onEdit,
  onToggleSold,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Link
        to={`/property/${listingId}`}
        className="p-1.5 border border-[#D9E0E6] hover:border-[#183653] rounded-xl text-[#102B46]"
        title="View listing"
      >
        <Eye className="w-3.5 h-3.5" />
      </Link>
      <button
        type="button"
        onClick={onEdit}
        className="p-1.5 border border-[#D9E0E6] hover:border-[#183653] rounded-xl text-[#102B46] cursor-pointer"
        title="Edit listing"
      >
        <Edit className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onToggleSold}
        className="px-2.5 py-1 text-[11px] font-mono uppercase border border-[#315D82] text-[#183653] hover:bg-[#183653] hover:text-white rounded-xl cursor-pointer"
      >
        {status === 'Sold' ? 'Reactivate' : 'Mark Sold'}
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
        title="Delete listing"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
