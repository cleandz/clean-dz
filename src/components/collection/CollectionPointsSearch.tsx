
import React from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CollectionPointsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  wasteTypeFilter: string;
  onWasteTypeFilterChange: (value: string) => void;
  wasteTypeOptions: string[];
}

const CollectionPointsSearch: React.FC<CollectionPointsSearchProps> = ({
  searchTerm,
  onSearchChange,
  wasteTypeFilter,
  onWasteTypeFilterChange,
  wasteTypeOptions
}) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="ابحث عن نقطة جمع..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div>
          <Select
            value={wasteTypeFilter}
            onValueChange={onWasteTypeFilterChange}
          >
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="h-4 w-4 ml-2" />
                <SelectValue placeholder="تصفية حسب نوع النفايات" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              {wasteTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button className="hidden md:block" variant="outline">
          <MapPin className="mr-2 h-4 w-4" /> عرض الأقرب إلي
        </Button>
      </div>
    </div>
  );
};

export default CollectionPointsSearch;
