import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Status {
  id: string;
  type: 'image' | 'video';
  thumbnail: string;
  fullUrl: string;
  fileName: string;
  timestamp: number;
  size: number;
  isSaved: boolean;
}

interface StatusContextType {
  statuses: Status[];
  savedStatuses: Status[];
  isLoading: boolean;
  fetchStatuses: () => Promise<void>;
  saveStatus: (status: Status) => Promise<void>;
  deleteStatus: (statusId: string) => Promise<void>;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const useStatus = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
};

// Mock data for demo purposes
const generateMockStatuses = (): Status[] => {
  const mockStatuses: Status[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const isVideo = Math.random() > 0.7;
    mockStatuses.push({
      id: `status-${i}`,
      type: isVideo ? 'video' : 'image',
      thumbnail: `https://picsum.photos/300/400?random=${i}`,
      fullUrl: `https://picsum.photos/800/1200?random=${i}`,
      fileName: `status_${i}.${isVideo ? 'mp4' : 'jpg'}`,
      timestamp: Date.now() - Math.random() * 86400000,
      size: Math.floor(Math.random() * 5000000) + 500000,
      isSaved: false,
    });
  }
  
  return mockStatuses;
};

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [savedStatuses, setSavedStatuses] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStatuses = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockData = generateMockStatuses();
    setStatuses(mockData);
    setIsLoading(false);
  }, []);

  const saveStatus = useCallback(async (status: Status) => {
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedStatus = { ...status, isSaved: true };
    
    setStatuses(prev => 
      prev.map(s => s.id === status.id ? updatedStatus : s)
    );
    
    setSavedStatuses(prev => {
      if (prev.find(s => s.id === status.id)) return prev;
      return [...prev, updatedStatus];
    });
  }, []);

  const deleteStatus = useCallback(async (statusId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setSavedStatuses(prev => prev.filter(s => s.id !== statusId));
    setStatuses(prev => 
      prev.map(s => s.id === statusId ? { ...s, isSaved: false } : s)
    );
  }, []);

  return (
    <StatusContext.Provider value={{
      statuses,
      savedStatuses,
      isLoading,
      fetchStatuses,
      saveStatus,
      deleteStatus,
    }}>
      {children}
    </StatusContext.Provider>
  );
};