import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  FileCheck,
  AlertTriangle,
  Building,
  MapPin,
  User,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { AdminPropertyItem } from '../../types/admin';
import { useAdmin } from '../../context/AdminContext';

interface PropertyModerationModalProps {
  property: AdminPropertyItem | null;
  onClose: () => void;
}

export const PropertyModerationModal: React.FC<PropertyModerationModalProps> = ({
  property,
  onClose,
}) => {
  const { approveProperty, rejectProperty } = useAdmin();
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectionNote, setRejectionNote] = useState('');

  if (!property) return null;

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(2)} Lac`;
  };

  const handleApprove = () => {
    approveProperty(property.id);
  };

  const handleRejectConfirm = () => {
    rejectProperty(
      property.id,
      rejectionNote.trim() || 'Did not meet architectural photography standards or clear title documentation verification.'
    );
    setRejectMode(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded font-mono text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
              {property.id}
            </span>
            <h3 className="font-serif text-lg font-semibold text-white truncate max-w-md">
              Listing Review & Verification
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Visual & Title Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 aspect-4/3 relative group">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-slate-300">
                Primary Image
              </span>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                  {property.category}
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
                    property.status === 'Approved'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : property.status === 'Rejected'
                      ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  Status: {property.status}
                </span>

                <span className="text-xs text-slate-400 font-mono">
                  Submitted on {property.dateSubmitted}
                </span>
              </div>

              <h4 className="font-serif text-xl font-medium text-white leading-snug">
                {property.title}
              </h4>

              <div className="text-2xl font-serif font-bold text-emerald-400">
                {formatPrice(property.price)}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <MapPin size={14} className="text-slate-400 shrink-0" />
                <span>{property.location}, {property.locality}, {property.city}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                <Building size={14} className="text-slate-400 shrink-0" />
                <span>Built Area: {property.areaSqFt.toLocaleString()} sq ft</span>
              </div>
            </div>
          </div>

          {/* Verification Checks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title / Legal Checks */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <FileCheck size={16} className="text-emerald-400" />
                  <span>Title & Legal Verification</span>
                </div>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                    property.documentStatus === 'Verified Title'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : property.documentStatus === 'Discrepancy'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {property.documentStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                RERA compliance certificate and Encumbrance Certificate (EC) cross-referenced against Karnataka Bhoomi / Kaveri 2.0 land registries.
              </p>
            </div>

            {/* Seller Dossier */}
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <User size={16} className="text-emerald-400" />
                  <span>Seller Verification Dossier</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {property.sellerType}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-white font-medium">{property.sellerName}</div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone size={12} />
                  <span>{property.sellerPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={12} />
                  <span>{property.sellerEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status Feedback / Notes */}
          {property.status === 'Rejected' && property.rejectionReason && (
            <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800/60 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-rose-300">
                <AlertTriangle size={15} />
                <span>Rejection Reason Recorded:</span>
              </div>
              <p className="text-rose-200/90 pl-6 leading-relaxed font-mono">
                {property.rejectionReason}
              </p>
            </div>
          )}

          {/* Reject Input Box if in Reject Mode */}
          {rejectMode && (
            <div className="p-4 rounded-lg bg-slate-950 border border-rose-800/80 space-y-3 animate-fade-in">
              <label className="block text-xs font-medium text-rose-300">
                Specify Reason for Rejection:
              </label>
              <textarea
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                placeholder="E.g., Inadequate architectural photo resolution, missing encumbrance certificate, price mismatch..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setRejectMode(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectConfirm}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white transition-colors"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 font-mono">
            Moderated by Reality AI Curators
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Close
            </button>

            {property.status !== 'Approved' && (
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg shadow-emerald-950"
              >
                <CheckCircle2 size={15} />
                <span>Approve Listing</span>
              </button>
            )}

            {property.status !== 'Rejected' && !rejectMode && (
              <button
                onClick={() => setRejectMode(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
              >
                <XCircle size={15} />
                <span>Reject Listing</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
