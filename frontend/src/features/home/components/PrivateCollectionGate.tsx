import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Lock, ArrowRight, ShieldCheck, EyeOff, Sparkles } from 'lucide-react';
import { mockProperties } from '../../../data/mock/mockProperties';
import {
  getPropertyAreaLabel,
  isResidentialPropertyCategory,
  PropertyCardFrame,
  PropertyCardImage,
  PropertyCardInformation,
} from '../../properties/components/PropertyCard';

export const PrivateCollectionGate: React.FC = () => {
  const teaserProperties = mockProperties.filter((property) => property.isFeatured).slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#D9E0E6] pb-5 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#183653]/10 text-[#183653] text-xs font-mono uppercase tracking-widest rounded-full mb-2">
            <Lock className="w-3 h-3 text-[#315D82]" />
            <span>Private Archive &bull; Discretion Assured</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#183653] font-normal tracking-tight">
            Karnataka's Private Architectural Portfolio
          </h2>
          <p className="text-[#354B60] text-sm max-w-2xl font-light mt-1">
            To protect owner discretion, verified pricing, high-resolution architectural tours, and direct contact details are kept private. Sign in to view active properties.
          </p>
        </div>

        <Link
          to="/login?redirect=properties"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#183653] hover:text-[#315D82] transition-colors shrink-0 group"
        >
          <span>Member Sign In</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Private property previews */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {teaserProperties.map((property) => {
          const isResidential = isResidentialPropertyCategory(property.category);
          return (
            <PropertyCardFrame key={property.id} className="flex h-full flex-col">
              <PropertyCardImage
                imageSrc={property.images?.[property.coverImageIndex] || property.images?.[0]}
                title={property.title}
                category={property.category}
                isVerified={property.isVerified === true}
                showPrice={false}
                containerClassName="aspect-[4/3] rounded-t-[1.5rem]"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <PropertyCardInformation
                  title={property.title}
                  location={[property.location.locality, property.location.city].filter(Boolean).join(', ') || undefined}
                  description={property.tagline}
                  areaSqFt={property.features?.areaSqFt}
                  areaLabel={getPropertyAreaLabel(property.category)}
                  bedrooms={property.features?.bedrooms}
                  bathrooms={property.features?.bathrooms}
                  showResidentialSpecs={isResidential}
                />
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#E6E2D9] pt-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#52687D]">
                    <EyeOff className="h-3.5 w-3.5 text-[#7896B2]" />
                    Private details
                  </span>
                  <Link
                    to="/login?redirect=properties"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#183653] px-4 text-[10px] font-mono uppercase tracking-wider text-white transition-colors hover:bg-[#315D82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D82] focus-visible:ring-offset-2"
                  >
                    <span>Unlock</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </PropertyCardFrame>
          );
        })}
      </div>

      {/* Central High-Impact Invitation Box with Rounded Curves */}
      <div className="rounded-3xl bg-[#183653] text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-[#315D82]/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-sm text-[#7896B2] text-xs font-mono uppercase tracking-widest rounded-full">
            <Sparkles className="w-3 h-3" />
            <span>Member Access Required</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white tracking-tight">
            Sign in to explore Karnataka's premier private residences.
          </h3>

          <p className="text-[#7896B2] text-sm sm:text-base leading-relaxed font-light">
            Reality AI maintains an unlisted portfolio of architect-commissioned villas, penthouses, and heritage plots. Full dossier access, title certificates, and owner WhatsApp connections are unlocked upon verification.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to="/login?redirect=properties"
              className="inline-flex items-center justify-center gap-2 bg-[#F8F7F3] text-[#183653] px-8 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-all rounded-full shadow-md active:scale-95"
            >
              <span>Sign In to View Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white/10 transition-all rounded-full active:scale-95"
            >
              <span>Request Patron Access</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Three Curatorial Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="home-glass-card p-6 bg-white rounded-3xl border border-[#D9E0E6]/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#183653]/10 flex items-center justify-center text-[#183653]">
            <Building2 className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-lg text-[#183653] font-semibold">
            Architectural Pedigree
          </h4>
          <p className="text-xs text-[#354B60] leading-relaxed font-light">
            Every residence is audited for spatial clarity, natural daylighting, passive cross-ventilation, and authentic materiality.
          </p>
        </div>

        <div className="home-glass-card p-6 bg-white rounded-3xl border border-[#D9E0E6]/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#183653]/10 flex items-center justify-center text-[#183653]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-lg text-[#183653] font-semibold">
            Bhoomi &amp; Kaveri 2.0 Vetted
          </h4>
          <p className="text-xs text-[#354B60] leading-relaxed font-light">
            Encumbrance Certificates (EC), A-Khata titles, and RERA registration statuses are cross-referenced before inclusion.
          </p>
        </div>

        <div className="home-glass-card p-6 bg-white rounded-3xl border border-[#D9E0E6]/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#183653]/10 flex items-center justify-center text-[#183653]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-lg text-[#183653] font-semibold">
            Direct Discretion
          </h4>
          <p className="text-xs text-[#354B60] leading-relaxed font-light">
            No intermediary brokers, spam calls, or public price erosion. Connect directly with vetted owners and architects.
          </p>
        </div>
      </div>
    </section>
  );
};
