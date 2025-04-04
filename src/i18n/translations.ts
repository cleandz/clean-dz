
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
    
    // وصف التطبيق
    appDescription: "تطبيق لإدارة النفايات المنزلية، يساعد في تحسين البيئة وتثمين النفايات",
    
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
    
    // App description
    appDescription: "An application for household waste management, helping to improve the environment and value waste",
    
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
    
    // Description de l'application
    appDescription: "Une application pour la gestion des déchets ménagers, aidant à améliorer l'environnement et à valoriser les déchets",
    
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
