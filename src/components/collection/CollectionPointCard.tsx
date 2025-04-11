
import React from 'react';
import { MapPin, Clock, Phone, Calendar, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CollectionPoint } from '@/types/collection';

interface CollectionPointCardProps {
  point: CollectionPoint;
}

const CollectionPointCard: React.FC<CollectionPointCardProps> = ({ point }) => {
  return (
    <Card key={point.id} className="overflow-hidden">
      <div className="h-4 bg-primary-green" />
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-3">{point.name}</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
            <span>{point.address}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">أنواع النفايات:</p>
              <div className="flex flex-wrap gap-2">
                {point.wasteTypes.map((type) => (
                  <span 
                    key={type}
                    className="bg-primary-green/10 text-primary-green text-xs px-2 py-1 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
            <span>{point.hours}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
            <span dir="ltr">{point.phone}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
            <span>آخر جمع: {point.lastCollection}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <Button className="w-full" variant="outline">عرض التفاصيل</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionPointCard;
