import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardProvider } from '../context/DashboardContext';
import { DashboardSidebar } from '../features/dashboard/components/DashboardSidebar';
import { DashboardHeader } from '../features/dashboard/components/DashboardHeader';

export const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-[#F8F7F3] flex flex-col">
        {/* Top Header */}
        <DashboardHeader
          title="Seller Portfolio"
          subtitle="Manage architectural listings and review buyer activity"
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
        />

        {/* Workspace Body */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block shrink-0">
            <DashboardSidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-xs"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10">
                <DashboardSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
              </div>
            </div>
          )}

          {/* Main Dashboard Workspace */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
};
