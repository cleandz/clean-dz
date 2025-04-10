
import React from 'react';
import { Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';

const AdminHeader: React.FC = () => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">{t('adminPanel')}</h1>
      <div className="flex items-center mt-2 md:mt-0">
        <Lock className="h-5 w-5 mr-2 text-primary-green" />
        <span className="text-gray-600">{t('adminOnly')}</span>
      </div>
    </div>
  );
};

export default AdminHeader;
