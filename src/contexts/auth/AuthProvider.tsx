
import React, { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Profile, UserRole } from '@/types/supabase';
import { translations } from './translations';
import AuthContext from './AuthContext';
import { AuthProviderProps } from './types';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const t = translations[language];

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchUserRole(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setUserRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchUserRole(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchUserRole = async (userId: string) => {
    try {
      // Use has_role function instead of direct query
      const { data, error } = await supabase
        .rpc('has_role', { _user_id: userId, _role: 'admin' });

      if (error) {
        console.error('Error checking user role:', error);
        setUserRole('citizen'); // Default role
      } else {
        setUserRole(data ? 'admin' : 'citizen');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('citizen'); // Default role
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
      await fetchUserRole(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: t.signInSuccess });
    } catch (error: any) {
      toast({ 
        title: t.error, 
        description: error.message, 
        variant: 'destructive' 
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });
      if (error) throw error;
      toast({ title: t.signUpSuccess });
    } catch (error: any) {
      toast({ 
        title: t.error, 
        description: error.message, 
        variant: 'destructive' 
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: t.signOutSuccess });
    } catch (error: any) {
      toast({ 
        title: t.error, 
        description: error.message, 
        variant: 'destructive' 
      });
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshProfile();
      toast({ title: t.profileUpdateSuccess });
    } catch (error: any) {
      toast({ 
        title: t.error, 
        description: error.message, 
        variant: 'destructive' 
      });
      throw error;
    }
  };

  const isAdmin = (): boolean => {
    return userRole === 'admin';
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      userRole,
      loading,
      signIn,
      signUp,
      signOut,
      refreshProfile,
      updateProfile,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
