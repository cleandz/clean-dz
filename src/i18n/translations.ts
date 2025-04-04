
export const translations = {
  ar: {
    // الصفحة الرئيسية
    home: "الرئيسية",
    wasteTracking: "تتبع النفايات",
    reportIssues: "الإبلاغ عن المشكلات",
    collectionPoints: "نقاط الجمع",
    rewards: "المكافآت",
    
    // العنوان الرئيسي
    siteTitle: "وايست وايز عربيا",
    
    // تذييل الصفحة
    usefulLinks: "روابط مفيدة",
    contactUs: "تواصل معنا",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    allRightsReserved: "جميع الحقوق محفوظة",
    
    // قائمة اللغات
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    french: "الفرنسية",
  },
  
  en: {
    // Home page
    home: "Home",
    wasteTracking: "Waste Tracking",
    reportIssues: "Report Issues",
    collectionPoints: "Collection Points",
    rewards: "Rewards",
    
    // Main title
    siteTitle: "WasteWise Arabia",
    
    // Footer
    usefulLinks: "Useful Links",
    contactUs: "Contact Us",
    email: "Email",
    phone: "Phone",
    allRightsReserved: "All Rights Reserved",
    
    // Language menu
    selectLanguage: "Select Language",
    arabic: "Arabic",
    english: "English",
    french: "French",
  },
  
  fr: {
    // Page d'accueil
    home: "Accueil",
    wasteTracking: "Suivi des Déchets",
    reportIssues: "Signaler des Problèmes",
    collectionPoints: "Points de Collecte",
    rewards: "Récompenses",
    
    // Titre principal
    siteTitle: "WasteWise Arabie",
    
    // Pied de page
    usefulLinks: "Liens Utiles",
    contactUs: "Contactez-nous",
    email: "E-mail",
    phone: "Téléphone",
    allRightsReserved: "Tous Droits Réservés",
    
    // Menu de langue
    selectLanguage: "Sélectionner la Langue",
    arabic: "Arabe",
    english: "Anglais",
    french: "Français",
  }
};

// هوك لاستخدام الترجمات
export const useTranslation = (language: 'ar' | 'en' | 'fr') => {
  return {
    t: (key: keyof typeof translations.ar) => {
      return translations[language][key] || key;
    }
  };
};
