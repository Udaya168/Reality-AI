import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Container } from '../components/ui/Container';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col justify-center py-12 px-4 sm:px-6">
      <Container size="narrow">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-3xl border border-[#183D30] flex items-center justify-center font-serif text-lg font-bold text-[#183D30] group-hover:bg-[#183D30] group-hover:text-white transition-colors">
              R
            </span>
            <span className="font-serif text-2xl tracking-tight font-semibold text-[#183D30]">
              REALITY
            </span>
          </Link>
        </div>
        <div className="bg-white border border-[#E7E6DF] shadow-md rounded-3xl overflow-hidden">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};
