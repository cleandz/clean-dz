
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from '@/components/ui/use-toast';
import AdminContext from './AdminContext';
import { AdminProviderProps } from './types';

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAdminStatus = async (): Promise<boolean> => {
    if (!user) {
      setIsAdmin(false);
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);
    try {
      // Use the RPC function to check if user is admin
      const { data, error } = await supabase
        .rpc('has_role', { _user_id: user.id, _role: 'admin' });

      if (error) {
        console.error('Error checking admin status:', error);
        toast({
          title: "خطأ في التحقق من حالة المسؤول",
          description: "يرجى المحاولة مرة أخرى لاحقاً",
          variant: "destructive",
        });
        setIsAdmin(false);
      } else {
        // Set admin status based on the response
        setIsAdmin(!!data);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      toast({
        title: "خطأ في التحقق من حالة المسؤول",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
        variant: "destructive",
      });
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
    
    return isAdmin;
  };

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isLoading,
        checkAdminStatus
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
