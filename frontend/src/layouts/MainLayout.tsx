import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShieldAlert, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';

interface AccessDeniedState {
  accessDenied?: string;
  currentRole?: string;
  attemptedPath?: string;
}

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [deniedBanner, setDeniedBanner] = useState<AccessDeniedState | null>(null);

  useEffect(() => {
    const state = location.state as AccessDeniedState | null;
    if (state?.accessDenied) {
      setDeniedBanner(state);
      // Clear navigation state so manual browser refresh does not replay old alerts
      navigate(location.pathname + location.search, { replace: true, state: null });
    } else if (location.pathname !== '/') {
      setDeniedBanner(null);
    }
  }, [location.state, location.pathname, location.search, navigate]);

  return (
    <div className="site-page-background min-h-screen flex flex-col text-[#102B46]">
      <Navbar />
      {deniedBanner && (
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 pt-4">
          <div
            role="alert"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <strong className="font-semibold">Access Restricted (403):</strong>{' '}
                Only users with the <span className="font-mono uppercase font-semibold">{deniedBanner.accessDenied}</span> role can access{' '}
                <code className="bg-rose-100 px-1.5 py-0.5 rounded font-mono">{deniedBanner.attemptedPath || 'this portal'}</code>.
                {deniedBanner.currentRole && (
                  <> Your current role is <span className="font-mono font-semibold">{deniedBanner.currentRole}</span>.</>
                )}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDeniedBanner(null)}
              aria-label="Dismiss access alert"
              className="p-1 text-rose-600 hover:text-rose-900 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};
