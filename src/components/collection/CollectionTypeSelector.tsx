
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recycle, Trash } from 'lucide-react';

export type CollectionType = 'organic' | 'recyclable';

interface CollectionTypeSelectorProps {
  selectedType: CollectionType;
  onChange: (type: CollectionType) => void;
}

const CollectionTypeSelector = ({ selectedType, onChange }: CollectionTypeSelectorProps) => {
  return (
    <Tabs 
      defaultValue={selectedType} 
      onValueChange={(value) => onChange(value as CollectionType)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="organic" className="flex items-center justify-center gap-2">
          <Trash className="h-4 w-4" />
          <span>نفايات عضوية</span>
        </TabsTrigger>
        <TabsTrigger value="recyclable" className="flex items-center justify-center gap-2">
          <Recycle className="h-4 w-4" />
          <span>نفايات قابلة للتدوير</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CollectionTypeSelector;
