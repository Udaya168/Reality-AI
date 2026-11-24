import { useState, useEffect, useCallback } from 'react';
import { APIKey, APIActivityItem, APIKeyEnvironment } from '../types/developer.types';
import { mockDeveloperService } from '../services/mockDeveloperService';

export const useDeveloper = () => {
  const [keys, setKeys] = useState<APIKey[]>([]);
  const [activityLogs, setActivityLogs] = useState<APIActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from service on mount
  useEffect(() => {
    const loadedKeys = mockDeveloperService.getKeys();
    const loadedLogs = mockDeveloperService.getActivity();
    setKeys(loadedKeys);
    setActivityLogs(loadedLogs);
    setIsLoading(false);
  }, []);

  const createKey = useCallback((name: string, environment: APIKeyEnvironment = 'Test'): APIKey => {
    const newKey = mockDeveloperService.createKey(name, environment);
    setKeys(mockDeveloperService.getKeys());
    return newKey;
  }, []);

  const revokeKey = useCallback((keyId: string) => {
    const updated = mockDeveloperService.revokeKey(keyId);
    setKeys(updated);
  }, []);

  const renameKey = useCallback((keyId: string, newName: string) => {
    const updated = mockDeveloperService.renameKey(keyId, newName);
    setKeys(updated);
  }, []);

  const refreshActivity = useCallback(() => {
    setActivityLogs(mockDeveloperService.getActivity());
  }, []);

  const clearActivity = useCallback(() => {
    mockDeveloperService.clearActivity();
    setActivityLogs([]);
  }, []);

  const resetActivity = useCallback(() => {
    const defaults = mockDeveloperService.resetActivityToDefault();
    setActivityLogs(defaults);
  }, []);

  return {
    keys,
    activityLogs,
    isLoading,
    createKey,
    revokeKey,
    renameKey,
    refreshActivity,
    clearActivity,
    resetActivity,
  };
};
