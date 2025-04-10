

// أنواع البيانات المتوافقة مع قاعدة البيانات الجديدة

// نوع دور المستخدم
export type UserRole = 'citizen' | 'admin';

// نوع النفايات
export type WasteType = 'organic' | 'plastic' | 'glass' | 'metal';

// حالة البلاغ
export type ReportStatus = 'new' | 'in_progress' | 'resolved';

// واجهة لبيانات الملف الشخصي
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  city?: string;
  region?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// واجهة لدور المستخدم
export interface UserRoleRecord {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

// واجهة لبلاغات النفايات
export interface Report {
  id: string;
  user_id: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
  waste_type: WasteType;
  description: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}

// واجهة لنقاط جمع النفايات
export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  working_hours?: string;
  phone?: string;
  accepts?: string[];
  created_at: string;
  updated_at: string;
}

// واجهة لنقاط المستخدم
export interface UserPoints {
  id: string;
  user_id: string;
  total_points: number;
  organic_points: number;
  plastic_points: number;
  glass_points: number;
  metal_points: number;
  created_at: string;
  updated_at: string;
}

// واجهة لمعاملات النقاط
export interface PointTransaction {
  id: string;
  user_id: string;
  points: number;
  waste_type?: WasteType;
  reference_id?: string;
  transaction_type: string;
  created_at: string;
}

// واجهة لتتبع النفايات
export interface WasteEntry {
  id: string;
  report_id: string;
  user_id: string;
  waste_type: WasteType;
  weight: number;
  verified: boolean;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

// واجهة للمكافآت متعددة اللغات
export interface MultilingualContent {
  ar: string;
  en: string;
  fr: string;
}

// واجهة للمكافآت
export interface Reward {
  id: string;
  name: MultilingualContent;
  description: MultilingualContent;
  points_required: number;
  reward_type: string;
  image_url?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// واجهة لمكافآت المستخدم
export interface UserReward {
  id: string;
  user_id: string;
  reward_id: string;
  points_spent: number;
  status: string;
  claimed_at: string;
}

// واجهة للمستخدم الإداري
export interface AdminUser {
  id: string;
  role: string;
}

