
export interface Profile {
  id: string;
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface IssueReport {
  id: string;
  user_id: string;
  type: string;
  location: string;
  description: string;
  image_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface WasteEntry {
  id: string;
  user_id: string;
  date: string;
  waste_type: string;
  weight: number;
  recyclable: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AlgerianRegion {
  id: number;
  name: string;
  name_ar: string;
  name_en: string;
  name_fr: string;
}

export interface AdminUser {
  id: string;
  role: 'admin' | 'user';
}

export interface UserPoints {
  id: string;
  user_id: string;
  total_points: number;
  recycling_points: number;
  reporting_points: number;
  interaction_points: number;
  created_at?: string;
  updated_at?: string;
}

export interface Reward {
  id: string;
  name: {
    ar: string;
    en: string;
    fr: string;
  };
  description: {
    ar: string;
    en: string;
    fr: string;
  };
  points_required: number;
  reward_type: string;
  image_url: string | null;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PointTransaction {
  id: string;
  user_id: string;
  transaction_type: string;
  points: number;
  reference_id?: string;
  created_at?: string;
}

export interface UserReward {
  id: string;
  user_id: string;
  reward_id: string;
  points_spent: number;
  status: string;
  claimed_at?: string;
}

export type Tables = {
  profiles: Profile;
  issue_reports: IssueReport;
  waste_entries: WasteEntry;
  algerian_regions: AlgerianRegion;
  admin_users: AdminUser;
  user_points: UserPoints;
  rewards: Reward;
  point_transactions: PointTransaction;
  user_rewards: UserReward;
};
