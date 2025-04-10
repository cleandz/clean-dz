
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number } | null;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLocation }) => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestCurrentLocation = () => {
    setUsingCurrentLocation(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          onLocationSelect(newLocation);
          setUsingCurrentLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError(t('locationError'));
          setUsingCurrentLocation(false);
        }
      );
    } else {
      setError(t('geolocationNotSupported'));
      setUsingCurrentLocation(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={requestCurrentLocation} 
          disabled={usingCurrentLocation}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          {usingCurrentLocation ? t('detectingLocation') : t('useCurrentLocation')}
        </Button>
        
        {initialLocation && (
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <MapPin className="mr-1 h-4 w-4" />
            {t('locationDetected')}: {initialLocation.lat.toFixed(5)}, {initialLocation.lng.toFixed(5)}
          </div>
        )}
        
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
};

export default LocationPicker;
