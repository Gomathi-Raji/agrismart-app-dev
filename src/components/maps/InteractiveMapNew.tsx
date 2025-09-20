import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

// Fix Leaflet's default marker path issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Default coordinates for Punjab, India
const PUNJAB_CENTER = {
  lat: 31.1471,
  lng: 75.3412,
  zoom: 7
};

// LocationMarker component to handle marker positioning and map updates
const LocationMarker: React.FC<{
  position: L.LatLngExpression;
  isUserLocation: boolean;
}> = ({ position, isUserLocation }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position as L.LatLngExpression, isUserLocation ? 13 : PUNJAB_CENTER.zoom);
  }, [map, position, isUserLocation]);

  return (
    <Marker position={position}>
      <Popup>
        {isUserLocation ? "📍 You are here" : "📍 Default Location: Punjab"}
      </Popup>
    </Marker>
  );
};

export const InteractiveMapNew: React.FC = () => {
  const [position, setPosition] = useState<L.LatLngExpression>([PUNJAB_CENTER.lat, PUNJAB_CENTER.lng]);
  const [isUserLocation, setIsUserLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        setIsUserLocation(true);
        setIsLoading(false);
      },
      (error) => {
        console.log('Error getting location:', error);
        setPosition([PUNJAB_CENTER.lat, PUNJAB_CENTER.lng]);
        setIsUserLocation(false);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="relative w-full">
      <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={position}
          zoom={PUNJAB_CENTER.zoom}
          className="w-full h-full"
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} isUserLocation={isUserLocation} />
        </MapContainer>
      </div>

      {/* Floating Locate Me Button */}
      <Button
        onClick={getCurrentLocation}
        disabled={isLoading}
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95 z-[1000]"
        size="sm"
      >
        {isLoading ? (
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
        ) : (
          <>
            <Target className="h-4 w-4 mr-2" />
            Locate Me
          </>
        )}
      </Button>
    </div>
  );
};