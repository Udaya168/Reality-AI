import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DEFAULT_FALLBACK_IMAGE } from '../../../lib/constants';

export interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const displayImages = images.length > 0 ? images : [DEFAULT_FALLBACK_IMAGE];

  return (
    <div className="space-y-3">
      <div className="relative aspect-16/10 overflow-hidden bg-[#F0EFE9] border border-[#E7E6DF]">
        <img
          src={displayImages[activeIdx] || DEFAULT_FALLBACK_IMAGE}
          alt={`${title} - View ${activeIdx + 1}`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_FALLBACK_IMAGE;
          }}
          className="w-full h-full object-cover"
        />
        {displayImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx((prev) => (prev - 1 + displayImages.length) % displayImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 text-[#202520] hover:bg-[#183D30] hover:text-white transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveIdx((prev) => (prev + 1) % displayImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 text-[#202520] hover:bg-[#183D30] hover:text-white transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`aspect-16/10 overflow-hidden border cursor-pointer ${
                activeIdx === idx ? 'border-[#183D30]' : 'border-transparent opacity-60'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
