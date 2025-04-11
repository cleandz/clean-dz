
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Calendar, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { Report } from '@/types/supabase';
import { formatDistanceToNow } from 'date-fns';
import { ar, enUS, fr } from 'date-fns/locale';

interface ReportListProps {
  reports: Report[];
  isLoading: boolean;
}

const ReportList: React.FC<ReportListProps> = ({ reports, isLoading }) => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);

  const getDateLocale = () => {
    switch (language) {
      case 'ar':
        return ar;
      case 'fr':
        return fr;
      default:
        return enUS;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
        <span>{t('loading')}</span>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <Info className="mx-auto h-10 w-10 text-gray-400 mb-3" />
        <p className="text-gray-500 font-medium">{t('noReportsYet')}</p>
        <p className="text-sm text-gray-400 mt-1">{t('createYourFirstReport')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reports.map((report) => (
        <Card key={report.id} className="overflow-hidden">
          <div className="relative">
            <img 
              src={report.image_url || '/placeholder.svg'} 
              alt={t('reportedWaste')} 
              className="w-full h-40 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }} 
            />
            <Badge 
              className={`absolute top-2 right-2 ${getStatusColor(report.status)}`}
            >
              {t(report.status as any)}
            </Badge>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              {t('report')} #{report.id.substring(0, 8)}
            </CardTitle>
            <CardDescription className="flex items-center text-sm">
              <Calendar className="h-3.5 w-3.5 mr-1 opacity-70" />
              {formatDistanceToNow(new Date(report.created_at), { 
                addSuffix: true,
                locale: getDateLocale() 
              })}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t('wasteType')}:</span>
                <Badge variant="outline">{t(report.waste_type as any)}</Badge>
              </div>
              
              {report.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {report.description}
                </p>
              )}
              
              {report.latitude && report.longitude && (
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="truncate">
                    {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReportList;
