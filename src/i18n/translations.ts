import { formatNumber as formatNum } from '@/contexts/LanguageContext';

export type Language = 'ar' | 'en' | 'fr';

export type TranslationKey = 
  | 'home'
  | 'wasteTracking'
  | 'reportIssues'
  | 'collectionPoints'
  | 'rewards'
  | 'profile'
  | 'login'
  | 'logout'
  | 'register'
  | 'email'
  | 'password'
  | 'fullName'
  | 'city'
  | 'region'
  | 'submit'
  | 'cancel'
  | 'delete'
  | 'edit'
  | 'save'
  | 'loading'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'confirm'
  | 'back'
  | 'next'
  | 'previous'
  | 'totalWaste'
  | 'totalReports'
  | 'collectionPoints'
  | 'totalUsers'
  | 'getStarted'
  | 'startDescription'
  | 'trackWaste'
  | 'reportIssue'
  | 'footerText'
  | 'loginRequired'
  | 'imageRequired'
  | 'reportSubmitted'
  | 'errorSubmittingReport'
  | 'submitNewReport'
  | 'provideDetails'
  | 'wasteType'
  | 'description'
  | 'reportDetails'
  | 'uploading'
  | 'uploadImage'
  | 'locationDetected'
  | 'submitting'
  | 'submitReport'
  | 'yourReports'
  | 'noReportsYet'
  | 'report'
  | 'submittedOn'
  | 'status'
  | 'errorFetchingReports'
  | 'locationError'
  | 'geolocationNotSupported'
  | 'errorUploadingImage'
  | 'errorFetchingRewards'
  | 'errorFetchingPoints'
  | 'notEnoughPoints'
  | 'rewardRedeemed'
  | 'errorRedeemingReward'
  | 'yourPoints'
  | 'noRewardsAvailable'
  | 'errorFetchingWasteEntries'
  | 'selectReport'
  | 'wasteEntrySubmitted'
  | 'errorSubmittingWasteEntry'
  | 'addWasteEntry'
  | 'enterWasteDetails'
  | 'weightInKg'
  | 'selectExistingReport'
  | 'addEntry'
  | 'wasteEntries'
  | 'yourWasteEntries'
  | 'noWasteEntries'
  | 'verified'
  | 'profileSettings'
  | 'updateYourProfile'
  | 'member'
  | 'guest'
  | 'yourFullName'
  | 'yourCity'
  | 'yourRegion'
  | 'updating'
  | 'updateProfile'
  | 'refreshProfile'
  | 'organic'
  | 'plastic'
  | 'glass'
  | 'metal'
  | 'new'
  | 'in_progress'
  | 'resolved'
  | 'points'
  | 'redeem'
  // صفحة الإدارة الجديدة
  | 'manageReports'
  | 'filterByStatus'
  | 'allReports'
  | 'inProgress'
  | 'refresh'
  | 'image'
  | 'location'
  | 'date'
  | 'actions'
  | 'noLocation'
  | 'markAsNew'
  | 'markAsInProgress'
  | 'markAsResolved'
  | 'deleteReport'
  | 'noReportsFound'
  | 'noReportsDescription'
  | 'confirmDelete'
  | 'deleteReportConfirmation'
  | 'reportStatusUpdated'
  | 'errorUpdatingReport'
  | 'reportDeleted'
  | 'errorDeletingReport'
  | 'accessDenied'
  | 'adminAccessRequired'
  // مكون LocationPicker
  | 'detectingLocation'
  | 'useCurrentLocation'
  | 'selectWasteType';

