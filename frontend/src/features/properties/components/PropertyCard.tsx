import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  Heart,
  Home,
  MapPin,
  Maximize2,
  Star,
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

/**
 * Design 2 Frame:
 * Warm ivory / cream card body with rounded corners, subtle warm border,
 * and soft ambient shadow matching Design 2 reference.
 */
export const PropertyCardFrame: React.FC<PropertyCardFrameProps> = ({ children, className = '' }) => (
  <motion.article
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={`group overflow-hidden rounded-[1.75rem] border border-[#E9E4DC] bg-[#FAF8F5] shadow-[0_10px_30px_rgba(24,54,83,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(24,54,83,0.12)] ${className}`}
  >
    {children}
  </motion.article>
);

interface PropertyCardImageProps {
  imageSrc?: string | null;
  title: string;
  category?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
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

/**
 * Design 2 Card Top Image:
 * Clean 16:10 / 4:3 image ratio, rounded top corners matching the card,
 * Top-left: FEATURED pill badge with subtle warm tint, star icon, or category badge.
 * Top-right: Translucent frosted circular wishlist button with sleek heart icon.
 * (Note: In Design 2, price is placed prominently in the content section below).
 */
export const PropertyCardImage: React.FC<PropertyCardImageProps> = ({
  imageSrc,
  title,
  category,
  isVerified = false,
  isFeatured = false,
  statusLabel,
  showWishlist = false,
  isSaved = false,
  onToggleSaved,
  priority = false,
  containerClassName = 'aspect-[16/10] sm:aspect-[16/10.5] w-full',
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

      {/* Gentle gradient for top badges clarity */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

      {/* Top Bar: Badges on left, Wishlist on right */}
      <div className="absolute left-3.5 right-3.5 top-3.5 flex items-start justify-between gap-2 sm:left-4 sm:right-4 sm:top-4 z-10">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          {/* Design 2 Featured Badge or Category Badge */}
          {isFeatured ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-[#F5EEDB]/95 px-3 py-1 text-[11px] font-['DM_Sans',system-ui,sans-serif] font-semibold uppercase tracking-[0.08em] text-[#7A5826] shadow-sm backdrop-blur-md">
              <Star aria-hidden="true" className="h-3 w-3 fill-[#7A5826] text-[#7A5826]" />
              FEATURED
            </span>
          ) : category ? (
            <span className="rounded-full border border-white/25 bg-[#102B46]/85 px-3 py-1 text-[11px] font-['DM_Sans',system-ui,sans-serif] font-semibold uppercase tracking-[0.08em] text-white shadow-sm backdrop-blur-md">
              {getPropertyCategoryLabel(category)}
            </span>
          ) : null}

          {statusLabel && (
            <span className="rounded-full border border-white/20 bg-[#102B46]/75 px-2.5 py-1 text-[10px] font-['DM_Sans',system-ui,sans-serif] font-semibold uppercase tracking-[0.08em] text-white shadow-sm backdrop-blur-md">
              {statusLabel}
            </span>
          )}

          {isVerified && !isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/40 bg-white/90 px-2.5 py-1 text-[10px] font-['DM_Sans',system-ui,sans-serif] font-semibold uppercase tracking-[0.08em] text-[#183653] shadow-sm backdrop-blur-md">
              <CheckCircle2 aria-hidden="true" className="h-3 w-3 text-[#315D82]" />
              Verified
            </span>
          )}
        </div>

        {/* Circular Wishlist Button */}
        {showWishlist && onToggleSaved && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSaved();
            }}
            aria-label={isSaved ? `Remove ${title} from saved properties` : `Save ${title}`}
            aria-pressed={isSaved}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/50 bg-[#102B46]/60 text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-[#183653] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            <Heart aria-hidden="true" className={`h-4 w-4 ${isSaved ? 'fill-[#E85D75] text-[#E85D75]' : 'text-white'}`} />
          </button>
        )}
      </div>
    </div>
  );
};

interface PropertyCardInformationProps {
  title: string;
  location?: string;
  description?: string;
  priceText?: string;
  detailHref?: string;
  areaSqFt?: number;
  areaLabel?: string;
  bedrooms?: number;
  bathrooms?: number;
  showResidentialSpecs?: boolean;
  className?: string;
  actionButton?: React.ReactNode;
}

/**
 * Design 2 Card Body:
 * - Line 1: Serif Property Title on the left, Bold Price on the right
 * - Line 2: Location pin with neighborhood name
 * - Line 3: Feature specs (area with home/sq.ft icon, BHK bed icon, baths icon)
 * - Line 4 / Right: Dark pill CTA "View Details ->"
 */
