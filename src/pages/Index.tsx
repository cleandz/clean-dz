
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useStatistics } from '@/hooks/use-statistics';
import StatCard from '@/components/home/StatCard';
import { Recycle, Trash2, Map, AlertTriangle } from 'lucide-react';

const Index = () => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);
  const { statistics, isLoading } = useStatistics();

  const stats = [
    { title: t('totalWaste'), value: statistics.totalWaste, icon: <Trash2 />, color: 'blue' },
    { title: t('totalReports'), value: statistics.totalReports, icon: <AlertTriangle />, color: 'amber' },
    { title: t('collectionPoints'), value: statistics.activeCollectionPoints, icon: <Map />, color: 'green' },
    { title: t('totalUsers'), value: statistics.totalUsers, icon: <Recycle />, color: 'purple' },
  ];

  return (
    <div className={`container mx-auto ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            isLoading={isLoading}
          />
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('getStarted')}</CardTitle>
            <CardDescription>{t('startDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/waste-tracking">
              <Button variant="outline">{t('trackWaste')}</Button>
            </Link>
            <Link to="/report-issues">
              <Button>{t('reportIssue')}</Button>
            </Link>
          </CardContent>
          <CardFooter>
            {t('footerText')}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
