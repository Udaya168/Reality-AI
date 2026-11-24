import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#102B46]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
