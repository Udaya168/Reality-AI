import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DashboardProvider } from '../../context/DashboardContext';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { AnimatePresence, motion } from 'framer-motion';

export const DashboardLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Determine page title by subroute
  let pageTitle = 'Seller Overview';
  let pageSubtitle = 'Track performance metrics, active listings, and direct buyer inquiries.';

  if (location.pathname.includes('/listings')) {
    pageTitle = 'My Properties';
    pageSubtitle = 'Manage your real estate listings, update prices, or mark properties as sold.';
  } else if (location.pathname.includes('/settings')) {
    pageTitle = 'Profile & Representation';
    pageSubtitle = 'Update contact credentials, company details, and lead notification preferences.';
  }

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-[#F7F6F2] flex">
        {/* Desktop Sidebar (Permanent) */}
        <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
          <DashboardSidebar />
        </div>

        {/* Mobile Slide-over Sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="absolute inset-0 bg-black/50 backdrop-blur-xs"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl z-10"
              >
                <DashboardSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader
            title={pageTitle}
            subtitle={pageSubtitle}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />

          <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
};
