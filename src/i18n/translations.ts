
import { useLanguage } from '@/contexts/LanguageContext';

type TranslationsType = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: TranslationsType = {
  en: {
    // Navigation
    home: 'Home',
    wasteTracking: 'Waste Tracking',
    reportIssues: 'Report Issues',
    collectionPoints: 'Collection Points',
    rewards: 'Rewards',
    profile: 'Profile',
    admin: 'Admin',
    adminDashboard: 'Admin Dashboard',
    adminReports: 'Manage Reports',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Auth
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    fullNamePlaceholder: 'Enter your full name',
    authentication: 'Authentication',
    authDescription: 'Sign in to access your account or register for a new one',
    loginRequired: 'You need to be logged in',
    notLoggedIn: 'You are not logged in',
    
    // Reports
    report: 'Report',
    reports: 'Reports',
    yourReports: 'Your Reports',
    submitNewReport: 'Submit New Report',
    provideDetails: 'Provide details about the waste issue',
    wasteType: 'Waste Type',
    selectWasteType: 'Select waste type',
    organic: 'Organic',
    plastic: 'Plastic',
    glass: 'Glass',
    metal: 'Metal',
    description: 'Description',
    reportDetails: 'Provide details about the issue',
    location: 'Location',
    image: 'Image',
    uploadImage: 'Upload Image',
    uploading: 'Uploading...',
    submitting: 'Submitting...',
    submitReport: 'Submit Report',
    success: 'Success',
    error: 'Error',
    reportSubmitted: 'Your report has been submitted successfully',
    errorSubmittingReport: 'Error submitting report',
    errorUploadingImage: 'Error uploading image',
    uploadingImage: 'Uploading image...',
    imageRequired: 'Image is required',
    noReportsYet: 'No reports yet',
    createYourFirstReport: 'Create your first report to see it here',
    submittedOn: 'Submitted on',
    status: 'Status',
    new: 'New',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    reportedWaste: 'Reported Waste',
    
    // Location
    useCurrentLocation: 'Use Current Location',
    detectingLocation: 'Detecting location...',
    locationDetected: 'Location detected',
    locationUpdated: 'Location has been updated',
    locationReset: 'Location reset',
    locationResetDescription: 'Your location has been cleared',
    locationError: 'Error getting location',
    geolocationNotSupported: 'Geolocation is not supported by your browser',
    pleaseTryAgain: 'Please try again',
    notSupported: 'Not supported',
    
    // Rewards
    points: 'Points',
    yourPoints: 'Your Points',
    redeem: 'Redeem',
    notEnoughPoints: 'Not enough points',
    rewardRedeemed: 'Reward redeemed successfully',
    errorRedeemingReward: 'Error redeeming reward',
    errorFetchingRewards: 'Error fetching rewards',
    errorFetchingPoints: 'Error fetching points',
    noRewardsAvailable: 'No rewards available',
    
    // General
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    update: 'Update',
    confirm: 'Confirm',
    goBack: 'Go Back',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    wasteTracking: 'تتبع النفايات',
    reportIssues: 'الإبلاغ عن المشاكل',
    collectionPoints: 'نقاط التجميع',
    rewards: 'المكافآت',
    profile: 'الملف الشخصي',
    admin: 'الإدارة',
    adminDashboard: 'لوحة تحكم الإدارة',
    adminReports: 'إدارة البلاغات',
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    logout: 'تسجيل الخروج',
    
    // Auth
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    fullName: 'الاسم الكامل',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    passwordPlaceholder: 'أدخل كلمة المرور',
    fullNamePlaceholder: 'أدخل اسمك الكامل',
    authentication: 'المصادقة',
    authDescription: 'قم بتسجيل الدخول للوصول إلى حسابك أو سجل حسابًا جديدًا',
    loginRequired: 'يجب تسجيل الدخول',
    notLoggedIn: 'أنت غير مسجل الدخول',
    
    // Reports
    report: 'بلاغ',
    reports: 'البلاغات',
    yourReports: 'بلاغاتك',
    submitNewReport: 'تقديم بلاغ جديد',
    provideDetails: 'قدم تفاصيل عن مشكلة النفايات',
    wasteType: 'نوع النفايات',
    selectWasteType: 'اختر نوع النفايات',
    organic: 'عضوية',
    plastic: 'بلاستيك',
    glass: 'زجاج',
    metal: 'معدن',
    description: 'الوصف',
    reportDetails: 'قدم تفاصيل عن المشكلة',
    location: 'الموقع',
    image: 'الصورة',
    uploadImage: 'رفع صورة',
    uploading: 'جاري الرفع...',
    submitting: 'جاري الإرسال...',
    submitReport: 'إرسال البلاغ',
    success: 'نجاح',
    error: 'خطأ',
    reportSubmitted: 'تم إرسال بلاغك بنجاح',
    errorSubmittingReport: 'خطأ في إرسال البلاغ',
    errorUploadingImage: 'خطأ في رفع الصورة',
    uploadingImage: 'جاري رفع الصورة...',
    imageRequired: 'الصورة مطلوبة',
    noReportsYet: 'لا توجد بلاغات حتى الآن',
    createYourFirstReport: 'قم بإنشاء أول بلاغ لتراه هنا',
    submittedOn: 'تم التقديم في',
    status: 'الحالة',
    new: 'جديد',
    in_progress: 'قيد المعالجة',
    resolved: 'تم الحل',
    reportedWaste: 'النفايات المبلغ عنها',
    
    // Location
    useCurrentLocation: 'استخدم الموقع الحالي',
    detectingLocation: 'جاري تحديد الموقع...',
    locationDetected: 'تم تحديد الموقع',
    locationUpdated: 'تم تحديث الموقع',
    locationReset: 'تم إعادة تعيين الموقع',
    locationResetDescription: 'تم مسح موقعك',
    locationError: 'خطأ في الحصول على الموقع',
    geolocationNotSupported: 'تحديد الموقع الجغرافي غير مدعوم من متصفحك',
    pleaseTryAgain: 'يرجى المحاولة مرة أخرى',
    notSupported: 'غير مدعوم',
    
    // Rewards
    points: 'نقاط',
    yourPoints: 'نقاطك',
    redeem: 'استبدال',
    notEnoughPoints: 'نقاط غير كافية',
    rewardRedeemed: 'تم استبدال المكافأة بنجاح',
    errorRedeemingReward: 'خطأ في استبدال المكافأة',
    errorFetchingRewards: 'خطأ في جلب المكافآت',
    errorFetchingPoints: 'خطأ في جلب النقاط',
    noRewardsAvailable: 'لا توجد مكافآت متاحة',
    
    // General
    loading: 'جاري التحميل...',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    update: 'تحديث',
    confirm: 'تأكيد',
    goBack: 'رجوع',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    wasteTracking: 'Suivi des déchets',
    reportIssues: 'Signaler des problèmes',
    collectionPoints: 'Points de collecte',
    rewards: 'Récompenses',
    profile: 'Profil',
    admin: 'Admin',
    adminDashboard: 'Tableau de bord admin',
    adminReports: 'Gérer les rapports',
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    
    // Auth
    email: 'Email',
    password: 'Mot de passe',
    fullName: 'Nom complet',
    emailPlaceholder: 'Entrez votre email',
    passwordPlaceholder: 'Entrez votre mot de passe',
    fullNamePlaceholder: 'Entrez votre nom complet',
    authentication: 'Authentification',
    authDescription: 'Connectez-vous pour accéder à votre compte ou inscrivez-vous',
    loginRequired: 'Vous devez être connecté',
    notLoggedIn: 'Vous n\'êtes pas connecté',
    
    // Reports
    report: 'Rapport',
    reports: 'Rapports',
    yourReports: 'Vos rapports',
    submitNewReport: 'Soumettre un nouveau rapport',
    provideDetails: 'Fournir des détails sur le problème de déchets',
    wasteType: 'Type de déchets',
    selectWasteType: 'Sélectionner le type de déchets',
    organic: 'Organique',
    plastic: 'Plastique',
    glass: 'Verre',
    metal: 'Métal',
    description: 'Description',
    reportDetails: 'Fournir des détails sur le problème',
    location: 'Emplacement',
    image: 'Image',
    uploadImage: 'Télécharger une image',
    uploading: 'Téléchargement en cours...',
    submitting: 'Soumission en cours...',
    submitReport: 'Soumettre le rapport',
    success: 'Succès',
    error: 'Erreur',
    reportSubmitted: 'Votre rapport a été soumis avec succès',
    errorSubmittingReport: 'Erreur lors de la soumission du rapport',
    errorUploadingImage: 'Erreur lors du téléchargement de l\'image',
    uploadingImage: 'Téléchargement de l\'image en cours...',
    imageRequired: 'L\'image est requise',
    noReportsYet: 'Pas encore de rapports',
    createYourFirstReport: 'Créez votre premier rapport pour le voir ici',
    submittedOn: 'Soumis le',
    status: 'Statut',
    new: 'Nouveau',
    in_progress: 'En cours',
    resolved: 'Résolu',
    reportedWaste: 'Déchets signalés',
    
    // Location
    useCurrentLocation: 'Utiliser la position actuelle',
    detectingLocation: 'Détection de l\'emplacement...',
    locationDetected: 'Emplacement détecté',
    locationUpdated: 'L\'emplacement a été mis à jour',
    locationReset: 'Réinitialisation de l\'emplacement',
    locationResetDescription: 'Votre emplacement a été effacé',
    locationError: 'Erreur lors de l\'obtention de l\'emplacement',
    geolocationNotSupported: 'La géolocalisation n\'est pas prise en charge par votre navigateur',
    pleaseTryAgain: 'Veuillez réessayer',
    notSupported: 'Non pris en charge',
    
    // Rewards
    points: 'Points',
    yourPoints: 'Vos points',
    redeem: 'Échanger',
    notEnoughPoints: 'Pas assez de points',
    rewardRedeemed: 'Récompense échangée avec succès',
    errorRedeemingReward: 'Erreur lors de l\'échange de la récompense',
    errorFetchingRewards: 'Erreur lors de la récupération des récompenses',
    errorFetchingPoints: 'Erreur lors de la récupération des points',
    noRewardsAvailable: 'Aucune récompense disponible',
    
    // General
    loading: 'Chargement...',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    update: 'Mettre à jour',
    confirm: 'Confirmer',
    goBack: 'Retour',
  }
};

// Helper function to format numbers according to locale
export const formatNumber = (number: number, locale: string = 'en'): string => {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : locale === 'fr' ? 'fr-FR' : 'en-US').format(number);
};

export const useTranslation = (language: string) => {
  return {
    t: (key: string) => {
      if (!translations[language] || !translations[language][key]) {
        // Fall back to English if translation doesn't exist
        return translations.en[key] || key;
      }
      return translations[language][key];
    },
    formatNumber: (number: number) => formatNumber(number, language)
  };
};
