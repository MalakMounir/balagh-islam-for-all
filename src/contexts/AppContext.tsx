import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import i18n from '@/i18n';

type Experience = 'kids' | 'adults' | null;
type Language = 'ar' | 'en' | 'fr' | 'ur' | 'id';
type UserRole = 'Adult' | 'Parent';

export interface ChildProfile {
  id: string;
  name: string;
  age: string;
  avatar: string;
}

export interface ParentPreferences {
  childLanguage: string;
  askBalegh: boolean;
  sound: boolean;
  bedtimeStories: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hasChildren: boolean;
  userType: 'parent' | 'individual';
  language: Language;
  isFirstTime: boolean;
  accountType?: 'parent' | 'individual';
}

interface AppContextType {
  experience: Experience;
  setExperience: (exp: Experience) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  kidsProgress: {
    level: number;
    stars: number;
    badges: string[];
    currentCategory: string | null;
    dailyStreak: number;
    lastActiveDate: string | null;
  };
  updateKidsProgress: (updates: Partial<AppContextType['kidsProgress']>) => void;
  adultsProfile: {
    savedContent: string[];
    giftsSent: number;
    giftsReceived: number;
  };
  // Authentication & Profiles
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  userType: 'parent' | 'individual' | null;
  login: (email: string, password: string, name?: string) => Promise<User>;
  signup: (name: string, email: string, password: string, isParent: boolean) => Promise<User>;
  logout: () => void;
  childProfiles: ChildProfile[];
  addChildProfile: (profile: ChildProfile) => void;
  removeChildProfile: (id: string) => void;
  selectedChildProfile: ChildProfile | null;
  setSelectedChildProfile: (profile: ChildProfile | null) => void;
  parentPreferences: ParentPreferences | null;
  setParentPreferences: (prefs: ParentPreferences) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [experience, setExperience] = useState<Experience>(null);
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or default to Arabic
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || 'ar';
  });
  const [kidsProgress, setKidsProgress] = useState(() => {
    const saved = localStorage.getItem('kidsProgress');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check if streak should continue
      const today = new Date().toDateString();
      const lastActive = parsed.lastActiveDate;
      if (lastActive === today) {
        // Already active today, keep streak
        return { ...parsed, lastActiveDate: today };
      } else if (lastActive && new Date(lastActive).getTime() === new Date(today).getTime() - 86400000) {
        // Active yesterday, increment streak
        return { ...parsed, dailyStreak: (parsed.dailyStreak || 0) + 1, lastActiveDate: today };
      } else {
        // Streak broken, reset
        return { ...parsed, dailyStreak: 1, lastActiveDate: today };
      }
    }
    return {
      level: 1,
      stars: 0,
      badges: [],
      currentCategory: null as string | null,
      dailyStreak: 0,
      lastActiveDate: null as string | null,
    };
  });
  const [adultsProfile, setAdultsProfile] = useState({
    savedContent: [],
    giftsSent: 0,
    giftsReceived: 0,
  });
  
  // Authentication & Profiles
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() => {
    return !!localStorage.getItem('balagh_auth');
  });
  const [user, setUserState] = useState<User | null>(() => {
    const saved = localStorage.getItem('balagh_auth');
    if (saved) {
      try {
        const account = JSON.parse(saved);
        return {
          id: account.id || Date.now().toString(),
          name: account.name || '',
          email: account.email || '',
          role: account.role || 'Adult',
          hasChildren: account.hasChildren || false,
          userType: account.role === 'Parent' ? 'parent' : 'individual',
          language: account.language || 'ar',
          isFirstTime: account.isFirstTime !== false,
          accountType: account.role === 'Parent' ? 'parent' : 'individual',
        };
      } catch {
        return null;
      }
    }
    return null;
  });
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>(() => {
    const saved = localStorage.getItem('childProfiles');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedChildProfile, setSelectedChildProfile] = useState<ChildProfile | null>(() => {
    const saved = localStorage.getItem('selectedChildProfile');
    return saved ? JSON.parse(saved) : null;
  });
  const [parentPreferences, setParentPreferencesState] = useState<ParentPreferences | null>(() => {
    const saved = localStorage.getItem('parentPreferences');
    return saved ? JSON.parse(saved) : null;
  });

  // Derived userType
  const userType = user?.userType || null;

  // Enhanced setIsAuthenticated that also updates user
  const setIsAuthenticated = (auth: boolean) => {
    setIsAuthenticatedState(auth);
    if (!auth) {
      setUserState(null);
    }
  };

  // Enhanced setUser that also updates auth state
  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    setIsAuthenticatedState(!!newUser);
    if (newUser) {
      // Update localStorage
      localStorage.setItem('balagh_auth', JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        hasChildren: newUser.hasChildren,
        language: newUser.language,
        isFirstTime: newUser.isFirstTime,
      }));
    } else {
      localStorage.removeItem('balagh_auth');
    }
  };

  // FAKE LOGIN - accepts any valid-looking email + password
  const login = async (email: string, password: string, name?: string): Promise<User> => {
    // Simulate API delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user exists in localStorage (from previous signup)
    const existingAuth = localStorage.getItem('balagh_auth');
    const existingChildren = localStorage.getItem('childProfiles');
    const hasChildren = existingChildren ? JSON.parse(existingChildren).length > 0 : false;
    
    let userData: User;
    
    if (existingAuth) {
      // Returning user - use existing data
      const existing = JSON.parse(existingAuth);
      userData = {
        id: existing.id || Date.now().toString(),
        name: existing.name || name || email.split('@')[0],
        email: email,
        role: existing.role || 'Adult',
        hasChildren: hasChildren || existing.hasChildren || false,
        userType: existing.role === 'Parent' ? 'parent' : 'individual',
        language: existing.language || language,
        isFirstTime: false, // Returning user
        accountType: existing.role === 'Parent' ? 'parent' : 'individual',
      };
    } else {
      // New user via login - create default account
      userData = {
        id: Date.now().toString(),
        name: name || email.split('@')[0],
        email: email,
        role: 'Adult',
        hasChildren: false,
        userType: 'individual',
        language: language,
        isFirstTime: true,
        accountType: 'individual',
      };
    }
    
    setUser(userData);
    return userData;
  };

  // FAKE SIGNUP - creates new user locally
  const signup = async (name: string, email: string, password: string, isParent: boolean): Promise<User> => {
    // Simulate API delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userData: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      role: isParent ? 'Parent' : 'Adult',
      hasChildren: false, // Will be updated when children are added
      userType: isParent ? 'parent' : 'individual',
      language: language,
      isFirstTime: true,
      accountType: isParent ? 'parent' : 'individual',
    };
    
    setUser(userData);
    return userData;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticatedState(false);
    setUserState(null);
    setSelectedChildProfile(null);
    setExperience(null);
    // Clear ALL auth-related localStorage
    localStorage.removeItem('balagh_auth');
    localStorage.removeItem('selectedChildProfile');
    localStorage.removeItem('childProfiles');
    localStorage.removeItem('parentPreferences');
    // Reset child profiles state
    setChildProfiles([]);
    setParentPreferencesState(null);
  };

  // Update i18n and document direction when language changes
  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    // RTL languages: Arabic, Urdu
    document.documentElement.dir = (language === 'ar' || language === 'ur') ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const updateKidsProgress = (updates: Partial<typeof kidsProgress>) => {
    setKidsProgress(prev => {
      const updated = { ...prev, ...updates };
      // Update last active date when progress is updated
      if (!updated.lastActiveDate || updated.lastActiveDate !== new Date().toDateString()) {
        const today = new Date().toDateString();
        const lastActive = updated.lastActiveDate;
        if (lastActive && new Date(lastActive).getTime() === new Date(today).getTime() - 86400000) {
          // Active yesterday, increment streak
          updated.dailyStreak = (updated.dailyStreak || 0) + 1;
        } else if (lastActive !== today) {
          // New day, start streak
          updated.dailyStreak = 1;
        }
        updated.lastActiveDate = today;
      }
      localStorage.setItem('kidsProgress', JSON.stringify(updated));
      return updated;
    });
  };

  const addChildProfile = (profile: ChildProfile) => {
    setChildProfiles(prev => {
      const updated = [...prev, profile];
      localStorage.setItem('childProfiles', JSON.stringify(updated));
      
      // Update user's hasChildren status
      if (user) {
        const updatedUser = { ...user, hasChildren: true };
        setUser(updatedUser);
      }
      
      return updated;
    });
  };

  const removeChildProfile = (id: string) => {
    setChildProfiles(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('childProfiles', JSON.stringify(updated));
      if (selectedChildProfile?.id === id) {
        setSelectedChildProfile(null);
        localStorage.removeItem('selectedChildProfile');
      }
      return updated;
    });
  };

  const setSelectedChildProfileWithStorage = (profile: ChildProfile | null) => {
    setSelectedChildProfile(profile);
    if (profile) {
      localStorage.setItem('selectedChildProfile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('selectedChildProfile');
    }
  };

  const setParentPreferences = (prefs: ParentPreferences) => {
    setParentPreferencesState(prefs);
    localStorage.setItem('parentPreferences', JSON.stringify(prefs));
  };

  return (
    <AppContext.Provider 
      value={{ 
        experience, 
        setExperience,
        language,
        setLanguage,
        kidsProgress, 
        updateKidsProgress,
        adultsProfile,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        userType,
        login,
        signup,
        logout,
        childProfiles,
        addChildProfile,
        removeChildProfile,
        selectedChildProfile,
        setSelectedChildProfile: setSelectedChildProfileWithStorage,
        parentPreferences,
        setParentPreferences,
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
