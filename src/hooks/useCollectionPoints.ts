
import { useState, useMemo } from 'react';
import { CollectionPoint } from '@/types/collection';

export const useCollectionPoints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [wasteTypeFilter, setWasteTypeFilter] = useState('all');
  
  // Sample data - in a real app, this would come from an API
  const collectionPoints: CollectionPoint[] = [
    {
      id: '1',
      name: 'مركز إعادة التدوير الرئيسي',
      address: 'حي السلام، شارع الصناعة',
      wasteTypes: ['بلاستيك', 'ورق', 'زجاج', 'معدن'],
      hours: 'السبت - الخميس: 08:00 - 18:00',
      phone: '0123456789',
      lastCollection: '2025-04-04',
    },
    {
      id: '2',
      name: 'نقطة جمع الشمال',
      address: 'حي النور، شارع الأمل',
      wasteTypes: ['بلاستيك', 'ورق'],
      hours: 'السبت - الأربعاء: 09:00 - 17:00',
      phone: '0123456788',
      lastCollection: '2025-04-03',
    },
    {
      id: '3',
      name: 'مركز التدوير الخاص',
      address: 'حي الزهور، شارع الورود',
      wasteTypes: ['إلكترونيات', 'بطاريات'],
      hours: 'الأحد - الخميس: 10:00 - 16:00',
      phone: '0123456787',
      lastCollection: '2025-04-02',
    },
    {
      id: '4',
      name: 'نقطة جمع المنطقة الصناعية',
      address: 'المنطقة الصناعية، شارع العمل',
      wasteTypes: ['معدن', 'زجاج', 'مواد كيميائية'],
      hours: 'السبت - الخميس: 07:00 - 19:00',
      phone: '0123456786',
      lastCollection: '2025-04-01',
    },
  ];

  // Extract all unique waste types for the filter
  const wasteTypeOptions = useMemo(() => {
    const allTypes = new Set<string>();
    collectionPoints.forEach((point) => {
      point.wasteTypes.forEach((type) => allTypes.add(type));
    });
    return Array.from(allTypes);
  }, [collectionPoints]);

  // Filter collection points based on search term and waste type
  const filteredPoints = useMemo(() => {
    return collectionPoints.filter((point) => {
      const matchesSearch = point.name.includes(searchTerm) || 
                           point.address.includes(searchTerm);
      
      const matchesWasteType = wasteTypeFilter === 'all' || 
                              point.wasteTypes.includes(wasteTypeFilter);
      
      return matchesSearch && matchesWasteType;
    });
  }, [collectionPoints, searchTerm, wasteTypeFilter]);

  return {
    searchTerm,
    setSearchTerm,
    wasteTypeFilter,
    setWasteTypeFilter,
    wasteTypeOptions,
    filteredPoints
  };
};
