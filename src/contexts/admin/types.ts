
export interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  checkAdminStatus: () => Promise<boolean>;
}

export interface AdminProviderProps {
  children: React.ReactNode;
}
