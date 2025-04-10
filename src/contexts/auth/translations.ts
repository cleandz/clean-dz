
import { AuthTranslations } from './types';

export const translations: Record<string, AuthTranslations> = {
  ar: {
    signInSuccess: 'تم تسجيل الدخول بنجاح',
    signOutSuccess: 'تم تسجيل الخروج بنجاح',
    signUpSuccess: 'تم إنشاء حساب جديد بنجاح',
    profileUpdateSuccess: 'تم تحديث الملف الشخصي بنجاح',
    error: 'حدث خطأ'
  },
  en: {
    signInSuccess: 'Signed in successfully',
    signOutSuccess: 'Signed out successfully',
    signUpSuccess: 'Account created successfully',
    profileUpdateSuccess: 'Profile updated successfully',
    error: 'An error occurred'
  },
  fr: {
    signInSuccess: 'Connecté avec succès',
    signOutSuccess: 'Déconnecté avec succès',
    signUpSuccess: 'Compte créé avec succès',
    profileUpdateSuccess: 'Profil mis à jour avec succès',
    error: 'Une erreur est survenue'
  }
};
