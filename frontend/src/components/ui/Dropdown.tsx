import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

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
        className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-[#D9E0E6] hover:border-[#183653] text-[#102B46] rounded-2xl transition-colors cursor-pointer"
      >
        <span className={selectedItem ? 'text-[#102B46]' : 'text-[#7896B2]'}>
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#354B60] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D9E0E6] shadow-lg z-30 max-h-56 overflow-y-auto rounded-2xl">
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onChange(item.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 hover:bg-[#F8F7F3] flex items-center gap-2 cursor-pointer ${
                item.value === value ? 'bg-[#DCE7F0] font-semibold text-[#183653]' : 'text-[#102B46]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
