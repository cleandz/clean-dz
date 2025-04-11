
import { useState, useEffect } from 'react';

type Language = 'ar' | 'fr' | 'en';

const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'ar'; // Default to Arabic
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update document dir attribute for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    // Could also update html lang attribute if needed
    document.documentElement.lang = language;
  }, [language]);

  return {
    language,
    setLanguage,
    isRTL: language === 'ar',
  };
};

export default useLanguage;
