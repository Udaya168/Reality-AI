import React, { useId, useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  items: DropdownItem[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  onChange,
  placeholder = 'Select option...',
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedItem = items.find((i) => i.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-xs" ref={dropdownRef}>
      {label && (
        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60] mb-1.5">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setIsOpen(false);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-[#D9E0E6] hover:border-[#183653] text-[#102B46] rounded-2xl transition-colors cursor-pointer"
      >
        <span className={selectedItem ? 'text-[#102B46]' : 'text-[#7896B2]'}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#354B60] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
        <motion.div
          id={listboxId}
          role="listbox"
          initial={{ opacity: 0, y: -4, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.99 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-md border border-[#D9E0E6]/80 shadow-[0_14px_32px_rgba(16,43,70,0.12)] z-30 max-h-56 overflow-y-auto rounded-2xl origin-top"
        >
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              role="option"
              aria-selected={item.value === value}
              onClick={() => {
                onChange(item.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 hover:bg-[#F8F7F3] focus-visible:bg-[#EDF2F6] flex items-center gap-2 transition-colors ${
                item.value === value ? 'bg-[#DCE7F0] font-semibold text-[#183653]' : 'text-[#102B46]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
