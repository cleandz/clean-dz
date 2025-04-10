
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './auth';
import { toast } from '@/components/ui/use-toast';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  checkAdminStatus: () => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
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

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
