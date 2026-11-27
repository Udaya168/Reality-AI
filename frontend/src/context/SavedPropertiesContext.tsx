import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { usePropertyContext } from './PropertyContext';
import { Property } from '../types/property';
import { supabase } from '../services/supabase/client';
import { mockProperties } from '../data/mockProperties';

interface SavedPropertiesContextType {
  savedIds: string[];
  wishlistCount: number;
  isSaved: (id: string) => boolean;
  toggleSaveProperty: (id: string) => boolean;
  savedProperties: Property[];
  authPromptOpen: boolean;
  setAuthPromptOpen: (open: boolean) => void;
  isLoading: boolean;
}

const SavedPropertiesContext = createContext<SavedPropertiesContextType | undefined>(undefined);

const GUEST_STORAGE_KEY = 'reality_ai_guest_wishlist';
const USER_STORAGE_PREFIX = 'reality_ai_wishlist_';

export const SavedPropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { properties } = usePropertyContext();
  const navigate = useNavigate();

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load wishlist when auth state changes (guest localStorage vs authenticated user)
  useEffect(() => {
    let isCancelled = false;

    const loadWishlist = async () => {
      if (!isAuthenticated || !user?.id) {
        // Load guest wishlist
        try {
          const stored = localStorage.getItem(GUEST_STORAGE_KEY);
          if (stored) {
            setSavedIds(JSON.parse(stored));
          } else {
            setSavedIds([]);
          }
        } catch {
          setSavedIds([]);
        }
        return;
      }

      // Authenticated user
      setIsLoading(true);
      const userKey = `${USER_STORAGE_PREFIX}${user.id}`;

      // 1. Check local cache first for instant render
      let localUserIds: string[] = [];
      try {
        const stored = localStorage.getItem(userKey);
        if (stored) {
          localUserIds = JSON.parse(stored);
          setSavedIds(localUserIds);
        }
      } catch {
        // ignore JSON parse errors
      }

      // 2. Fetch from Supabase backend
      try {
        const { data, error } = await supabase
          .from('user_wishlists')
          .select('property_id')
          .eq('user_id', user.id);

        if (!error && data && !isCancelled) {
          const backendIds = data.map((row: { property_id: string }) => row.property_id);
          // Merge any items saved in local cache into unique set
          const merged = Array.from(new Set([...backendIds, ...localUserIds]));
          setSavedIds(merged);
          localStorage.setItem(userKey, JSON.stringify(merged));

          // If there were local IDs not yet in backend, sync them
          const missingInBackend = localUserIds.filter((id) => !backendIds.includes(id));
          if (missingInBackend.length > 0) {
            for (const propId of missingInBackend) {
              await supabase
                .from('user_wishlists')
                .insert({ user_id: user.id, property_id: propId });
            }
          }
        }
      } catch (err) {
        console.warn('[Wishlist] Note: backend wishlist table not reachable, utilizing local user persistence', err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadWishlist();

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, user?.id]);

  /**
   * Toggles save status for a property.
   * If unauthenticated, triggers prompt to sign in so wishlist persists against their account.
   */
  const toggleSaveProperty = useCallback(
    (id: string): boolean => {
      if (!isAuthenticated || !user?.id) {
        setAuthPromptOpen(true);
        return false;
      }

      setSavedIds((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((item) => item !== id) : [...prev, id];

        // 1. Sync immediately to user-specific localStorage
        const userKey = `${USER_STORAGE_PREFIX}${user.id}`;
        try {
          localStorage.setItem(userKey, JSON.stringify(next));
        } catch {
          // ignore storage error
        }

        // 2. Async sync to Supabase user_wishlists
        (async () => {
          try {
            if (exists) {
              await supabase
                .from('user_wishlists')
                .delete()
                .eq('user_id', user.id)
                .eq('property_id', id);
            } else {
              await supabase
                .from('user_wishlists')
                .insert({ user_id: user.id, property_id: id });
            }
          } catch (err) {
            console.warn('[Wishlist] Sync error to Supabase (using persistent local storage)', err);
          }
        })();

        return next;
      });

      return true;
    },
    [isAuthenticated, user?.id]
  );

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const activeProperties = useMemo(() => {
    return properties.length > 0 ? properties : mockProperties;
  }, [properties]);

  const savedProperties = useMemo(() => {
    return activeProperties.filter((p) => savedIds.includes(p.id));
  }, [activeProperties, savedIds]);

  return (
    <SavedPropertiesContext.Provider
      value={{
        savedIds,
        wishlistCount: savedIds.length,
        isSaved,
        toggleSaveProperty,
        savedProperties,
        authPromptOpen,
        setAuthPromptOpen,
        isLoading,
      }}
    >
      {children}

      {/* Unauthenticated Wishlist Prompt Modal */}
      {authPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md p-6 sm:p-8 bg-[#FAF8F5] border border-[#E9E4DC] rounded-3xl shadow-2xl space-y-5 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#183653]/10 text-[#183653] flex items-center justify-center">
              <svg className="w-6 h-6 fill-current text-[#E85D75]" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#183653]">
                Save to Your Wishlist
              </h3>
              <p className="mt-2 text-xs font-['DM_Sans',system-ui,sans-serif] text-[#52687D] leading-relaxed">
                Sign in to save this architectural residence to your private collection and sync your wishlist across all devices.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setAuthPromptOpen(false);
                  navigate('/login?redirect=wishlist');
                }}
                className="w-full py-3 px-5 rounded-full bg-[#183653] hover:bg-[#102B46] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-md active:scale-[0.98]"
              >
                Sign In to Save
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthPromptOpen(false);
                  navigate('/signup?redirect=wishlist');
                }}
                className="w-full py-2.5 px-5 rounded-full border border-[#D9E0E6] bg-white text-[#183653] hover:bg-[#F8F7F3] text-xs font-mono uppercase tracking-wider transition-all"
              >
                Create Account
              </button>

              <button
                type="button"
                onClick={() => setAuthPromptOpen(false)}
                className="text-xs text-[#8493A1] hover:text-[#183653] pt-1"
              >
                Continue browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </SavedPropertiesContext.Provider>
  );
};

export const useSavedProperties = () => {
  const ctx = useContext(SavedPropertiesContext);
  if (!ctx) throw new Error('useSavedProperties must be used within SavedPropertiesProvider');
  return ctx;
};
