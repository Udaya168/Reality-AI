import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white border border-[#D9E0E6] rounded-3xl shadow-2xl overflow-hidden z-10`}
      >
        {title && (
          <div className="p-5 border-b border-[#D9E0E6] flex items-center justify-between bg-[#F8F7F3]">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#183653]">
                {title}
              </h3>
              {description && (
                <p className="text-xs text-[#354B60] mt-0.5">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#354B60] hover:text-[#102B46] hover:bg-[#D9E0E6]/50 rounded-3xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="p-6 max-h-[85vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
