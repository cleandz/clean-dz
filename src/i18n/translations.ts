
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

    // المصادقة
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    profile: "الملف الشخصي",
    authentication: "المصادقة",
    
    // الإبلاغ عن المشكلات
    reportProblem: "الإبلاغ عن مشكلة",
    issueType: "نوع المشكلة",
    issueLocation: "موقع المشكلة",
    issueDescription: "وصف المشكلة",
    uploadImage: "رفع صورة",
    submit: "إرسال",
    myReports: "بلاغاتي",
    pending: "قيد الانتظار",
    inProgress: "قيد المعالجة",
    resolved: "تم الحل",
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

    // Authentication
    login: "Login",
    register: "Register",
    logout: "Logout",
    profile: "Profile",
    authentication: "Authentication",
    
    // Report Issues
    reportProblem: "Report Problem",
    issueType: "Issue Type",
    issueLocation: "Issue Location",
    issueDescription: "Issue Description",
    uploadImage: "Upload Image",
    submit: "Submit",
    myReports: "My Reports",
    pending: "Pending",
    inProgress: "In Progress",
    resolved: "Resolved",
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

    // Authentification
    login: "Se connecter",
    register: "S'inscrire",
    logout: "Se déconnecter",
    profile: "Profil",
    authentication: "Authentification",
    
    // Signaler des problèmes
    reportProblem: "Signaler un Problème",
    issueType: "Type de Problème",
    issueLocation: "Emplacement du Problème",
    issueDescription: "Description du Problème",
    uploadImage: "Télécharger une Image",
    submit: "Soumettre",
    myReports: "Mes Signalements",
    pending: "En Attente",
    inProgress: "En Cours",
    resolved: "Résolu",
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
