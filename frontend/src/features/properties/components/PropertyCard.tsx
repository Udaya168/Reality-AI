import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  Heart,
  MapPin,
  Maximize2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Property, PropertyCategory } from '../../../types/property';
import { formatINR, formatPerSqFt } from '../../../lib/formatCurrency';
import { useSavedProperties } from '../../../context/SavedPropertiesContext';

const CATEGORY_LABELS: Record<PropertyCategory, string> = {
  apartment: 'Apartment',
  villa: 'Villa',
  'independent-house': 'Independent House',
  plot: 'Land',
  land: 'Land',
  agricultural: 'Agricultural Land',
  commercial: 'Commercial',
};

const LAND_CATEGORIES: PropertyCategory[] = ['plot', 'land', 'agricultural'];
const RESIDENTIAL_CATEGORIES: PropertyCategory[] = ['apartment', 'villa', 'independent-house'];

const normalizeCategory = (category: string): string => category.toLowerCase().trim().replace(/\s+/g, '-');

export const getPropertyCategoryLabel = (category: string): string => {
  const normalizedCategory = normalizeCategory(category);
  return CATEGORY_LABELS[normalizedCategory as PropertyCategory] ??
    normalizedCategory.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export const isResidentialPropertyCategory = (category: string): boolean =>
  RESIDENTIAL_CATEGORIES.includes(normalizeCategory(category) as PropertyCategory);

export const getPropertyAreaLabel = (category: string): string => {
  const normalizedCategory = normalizeCategory(category);
  if (normalizedCategory === 'plot' || normalizedCategory === 'land') return 'Plot area';
  if (normalizedCategory === 'agricultural' || normalizedCategory === 'agricultural-land') return 'Land area';
  return 'Built area';
};

interface PropertyCardFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const PropertyCardFrame: React.FC<PropertyCardFrameProps> = ({ children, className = '' }) => (
  <motion.article
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={`group overflow-hidden rounded-[1.5rem] border border-[#E6E2D9] bg-[#FCFBF8] shadow-[0_8px_24px_rgba(16,43,70,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,43,70,0.11)] ${className}`}
  >
    {children}
  </motion.article>
);

interface PropertyCardImageProps {
  imageSrc?: string | null;
  title: string;
  category?: string;
  isVerified?: boolean;
  statusLabel?: string;
  priceText?: string;
  pricePerAreaText?: string;
  showPrice?: boolean;
  showWishlist?: boolean;
  isSaved?: boolean;
  onToggleSaved?: () => void;
  priority?: boolean;
  containerClassName?: string;
}

export const PropertyCardImage: React.FC<PropertyCardImageProps> = ({
  imageSrc,
  title,
  category,
  isVerified = false,
  statusLabel,
  priceText,
  pricePerAreaText,
  showPrice = true,
  showWishlist = false,
  isSaved = false,
  onToggleSaved,
  priority = false,
  containerClassName = 'aspect-[4/3] rounded-t-[1.5rem]',
}) => {
  const [imageUnavailable, setImageUnavailable] = useState(!imageSrc);

  useEffect(() => {
    setImageUnavailable(!imageSrc);
  }, [imageSrc]);

  return (
    <div className={`relative overflow-hidden bg-[#E8EDF0] ${containerClassName}`}>
      {!imageUnavailable && imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImageUnavailable(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8EDF0] to-[#D9E2E9] text-[#7896B2]">
          <Building2 aria-hidden="true" className="h-10 w-10" strokeWidth={1.2} />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1C2A]/75 via-transparent to-[#0B1C2A]/10" />

      <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2 sm:left-4 sm:right-4 sm:top-4">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          {category && (
            <span className="rounded-full border border-white/20 bg-[#102B46]/85 px-3 py-1 text-[9px] font-mono uppercase tracking-[0.12em] text-white shadow-sm backdrop-blur-md">
              {getPropertyCategoryLabel(category)}
            </span>
          )}
          {isVerified && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/50 bg-[#F8F7F3]/90 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.1em] text-[#183653] shadow-sm backdrop-blur-md">
              <CheckCircle2 aria-hidden="true" className="h-3 w-3 text-[#315D82]" />
              Verified
            </span>
          )}
          {statusLabel && (
            <span className="rounded-full border border-white/20 bg-[#102B46]/75 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.1em] text-white shadow-sm backdrop-blur-md">
              {statusLabel}
            </span>
          )}
        </div>

        {showWishlist && onToggleSaved && (
          <button
            type="button"
            onClick={onToggleSaved}
            aria-label={isSaved ? `Remove ${title} from saved properties` : `Save ${title}`}
            aria-pressed={isSaved}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/45 bg-[#F8F7F3]/85 text-[#183653] shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-[#315D82] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#183653]"
          >
            <Heart aria-hidden="true" className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {showPrice && (
        <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-5 sm:left-5">
          <p className="font-serif text-2xl font-medium tracking-tight drop-shadow-md sm:text-[1.75rem]">
            {priceText || 'Price on request'}
          </p>
          {pricePerAreaText && (
            <p className="mt-0.5 text-[10px] font-mono uppercase tracking-wider text-white/85 drop-shadow">
              {pricePerAreaText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

interface PropertyCardInformationProps {
  title: string;
  location?: string;
  description?: string;
  detailHref?: string;
  areaSqFt?: number;
  areaLabel?: string;
  bedrooms?: number;
  bathrooms?: number;
  showResidentialSpecs?: boolean;
  className?: string;
}

export const PropertyCardInformation: React.FC<PropertyCardInformationProps> = ({
  title,
  location,
  description,
  detailHref,
  areaSqFt,
  areaLabel = 'Area',
  bedrooms,
  bathrooms,
  showResidentialSpecs = true,
  className = '',
}) => {
  const formattedArea =
    typeof areaSqFt === 'number' && Number.isFinite(areaSqFt) && areaSqFt > 0
      ? areaSqFt.toLocaleString('en-IN')
      : undefined;
  const hasArea = Boolean(formattedArea);
  const hasBedrooms = showResidentialSpecs && Number.isFinite(bedrooms) && (bedrooms ?? 0) > 0;
  const hasBathrooms = showResidentialSpecs && Number.isFinite(bathrooms) && (bathrooms ?? 0) > 0;

  return (
    <div className={className}>
      {location && (
        <div className="mb-2 flex min-w-0 items-center gap-1.5 text-xs text-[#52687D]">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#7896B2]" />
          <span className="truncate">{location}</span>
        </div>
      )}

      {detailHref ? (
        <Link
          to={detailHref}
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D82] focus-visible:ring-offset-2"
        >
          <h3 className="line-clamp-1 font-serif text-lg font-medium leading-snug tracking-tight text-[#183653] transition-colors group-hover:text-[#315D82] sm:text-xl">
            {title}
          </h3>
        </Link>
      ) : (
        <h3 className="line-clamp-1 font-serif text-lg font-medium leading-snug tracking-tight text-[#183653] sm:text-xl">
          {title}
        </h3>
      )}

      {description && (
        <p className="mt-1.5 line-clamp-2 text-xs font-light leading-relaxed text-[#52687D]">
          {description}
        </p>
      )}

      {(hasArea || hasBedrooms || hasBathrooms) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#E6E2D9] pt-3 text-[11px] font-medium text-[#354B60]">
          {hasArea && (
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 aria-hidden="true" className="h-3.5 w-3.5 text-[#7896B2]" />
              <span>{areaLabel}: {formattedArea} sq.ft</span>
            </span>
          )}
          {hasBedrooms && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble aria-hidden="true" className="h-3.5 w-3.5 text-[#7896B2]" />
              <span>{bedrooms} BHK</span>
            </span>
          )}
          {hasBathrooms && (
            <span className="inline-flex items-center gap-1.5">
              <Bath aria-hidden="true" className="h-3.5 w-3.5 text-[#7896B2]" />
              <span>{bathrooms} Baths</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, priority = false }) => {
  const { isSaved, toggleSaveProperty } = useSavedProperties();
  const areaSqFt = property.features?.areaSqFt;
  const validPrice = Number.isFinite(property.price) && property.price > 0;
  const hasArea = typeof areaSqFt === 'number' && Number.isFinite(areaSqFt) && areaSqFt > 0;
  const isLand = LAND_CATEGORIES.includes(property.category);
  const showResidentialSpecs = RESIDENTIAL_CATEGORIES.includes(property.category);
  const location = [property.location?.locality, property.location?.city].filter(Boolean).join(', ');
  const description = property.tagline?.trim() || property.description?.trim();
  const imageSrc =
    property.images?.[property.coverImageIndex] ||
    property.images?.[0] ||
    undefined;
  const priceText = property.priceDisplay?.trim() || (validPrice ? formatINR(property.price) : 'Price on request');

  return (
    <PropertyCardFrame className="flex h-full flex-col">
      <PropertyCardImage
        imageSrc={imageSrc}
        title={property.title}
        category={property.category}
        isVerified={property.isVerified === true}
        priceText={priceText}
        pricePerAreaText={validPrice && hasArea ? formatPerSqFt(property.price, areaSqFt) : undefined}
        priority={priority}
        showWishlist
        isSaved={isSaved(property.id)}
        onToggleSaved={() => toggleSaveProperty(property.id)}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <PropertyCardInformation
          title={property.title}
          detailHref={`/property/${property.id}`}
          location={location || undefined}
          description={description || undefined}
          areaSqFt={areaSqFt}
          areaLabel={isLand ? (property.category === 'agricultural' ? 'Land area' : 'Plot area') : 'Built area'}
          bedrooms={property.features?.bedrooms}
          bathrooms={property.features?.bathrooms}
          showResidentialSpecs={showResidentialSpecs}
        />

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E6E2D9] pt-4">
          {property.isVerified === true ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#52687D]">
              <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 text-[#7896B2]" />
              Verified
            </span>
          ) : (
            <span aria-hidden="true" />
          )}
          <Link
            to={`/property/${property.id}`}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#183653] px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#315D82] hover:opacity-95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D82] focus-visible:ring-offset-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </PropertyCardFrame>
  );
};
