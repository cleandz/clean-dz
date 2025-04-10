
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useAdmin } from '@/contexts/admin';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileBarChart2, BarChart3, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AdminStats {
  totalUsers: number;
  totalReports: number;
  totalWasteCollected: number;
}

const AdminDashboard = () => {
  const { language, dir, formatNumber } = useLanguage();
  const { t } = useTranslation(language);
  const { isAdmin, isLoading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalReports: 0,
    totalWasteCollected: 0
  });

  const fetchAdminStats = async () => {
    try {
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
    }
  };

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      // Redirect non-admin users
      toast({
        title: t('errorTitle'),
        description: t('adminOnly'),
        variant: "destructive",
      });
      navigate('/');
    } else if (isAdmin) {
      fetchAdminStats();
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
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
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t('adminPanel')}</h1>
        <div className="flex items-center mt-2 md:mt-0">
          <Lock className="h-5 w-5 mr-2 text-primary-green" />
          <span className="text-gray-600">{t('adminOnly')}</span>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('totalUsers')}</p>
                <h3 className="text-2xl font-bold">{formatNumber(stats.totalUsers)}</h3>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('totalReports')}</p>
                <h3 className="text-2xl font-bold">{formatNumber(stats.totalReports)}</h3>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <FileBarChart2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('totalWasteCollected')}</p>
                <h3 className="text-2xl font-bold">{formatNumber(stats.totalWasteCollected)} {t('kg')}</h3>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Admin Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="users">{t('manageUsers')}</TabsTrigger>
          <TabsTrigger value="reports">{t('manageReports')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('analytics')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>{t('manageUsers')}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* User management interface would go here */}
              <p>User management functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>{t('manageReports')}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Report management interface would go here */}
              <p>Report management functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics')}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Analytics interface would go here */}
              <p>Analytics functionality will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
