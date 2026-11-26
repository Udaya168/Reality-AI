import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Container } from '../components/ui/Container';

export const AuthLayout: React.FC = () => {
  return (
    <div className="site-page-background relative min-h-screen overflow-hidden flex flex-col justify-center py-10 px-4 sm:px-6">
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
        <div className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/90 shadow-[0_20px_56px_rgba(16,43,70,0.1)] backdrop-blur-xl">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};
