import React, { useState } from 'react';
import { Upload, X, Star } from 'lucide-react';

export interface UploadedFileItem {
  id: string;
  url: string;
  name: string;
  isCover?: boolean;
}

export interface ImageUploaderProps {
  images: UploadedFileItem[];
  onChange: (images: UploadedFileItem[]) => void;
  maxFiles?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  maxFiles = 10,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems: UploadedFileItem[] = [];

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        newItems.push({
          id: `upload-${Date.now()}-${index}`,
          url,
          name: file.name,
          isCover: images.length === 0 && index === 0,
        });
        if (newItems.length === files.length) {
          onChange([...images, ...newItems].slice(0, maxFiles));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    const next = images.filter((img) => img.id !== id);
    if (next.length > 0 && !next.some((img) => img.isCover)) {
      next[0].isCover = true;
    }
    onChange(next);
  };

  const setCover = (id: string) => {
    onChange(images.map((img) => ({ ...img, isCover: img.id === id })));
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed p-8 text-center rounded-[1px] transition-colors ${
          isDragging ? 'border-[#183D30] bg-[#183D30]/5' : 'border-[#E7E6DF] bg-[#F7F6F2]'
        }`}
      >
        <input
          type="file"
          id="image-upload-input"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <label htmlFor="image-upload-input" className="cursor-pointer space-y-2 block">
          <Upload className="w-8 h-8 text-[#183D30] mx-auto" />
          <div className="text-xs font-semibold text-[#202520]">
            Click to upload or drag &amp; drop photos
          </div>
          <p className="text-[11px] text-[#737970]">
            Supports JPG, PNG, WebP up to {maxFiles} images
          </p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-4/3 border border-[#E7E6DF] overflow-hidden group">
              <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
              {img.isCover && (
                <span className="absolute top-1 left-1 bg-[#183D30] text-white text-[9px] px-1.5 py-0.5 rounded-[1px]">
                  Cover
                </span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCover(img.id)}
                  className="p-1.5 bg-white text-[#183D30] rounded-full"
                  title="Make cover"
                >
                  <Star className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="p-1.5 bg-white text-rose-600 rounded-full"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
