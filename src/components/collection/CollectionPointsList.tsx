
import React from 'react';
import CollectionPointCard from './CollectionPointCard';
import EmptySearchResults from './EmptySearchResults';
import { CollectionPoint } from '@/types/collection';

interface CollectionPointsListProps {
  points: CollectionPoint[];
}

const CollectionPointsList: React.FC<CollectionPointsListProps> = ({ points }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {points.length > 0 ? (
        points.map((point) => (
          <CollectionPointCard key={point.id} point={point} />
        ))
      ) : (
        <EmptySearchResults />
      )}
    </div>
  );
};

export default CollectionPointsList;
