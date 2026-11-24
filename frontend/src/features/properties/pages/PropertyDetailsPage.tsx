import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin, CheckCircle2, BedDouble, Bath, Maximize2,
  Compass, Calendar, Car, Phone, MessageSquare,
  Send, Bookmark, Share2, ArrowLeft, ChevronLeft, ChevronRight,
  ShieldCheck, Building, Sparkles, Check, Clock, Home, Layers,
  ExternalLink, UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProperties, formatINR, DEFAULT_PROPERTY_IMAGE } from '../../../data/mockProperties';
import { useProperties } from '../../../hooks/useProperties';
import { PropertyCard } from '../components/PropertyCard';
import { Container, Badge, Button, Card } from '../../../components/ui';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSaved, toggleSaveProperty } = useProperties();

  // Find matching property or fallback to first
  const property = mockProperties.find((p) => p.id === id) || mockProperties[0];
  const saved = isSaved(property.id);

  // Gallery active index state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Copy share feedback
  const [copied, setCopied] = useState(false);

  // Enquiry form state
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState(
    `Hello ${property.seller.name}, I am interested in "${property.title}" (ID: ${property.id}) listed on Reality AI. Please contact me with further details.`
  );
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setEnquirySubmitted(false);
  }, [id]);

  // Gallery navigation
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  // Share link handler
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Enquiry submit handler
  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) return;
    setEnquiryLoading(true);
    setTimeout(() => {
      setEnquiryLoading(false);
      setEnquirySubmitted(true);
    }, 700);
  };

  // Similar properties (same category or locality, excluding current)
  const similarProperties = mockProperties
    .filter((p) => p.id !== property.id && (p.category === property.category || p.location.locality === property.location.locality))
    .slice(0, 3);

  // Category display label
  const categoryLabelMap: Record<string, string> = {
    apartment: 'Apartment',
    villa: 'Villa & Estate',
    'independent-house': 'Independent House',
    plot: 'Residential Plot',
    land: 'Land & Plot',
    agricultural: 'Agricultural Land',
    commercial: 'Commercial Property',
  };

  return (
    <div className="py-6 sm:py-10 pb-32 lg:pb-24">
      <Container>
        {/* ========================================================= */}
        {/* NAVIGATION BAR & ACTIONS                                  */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E6DF] mb-8">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#737970] hover:text-[#183D30] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Properties</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 border border-[#E7E6DF] bg-white text-[#202520] hover:border-[#183D30] transition-colors flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider rounded-2xl cursor-pointer"
              title="Copy share link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Share2 className="w-3.5 h-3.5 text-[#737970]" />}
              <span className="hidden sm:inline">{copied ? 'Link Copied' : 'Share'}</span>
            </button>

            {/* Save Button */}
            <button
              onClick={() => toggleSaveProperty(property.id)}
              className={`p-2 border transition-colors flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider rounded-2xl cursor-pointer ${saved
                ? 'bg-[#183D30] text-[#F7F6F2] border-[#183D30]'
                : 'bg-white text-[#202520] border-[#E7E6DF] hover:border-[#183D30]'
                }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* HEADER: TITLE, BADGES, AND ASKING PRICE                   */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E7E6DF] mb-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" size="sm">
                {categoryLabelMap[property.category] || property.category}
              </Badge>
              {property.isVerified && (
                <Badge variant="verified" size="sm">
                  Verified Property
                </Badge>
              )}
              <span className="text-[11px] font-mono text-[#737970] uppercase">
                LISTING ID: {property.id}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl text-[#183D30] font-normal tracking-tight leading-tight">
              {property.title}
            </h1>

            {property.tagline && (
              <p className="text-sm sm:text-base text-[#737970] font-light max-w-3xl leading-relaxed">
                {property.tagline}
              </p>
            )}

            <div className="flex items-center gap-1.5 text-xs font-medium text-[#737970] pt-1">
              <MapPin className="w-4 h-4 text-[#315B49] shrink-0" />
              <span>
                {property.location.address}, {property.location.locality}, {property.location.city} — {property.location.pincode}, {property.location.state}
              </span>
            </div>
          </div>

          {/* Asking Price Block */}
          <div className="lg:text-right shrink-0 bg-white lg:bg-transparent p-4 lg:p-0 border lg:border-0 border-[#E7E6DF]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#737970]">
              Asking Price
            </div>
            <div className="font-serif text-3xl sm:text-5xl text-[#183D30] font-bold tracking-tight">
              {formatINR(property.price)}
            </div>
            <div className="text-xs font-mono text-[#737970] uppercase tracking-wider mt-1">
              ₹{Math.round(property.price / property.features.areaSqFt).toLocaleString('en-IN')} / sq.ft
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* GALLERY SECTION (Hero Main + Thumbnail Strip)             */}
        {/* ========================================================= */}
        <div className="space-y-4 mb-12">
          {/* Main Hero Viewer */}
          <div className="relative aspect-[16/10] sm:aspect-[21/10] overflow-hidden bg-[#F0EFE9] border border-[#E7E6DF] group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                src={property.images[activeImageIndex] || DEFAULT_PROPERTY_IMAGE}
                alt={`${property.title} - View ${activeImageIndex + 1}`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = DEFAULT_PROPERTY_IMAGE;
                }}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover select-none"
              />
            </AnimatePresence>

            {/* Previous / Next Controls */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-[#183D30] hover:text-white text-[#202520] flex items-center justify-center transition-colors shadow-md rounded-2xl cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-[#183D30] hover:text-white text-[#202520] flex items-center justify-center transition-colors shadow-md rounded-2xl cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Photo Counter Pill */}
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-2xl">
              {activeImageIndex + 1} / {property.images.length} Photographs
            </div>
          </div>

          {/* Thumbnail Strip */}
          {property.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[16/10] overflow-hidden border-2 transition-all cursor-pointer rounded-2xl ${activeImageIndex === idx
                    ? 'border-[#183D30] opacity-100 ring-1 ring-[#183D30]'
                    : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* MAIN DETAILS & STICKY SELLER CONTACT GRID                 */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ------------------------------------------------------- */}
          {/* LEFT COLUMN: OVERVIEW, SPECS, AMENITIES (Span 8)        */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-8 space-y-12">

            {/* Key Quick Attributes Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white border border-[#E7E6DF] rounded-3xl shadow-xs">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#737970] flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#315B49]" />
                  <span>Super Area</span>
                </div>
                <div className="font-serif text-2xl font-semibold text-[#183D30] mt-1">
                  {property.features.areaSqFt.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-sans font-normal text-[#737970]">sq.ft</span>
                </div>
              </div>

              {property.features.bedrooms ? (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#737970] flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-[#315B49]" />
                    <span>Bedrooms</span>
                  </div>
                  <div className="font-serif text-2xl font-semibold text-[#183D30] mt-1">
                    {property.features.bedrooms} BHK
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#737970] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#315B49]" />
                    <span>Property Type</span>
                  </div>
                  <div className="font-serif text-xl font-semibold text-[#183D30] mt-1 capitalize">
                    {property.category}
                  </div>
                </div>
              )}

              {property.features.bathrooms ? (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#737970] flex items-center gap-1.5">
                    <Bath className="w-3.5 h-3.5 text-[#315B49]" />
                    <span>Bathrooms</span>
                  </div>
                  <div className="font-serif text-2xl font-semibold text-[#183D30] mt-1">
                    {property.features.bathrooms} Baths
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#737970] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#315B49]" />
                    <span>Title Status</span>
                  </div>
                  <div className="font-serif text-xl font-semibold text-[#183D30] mt-1">
                    Clear A-Khata
                  </div>
                </div>
              )}

              {property.features.facing && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#737970] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#315B49]" />
                    <span>Facing</span>
                  </div>
                  <div className="font-serif text-2xl font-semibold text-[#183D30] mt-1">
                    {property.features.facing}
                  </div>
                </div>
              )}
            </div>

            {/* Property Architectural Description */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
                Architectural Statement
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#183D30] font-normal tracking-tight">
                About the Property
              </h2>
              <div className="text-[#202520] leading-relaxed text-base sm:text-lg font-light space-y-4 whitespace-pre-line border-l-2 border-[#183D30] pl-6 py-1">
                {property.description}
              </div>
            </div>

            {/* Detailed Property Specifications Table */}
            <div className="space-y-4 pt-6 border-t border-[#E7E6DF]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
                Technical Attributes
              </span>
              <h2 className="font-serif text-2xl text-[#183D30] font-normal tracking-tight">
                Property Specifications
              </h2>

              <div className="bg-white border border-[#E7E6DF] divide-y divide-[#E7E6DF] text-xs rounded-3xl overflow-hidden">
                <div className="grid grid-cols-2 p-3.5">
                  <span className="font-mono uppercase text-[#737970]">Super Built-up Area</span>
                  <span className="font-medium text-[#202520]">{property.features.areaSqFt.toLocaleString('en-IN')} sq.ft</span>
                </div>

                {property.features.bedrooms && (
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-mono uppercase text-[#737970]">Bedrooms</span>
                    <span className="font-medium text-[#202520]">{property.features.bedrooms} BHK</span>
                  </div>
                )}

                {property.features.bathrooms && (
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-mono uppercase text-[#737970]">Bathrooms</span>
                    <span className="font-medium text-[#202520]">{property.features.bathrooms} Luxury Baths</span>
                  </div>
                )}

                {property.features.balconies && (
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-mono uppercase text-[#737970]">Balconies / Verandahs</span>
                    <span className="font-medium text-[#202520]">{property.features.balconies} Covered Balconies</span>
                  </div>
                )}

                {property.features.furnishing && (
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-mono uppercase text-[#737970]">Furnishing Status</span>
                    <span className="font-medium text-[#202520]">{property.features.furnishing}</span>
                  </div>
                )}

                {property.features.facing && (
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-mono uppercase text-[#737970]">Orientation / Facing</span>
                    <span className="font-medium text-[#202520]">{property.features.facing} Facing</span>
                  </div>
                )}

                {property.features.carParking !== undefined && (
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-mono uppercase text-[#737970]">Car Parking Bays</span>
                    <span className="font-medium text-[#202520]">{property.features.carParking} Covered Parking</span>
                  </div>
                )}

                {property.features.totalFloors !== undefined && (
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-mono uppercase text-[#737970]">Floor Height</span>
                    <span className="font-medium text-[#202520]">
                      {property.features.floorNumber === 0 ? 'Ground / Standalone' : `Floor ${property.features.floorNumber}`} of {property.features.totalFloors}
                    </span>
                  </div>
                )}

                {property.features.ageOfPropertyYears !== undefined && (
                  <div className="grid grid-cols-2 p-3.5">
                    <span className="font-mono uppercase text-[#737970]">Property Age</span>
                    <span className="font-medium text-[#202520]">
                      {property.features.ageOfPropertyYears === 0 ? 'Brand New / Under Handover' : `${property.features.ageOfPropertyYears} Years`}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 p-3.5">
                  <span className="font-mono uppercase text-[#737970]">Ownership &amp; Title</span>
                  <span className="font-medium text-[#202520]">Freehold &bull; Clear Title Documented</span>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="space-y-4 pt-6 border-t border-[#E7E6DF]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
                Features &amp; Infrastructure
              </span>
              <h2 className="font-serif text-2xl text-[#183D30] font-normal tracking-tight">
                Amenities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3.5 bg-white border border-[#E7E6DF] text-xs font-medium text-[#202520]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#315B49] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhood & Location Blueprint */}
            <div className="space-y-4 pt-6 border-t border-[#E7E6DF]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
                Geographic Surroundings
              </span>
              <h2 className="font-serif text-2xl text-[#183D30] font-normal tracking-tight">
                Location &amp; Accessibility
              </h2>

              <div className="bg-white border border-[#E7E6DF] p-6 space-y-4 rounded-3xl">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#183D30] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#202520]">
                      {property.location.locality}, {property.location.city}
                    </div>
                    <div className="text-xs text-[#737970] mt-0.5 font-light">
                      {property.location.address} — {property.location.pincode}
                    </div>
                  </div>
                </div>

                {/* Minimal Architectural Grid Map Placeholder */}
                <div className="relative aspect-[21/9] bg-[#F7F6F2] border border-[#E7E6DF] flex flex-col items-center justify-center text-center p-6 overflow-hidden">
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#183D30_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 space-y-1">
                    <div className="w-8 h-8 rounded-full bg-[#183D30] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="font-serif text-base text-[#183D30]">
                      {property.location.locality} Neighborhood
                    </div>
                    <div className="text-[11px] font-mono text-[#737970] uppercase">
                      Exact geographic coordinates shared post-verification
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT COLUMN: STICKY SELLER CONTACT PANEL (Span 4)       */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-white border border-[#183D30] p-6 sm:p-7 shadow-[0_4px_24px_rgba(24,61,48,0.08)] rounded-3xl space-y-6">

              {/* Seller Profile Header */}
              <div className="flex items-center gap-3.5 pb-5 border-b border-[#E7E6DF]">
                <div className="w-13 h-13 bg-[#183D30] text-white flex items-center justify-center font-serif text-xl font-bold rounded-2xl shrink-0">
                  {property.seller.name.charAt(0)}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-lg font-semibold text-[#202520]">
                      {property.seller.name}
                    </span>
                    <UserCheck className="w-4 h-4 text-[#315B49]" />
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#737970]">
                    {property.seller.type} &bull; Verified Contact
                  </div>
                </div>
              </div>

              {/* Direct Calling & WhatsApp Actions */}
              <div className="space-y-2.5">
                <a
                  href={`tel:${property.seller.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#183D30] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#315B49] transition-colors rounded-2xl"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {property.seller.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${property.seller.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${property.seller.name}, I am inquiring about "${property.title}" (ID: ${property.id}) listed on Reality AI.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-[#315B49] text-[#183D30] text-xs font-mono uppercase tracking-wider hover:bg-[#183D30]/5 transition-colors rounded-2xl"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#315B49]" />
                  <span>Contact on WhatsApp</span>
                </a>
              </div>

              {/* Direct Enquiry Form */}
              <div className="pt-4 border-t border-[#E7E6DF] space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#737970] block">
                    Direct Contact Form
                  </span>
                  <div className="font-serif text-base text-[#183D30] font-medium">
                    Send Direct Enquiry
                  </div>
                </div>

                {enquirySubmitted ? (
                  <div className="p-5 bg-[#E8EDE7] border border-[#A7B9A5] text-[#183D30] text-xs space-y-2 rounded-2xl">
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#315B49]" />
                      <span>Enquiry Dispatched</span>
                    </div>
                    <p className="leading-relaxed font-light text-[#202520]">
                      Your inquiry has been relayed directly to {property.seller.name}. They will reach out via phone or WhatsApp shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#737970] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Rao"
                        value={enquiryName}
                        onChange={(e) => setEnquiryName(e.target.value)}
                        className="w-full p-2.5 text-xs border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-2xl bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#737970] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98450 00000"
                        value={enquiryPhone}
                        onChange={(e) => setEnquiryPhone(e.target.value)}
                        className="w-full p-2.5 text-xs border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-2xl bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#737970] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        value={enquiryEmail}
                        onChange={(e) => setEnquiryEmail(e.target.value)}
                        className="w-full p-2.5 text-xs border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-2xl bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#737970] mb-1">
                        Message to Seller
                      </label>
                      <textarea
                        rows={3}
                        value={enquiryMessage}
                        onChange={(e) => setEnquiryMessage(e.target.value)}
                        className="w-full p-2.5 text-xs border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-2xl bg-white leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={enquiryLoading}
                      className="w-full py-3 bg-[#183D30] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#315B49] transition-colors rounded-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {enquiryLoading ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Enquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Trust Disclaimer */}
              <div className="pt-3 border-t border-[#E7E6DF] text-[10px] text-[#737970] font-light leading-relaxed flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#315B49] shrink-0 mt-0.5" />
                <span>
                  Reality AI verifies titles and owner contact details. Your contact information is only transmitted to this verified seller.
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* SIMILAR PROPERTIES SECTION                                */}
        {/* ========================================================= */}
        {similarProperties.length > 0 && (
          <div className="pt-16 mt-16 border-t border-[#E7E6DF] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E7E6DF]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
                  Curated Typologies
                </span>
                <h2 className="font-serif text-3xl text-[#183D30] font-normal tracking-tight mt-1">
                  Similar Properties
                </h2>
              </div>
              <Link
                to={`/properties?category=${property.category}`}
                className="text-xs font-mono uppercase tracking-wider text-[#183D30] hover:text-[#315B49] flex items-center gap-1 transition-colors"
              >
                <span>View More {categoryLabelMap[property.category] || property.category}</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* ========================================================= */}
      {/* MOBILE-FRIENDLY FIXED CONTACT ACTION BAR                  */}
      {/* ========================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E6DF] p-3 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono text-[#737970] uppercase">Asking Price</div>
          <div className="font-serif text-lg font-bold text-[#183D30]">
            {formatINR(property.price)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${property.seller.phone}`}
            className="p-2.5 bg-white border border-[#183D30] text-[#183D30] rounded-2xl flex items-center justify-center"
            aria-label="Call seller"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href={`https://wa.me/${property.seller.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              `Hello ${property.seller.name}, I am inquiring about "${property.title}" (ID: ${property.id}) on Reality AI.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-white border border-[#315B49] text-[#315B49] rounded-2xl flex items-center justify-center"
            aria-label="WhatsApp seller"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          <a
            href="#enquiry-form"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: document.body.scrollHeight / 2,
                behavior: 'smooth'
              });
            }}
            className="py-2.5 px-4 bg-[#183D30] text-white text-xs font-mono uppercase tracking-wider rounded-2xl flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
};
