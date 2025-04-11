
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import ReportForm from '@/components/reports/ReportForm';
import ReportList from '@/components/reports/ReportList';
import { useReports } from '@/hooks/useReports';

const ReportIssues = () => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);
  const { reports, isLoading, fetchReports } = useReports();
  
  return (
    <div className={`container mx-auto ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t('reportIssues')}</h1>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('submitNewReport')}</CardTitle>
          <CardDescription>{t('provideDetails')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ReportForm onSuccess={fetchReports} />
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{t('yourReports')}</h2>
        <ReportList reports={reports} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ReportIssues;
