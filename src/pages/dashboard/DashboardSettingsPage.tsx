import React, { useState } from 'react';
import { User, Phone, Mail, Building, MapPin, Check, ShieldCheck, Bell } from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui';

export const DashboardSettingsPage: React.FC = () => {
  const [fullName, setFullName] = useState('Rohan Kothari');
  const [agencyName, setAgencyName] = useState('Kothari Estate Properties');
  const [email, setEmail] = useState('rohan.kothari@gmail.com');
  const [phone, setPhone] = useState('+91 98450 12890');
  const [locality, setLocality] = useState('Sadashivanagar & Central Bengaluru');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* Verification Credentials */}
      <Card padding="md" className="bg-[#183D30] text-white flex items-center justify-between border-0">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#A7B9A5]" />
          </div>
          <div>
            <div className="font-serif text-lg font-semibold">
              Verified Seller Status Active
            </div>
            <div className="text-xs text-[#A7B9A5] font-light">
              Your listings display the Verified Badge on the marketplace.
            </div>
          </div>
        </div>
        <Badge variant="subtle" size="sm">
          A-Khata Verified
        </Badge>
      </Card>

      {/* Edit Profile Form */}
      <Card padding="lg" className="border border-[#E7E6DF] bg-white space-y-6">
        <div className="border-b border-[#E7E6DF] pb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#737970]">
            Seller Identification
          </span>
          <h2 className="font-serif text-2xl text-[#183D30]">
            Profile &amp; Representation
          </h2>
          <p className="text-xs text-[#737970] font-light mt-0.5">
            These contact details are shown on your live property detail pages.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2 rounded-[1px]">
            <Check className="w-4 h-4 text-green-700" />
            <span>Profile credentials updated successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono uppercase tracking-wider text-[#737970] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-[1px]"
              />
            </div>

            <div>
              <label className="block font-mono uppercase tracking-wider text-[#737970] mb-1">
                Company / Agency (Optional)
              </label>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="w-full p-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-[1px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono uppercase tracking-wider text-[#737970] mb-1">
                Primary Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-[1px]"
              />
            </div>

            <div>
              <label className="block font-mono uppercase tracking-wider text-[#737970] mb-1">
                Contact Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-[1px]"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase tracking-wider text-[#737970] mb-1">
              Geographic Specialties
            </label>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full p-2.5 text-sm border border-[#E7E6DF] focus:outline-none focus:border-[#183D30] rounded-[1px]"
            />
          </div>

          {/* Lead Notification Preferences */}
          <div className="pt-4 border-t border-[#E7E6DF] space-y-3">
            <span className="font-mono uppercase tracking-wider text-[#737970] block text-[10px]">
              Direct Inquiries
            </span>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappAlerts}
                  onChange={(e) => setWhatsappAlerts(e.target.checked)}
                  className="accent-[#183D30]"
                />
                <span className="text-xs text-[#202520]">Receive instant WhatsApp notifications for new buyer inquiries</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="accent-[#183D30]"
                />
                <span className="text-xs text-[#202520]">Receive daily enquiry digest via email</span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" variant="primary" size="md">
              Save Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
