import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminProvider } from '../../../context/AdminContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AdminProvider>
      <div className="site-page-background flex h-screen text-slate-100 overflow-hidden font-sans">
        <AdminSidebar isOpenMobile={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminHeader onOpenMobileSidebar={() => setMobileOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900/40">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};
