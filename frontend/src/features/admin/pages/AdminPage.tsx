import React, { useState } from 'react';
import {
  AdminProvider,
  useAdmin,
} from '../../../context/AdminContext';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { PropertyModerationModal } from '../components/PropertyModerationModal';
import {
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  Building2,
  Users,
  ShieldCheck,
  Clock,
  Check,
  Ban,
  Trash2,
  Filter,
} from 'lucide-react';
import { AdminPropertyItem, ModerationStatus } from '../../../types/admin';

// Helper price formatter
const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(price / 100000).toFixed(2)} Lac`;
};

// Admin Content Component (Consumes useAdmin)
const AdminDashboardContent: React.FC = () => {
  const {
    properties,
    users,
    reports,
    stats,
    activeTab,
    setActiveTab,
    searchQuery,
    selectedProperty,
    setSelectedProperty,
    approveProperty,
    rejectProperty,
    deleteProperty,
    verifyUser,
    suspendUser,
    resolveReport,
  } = useAdmin();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter properties based on search query and status filter
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'All' ? true : p.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Filter verification queue specifically
  const queueProperties = properties.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="site-page-background flex h-screen text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <AdminSidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

        {/* Dynamic Toast Feedback */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900/40">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                  Platform Moderation & Health
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  High-level oversight of architectural listings, seller authenticity, and quality controls.
                </p>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Total Listings
                  </div>
                  <div className="text-2xl font-serif font-bold text-white mt-1">
                    {stats.totalListings}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <Building2 size={12} /> Live catalog
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 shadow-sm relative overflow-hidden">
                  <div className="text-[11px] font-mono text-amber-300 uppercase tracking-wider">
                    Pending Review
                  </div>
                  <div className="text-2xl font-serif font-bold text-amber-300 mt-1">
                    {stats.pendingApprovals}
                  </div>
                  <div className="text-[11px] text-amber-400/80 mt-1 flex items-center gap-1">
                    <Clock size={12} /> Awaiting action
                  </div>
                  {stats.pendingApprovals > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Approved
                  </div>
                  <div className="text-2xl font-serif font-bold text-emerald-400 mt-1">
                    {stats.approvedListings}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Curation passed
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Rejected
                  </div>
                  <div className="text-2xl font-serif font-bold text-rose-400 mt-1">
                    {stats.rejectedListings}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <XCircle size={12} /> Discrepancies
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Total Users
                  </div>
                  <div className="text-2xl font-serif font-bold text-white mt-1">
                    {stats.totalUsers}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <Users size={12} /> Owners & agents
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 shadow-sm">
                  <div className="text-[11px] font-mono text-rose-300 uppercase tracking-wider">
                    Reported
                  </div>
                  <div className="text-2xl font-serif font-bold text-rose-400 mt-1">
                    {stats.reportedListings}
                  </div>
                  <div className="text-[11px] text-rose-400/80 mt-1 flex items-center gap-1">
                    <AlertTriangle size={12} /> Needs audit
                  </div>
                </div>
              </div>

              {/* Action Banner for Pending Queue */}
              {stats.pendingApprovals > 0 && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">
                        {stats.pendingApprovals} Listings Pending Editorial Approval
                      </h4>
                      <p className="text-xs text-amber-200/80 mt-0.5">
                        New submissions awaiting photo resolution checks and RERA/Title documentation verification.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('queue')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Open Moderation Queue
                  </button>
                </div>
              )}

              {/* Preview of Moderation Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-white">
                      Recent Listing Submissions
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Quick overview of current submissions needing curation decisions.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('queue')}
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 underline"
                  >
                    View All ({properties.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/70 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5 pl-5">Property</th>
                        <th className="p-3.5">Seller</th>
                        <th className="p-3.5">Price</th>
                        <th className="p-3.5">Submitted</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right pr-5">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {properties.slice(0, 4).map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="p-3.5 pl-5">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-9 rounded object-cover border border-slate-800 shrink-0"
                              />
                              <div>
                                <div className="font-medium text-slate-200 hover:text-emerald-400 transition-colors truncate max-w-xs sm:max-w-sm">
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {item.locality}, {item.city} • <span className="font-mono">{item.id}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div className="text-slate-200">{item.sellerName}</div>
                            <div className="text-[10px] font-mono text-slate-400">
                              {item.sellerType}
                            </div>
                          </td>
                          <td className="p-3.5 font-serif font-medium text-emerald-400">
                            {formatPrice(item.price)}
                          </td>
                          <td className="p-3.5 text-slate-400 font-mono">
                            {item.dateSubmitted}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                                item.status === 'Approved'
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                  : item.status === 'Rejected'
                                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right pr-5">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedProperty(item)}
                                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                                title="View Details"
                              >
                                <Eye size={14} />
                              </button>
                              {item.status !== 'Approved' && (
                                <button
                                  onClick={() => {
                                    approveProperty(item.id);
                                    showToast(`Listing ${item.id} approved!`);
                                  }}
                                  className="p-1.5 rounded bg-emerald-950 hover:bg-emerald-800 text-emerald-300 border border-emerald-700 transition-colors"
                                  title="Approve"
                                >
                                  <Check size={14} />
                                </button>
                              )}
                              {item.status !== 'Rejected' && (
                                <button
                                  onClick={() => {
                                    rejectProperty(item.id);
                                    showToast(`Listing ${item.id} rejected.`);
                                  }}
                                  className="p-1.5 rounded bg-rose-950 hover:bg-rose-800 text-rose-300 border border-rose-700 transition-colors"
                                  title="Reject"
                                >
                                  <Ban size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VERIFICATION QUEUE & MODERATION TABLE */}
          {activeTab === 'queue' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                    Property Moderation Queue
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Review and verify architectural standards, title documents, and seller disclosures.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                        filterStatus === status
                          ? 'bg-slate-800 text-emerald-400 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Moderation Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-4 pl-6">Property Image & Title</th>
                        <th className="p-4">Seller & Type</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Price (INR)</th>
                        <th className="p-4">Submitted</th>
                        <th className="p-4">Title Doc Status</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right pr-6">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {filteredProperties.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-slate-400">
                            No listings match the current filter or search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredProperties.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-slate-800/40 transition-colors group"
                          >
                            {/* Property image & title */}
                            <td className="p-4 pl-6">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-14 h-10 rounded-md object-cover border border-slate-800 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors truncate max-w-xs">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                    <span className="font-mono text-slate-400">{item.id}</span>
                                    <span>•</span>
                                    <span className="text-slate-400">{item.category}</span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Seller */}
                            <td className="p-4">
                              <div className="text-slate-200 font-medium">
                                {item.sellerName}
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                                <span className="font-mono px-1.5 py-0.2 rounded bg-slate-800 text-[10px]">
                                  {item.sellerType}
                                </span>
                              </div>
                            </td>

                            {/* Location */}
                            <td className="p-4 text-slate-300">
                              <div>{item.locality}</div>
                              <div className="text-[11px] text-slate-400">{item.city}</div>
                            </td>

                            {/* Price */}
                            <td className="p-4 font-serif font-medium text-emerald-400 text-sm whitespace-nowrap">
                              {formatPrice(item.price)}
                            </td>

                            {/* Date submitted */}
                            <td className="p-4 text-slate-400 font-mono whitespace-nowrap">
                              {item.dateSubmitted}
                            </td>

                            {/* Title Document Status */}
                            <td className="p-4">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono ${
                                  item.documentStatus === 'Verified Title'
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                    : item.documentStatus === 'Discrepancy'
                                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                                }`}
                              >
                                {item.documentStatus}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="p-4">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                                  item.status === 'Approved'
                                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                    : item.status === 'Rejected'
                                    ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>

                            {/* Actions: View Details, Approve, Reject */}
                            <td className="p-4 text-right pr-6 whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedProperty(item)}
                                  className="px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                                  title="View Details"
                                >
                                  View Details
                                </button>

                                {item.status !== 'Approved' && (
                                  <button
                                    onClick={() => {
                                      approveProperty(item.id);
                                      showToast(`Approved ${item.title}`);
                                    }}
                                    className="p-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                                    title="Approve"
                                  >
                                    <Check size={14} />
                                  </button>
                                )}

                                {item.status !== 'Rejected' && (
                                  <button
                                    onClick={() => {
                                      rejectProperty(item.id);
                                      showToast(`Rejected ${item.title}`);
                                    }}
                                    className="p-1.5 rounded-md bg-rose-900/60 hover:bg-rose-700 text-rose-300 border border-rose-700 transition-colors cursor-pointer"
                                    title="Reject"
                                  >
                                    <Ban size={14} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROPERTY MANAGEMENT */}
          {activeTab === 'properties' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                    Property Catalog Directory
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Manage published architectural estates, archive expired listings, and update status.
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Showing {properties.length} Total Properties
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {properties.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:border-slate-700 transition-all"
                  >
                    <div className="aspect-16/10 relative overflow-hidden bg-slate-950">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 backdrop-blur-md text-slate-200">
                        {p.category}
                      </span>
                      <span
                        className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                          p.status === 'Approved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : p.status === 'Rejected'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="text-base font-medium text-white line-clamp-1">
                          {p.title}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {p.locality}, {p.city}
                        </div>
                        <div className="font-serif font-bold text-lg text-emerald-400 mt-2">
                          {formatPrice(p.price)}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <div className="text-slate-400">
                          Seller: <span className="text-slate-200">{p.sellerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedProperty(p)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                            title="Inspect"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${p.title}?`)) {
                                deleteProperty(p.id);
                                showToast(`Deleted ${p.title}`);
                              }
                            }}
                            className="p-1.5 rounded bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                  User Management & Verification
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Manage accounts for property owners, registered brokers, enterprise builders, and buyers.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-4 pl-6">User</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Properties</th>
                        <th className="p-4">Member Since</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right pr-6">Account Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 pl-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-slate-300">
                                {u.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium text-slate-200">{u.name}</div>
                                <div className="text-[10px] font-mono text-slate-400">{u.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-slate-300">{u.email}</div>
                            <div className="text-[11px] text-slate-400">{u.phone}</div>
                          </td>
                          <td className="p-4">
                            <span className="font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-slate-300">
                            {u.propertiesCount} listings
                          </td>
                          <td className="p-4 font-mono text-slate-400">
                            {u.joinedDate}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                                u.status === 'Verified'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : u.status === 'Suspended'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}
                            >
                              {u.status}
                            </span>
                          </td>
                          <td className="p-4 text-right pr-6">
                            <div className="flex items-center justify-end gap-2">
                              {u.status !== 'Verified' && (
                                <button
                                  onClick={() => {
                                    verifyUser(u.id);
                                    showToast(`Verified ${u.name}`);
                                  }}
                                  className="px-2.5 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-700 text-xs font-mono transition-colors"
                                >
                                  Verify
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  suspendUser(u.id);
                                  showToast(
                                    u.status === 'Suspended'
                                      ? `Reinstated ${u.name}`
                                      : `Suspended ${u.name}`
                                  );
                                }}
                                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                                  u.status === 'Suspended'
                                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                                    : 'bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800'
                                }`}
                              >
                                {u.status === 'Suspended' ? 'Reinstate' : 'Suspend'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REPORTED LISTINGS */}
          {activeTab === 'reports' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                  Reported Listings & Flagged Content
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Community reports regarding incorrect prices, unauthorized photos, or misleading claims.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-4 pl-6">Report ID & Property</th>
                        <th className="p-4">Reported By</th>
                        <th className="p-4">Reason / Grievance</th>
                        <th className="p-4">Reported Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right pr-6">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {reports.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 pl-6">
                            <div className="font-medium text-slate-200">{r.propertyTitle}</div>
                            <div className="text-[11px] font-mono text-slate-400">
                              Report: {r.id} • Listing: {r.propertyId}
                            </div>
                          </td>
                          <td className="p-4 text-slate-300">{r.reporterName}</td>
                          <td className="p-4 text-slate-300 max-w-md">
                            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-300 font-mono text-[11px]">
                              "{r.reason}"
                            </div>
                          </td>
                          <td className="p-4 font-mono text-slate-400">{r.reportedAt}</td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                                r.status === 'Resolved'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-rose-950 text-rose-300 border border-rose-800'
                              }`}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="p-4 text-right pr-6">
                            {r.status !== 'Resolved' ? (
                              <button
                                onClick={() => {
                                  resolveReport(r.id);
                                  showToast(`Report ${r.id} marked resolved!`);
                                }}
                                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                              >
                                Mark Resolved
                              </button>
                            ) : (
                              <span className="text-[11px] font-mono text-slate-400">
                                Closed
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Property Moderation Detail Modal */}
      <PropertyModerationModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
};

// Root Admin Page Wrapped in AdminProvider
export const AdminPage: React.FC = () => {
  return (
    <AdminProvider>
      <AdminDashboardContent />
    </AdminProvider>
  );
};

export default AdminPage;
