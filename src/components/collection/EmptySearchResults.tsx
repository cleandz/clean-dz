
import React from 'react';
import { Search } from 'lucide-react';

const EmptySearchResults: React.FC = () => {
  return (
    <div className="col-span-full text-center py-12">
      <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">لا توجد نتائج</h3>
      <p className="text-gray-500">
        لم يتم العثور على نقاط جمع تطابق معايير البحث
      </p>
    </div>
  );
};

export default EmptySearchResults;
