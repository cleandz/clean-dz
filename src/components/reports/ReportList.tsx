
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { Report } from '@/types/supabase';

interface ReportListProps {
  reports: Report[];
  isLoading: boolean;
}

const ReportList: React.FC<ReportListProps> = ({ reports, isLoading }) => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (reports.length === 0) {
    return <p>{t('noReportsYet')}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reports.map((report) => (
        <Card key={report.id}>
          <CardHeader>
            <CardTitle>{t('report')} #{report.id.substring(0, 8)}</CardTitle>
            <CardDescription>
              {t('submittedOn')} {new Date(report.created_at).toLocaleDateString(language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img src={report.image_url} alt="Reported Waste" className="w-full h-32 object-cover rounded-md mb-2" />
            <p className="text-sm text-gray-600">{t('wasteType')}: {t(report.waste_type)}</p>
            <p className="text-sm text-gray-600">{t('status')}: {t(report.status || 'new')}</p>
            <p className="text-sm text-gray-600">{t('description')}: {report.description}</p>
            {report.latitude && report.longitude && (
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {report.latitude.toFixed(5)}, {report.longitude.toFixed(5)}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReportList;
