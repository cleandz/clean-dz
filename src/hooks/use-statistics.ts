
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
    collectionPoints: 0, // سيتم حسابها ديناميكياً
    resolvedReports: 0,
    isLoading: true,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // الحصول على إجمالي وزن النفايات
        const { data: wasteData, error: wasteError } = await supabase
          .from('waste_entries')
          .select('weight');

        if (wasteError) throw wasteError;

        // حساب عدد نقاط الجمع
        const { count: collectionPointsCount, error: collectionPointsError } = await supabase
          .from('collection_points')
          .select('*', { count: 'exact', head: true });

        if (collectionPointsError) throw collectionPointsError;

        // حساب عدد البلاغات المحلولة
        const { data: reportsData, error: reportsError } = await supabase
          .from('reports')
          .select('id')
          .eq('status', 'resolved');

        if (reportsError) throw reportsError;

        // حساب إجمالي النفايات التي تم التحقق منها
        const { data: verifiedWasteData, error: verifiedWasteError } = await supabase
          .from('waste_entries')
          .select('weight')
          .eq('verified', true);

        if (verifiedWasteError) throw verifiedWasteError;

        // حساب الإجماليات
        const totalWaste = wasteData.reduce((sum, entry) => sum + Number(entry.weight), 0);
        const totalVerifiedWaste = verifiedWasteData.reduce((sum, entry) => sum + Number(entry.weight), 0);

        setStatistics({
          collectedWaste: Math.round(totalWaste * 10) / 10, // تقريب إلى 1 رقم عشري
          recycledMaterials: Math.round(totalVerifiedWaste * 10) / 10, // تقريب إلى 1 رقم عشري
          collectionPoints: collectionPointsCount || 0,
          resolvedReports: reportsData.length,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
        toast({
          title: "خطأ في تحميل الإحصائيات",
          description: "تعذر تحميل أحدث الإحصائيات",
          variant: "destructive",
        });
        setStatistics(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchStatistics();
  }, []);

  return statistics;
};
