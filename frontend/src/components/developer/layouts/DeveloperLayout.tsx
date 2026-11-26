import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DeveloperSidebar } from '../components/DeveloperSidebar';
import { DeveloperHeader } from '../components/DeveloperHeader';

export const DeveloperLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="site-page-background min-h-screen text-slate-100 flex flex-col font-sans selection:bg-[#7896B2]/30 selection:text-white">
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar (Fixed Left) */}
        <div className="hidden lg:block shrink-0 sticky top-0 h-screen z-40">
          <DeveloperSidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 h-full shadow-2xl z-10">
              <DeveloperSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Workspace Body */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#102B46]">
          <DeveloperHeader
            title="Developer Platform"
            subtitle="Architectural Intelligence Infrastructure — Sandbox Environment"
            onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          />

          {/* Main Viewport Content */}
          <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
