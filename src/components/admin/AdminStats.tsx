
import React from 'react';
import { Users, FileBarChart2, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';

interface AdminStatsProps {
  totalUsers: number;
  totalReports: number;
  totalWasteCollected: number;
}

const AdminStats: React.FC<AdminStatsProps> = ({ 
  totalUsers, 
  totalReports, 
  totalWasteCollected 
}) => {
  const { language, dir, formatNumber } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t('totalUsers')}</p>
              <h3 className="text-2xl font-bold">{formatNumber(totalUsers)}</h3>
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
              <h3 className="text-2xl font-bold">{formatNumber(totalReports)}</h3>
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
              <h3 className="text-2xl font-bold">{formatNumber(totalWasteCollected)} {t('kg')}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
