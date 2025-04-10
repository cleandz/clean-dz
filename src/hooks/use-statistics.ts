
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Statistics {
  totalUsers: number;
  totalReports: number;
  totalCollectionPoints: number;
  isLoading: boolean;
}

export function useStatistics() {
  const [stats, setStats] = useState<Statistics>({
    totalUsers: 0,
    totalReports: 0,
    totalCollectionPoints: 0,
    isLoading: true
  });

  useEffect(() => {
    async function fetchStatistics() {
      try {
        // Fetch total users count
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (userError) throw userError;

        // Fetch total collection points
        const { count: collectionPointsCount, error: collectionPointsError } = await supabase
          .from('collection_points')
          .select('*', { count: 'exact', head: true });

        if (collectionPointsError) throw collectionPointsError;

        // Fetch total reports
        const { count: reportsCount, error: reportsError } = await supabase
          .from('reports')
          .select('*', { count: 'exact', head: true });

        if (reportsError) throw reportsError;

        setStats({
          totalUsers: userCount || 0,
          totalReports: reportsCount || 0,
          totalCollectionPoints: collectionPointsCount || 0,
          isLoading: false
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    }

    fetchStatistics();
  }, []);

  return stats;
}
