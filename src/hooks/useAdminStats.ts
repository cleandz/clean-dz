
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';

export interface AdminStats {
  totalUsers: number;
  totalReports: number;
  totalWasteCollected: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalReports: 0,
    totalWasteCollected: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const fetchAdminStats = async () => {
    try {
      setIsLoading(true);
      
      // Fetch total users
      const { count: usersCount, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      // Fetch total reports
      const { count: reportsCount, error: reportsError } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true });
      
      // Fetch total waste collected
      const { data: wasteData, error: wasteError } = await supabase
        .from('waste_entries')
        .select('weight');
      
      if (usersError || reportsError || wasteError) {
        throw new Error('Error fetching admin statistics');
      }
      
      const totalWeight = wasteData 
        ? wasteData.reduce((acc, entry) => acc + (parseFloat(String(entry.weight)) || 0), 0)
        : 0;
      
      setStats({
        totalUsers: usersCount || 0,
        totalReports: reportsCount || 0,
        totalWasteCollected: totalWeight
      });
      
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      toast({
        title: t('errorTitle'),
        description: t('errorFetching'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  return { stats, isLoading, fetchAdminStats };
};
