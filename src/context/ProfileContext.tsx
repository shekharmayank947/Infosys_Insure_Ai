import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  profilePicture: string | null;
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (newProfile: Partial<ProfileData>) => void;
  setLoggedInUser: (email: string, fullName: string) => void;
}

const defaultProfile: ProfileData = {
  fullName: 'John Anderson',
  email: 'john.anderson@company.com',
  phone: '+1 (555) 123-4567',
  employeeId: 'EMP-2024-0142',
  department: 'Engineering',
  dateOfBirth: '1990-05-15',
  gender: 'Male',
  address: '123 Main Street, Suite 400\nSan Francisco, CA 94102\nUnited States',
  profilePicture: null
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(() => {
    // Initialize profile with logged-in user data from localStorage if available
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    const loggedInName = localStorage.getItem('loggedInName');
    if (loggedInEmail && loggedInName) {
      return {
        ...defaultProfile,
        email: loggedInEmail,
        fullName: loggedInName
      };
    }
    return defaultProfile;
  });

  const updateProfile = (newProfile: Partial<ProfileData>) => {
    setProfile(prev => {
      const updated = { ...prev, ...newProfile };
      // If name or email is updated, sync with localStorage
      if (newProfile.fullName) {
        localStorage.setItem('loggedInName', newProfile.fullName);
      }
      if (newProfile.email) {
        localStorage.setItem('loggedInEmail', newProfile.email);
      }
      return updated;
    });
  };

  const setLoggedInUser = (email: string, fullName: string) => {
    localStorage.setItem('loggedInEmail', email);
    localStorage.setItem('loggedInName', fullName);
    setProfile(prev => ({ ...prev, email, fullName }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, setLoggedInUser }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}