export const PropertyCardInformation: React.FC<PropertyCardInformationProps> = ({
  title,
  location,
  description,
  priceText,
  detailHref,
  areaSqFt,
  areaLabel = 'sq.ft',
  bedrooms,
  bathrooms,
  showResidentialSpecs = true,
  className = '',
  actionButton,
}) => {
  const formattedArea =
    typeof areaSqFt === 'number' && Number.isFinite(areaSqFt) && areaSqFt > 0
      ? areaSqFt.toLocaleString('en-IN')
      : undefined;
  const hasArea = Boolean(formattedArea);
  const hasBedrooms = showResidentialSpecs && Number.isFinite(bedrooms) && (bedrooms ?? 0) > 0;
  const hasBathrooms = showResidentialSpecs && Number.isFinite(bathrooms) && (bathrooms ?? 0) > 0;

  return (
    <div className={`flex flex-1 flex-col justify-between ${className}`}>
      {/* Top Content Row: Title & Price */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0 pr-1">
            {detailHref ? (
              <Link
                to={detailHref}
                className="group/title block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D82]"
              >
                <h3 className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-[1.3rem] font-semibold leading-snug tracking-normal text-[#142A42] transition-colors group-hover/title:text-[#315D82] line-clamp-2">
                  {title}
                </h3>
              </Link>
            ) : (
              <h3 className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-[1.3rem] font-semibold leading-snug tracking-normal text-[#142A42] line-clamp-2">
                {title}
              </h3>
            )}
          </div>

          {priceText && (
            <div className="text-right shrink-0 pt-0.5">
              <span className="font-['Playfair_Display',Georgia,serif] text-xl sm:text-[1.4rem] font-semibold leading-none tracking-normal text-[#102B46] whitespace-nowrap">
                {priceText}
              </span>
            </div>
          )}
        </div>

        {/* Location Row with Pin: DM Sans, weight 400 */}
        {location && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-normal font-['DM_Sans',system-ui,sans-serif] text-[#52687D]">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#6B8BA6]" />
            <span className="truncate">{location}</span>
          </div>
        )}

        {/* Optional Description: DM Sans, weight 400 */}
        {description && (
          <p className="mt-2 line-clamp-2 text-xs font-normal font-['DM_Sans',system-ui,sans-serif] leading-relaxed text-[#52687D]">
            {description}
          </p>
        )}
      </div>

      {/* Bottom Content Row: Specs on the left, View Details CTA on the right */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EAE5DC]/60">
        {/* Specs with icons: DM Sans, weight 500 */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-['DM_Sans',system-ui,sans-serif] font-medium text-[#40566A]">
          {hasArea && (
            <span className="inline-flex items-center gap-1.5">
              <Home aria-hidden="true" className="h-3.5 w-3.5 text-[#5F7D99]" />
              <span className="font-medium text-[#253D54]">{formattedArea} {areaLabel}</span>
            </span>
          )}
          {hasBedrooms && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble aria-hidden="true" className="h-3.5 w-3.5 text-[#5F7D99]" />
              <span className="font-medium text-[#253D54]">{bedrooms} BHK</span>
            </span>
          )}
          {hasBathrooms && (
            <span className="inline-flex items-center gap-1.5">
              <Bath aria-hidden="true" className="h-3.5 w-3.5 text-[#5F7D99]" />
              <span className="font-medium text-[#253D54]">{bathrooms} Baths</span>
            </span>
          )}
        </div>

        {/* Action Button: DM Sans, weight 600 */}
        {actionButton ? (
          <div>{actionButton}</div>
        ) : detailHref ? (
          <Link
            to={detailHref}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#183653] px-5 py-2 text-xs font-['DM_Sans',system-ui,sans-serif] font-semibold text-white transition-all duration-200 hover:bg-[#102B46] hover:gap-2.5 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D82] focus-visible:ring-offset-2 ml-auto"
          >
            <span>View Details</span>
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

/**
 * Design 2 Global Property Card Component:
 * Perfectly reproduces Design 2 reference across the entire website:
 * - Rounded ivory/cream architectural frame
 * - Crisp photo with top-left badge (FEATURED / Typology) and top-right wishlist button
 * - Clean layout with title & price in the same row
 * - Location with pin icon
 * - Icons for area (Home), BHK (Bed), and Baths (Tub)
 * - Navy pill "View Details ->" button
 */
export const PropertyCard: React.FC<PropertyCardProps> = ({ property, priority = false }) => {
  const { isSaved, toggleSaveProperty } = useSavedProperties();
  const areaSqFt = property.features?.areaSqFt;
  const validPrice = Number.isFinite(property.price) && property.price > 0;
  const isLand = LAND_CATEGORIES.includes(property.category);
  const showResidentialSpecs = RESIDENTIAL_CATEGORIES.includes(property.category);
  const location = [property.location?.locality, property.location?.city].filter(Boolean).join(', ');
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
        isFeatured={property.isFeatured === true}
        isVerified={property.isVerified === true}
        priority={priority}
        showWishlist
        isSaved={isSaved(property.id)}
        onToggleSaved={() => toggleSaveProperty(property.id)}
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6 bg-[#FAF8F5]">
        <PropertyCardInformation
          title={property.title}
          detailHref={`/property/${property.id}`}
          location={location || undefined}
          priceText={priceText}
          areaSqFt={areaSqFt}
          areaLabel="sq.ft"
          bedrooms={property.features?.bedrooms}
          bathrooms={property.features?.bathrooms}
          showResidentialSpecs={showResidentialSpecs && !isLand}
        />
      </div>
    </PropertyCardFrame>
  );
};
