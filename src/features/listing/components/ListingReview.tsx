import React from 'react';
import { ListingFormData } from '../schemas/listing.schema';
import { formatINR } from '../../../lib/formatCurrency';

export const ListingReview: React.FC<{
  formData: ListingFormData;
}> = ({ formData }) => {
  return (
    <div className="space-y-4 text-xs">
      <h3 className="font-serif text-xl text-[#183D30]">Review Listing Submission</h3>
      <div className="p-4 bg-[#F7F6F2] border border-[#E7E6DF] space-y-2">
        <div><strong>Title:</strong> {formData.title || 'Untitled Property'}</div>
        <div><strong>Typology:</strong> {formData.propertyType}</div>
        <div><strong>Price:</strong> {formData.price ? formatINR(parseFloat(formData.price)) : '—'}</div>
        <div><strong>Area:</strong> {formData.area} {formData.areaUnit}</div>
        <div><strong>Location:</strong> {formData.address}, {formData.locality}, {formData.city}</div>
        <div><strong>Seller:</strong> {formData.sellerName} ({formData.sellerType}) &bull; {formData.sellerPhone}</div>
      </div>
    </div>
  );
};
