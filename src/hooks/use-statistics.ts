
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Statistics {
  totalReports: number;
  totalWaste: number;
  totalUsers: number;
  activeCollectionPoints: number;
}

export const useStatistics = () => {
  const [statistics, setStatistics] = useState<Statistics>({
    totalReports: 0,
    totalWaste: 0,
    totalUsers: 0,
    activeCollectionPoints: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        
        // Fetch total reports
        const { count: reportsCount, error: reportsError } = await supabase
          .from('reports')
          .select('*', { count: 'exact', head: true });
        
        if (reportsError) throw reportsError;
        
        // Fetch total waste collected
        const { data: wasteData, error: wasteError } = await supabase
          .from('waste_entries')
          .select('weight');
        
        if (wasteError) throw wasteError;
        
        const totalWaste = wasteData
          ? wasteData.reduce((acc, entry) => acc + Number(entry.weight), 0)
          : 0;
        
        // Fetch total users
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (usersError) throw usersError;
        
        // Fetch active collection points
        const { count: collectionPointsCount, error: collectionPointsError } = await supabase
          .from('collection_points')
          .select('*', { count: 'exact', head: true });
        
        if (collectionPointsError) throw collectionPointsError;
        
        setStatistics({
          totalReports: reportsCount || 0,
          totalWaste: Math.round(totalWaste * 100) / 100,
          totalUsers: usersCount || 0,
          activeCollectionPoints: collectionPointsCount || 0,
        });
        
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError(err instanceof Error ? err : new Error('Unknown error fetching statistics'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return { statistics, isLoading, error };
};
