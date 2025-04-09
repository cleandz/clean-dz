
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface Statistics {
  collectedWaste: number;
  recycledMaterials: number;
  collectionPoints: number;
  resolvedReports: number;
  isLoading: boolean;
}

export const useStatistics = () => {
  const [statistics, setStatistics] = useState<Statistics>({
    collectedWaste: 0,
    recycledMaterials: 0,
    collectionPoints: 120, // Default static value for collection points
    resolvedReports: 0,
    isLoading: true,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Get total waste weight
        const { data: wasteData, error: wasteError } = await supabase
          .from('waste_entries')
          .select('weight');

        if (wasteError) throw wasteError;

        // Get recycled waste weight
        const { data: recycledData, error: recycledError } = await supabase
          .from('waste_entries')
          .select('weight')
          .eq('recyclable', true);

        if (recycledError) throw recycledError;

        // Count resolved reports
        const { data: reportsData, error: reportsError } = await supabase
          .from('issue_reports')
          .select('id')
          .eq('status', 'resolved');

        if (reportsError) throw reportsError;

        // Calculate totals
        const totalWaste = wasteData.reduce((sum, entry) => sum + Number(entry.weight), 0);
        const recycledWaste = recycledData.reduce((sum, entry) => sum + Number(entry.weight), 0);

        setStatistics({
          collectedWaste: Math.round(totalWaste * 10) / 10, // Round to 1 decimal place
          recycledMaterials: Math.round(recycledWaste * 10) / 10, // Round to 1 decimal place
          collectionPoints: 120, // This is still static as we don't have a dynamic source
          resolvedReports: reportsData.length,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
        toast({
          title: "Error loading statistics",
          description: "Could not load the latest statistics",
          variant: "destructive",
        });
        setStatistics(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchStatistics();
  }, []);

  return statistics;
};
