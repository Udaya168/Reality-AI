import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, EyeOff, Sparkles, Building2, Landmark, TreePine } from 'lucide-react';

export const PrivateCollectionGate: React.FC = () => {
  const teaserResidences = [
    {
      typology: 'Tropical Courtyard Villa',
      location: 'Sadashivanagar, Bengaluru',
      features: 'Central Rain Court &bull; Private Lap Pool &bull; Teak Joinery',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      icon: Building2,
    },
    {
      typology: 'High-Ceiling Sky Duplex',
      location: 'Lavelle Road, Central Bengaluru',
      features: 'Double-Height Living &bull; 360° Canopy Panorama &bull; Private Lift',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      icon: Landmark,
    },
    {
      typology: 'Legacy Arabica Coffee Estate',
      location: 'Chikmagalur Hill Country',
      features: '24-Acre Arabica Plantation &bull; Stream Frontage &bull; Colonial Plinth',
      image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80',
      icon: TreePine,
    },
  ];

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

      {/* 3 Silhouette / Blurred Teaser Cards with Rounded Edges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teaserResidences.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group relative h-96 rounded-3xl overflow-hidden border border-[#D9E0E6]/80 bg-[#EDF2F6] shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Background Architectural Image */}
              <img
                src={item.image}
                alt={item.typology}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.85] contrast-[1.05]"
              />

              {/* Ambient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

              {/* Top Lock Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-black/50 backdrop-blur-md text-white/90 border border-white/20 rounded-full flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#7896B2]" />
                  <span>Private Listing</span>
                </span>
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <Icon className="w-4 h-4" />
                </span>
              </div>

              {/* Blurred Content Strip */}
              <div className="absolute bottom-5 left-5 right-5 space-y-3">
                <div className="text-white space-y-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#7896B2]">
                    {item.location}
                  </div>
                  <h3 className="font-serif text-2xl font-light text-white leading-tight">
                    {item.typology}
                  </h3>
                  <div
                    className="text-xs text-white/70 font-light"
                    dangerouslySetInnerHTML={{ __html: item.features }}
                  />
                </div>

                {/* Frosted Confidentiality Veil */}
                <div className="p-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#F8F7F3]">
                    <EyeOff className="w-3.5 h-3.5 text-[#7896B2]" />
                    <span>Price &amp; Blueprints Confidential</span>
                  </div>
                  <Link
                    to="/login?redirect=properties"
                    className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#183653] bg-white px-3 py-1 rounded-full hover:bg-[#F8F7F3] transition-colors"
                  >
                    Unlock
                  </Link>
                </div>
              </div>
            </div>
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
        <div className="p-6 bg-white rounded-3xl border border-[#D9E0E6]/80 shadow-xs space-y-3">
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

        <div className="p-6 bg-white rounded-3xl border border-[#D9E0E6]/80 shadow-xs space-y-3">
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

        <div className="p-6 bg-white rounded-3xl border border-[#D9E0E6]/80 shadow-xs space-y-3">
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
