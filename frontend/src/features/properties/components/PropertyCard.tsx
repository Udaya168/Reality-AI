import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, BedDouble, Bath, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Property } from '../../../types/property';
import { formatINR, DEFAULT_PROPERTY_IMAGE } from '../../../data/mockProperties';

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, priority = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white border border-[#D9E0E6]/80 hover:border-[#183653] rounded-3xl transition-all duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1"
    >
      {/* Architectural Image Container */}
      <div className="relative aspect-[16/11] overflow-hidden bg-[#EDF2F6]">
        <img
          src={property.images[property.coverImageIndex || 0] || DEFAULT_PROPERTY_IMAGE}
          alt={property.title}
          loading={priority ? 'eager' : 'lazy'}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_PROPERTY_IMAGE;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient vignette for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center z-10">
          <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-[#183653]/90 text-[#F8F7F3] backdrop-blur-sm rounded-full shadow-xs">
            {property.category}
          </span>
          {property.isVerified && (
            <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-white/95 text-[#183653] backdrop-blur-sm flex items-center gap-1 rounded-full shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-[#315D82]" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Bottom Price Tag on Image */}
        <div className="absolute bottom-4 left-4 text-white z-10">
          <div className="font-serif text-2xl font-bold tracking-tight drop-shadow-sm">
            {formatINR(property.price)}
          </div>
          <div className="text-[10px] font-mono text-white/80 uppercase tracking-wider">
            ₹{Math.round(property.price / property.features.areaSqFt).toLocaleString('en-IN')} / sq.ft
          </div>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#354B60] mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#315D82] shrink-0" />
            <span className="truncate font-medium">
              {property.location.locality}, {property.location.city}
            </span>
          </div>

          {/* Title */}
          <Link to={`/property/${property.id}`} className="block">
            <h3 className="font-serif text-xl text-[#102B46] group-hover:text-[#183653] transition-colors line-clamp-1 font-semibold leading-snug">
              {property.title}
            </h3>
          </Link>

          {/* Tagline / Subtitle */}
          {property.tagline && (
            <p className="text-xs text-[#354B60] line-clamp-2 leading-relaxed mt-2 font-light">
              {property.tagline}
            </p>
          )}
        </div>

        {/* Feature Specs */}
        <div className="pt-4 border-t border-[#D9E0E6] grid grid-cols-3 gap-2 text-xs text-[#102B46] font-medium">
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-[#354B60]" />
            <span className="truncate">{property.features.areaSqFt.toLocaleString('en-IN')} sq.ft</span>
          </div>

          {property.features.bedrooms ? (
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-[#354B60]" />
              <span>{property.features.bedrooms} BHK</span>
            </div>
          ) : (
            <div className="text-[#354B60] capitalize truncate">{property.category}</div>
          )}

          {property.features.bathrooms ? (
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-[#354B60]" />
              <span>{property.features.bathrooms} Baths</span>
            </div>
          ) : (
            <div className="text-[#354B60] font-mono text-[11px] uppercase">Direct Title</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
