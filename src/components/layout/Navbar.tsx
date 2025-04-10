
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, User, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { useAuth } from '@/contexts/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, setLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const { t } = useTranslation(language);

  // Additional translations for auth-related items
  const authTranslations = {
    ar: {
      profile: 'الملف الشخصي',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
    },
    en: {
      profile: 'Profile',
      login: 'Login',
      logout: 'Logout',
    },
    fr: {
      profile: 'Profil',
      login: 'Se connecter',
      logout: 'Se déconnecter',
    }
  };

  const authT = authTranslations[language];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className={`bg-primary-green shadow-md w-full ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">{t('siteTitle')}</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* User menu for authenticated users */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={language === 'ar' ? 'end' : 'start'} className="bg-white z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">{authT.profile}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    {authT.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-white">
                  <LogIn className="h-4 w-4 mr-2" />
                  {authT.login}
                </Button>
              </Link>
            )}

            {/* Language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={language === 'ar' ? 'end' : 'start'} className="bg-white z-50">
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
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white" onClick={toggleMenu}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-green ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <Link to="/" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">{t('home')}</Link>
            <Link to="/waste-tracking" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">{t('wasteTracking')}</Link>
            <Link to="/report-issues" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">{t('reportIssues')}</Link>
            <Link to="/collection-points" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">{t('collectionPoints')}</Link>
            <Link to="/rewards" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">{t('rewards')}</Link>
            
            {/* Mobile login link if not authenticated */}
            {!user && (
              <Link to="/auth" className="text-white hover:bg-primary-green-dark block px-3 py-2 rounded-md text-base font-medium">
                {authT.login}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
