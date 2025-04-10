
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useAdmin } from '@/contexts/admin';
import { useToast } from '@/components/ui/use-toast';
import { useAdminStats } from '@/hooks/useAdminStats';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminStats from '@/components/admin/AdminStats';
import AdminTabs from '@/components/admin/AdminTabs';

const AdminDashboard: React.FC = () => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);
  const { isAdmin, isLoading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { stats, isLoading: statsLoading } = useAdminStats();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      // Redirect non-admin users
      toast({
        title: t('errorTitle'),
        description: t('adminOnly'),
        variant: "destructive",
      });
      navigate('/');
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading || statsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className={`container mx-auto ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <AdminHeader />
      <AdminStats 
        totalUsers={stats.totalUsers}
        totalReports={stats.totalReports}
        totalWasteCollected={stats.totalWasteCollected}
      />
      <AdminTabs />
    </div>
  );
};

export default AdminDashboard;
