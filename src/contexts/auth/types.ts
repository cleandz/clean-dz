
import { Session, User } from '@supabase/supabase-js';
import { Profile, UserRole } from '@/types/supabase';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  userRole: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  isAdmin: () => boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthTranslations {
  signInSuccess: string;
  signOutSuccess: string;
  signUpSuccess: string;
  profileUpdateSuccess: string;
  error: string;
}
