import React, { createContext, useContext, useState, ReactNode } from 'react';

type Experience = 'kids' | 'adults' | null;

interface AppContextType {
  experience: Experience;
  setExperience: (exp: Experience) => void;
  kidsProgress: {
    level: number;
    stars: number;
    badges: string[];
    currentCategory: string | null;
  };
  updateKidsProgress: (updates: Partial<AppContextType['kidsProgress']>) => void;
  adultsProfile: {
    savedContent: string[];
    giftsSent: number;
    giftsReceived: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [experience, setExperience] = useState<Experience>(null);
  const [kidsProgress, setKidsProgress] = useState({
    level: 1,
    stars: 0,
    badges: [],
    currentCategory: null as string | null,
  });
  const [adultsProfile, setAdultsProfile] = useState({
    savedContent: [],
    giftsSent: 0,
    giftsReceived: 0,
  });

  const updateKidsProgress = (updates: Partial<typeof kidsProgress>) => {
    setKidsProgress(prev => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider 
      value={{ 
        experience, 
        setExperience, 
        kidsProgress, 
        updateKidsProgress,
        adultsProfile 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
