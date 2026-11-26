import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Eye, MessageSquare, CheckCircle2, Clock, 
  TrendingUp, Phone, ArrowUpRight, Plus, Sparkles, UserCheck 
} from 'lucide-react';
import { useDashboard } from '../../../context/DashboardContext';
import { StatCard } from '../components/StatCard';
import { Card, Badge, Button } from '../../../components/ui';
import { formatINR, formatPerSqFt } from '../../../lib/formatCurrency';
import {
  getPropertyAreaLabel,
  isResidentialPropertyCategory,
  PropertyCardFrame,
  PropertyCardImage,
  PropertyCardInformation,
} from '../../properties/components/PropertyCard';

export const DashboardOverviewPage: React.FC = () => {
  const { stats, listings, enquiries, toggleSoldStatus } = useDashboard();

  return (
    <div className="space-y-10">
      {/* ========================================================= */}
      {/* 1. OVERVIEW METRICS (6 Key Stat Cards)                    */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          label="Total Properties"
          value={stats.totalProperties}
          subtext="Portfolio footprint"
          icon={<Building2 className="w-4 h-4" />}
          accent
        />

        <StatCard
          label="Active Listings"
          value={stats.activeListings}
          subtext="Live on marketplace"
          icon={<CheckCircle2 className="w-4 h-4 text-green-700" />}
          trend="+2 this month"
        />

        <StatCard
          label="Pending Listings"
          value={stats.pendingListings}
          subtext="Under moderation"
          icon={<Clock className="w-4 h-4 text-amber-700" />}
        />

        <StatCard
          label="Sold Properties"
          value={stats.soldProperties}
          subtext="Successfully closed"
          icon={<Sparkles className="w-4 h-4 text-emerald-800" />}
        />

        <StatCard
          label="Total Views"
          value={stats.totalViews.toLocaleString('en-IN')}
          subtext="Buyer impressions"
          icon={<Eye className="w-4 h-4 text-[#183653]" />}
          trend="+18% week on week"
        />

        <StatCard
          label="Direct Enquiries"
          value={stats.totalEnquiries}
          subtext="Phone & WhatsApp"
          icon={<MessageSquare className="w-4 h-4 text-[#183653]" />}
          trend="3 new today"
        />
      </div>

      {/* ========================================================= */}
      {/* 2. RECENT ENQUIRIES & RECENT PERFORMANCE                  */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recent Enquiries Box (Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E0E6]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#354B60] block">
                Direct Buyer Activity
              </span>
              <h2 className="font-serif text-2xl text-[#183653] font-normal">
                Recent Buyer Enquiries
              </h2>
            </div>
            <span className="text-xs font-mono text-[#354B60] uppercase">
              {enquiries.length} Inquiries Received
            </span>
          </div>

          <div className="space-y-3">
            {enquiries.map((enq) => (
              <Card key={enq.id} padding="md" className="space-y-3 border border-[#D9E0E6] bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#D9E0E6]/60">
                  <div>
                    <div className="font-serif text-base font-semibold text-[#102B46]">
                      {enq.buyerName}
                    </div>
                    <div className="text-[11px] font-mono text-[#354B60] truncate max-w-sm">
                      Regarding: <span className="text-[#183653] font-semibold">{enq.propertyTitle}</span>
                    </div>
                  </div>
                  <Badge variant={enq.status === 'New' ? 'default' : 'subtle'} size="sm">
                    {enq.status}
                  </Badge>
                </div>

                <p className="text-xs text-[#102B46] font-light leading-relaxed">
                  "{enq.message}"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <span className="text-[11px] font-mono text-[#354B60]">
                    {new Date(enq.receivedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${enq.buyerPhone}`}
                      className="px-3 py-1.5 border border-[#D9E0E6] hover:border-[#183653] text-[#183653] text-xs font-mono uppercase tracking-wider rounded-2xl inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${enq.buyerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hi ${enq.buyerName}, thank you for inquiring about "${enq.propertyTitle}". How can I assist you?`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-[#183653] hover:bg-[#315D82] text-white text-xs font-mono uppercase tracking-wider rounded-2xl inline-flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Portfolio Highlights (Span 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E0E6]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#354B60] block">
                Portfolio Snapshot
              </span>
              <h2 className="font-serif text-2xl text-[#183653] font-normal">
                Top Active Listings
              </h2>
            </div>
            <Link
              to="/dashboard/listings"
              className="text-xs font-mono uppercase tracking-wider text-[#183653] hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {listings.slice(0, 3).map((item) => (
              <PropertyCardFrame key={item.id} className="flex-row rounded-2xl">
                <PropertyCardImage
                  imageSrc={item.image}
                  title={item.title}
                  category={item.category}
                  statusLabel={item.status}
                  priceText={Number.isFinite(item.price) && item.price > 0 ? formatINR(item.price) : 'Price on request'}
                  pricePerAreaText={
                    Number.isFinite(item.price) &&
                    item.price > 0 &&
                    Number.isFinite(item.areaSqFt) &&
                    item.areaSqFt > 0
                      ? formatPerSqFt(item.price, item.areaSqFt)
                      : undefined
                  }
                  showWishlist={false}
                  containerClassName="w-28 shrink-0 aspect-square rounded-l-2xl sm:w-32"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4">
                  <PropertyCardInformation
                    title={item.title}
                    detailHref={`/property/${item.id}`}
                    location={[item.locality, item.city].filter(Boolean).join(', ') || undefined}
                    areaSqFt={item.areaSqFt}
                    areaLabel={getPropertyAreaLabel(item.category)}
                    bedrooms={item.bedrooms}
                    showResidentialSpecs={isResidentialPropertyCategory(item.category)}
                  />
                  <div className="flex items-center justify-between gap-2 border-t border-[#E6E2D9] pt-2 text-[10px] font-mono text-[#52687D]">
                    <span>{item.views} views</span>
                    <Link
                      to={`/property/${item.id}`}
                      className="inline-flex min-h-9 items-center gap-1 rounded-full bg-[#183653] px-3 text-white transition-colors hover:bg-[#315D82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D82] focus-visible:ring-offset-2"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </PropertyCardFrame>
            ))}
          </div>

          {/* Quick CTA Box */}
          <div className="p-6 bg-[#183653] text-white space-y-3 rounded-2xl border border-[#315D82]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7896B2]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#7896B2]">
                Expand Your Portfolio
              </span>
            </div>
            <h3 className="font-serif text-xl font-normal leading-snug">
              Have another property to sell?
            </h3>
            <p className="text-xs text-[#7896B2] leading-relaxed font-light">
              List villas, plots, or commercial buildings in under 5 minutes with verified direct buyer routing.
            </p>
            <div className="pt-1">
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 py-2 px-4 bg-white text-[#183653] text-xs font-mono uppercase tracking-wider rounded-2xl hover:bg-[#F8F7F3] transition-colors font-semibold"
              >
                <span>Add New Listing</span>
                <Plus className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
