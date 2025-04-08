
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileBarChart2, Map, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';

const BottomNavigation = () => {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-between items-center px-4 py-2">
        <Link 
          to="/" 
          className={`flex flex-col items-center px-3 py-2 ${isActive('/') ? 'text-primary-green' : 'text-gray-600 dark:text-gray-400'}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">{t('home')}</span>
        </Link>
        
        <Link 
          to="/waste-tracking" 
          className={`flex flex-col items-center px-3 py-2 ${isActive('/waste-tracking') ? 'text-primary-green' : 'text-gray-600 dark:text-gray-400'}`}
        >
          <FileBarChart2 className="h-6 w-6" />
          <span className="text-xs mt-1">{t('wasteTracking')}</span>
        </Link>
        
        <Link 
          to="/collection-points" 
          className={`flex flex-col items-center px-3 py-2 ${isActive('/collection-points') ? 'text-primary-green' : 'text-gray-600 dark:text-gray-400'}`}
        >
          <Map className="h-6 w-6" />
          <span className="text-xs mt-1">{t('map')}</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center px-3 py-2 ${isActive('/profile') ? 'text-primary-green' : 'text-gray-600 dark:text-gray-400'}`}
        >
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">{t('settings')}</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
