
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CollectionPointsMap from '@/components/collection/CollectionPointsMap';
import CollectionPointsSearch from '@/components/collection/CollectionPointsSearch';
import CollectionPointsList from '@/components/collection/CollectionPointsList';
import { useCollectionPoints } from '@/hooks/useCollectionPoints';

const CollectionPoints = () => {
  const {
    searchTerm,
    setSearchTerm,
    wasteTypeFilter,
    setWasteTypeFilter,
    wasteTypeOptions,
    filteredPoints
  } = useCollectionPoints();

  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">نقاط الجمع</h1>
          
          <CollectionPointsMap />
          
          <CollectionPointsSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            wasteTypeFilter={wasteTypeFilter}
            onWasteTypeFilterChange={setWasteTypeFilter}
            wasteTypeOptions={wasteTypeOptions}
          />
          
          <CollectionPointsList points={filteredPoints} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionPoints;
