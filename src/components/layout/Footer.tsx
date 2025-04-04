
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';

const Footer = () => {
  const { language, dir, formatNumber } = useLanguage();
  const { t } = useTranslation(language);
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`bg-primary-green-dark text-white ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-10 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('siteTitle')}</h3>
            <p className="text-sm">تطبيق لإدارة النفايات المنزلية، يساعد في تحسين البيئة وتثمين النفايات</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('usefulLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">{t('home')}</Link></li>
              <li><Link to="/waste-tracking" className="hover:underline">{t('wasteTracking')}</Link></li>
              <li><Link to="/report-issues" className="hover:underline">{t('reportIssues')}</Link></li>
              <li><Link to="/collection-points" className="hover:underline">{t('collectionPoints')}</Link></li>
              <li><Link to="/rewards" className="hover:underline">{t('rewards')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactUs')}</h3>
            <p className="text-sm mb-2">{t('email')}: info@wastewise.com</p>
            <p className="text-sm mb-2">{t('phone')}: +{formatNumber(123456789)}</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-green text-center">
          <p className="text-sm">© {currentYear} {t('siteTitle')}. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
