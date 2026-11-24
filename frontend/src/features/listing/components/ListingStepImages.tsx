import React from 'react';
import { ImageUploader, UploadedFileItem } from '../../../components/common/ImageUploader';

export const ListingStepImages: React.FC<{
  images: UploadedFileItem[];
  onChange: (imgs: UploadedFileItem[]) => void;
}> = ({ images, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-serif text-xl text-[#183D30]">Upload Architectural Photos</h3>
      <ImageUploader images={images} onChange={onChange} />
    </div>
  );
};
