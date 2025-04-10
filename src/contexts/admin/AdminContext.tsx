
import { createContext } from 'react';
import { AdminContextType } from './types';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export default AdminContext;
