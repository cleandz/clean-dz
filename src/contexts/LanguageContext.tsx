
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// تعريف اللغات المدعومة
export type SupportedLanguage = 'ar' | 'en' | 'fr';

// تعريف نوع سياق اللغة
interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  dir: 'rtl' | 'ltr';
  formatNumber: (num: number) => string;
}

// إنشاء سياق اللغة
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// معلومات عن كل لغة
const languageInfo = {
  ar: {
    dir: 'rtl' as const,
    format: (num: number) => num.toLocaleString('ar-SA')
  },
  en: {
    dir: 'ltr' as const,
    format: (num: number) => num.toLocaleString('en-US')
  },
  fr: {
    dir: 'ltr' as const,
    format: (num: number) => num.toLocaleString('fr-FR')
  }
};

// استخراج اللغة المفضلة من المتصفح
const getBrowserLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'ar') return 'ar';
  if (browserLang === 'fr') return 'fr';
  return 'en'; // اللغة الافتراضية
};

// مزود سياق اللغة
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // تحديد اللغة الأولية من التخزين المحلي أو المتصفح
  const storedLanguage = localStorage.getItem('preferredLanguage') as SupportedLanguage;
  const initialLanguage = storedLanguage || getBrowserLanguage();
  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage);

  // تعيين اتجاه الصفحة عند تحميل المكون
  useEffect(() => {
    document.documentElement.dir = languageInfo[language].dir;
    document.documentElement.lang = language;
    localStorage.setItem('preferredLanguage', language);
    
    // تطبيق الأنماط على المستند كاملًا
    const body = document.body;
    if (language === 'ar') {
      body.classList.add('font-tajawal');
    } else {
      body.classList.remove('font-tajawal');
    }
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    document.documentElement.dir = languageInfo[lang].dir;
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
  };

  const formatNumber = (num: number) => {
    return languageInfo[language].format(num);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        dir: languageInfo[language].dir, 
        formatNumber 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// هوك استخدام سياق اللغة
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
