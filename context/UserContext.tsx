// context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface UserPreferences {
  language: string;
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    platform: boolean;
  };
  privacy: {
    shareReflections: boolean;
    publicProfile: boolean;
  };
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'teacher';
  avatar?: string;
  bio?: string;
}

interface UserContextType {
  profile: UserProfile | null;
  preferences: UserPreferences;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  isLoading: boolean;
}

const defaultPreferences: UserPreferences = {
  language: 'sv',
  theme: 'light',
  notifications: {
    email: true,
    platform: true,
  },
  privacy: {
    shareReflections: false,
    publicProfile: false,
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved preferences from localStorage
  useEffect(() => {
    const loadSavedPreferences = () => {
      try {
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
          setPreferences(JSON.parse(savedPrefs));
        } else {
          // If no saved preferences, use the current locale as default language
          setPreferences(prev => ({
            ...prev,
            language: router.locale || 'sv'
          }));
        }
        
        // Load mock profile data (replace with real auth later)
        setProfile({
          id: '1',
          name: 'Sofia Andersson',
          email: 'sofia.andersson@example.com',
          role: 'student',
          bio: 'Exploring philosophy and consciousness studies',
        });
        
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
      setIsLoading(false);
      setIsInitialized(true);
    };

    loadSavedPreferences();
  }, [router.locale]);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (!isInitialized) return;
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences, isInitialized]);

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setProfile(prev => prev ? { ...prev, ...newProfile } : null);
  };

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        ...newPreferences,
      };

      // If language is being updated, update the router locale
      if (newPreferences.language && newPreferences.language !== prev.language) {
        router.push(router.pathname, router.asPath, { locale: newPreferences.language });
      }

      return updated;
    });
  };

  return (
    <UserContext.Provider 
      value={{ 
        profile, 
        preferences, 
        updateProfile, 
        updatePreferences,
        isLoading 
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
