import { useState, useEffect } from 'react';
import { Property } from '../types/property';
import { mockProperties } from '../data/mockProperties';

const SAVED_STORAGE_KEY = 'reality_ai_saved_ids';
const SAVED_CHANGE_EVENT = 'reality_ai_saved_change';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });

  // Listen to custom cross-component sync event and storage changes
  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail) {
        setSavedIds(customEvent.detail);
      } else {
        try {
          const stored = localStorage.getItem(SAVED_STORAGE_KEY);
          if (stored) setSavedIds(JSON.parse(stored));
        } catch { }
      }
    };

    window.addEventListener(SAVED_CHANGE_EVENT, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(SAVED_CHANGE_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const toggleSaveProperty = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent(SAVED_CHANGE_EVENT, { detail: next }));
      } catch (e) {
        console.error('Failed to sync saved properties with localStorage', e);
      }
      return next;
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const getSavedProperties = () => {
    return properties.filter((p) => savedIds.includes(p.id));
  };

  return {
    properties,
    setProperties,
    savedIds,
    toggleSaveProperty,
    isSaved,
    getSavedProperties,
  };
}
