import React, { useState } from 'react';
import { Phone, MessageSquare, CheckCircle2, UserCheck } from 'lucide-react';
import { PropertySeller } from '../types/property.types';

export interface SellerContactCardProps {
  seller: PropertySeller;
  propertyTitle: string;
  propertyId: string;
}

export const SellerContactCard: React.FC<SellerContactCardProps> = ({
  seller,
  propertyTitle,
  propertyId,
}) => {
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setEnquirySubmitted(true);
  };

  return (
    <div className="bg-white border border-[#183D30]/80 p-6 sm:p-7 shadow-lg space-y-6 rounded-3xl">
      <div className="flex items-center gap-3.5 pb-4 border-b border-[#E7E6DF]">
        <div className="w-12 h-12 bg-[#183D30] text-white flex items-center justify-center font-serif text-xl font-bold rounded-full">
          {seller.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-lg font-semibold text-[#202520]">{seller.name}</span>
            <UserCheck className="w-4 h-4 text-[#315B49]" />
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#737970]">
            {seller.type} &bull; Verified Contact
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <a
          href={`tel:${seller.phone}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#183D30] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#315B49] transition-colors rounded-full"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call {seller.phone}</span>
        </a>

        <a
          href={`https://wa.me/${seller.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            `Inquiring regarding "${propertyTitle}" (${propertyId}) on Reality AI.`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 border border-[#315B49] text-[#183D30] text-xs font-mono uppercase tracking-wider hover:bg-[#183D30]/5 transition-colors rounded-full"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact on WhatsApp</span>
        </a>
      </div>

      <div className="pt-4 border-t border-[#E7E6DF]">
        <div className="font-serif text-sm font-semibold text-[#183D30] mb-3">Send Enquiry</div>
        {enquirySubmitted ? (
          <div className="p-4 bg-[#E8EDE7] border border-[#A7B9A5] text-[#183D30] text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#315B49]" />
              <span>Dispatched</span>
            </div>
            <p className="font-light">Your enquiry was sent directly to {seller.name}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
            <input
              type="text"
              required
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-[#E7E6DF] rounded-full"
            />
            <input
              type="tel"
              required
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-[#E7E6DF] rounded-full"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-[#183D30] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#315B49] cursor-pointer"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