const translations: Record<Language, Record<TranslationKey, string>> = {
  ar: {
    home: 'الرئيسية',
    wasteTracking: 'تتبع النفايات',
    reportIssues: 'الإبلاغ عن مشكلات',
    collectionPoints: 'نقاط التجميع',
    rewards: 'المكافآت',
    profile: 'الملف الشخصي',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    register: 'إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    fullName: 'الاسم الكامل',
    city: 'المدينة',
    region: 'المنطقة',
    submit: 'إرسال',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    save: 'حفظ',
    loading: 'جار التحميل...',
    error: 'خطأ',
    success: 'نجاح',
    warning: 'تحذير',
    info: 'معلومات',
    confirm: 'تأكيد',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    totalWaste: 'إجمالي النفايات',
    totalReports: 'إجمالي البلاغات',
    totalUsers: 'إجمالي المستخدمين',
    getStarted: 'ابدأ الآن',
    startDescription: 'اختر من الخيارات أدناه للمساهمة في الحفاظ على البيئة',
    trackWaste: 'تتبع النفايات',
    reportIssue: 'الإبلاغ عن مشكلة',
    footerText: 'معاً لبيئة أنظف وأكثر استدامة',
    loginRequired: 'يرجى تسجيل الدخول أولاً',
    imageRequired: 'يرجى تحميل صورة',
    reportSubmitted: 'تم إرسال البلاغ بنجاح',
    errorSubmittingReport: 'حدث خطأ أثناء إرسال البلاغ',
    submitNewReport: 'إرسال بلاغ جديد',
    provideDetails: 'يرجى تقديم التفاصيل حول المشكلة',
    wasteType: 'نوع النفايات',
    description: 'الوصف',
    reportDetails: 'تفاصيل المشكلة...',
    uploading: 'جارٍ التحميل...',
    uploadImage: 'تحميل صورة',
    locationDetected: 'تم تحديد الموقع',
    submitting: 'جارٍ الإرسال...',
    submitReport: 'إرسال البلاغ',
    yourReports: 'بلاغاتك',
    noReportsYet: 'لا توجد بلاغات حتى الآن',
    report: 'بلاغ',
    submittedOn: 'تم الإرسال في',
    status: 'الحالة',
    errorFetchingReports: 'حدث خطأ أثناء جلب البلاغات',
    locationError: 'خطأ في تحديد الموقع',
    geolocationNotSupported: 'متصفحك لا يدعم تحديد الموقع الجغرافي',
    errorUploadingImage: 'حدث خطأ أثناء تحميل الصورة',
    errorFetchingRewards: 'حدث خطأ أثناء جلب المكافآت',
    errorFetchingPoints: 'حدث خطأ أثناء جلب النقاط',
    notEnoughPoints: 'ليس لديك نقاط كافية',
    rewardRedeemed: 'تم استبدال المكافأة بنجاح',
    errorRedeemingReward: 'حدث خطأ أثناء استبدال المكافأة',
    yourPoints: 'نقاطك',
    noRewardsAvailable: 'لا توجد مكافآت متاحة حالياً',
    errorFetchingWasteEntries: 'حدث خطأ أثناء جلب سجلات النفايات',
    selectReport: 'اختر البلاغ',
    wasteEntrySubmitted: 'تم إضافة سجل النفايات بنجاح',
    errorSubmittingWasteEntry: 'حدث خطأ أثناء إضافة سجل النفايات',
    addWasteEntry: 'إضافة سجل نفايات',
    enterWasteDetails: 'أدخل تفاصيل النفايات',
    weightInKg: 'الوزن (كجم)',
    selectExistingReport: 'اختر من البلاغات الحالية',
    addEntry: 'إضافة سجل',
    wasteEntries: 'سجلات النفايات',
    yourWasteEntries: 'سجلات النفايات الخاصة بك',
    noWasteEntries: 'لا توجد سجلات نفايات حتى الآن',
    verified: 'تم التحقق',
    profileSettings: 'إعدادات الملف الشخصي',
    updateYourProfile: 'تحديث معلومات ملفك الشخصي',
    member: 'عضو',
    guest: 'زائر',
    yourFullName: 'اسمك الكامل',
    yourCity: 'مدينتك',
    yourRegion: 'منطقتك',
    updating: 'جارٍ التحديث...',
    updateProfile: 'تحديث الملف الشخصي',
    refreshProfile: 'تحديث البيانات',
    organic: 'عضوية',
    plastic: 'بلاستيك',
    glass: 'زجاج',
    metal: 'معدن',
    new: 'جديد',
    in_progress: 'قيد المعالجة',
    resolved: 'تم الحل',
    points: 'نقطة',
    redeem: 'استبدال',
    // الترجمات الجديدة لصفحة الإدارة
    manageReports: 'إدارة البلاغات',
    filterByStatus: 'تصفية حسب الحالة',
    allReports: 'جميع البلاغات',
    inProgress: 'قيد المعالجة',
    refresh: 'تحديث',
    image: 'الصورة',
    location: 'الموقع',
    date: 'التاريخ',
    actions: 'الإجراءات',
    noLocation: 'لا يوجد موقع',
    markAsNew: 'تحديد كجديد',
    markAsInProgress: 'تحديد قيد المعالجة',
    markAsResolved: 'تحديد كمحلول',
    deleteReport: 'حذف البلاغ',
    noReportsFound: 'لا توجد بلاغات',
    noReportsDescription: 'لم يتم العثور على أي بلاغات تطابق معايير البحث الخاصة بك',
    confirmDelete: 'تأكيد الحذف',
    deleteReportConfirmation: 'هل أنت متأكد من رغبتك في حذف هذا البلاغ؟ هذا الإجراء لا يمكن التراجع عنه.',
    reportStatusUpdated: 'تم تحديث حالة البلاغ بنجاح',
    errorUpdatingReport: 'حدث خطأ أثناء تحديث البلاغ',
    reportDeleted: 'تم حذف البلاغ بنجاح',
    errorDeletingReport: 'حدث خطأ أثناء حذف البلاغ',
    accessDenied: 'تم رفض الوصول',
    adminAccessRequired: 'يجب أن تكون مسؤولاً للوصول إلى هذه الصفحة',
    // مكون اختيار الموقع
    detectingLocation: 'جارٍ تحديد الموقع...',
    useCurrentLocation: 'استخدام الموقع الحالي',
    selectWasteType: 'اختر نوع النفايات',
  },
  en: {
    home: 'Home',
    wasteTracking: 'Waste Tracking',
    reportIssues: 'Report Issues',
    collectionPoints: 'Collection Points',
    rewards: 'Rewards',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    city: 'City',
    region: 'Region',
    submit: 'Submit',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    totalWaste: 'Total Waste',
    totalReports: 'Total Reports',
    totalUsers: 'Total Users',
    getStarted: 'Get Started',
    startDescription: 'Choose from the options below to contribute to a cleaner environment',
    trackWaste: 'Track Waste',
    reportIssue: 'Report Issue',
    footerText: 'Together for a cleaner, more sustainable environment',
    loginRequired: 'Please login first',
    imageRequired: 'Please upload an image',
    reportSubmitted: 'Report submitted successfully',
    errorSubmittingReport: 'Error submitting report',
    submitNewReport: 'Submit New Report',
    provideDetails: 'Please provide details about the issue',
    wasteType: 'Waste Type',
    description: 'Description',
    reportDetails: 'Issue details...',
    uploading: 'Uploading...',
    uploadImage: 'Upload Image',
    locationDetected: 'Location detected',
    submitting: 'Submitting...',
    submitReport: 'Submit Report',
    yourReports: 'Your Reports',
    noReportsYet: 'No reports yet',
    report: 'Report',
    submittedOn: 'Submitted on',
    status: 'Status',
    errorFetchingReports: 'Error fetching reports',
    locationError: 'Error getting location',
    geolocationNotSupported: 'Geolocation is not supported by your browser',
    errorUploadingImage: 'Error uploading image',
    errorFetchingRewards: 'Error fetching rewards',
    errorFetchingPoints: 'Error fetching points',
    notEnoughPoints: 'Not enough points',
    rewardRedeemed: 'Reward redeemed successfully',
    errorRedeemingReward: 'Error redeeming reward',
    yourPoints: 'Your Points',
    noRewardsAvailable: 'No rewards available at the moment',
    errorFetchingWasteEntries: 'Error fetching waste entries',
    selectReport: 'Select report',
    wasteEntrySubmitted: 'Waste entry submitted successfully',
    errorSubmittingWasteEntry: 'Error submitting waste entry',
    addWasteEntry: 'Add Waste Entry',
    enterWasteDetails: 'Enter waste details',
    weightInKg: 'Weight (kg)',
    selectExistingReport: 'Select from existing reports',
    addEntry: 'Add Entry',
    wasteEntries: 'Waste Entries',
    yourWasteEntries: 'Your waste entries',
    noWasteEntries: 'No waste entries yet',
    verified: 'Verified',
    profileSettings: 'Profile Settings',
    updateYourProfile: 'Update your profile information',
    member: 'Member',
    guest: 'Guest',
    yourFullName: 'Your full name',
    yourCity: 'Your city',
    yourRegion: 'Your region',
    updating: 'Updating...',
    updateProfile: 'Update Profile',
    refreshProfile: 'Refresh Profile',
    organic: 'Organic',
    plastic: 'Plastic',
    glass: 'Glass',
    metal: 'Metal',
    new: 'New',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    points: 'points',
    redeem: 'Redeem',
    // New translations for admin page
    manageReports: 'Manage Reports',
    filterByStatus: 'Filter by Status',
    allReports: 'All Reports',
    inProgress: 'In Progress',
    refresh: 'Refresh',
    image: 'Image',
    location: 'Location',
    date: 'Date',
    actions: 'Actions',
    noLocation: 'No location',
    markAsNew: 'Mark as New',
    markAsInProgress: 'Mark as In Progress',
    markAsResolved: 'Mark as Resolved',
    deleteReport: 'Delete Report',
    noReportsFound: 'No Reports Found',
    noReportsDescription: 'No reports were found matching your search criteria',
    confirmDelete: 'Confirm Delete',
    deleteReportConfirmation: 'Are you sure you want to delete this report? This action cannot be undone.',
    reportStatusUpdated: 'Report status updated successfully',
    errorUpdatingReport: 'Error updating report',
    reportDeleted: 'Report deleted successfully',
    errorDeletingReport: 'Error deleting report',
    accessDenied: 'Access Denied',
    adminAccessRequired: 'You must be an admin to access this page',
    // Location picker component
    detectingLocation: 'Detecting location...',
    useCurrentLocation: 'Use Current Location',
    selectWasteType: 'Select waste type',
  },
  fr: {
    home: 'Accueil',
    wasteTracking: 'Suivi des déchets',
    reportIssues: 'Signaler des problèmes',
    collectionPoints: 'Points de collecte',
    rewards: 'Récompenses',
    profile: 'Profil',
    login: 'Connexion',
    logout: 'Déconnexion',
    register: 'S\'inscrire',
    email: 'Email',
    password: 'Mot de passe',
    fullName: 'Nom complet',
    city: 'Ville',
    region: 'Région',
    submit: 'Soumettre',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    save: 'Enregistrer',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Avertissement',
    info: 'Info',
    confirm: 'Confirmer',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    totalWaste: 'Total des déchets',
    totalReports: 'Total des rapports',
    totalUsers: 'Total des utilisateurs',
    getStarted: 'Commencer',
    startDescription: 'Choisissez parmi les options ci-dessous pour contribuer à un environnement plus propre',
    trackWaste: 'Suivre les déchets',
    reportIssue: 'Signaler un problème',
    footerText: 'Ensemble pour un environnement plus propre et durable',
    loginRequired: 'Veuillez vous connecter d\'abord',
    imageRequired: 'Veuillez télécharger une image',
    reportSubmitted: 'Rapport soumis avec succès',
    errorSubmittingReport: 'Erreur lors de la soumission du rapport',
    submitNewReport: 'Soumettre un nouveau rapport',
    provideDetails: 'Veuillez fournir des détails sur le problème',
    wasteType: 'Type de déchets',
    description: 'Description',
    reportDetails: 'Détails du problème...',
    uploading: 'Téléchargement...',
    uploadImage: 'Télécharger une image',
    locationDetected: 'Emplacement détecté',
    submitting: 'Soumission...',
    submitReport: 'Soumettre le rapport',
    yourReports: 'Vos rapports',
    noReportsYet: 'Pas encore de rapports',
    report: 'Rapport',
    submittedOn: 'Soumis le',
    status: 'Statut',
    errorFetchingReports: 'Erreur lors de la récupération des rapports',
    locationError: 'Erreur de localisation',
    geolocationNotSupported: 'La géolocalisation n\'est pas prise en charge par votre navigateur',
    errorUploadingImage: 'Erreur lors du téléchargement de l\'image',
    errorFetchingRewards: 'Erreur lors de la récupération des récompenses',
    errorFetchingPoints: 'Erreur lors de la récupération des points',
    notEnoughPoints: 'Pas assez de points',
    rewardRedeemed: 'Récompense échangée avec succès',
    errorRedeemingReward: 'Erreur lors de l\'échange de la récompense',
    yourPoints: 'Vos points',
    noRewardsAvailable: 'Aucune récompense disponible pour le moment',
    errorFetchingWasteEntries: 'Erreur lors de la récupération des entrées de déchets',
    selectReport: 'Sélectionnez un rapport',
    wasteEntrySubmitted: 'Entrée de déchets soumise avec succès',
    errorSubmittingWasteEntry: 'Erreur lors de la soumission de l\'entrée de déchets',
    addWasteEntry: 'Ajouter une entrée de déchets',
    enterWasteDetails: 'Entrez les détails des déchets',
    weightInKg: 'Poids (kg)',
    selectExistingReport: 'Sélectionnez parmi les rapports existants',
    addEntry: 'Ajouter une entrée',
    wasteEntries: 'Entrées de déchets',
    yourWasteEntries: 'Vos entrées de déchets',
    noWasteEntries: 'Pas encore d\'entrées de déchets',
    verified: 'Vérifié',
    profileSettings: 'Paramètres du profil',
    updateYourProfile: 'Mettre à jour vos informations de profil',
    member: 'Membre',
    guest: 'Invité',
    yourFullName: 'Votre nom complet',
    yourCity: 'Votre ville',
    yourRegion: 'Votre région',
    updating: 'Mise à jour...',
    updateProfile: 'Mettre à jour le profil',
    refreshProfile: 'Actualiser le profil',
    organic: 'Organique',
    plastic: 'Plastique',
    glass: 'Verre',
    metal: 'Métal',
    new: 'Nouveau',
    in_progress: 'En cours',
    resolved: 'Résolu',
    points: 'points',
    redeem: 'Échanger',
    // Nouvelles traductions pour la page d'administration
    manageReports: 'Gérer les rapports',
    filterByStatus: 'Filtrer par statut',
    allReports: 'Tous les rapports',
    inProgress: 'En cours',
    refresh: 'Actualiser',
    image: 'Image',
    location: 'Emplacement',
    date: 'Date',
    actions: 'Actions',
    noLocation: 'Pas d\'emplacement',
    markAsNew: 'Marquer comme nouveau',
    markAsInProgress: 'Marquer comme en cours',
    markAsResolved: 'Marquer comme résolu',
    deleteReport: 'Supprimer le rapport',
    noReportsFound: 'Aucun rapport trouvé',
    noReportsDescription: 'Aucun rapport n\'a été trouvé correspondant à vos critères de recherche',
    confirmDelete: 'Confirmer la suppression',
    deleteReportConfirmation: 'Êtes-vous sûr de vouloir supprimer ce rapport ? Cette action ne peut pas être annulée.',
    reportStatusUpdated: 'Statut du rapport mis à jour avec succès',
    errorUpdatingReport: 'Erreur lors de la mise à jour du rapport',
    reportDeleted: 'Rapport supprimé avec succès',
    errorDeletingReport: 'Erreur lors de la suppression du rapport',
    accessDenied: 'Accès refusé',
    adminAccessRequired: 'Vous devez être administrateur pour accéder à cette page',
    // Composant de sélection de localisation
    detectingLocation: 'Détection de l\'emplacement...',
    useCurrentLocation: 'Utiliser l\'emplacement actuel',
    selectWasteType: 'Sélectionnez le type de déchets',
  }
};

export const useTranslation = (language: Language) => {
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  const formatNumber = (num: number): string => {
    return formatNum(num, language);
  };

  return { t, formatNumber };
};
