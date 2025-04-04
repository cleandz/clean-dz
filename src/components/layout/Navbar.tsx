
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(language);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
  };

  return (
    <nav className={`bg-primary-green shadow-md w-full ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">{t('siteTitle')}</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={language === 'ar' ? 'end' : 'start'}>
                <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                  {t('arabic')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  {t('english')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                  {t('french')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="hidden md:block">
            <div className={`flex items-baseline ${language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
              <Link to="/" className="text-white hover:bg-primary-green-dark px-3 py-2 rounded-md text-sm font-medium">{t('home')}</Link>
              <Link to="/waste-tracking" className="text-white hover:bg-primary-green-dark px-3 py-2 rounded-md text-sm font-medium">{t('wasteTracking')}</Link>
              <Link to="/report-issues" className="text-white hover:bg-primary-green-dark px-3 py-2 rounded-md text-sm font-medium">{t('reportIssues')}</Link>
              <Link to="/collection-points" className="text-white hover:bg-primary-green-dark px-3 py-2 rounded-md text-sm font-medium">{t('collectionPoints')}</Link>
              <Link to="/rewards" className="text-white hover:bg-primary-green-dark px-3 py-2 rounded-md text-sm font-medium">{t('rewards')}</Link>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white mr-2">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={language === 'ar' ? 'end' : 'start'}>
                <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                  {t('arabic')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  {t('english')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                  {t('french')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" className="text-white" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* القائمة المنسدلة للموبايل */}
      {isOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-green ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <Link to="/" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">{t('home')}</Link>
            <Link to="/waste-tracking" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">{t('wasteTracking')}</Link>
            <Link to="/report-issues" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">{t('reportIssues')}</Link>
            <Link to="/collection-points" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">{t('collectionPoints')}</Link>
            <Link to="/rewards" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">{t('rewards')}</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
