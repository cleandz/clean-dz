

// Add or update any type definitions here as needed
export interface UserPoints {
  id: string;
  user_id: string;
  total_points: number;
  recycling_points: number;
  reporting_points: number;
  interaction_points: number;
}

export interface Reward {
  id: string;
  name: { ar: string; en: string; fr: string };
  description: { ar: string; en: string; fr: string };
  points_required: number;
  reward_type: string;
  image_url: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Add the missing AdminUser type
export interface AdminUser {
  id: string;
  role: string;
}

// Add the missing WasteEntry type
export interface WasteEntry {
  id: string;
  user_id: string;
  date: string;
  waste_type: string;
  weight: number;
  recyclable: boolean | null;
  created_at: string;
  updated_at: string;
}

