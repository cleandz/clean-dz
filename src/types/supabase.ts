
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

export type Tables = {
  profiles: Profile;
  issue_reports: IssueReport;
  waste_entries: WasteEntry;
  algerian_regions: AlgerianRegion;
};
