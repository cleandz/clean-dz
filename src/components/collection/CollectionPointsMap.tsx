
import React from 'react';
import { MapPin } from 'lucide-react';

const CollectionPointsMap: React.FC = () => {
  return (
    <div className="bg-gray-200 rounded-lg h-64 md:h-96 mb-8 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-10 w-10 mx-auto mb-2 text-primary-green" />
        <p className="text-gray-600">هنا ستظهر خريطة نقاط الجمع</p>
        <p className="text-sm text-gray-500">يمكن استخدام Google Maps أو OpenStreetMap</p>
      </div>
    </div>
  );
};

export default CollectionPointsMap;
