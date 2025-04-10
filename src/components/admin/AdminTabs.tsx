
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminTabContent from './AdminTabContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';

const AdminTabs: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="users">{t('manageUsers')}</TabsTrigger>
        <TabsTrigger value="reports">{t('manageReports')}</TabsTrigger>
        <TabsTrigger value="analytics">{t('analytics')}</TabsTrigger>
      </TabsList>
      
      <AdminTabContent value="users" title={t('manageUsers')}>
        {/* User management interface would go here */}
        <p>User management functionality will be implemented here.</p>
      </AdminTabContent>
      
      <AdminTabContent value="reports" title={t('manageReports')}>
        {/* Report management interface would go here */}
        <p>Report management functionality will be implemented here.</p>
      </AdminTabContent>
      
      <AdminTabContent value="analytics" title={t('analytics')}>
        {/* Analytics interface would go here */}
        <p>Analytics functionality will be implemented here.</p>
      </AdminTabContent>
    </Tabs>
  );
};

export default AdminTabs;
