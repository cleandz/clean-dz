
import React, { createContext, useContext, ReactNode } from 'react';
import useLanguage from '@/hooks/use-language';

// Translations organized by key and language
export const translations = {
  // Common
  app_name: {
    ar: 'وادي ليلي بروبر',
    fr: 'Ouedlili Propre',
    en: 'Ouedlili Clean',
  },
  
  // Navbar
  home: {
    ar: 'الرئيسية',
    fr: 'Accueil',
    en: 'Home',
  },
  waste_tracking: {
    ar: 'تتبع النفايات',
    fr: 'Suivi des déchets',
    en: 'Waste Tracking',
  },
  report_issues: {
    ar: 'الإبلاغ عن المشكلات',
    fr: 'Signaler des problèmes',
    en: 'Report Issues',
  },
  collection_points: {
    ar: 'نقاط الجمع',
    fr: 'Points de collecte',
    en: 'Collection Points',
  },
  collection_schedule: {
    ar: 'مواقيت الجمع',
    fr: 'Horaires de collecte',
    en: 'Collection Schedule',
  },
  rewards: {
    ar: 'المكافآت',
    fr: 'Récompenses',
    en: 'Rewards',
  },
  workers: {
    ar: 'فضاء العمال',
    fr: 'Espace travailleurs',
    en: 'Workers Space',
  },
  
  // Add more translations as needed
};

type TranslationKey = keyof typeof translations;
type Language = 'ar' | 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { language, setLanguage, isRTL } = useLanguage();
  
  // Translation function
  const t = (key: TranslationKey): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translations[key][language] || translations[key].ar || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
