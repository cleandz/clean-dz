
import React, { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/i18n/translations';
import { toast } from '@/components/ui/use-toast';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation?: { lat: number; lng: number } | null;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLocation }) => {
  const { language, dir } = useLanguage();
  const { t } = useTranslation(language);
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationDetected, setLocationDetected] = useState<boolean>(!!initialLocation);

  useEffect(() => {
    // If initial location is provided, mark as detected
    if (initialLocation) {
      setLocationDetected(true);
    }
  }, [initialLocation]);

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
          setLocationDetected(true);
          setUsingCurrentLocation(false);
          toast({
            title: t('locationDetected'),
            description: t('locationUpdated'),
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError(t('locationError'));
          setUsingCurrentLocation(false);
          toast({
            title: t('locationError'),
            description: t('pleaseTryAgain'),
            variant: 'destructive',
          });
        },
        { 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0 
        }
      );
    } else {
      setError(t('geolocationNotSupported'));
      setUsingCurrentLocation(false);
      toast({
        title: t('notSupported'),
        description: t('geolocationNotSupported'),
        variant: 'destructive',
      });
    }
  };

  const resetLocation = () => {
    onLocationSelect({ lat: 0, lng: 0 });
    setLocationDetected(false);
    toast({
      title: t('locationReset'),
      description: t('locationResetDescription'),
    });
  };

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-md border border-gray-200">
      <div className="flex flex-col gap-3">
        <Button 
          type="button" 
          variant="default" 
          onClick={requestCurrentLocation} 
          disabled={usingCurrentLocation}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          {usingCurrentLocation ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('detectingLocation')}
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4" />
              {t('useCurrentLocation')}
            </>
          )}
        </Button>
        
        {locationDetected && initialLocation && (
          <div className="flex flex-col gap-2">
            <div className="flex items-start text-sm bg-blue-50 p-2 rounded border border-blue-100">
              <MapPin className="mr-1 h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-blue-700">{t('locationDetected')}</div>
                <div className="text-blue-600">
                  {initialLocation.lat.toFixed(5)}, {initialLocation.lng.toFixed(5)}
                </div>
              </div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={resetLocation}
              className="w-full sm:w-auto"
            >
              {t('resetLocation')}
            </Button>
          </div>
        )}
        
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;
