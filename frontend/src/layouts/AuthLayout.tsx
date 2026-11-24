import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Container } from '../components/ui/Container';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F7F3] flex flex-col justify-center py-12 px-4 sm:px-6">
      <Container size="narrow">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-3xl border border-[#183653] flex items-center justify-center font-serif text-lg font-bold text-[#183653] group-hover:bg-[#183653] group-hover:text-white transition-colors">
              R
            </span>
            <span className="font-serif text-2xl tracking-tight font-semibold text-[#183653]">
              REALITY
            </span>
          </Link>
        </div>
        <div className="bg-white border border-[#D9E0E6] shadow-md rounded-3xl overflow-hidden">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};
