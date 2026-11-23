import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Eye, MessageSquare, CheckCircle2, Clock, 
  TrendingUp, Phone, ArrowUpRight, Plus, Sparkles, UserCheck 
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { StatCard } from '../../components/dashboard/StatCard';
import { Card, Badge, Button } from '../../components/ui';
import { formatINR } from '../../data/mockProperties';

export const DashboardOverviewPage: React.FC = () => {
  const { stats, listings, enquiries, toggleSoldStatus } = useDashboard();

  return (
    <div className="space-y-10">
      {/* ========================================================= */}
      {/* 1. OVERVIEW METRICS (6 Key Stat Cards)                    */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
          icon={<Eye className="w-4 h-4 text-[#183D30]" />}
          trend="+18% week on week"
        />

        <StatCard
          label="Direct Enquiries"
          value={stats.totalEnquiries}
          subtext="Phone & WhatsApp"
          icon={<MessageSquare className="w-4 h-4 text-[#183D30]" />}
          trend="3 new today"
        />
      </div>

      {/* ========================================================= */}
      {/* 2. RECENT ENQUIRIES & RECENT PERFORMANCE                  */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recent Enquiries Box (Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6DF]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#737970] block">
                Direct Buyer Activity
              </span>
              <h2 className="font-serif text-2xl text-[#183D30] font-normal">
                Recent Buyer Enquiries
              </h2>
            </div>
            <span className="text-xs font-mono text-[#737970] uppercase">
              {enquiries.length} Inquiries Received
            </span>
          </div>

          <div className="space-y-3">
            {enquiries.map((enq) => (
              <Card key={enq.id} padding="md" className="space-y-3 border border-[#E7E6DF] bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E7E6DF]/60">
                  <div>
                    <div className="font-serif text-base font-semibold text-[#202520]">
                      {enq.buyerName}
                    </div>
                    <div className="text-[11px] font-mono text-[#737970] truncate max-w-sm">
                      Regarding: <span className="text-[#183D30] font-semibold">{enq.propertyTitle}</span>
                    </div>
                  </div>
                  <Badge variant={enq.status === 'New' ? 'default' : 'subtle'} size="sm">
                    {enq.status}
                  </Badge>
                </div>

                <p className="text-xs text-[#202520] font-light leading-relaxed">
                  "{enq.message}"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <span className="text-[11px] font-mono text-[#737970]">
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
                      className="px-3 py-1.5 border border-[#E7E6DF] hover:border-[#183D30] text-[#183D30] text-xs font-mono uppercase tracking-wider rounded-[1px] inline-flex items-center gap-1.5 transition-colors"
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
                      className="px-3 py-1.5 bg-[#183D30] hover:bg-[#315B49] text-white text-xs font-mono uppercase tracking-wider rounded-[1px] inline-flex items-center gap-1.5 transition-colors"
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
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6DF]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#737970] block">
                Portfolio Snapshot
              </span>
              <h2 className="font-serif text-2xl text-[#183D30] font-normal">
                Top Active Listings
              </h2>
            </div>
            <Link
              to="/dashboard/listings"
              className="text-xs font-mono uppercase tracking-wider text-[#183D30] hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {listings.slice(0, 3).map((item) => (
              <Card key={item.id} padding="none" className="overflow-hidden flex border border-[#E7E6DF] bg-white">
                <div className="w-28 sm:w-32 aspect-square shrink-0 bg-black/5 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase text-[#737970]">{item.locality}</span>
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-[1px] ${
                          item.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'Sold'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-base text-[#202520] font-semibold line-clamp-1 mt-0.5">
                      {item.title}
                    </h3>
                    <div className="font-serif text-sm font-bold text-[#183D30] mt-1">
                      {formatINR(item.price)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E7E6DF] text-[11px] font-mono text-[#737970]">
                    <span>{item.views} views</span>
                    <Link
                      to={`/property/${item.id}`}
                      className="text-[#183D30] hover:underline inline-flex items-center gap-0.5 font-sans text-xs"
                    >
                      <span>Preview</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick CTA Box */}
          <div className="p-6 bg-[#183D30] text-white space-y-3 rounded-[1px] border border-[#315B49]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A7B9A5]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#A7B9A5]">
                Expand Your Portfolio
              </span>
            </div>
            <h3 className="font-serif text-xl font-normal leading-snug">
              Have another property to sell?
            </h3>
            <p className="text-xs text-[#A7B9A5] leading-relaxed font-light">
              List villas, plots, or commercial buildings in under 5 minutes with verified direct buyer routing.
            </p>
            <div className="pt-1">
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 py-2 px-4 bg-white text-[#183D30] text-xs font-mono uppercase tracking-wider rounded-[1px] hover:bg-[#F7F6F2] transition-colors font-semibold"
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
