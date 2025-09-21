import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Loader2, 
  Cloud, 
  CloudRain, 
  Thermometer,
  Wind,
  Eye,
  Layers,
  Satellite,
  Map as MapIcon,
  Sun,
  CloudSnow,
  Zap,
  ExternalLink
} from 'lucide-react';
import { fetchWeatherApi } from 'openmeteo';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Add custom styles for map popups
const customPopupStyles = `
  .mapboxgl-popup {
    max-width: 420px;
    z-index: 9999;
  }
  .mapboxgl-popup-content {
    padding: 0;
    border-radius: 16px;
    border: 1px solid rgba(226, 232, 240, 0.8);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8);
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    overflow: hidden;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .mapboxgl-popup-close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(145deg, rgba(248, 250, 252, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%);
    color: rgba(15, 118, 110, 1);
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10;
    border: 2px solid rgba(15, 118, 110, 0.2);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .mapboxgl-popup-close-button:hover {
    background: linear-gradient(145deg, rgba(15, 118, 110, 1) 0%, rgba(5, 150, 105, 1) 100%);
    color: white;
    transform: scale(1.1) rotate(90deg);
    border-color: rgba(15, 118, 110, 0.8);
    box-shadow: 0 10px 15px -3px rgba(15, 118, 110, 0.3), 0 4px 6px -2px rgba(15, 118, 110, 0.2);
  }
  .mapboxgl-popup-tip {
    border-top-color: #f8fafc;
    filter: drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1));
  }
  .custom-popup-header {
    background: linear-gradient(135deg, #0f766e 0%, #059669 100%);
    color: white;
    padding: 20px 24px 16px 24px;
    position: relative;
    overflow: hidden;
  }
  .custom-popup-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    pointer-events: none;
  }
  .custom-popup-body {
    padding: 20px 24px 24px 24px;
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
  }
  .custom-popup-icon {
    font-size: 32px;
    margin-bottom: 8px;
    display: inline-block;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
  .custom-popup-title {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 4px 0;
    line-height: 1.3;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  .custom-popup-description {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    line-height: 1.4;
  }
  .custom-popup-weather {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 16px;
  }
  .custom-popup-weather-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: rgba(248, 250, 252, 0.8);
    border-radius: 12px;
    border: 1px solid rgba(226, 232, 240, 0.6);
    transition: all 0.2s ease;
  }
  .custom-popup-weather-item:hover {
    background: rgba(240, 253, 250, 0.9);
    border-color: rgba(16, 185, 129, 0.3);
    transform: translateY(-1px);
  }
  .custom-popup-weather-icon {
    color: #0f766e;
    flex-shrink: 0;
  }
  .custom-popup-weather-text {
    font-size: 13px;
    color: #374151;
    font-weight: 500;
  }
  .custom-popup-weather-value {
    font-size: 12px;
    color: #6b7280;
    font-weight: 400;
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = customPopupStyles;
  document.head.appendChild(style);
}

// Constants
const MAPBOX_API_KEY = 'pk.eyJ1IjoiaGFyaXNod2FyYW4iLCJhIjoiY21hZHhwZGs2MDF4YzJxczh2aDd0cWg1MyJ9.qcu0lpqVlZlC2WFxhwb1Pg';
const PUNJAB_CENTER = { lat: 31.1471, lng: 75.3412 };

// Custom mock locations - Chennai, Thiruvallur, Kanchipuram area
const MOCK_LOCATIONS: MockLocation[] = [
  // Chennai area
  { lat: 13.0827, lng: 80.2707, type: 'farm', name: 'Chennai Organic Farm', description: 'Urban organic farming initiative' },
  { lat: 13.0650, lng: 80.2820, type: 'marketplace', name: 'Koyambedu Market', description: 'Major wholesale fruit & vegetable market' },
  { lat: 13.0878, lng: 80.2785, type: 'office', name: 'AgriSmart Chennai Hub', description: 'Technology support center' },
  { lat: 13.1186, lng: 80.2992, type: 'farm', name: 'Poonamallee Rice Farm', description: 'Traditional rice cultivation' },
  { lat: 13.0526, lng: 80.2506, type: 'marketplace', name: 'Anna Nagar Farmers Market', description: 'Local fresh produce market' },
  
  // Thiruvallur area
  { lat: 13.1506, lng: 79.9094, type: 'farm', name: 'Thiruvallur Sugarcane Farm', description: 'Large scale sugarcane cultivation' },
  { lat: 13.1325, lng: 79.9156, type: 'farm', name: 'Millet Cultivation Center', description: 'Traditional millet farming' },
  { lat: 13.1289, lng: 79.8942, type: 'marketplace', name: 'Thiruvallur Grain Market', description: 'Regional grain trading center' },
  { lat: 13.1456, lng: 79.9235, type: 'office', name: 'Agricultural Extension Office', description: 'Government agricultural support' },
  { lat: 13.1678, lng: 79.8876, type: 'farm', name: 'Integrated Dairy Farm', description: 'Dairy and crop integration' },
  
  // Kanchipuram area
  { lat: 12.8342, lng: 79.7036, type: 'farm', name: 'Kanchipuram Silk Mulberry Farm', description: 'Mulberry cultivation for silk industry' },
  { lat: 12.8185, lng: 79.6889, type: 'farm', name: 'Temple City Vegetable Farm', description: 'Organic vegetable cultivation' },
  { lat: 12.8267, lng: 79.7125, type: 'marketplace', name: 'Kanchipuram Agri Market', description: 'Traditional agricultural market' },
  { lat: 12.8456, lng: 79.7235, type: 'office', name: 'Kanchipuram Agri Office', description: 'District agricultural office' },
  { lat: 12.8156, lng: 79.6756, type: 'farm', name: 'Paddy Fields Cooperative', description: 'Cooperative paddy farming' },
  
  // Additional nearby locations
  { lat: 13.0543, lng: 80.1623, type: 'farm', name: 'Tambaram Flower Farm', description: 'Commercial flower cultivation' },
  { lat: 12.9698, lng: 80.2433, type: 'marketplace', name: 'Chromepet Vegetable Market', description: 'Local vegetable trading' },
  { lat: 13.1987, lng: 80.2356, type: 'farm', name: 'Red Hills Fruit Orchard', description: 'Mixed fruit cultivation' },
  { lat: 12.9156, lng: 79.8567, type: 'office', name: 'Chengalpattu Agri Hub', description: 'Regional agricultural hub' },
  { lat: 13.2134, lng: 79.8945, type: 'farm', name: 'Gummidipoondi Aquaculture', description: 'Fish and prawn farming' },
  
  // Poonamallee area
  { lat: 13.0492, lng: 80.0955, type: 'farm', name: 'Poonamallee Organic Farm', description: 'Certified organic vegetable farm' },
  { lat: 13.0376, lng: 80.0847, type: 'marketplace', name: 'Poonamallee Weekly Market', description: 'Traditional weekly farmers market' },
  { lat: 13.0523, lng: 80.1023, type: 'office', name: 'Poonamallee Agri Extension', description: 'Agricultural extension services' },
  { lat: 13.0445, lng: 80.0912, type: 'farm', name: 'Poonamallee Dairy Collective', description: 'Community dairy farming' },
  { lat: 13.0398, lng: 80.0978, type: 'farm', name: 'Poonamallee Floriculture', description: 'Commercial flower cultivation' },
  
  // Guindy (Queens Land) area
  { lat: 13.0067, lng: 80.2206, type: 'office', name: 'Guindy Agricultural Research', description: 'Agricultural research institute' },
  { lat: 13.0125, lng: 80.2154, type: 'farm', name: 'Guindy Experimental Farm', description: 'Research and demonstration farm' },
  { lat: 13.0089, lng: 80.2178, type: 'marketplace', name: 'Guindy Organic Market', description: 'Premium organic produce market' },
  { lat: 13.0034, lng: 80.2223, type: 'farm', name: 'Queens Land Urban Farm', description: 'Urban agriculture initiative' },
  { lat: 13.0156, lng: 80.2189, type: 'office', name: 'Guindy Agri Tech Hub', description: 'Agricultural technology center' },
  
  // Sunguvarchatram area
  { lat: 12.8967, lng: 80.0234, type: 'farm', name: 'Sunguvarchatram Rice Mills', description: 'Traditional rice processing' },
  { lat: 12.9034, lng: 80.0189, type: 'farm', name: 'Sunguvarchatram Vegetable Farm', description: 'Large scale vegetable cultivation' },
  { lat: 12.8923, lng: 80.0267, type: 'marketplace', name: 'Sunguvarchatram Grain Market', description: 'Regional grain trading center' },
  { lat: 12.9056, lng: 80.0156, type: 'office', name: 'Sunguvarchatram Cooperative', description: 'Farmers cooperative society' },
  { lat: 12.8989, lng: 80.0298, type: 'farm', name: 'Sunguvarchatram Poultry Farm', description: 'Modern poultry farming' },
  
  // Queens Land Amusement Park area
  { lat: 13.0045, lng: 80.1567, type: 'farm', name: 'Queens Land Organic Farms', description: 'Tourist-friendly organic farm experience' },
  { lat: 13.0089, lng: 80.1523, type: 'marketplace', name: 'Queens Land Fresh Market', description: 'Weekend farmers market near amusement park' },
  { lat: 13.0012, lng: 80.1598, type: 'office', name: 'Queens Land Agri Tourism Office', description: 'Agricultural tourism coordination center' },
  { lat: 13.0078, lng: 80.1587, type: 'farm', name: 'Entertainment Farm Village', description: 'Interactive farming experience center' },
  { lat: 13.0034, lng: 80.1545, type: 'farm', name: 'Queens Land Dairy Farm', description: 'Educational dairy farming facility' },
  
  // Thandalam (near Saveetha) area
  { lat: 13.0234, lng: 80.0234, type: 'farm', name: 'Saveetha University Farm', description: 'Agricultural research and education farm' },
  { lat: 13.0189, lng: 80.0189, type: 'office', name: 'Thandalam Agricultural Extension', description: 'Government agricultural support center' },
  { lat: 13.0267, lng: 80.0267, type: 'farm', name: 'Thandalam Integrated Farm', description: 'Multi-crop integrated farming system' },
  { lat: 13.0156, lng: 80.0156, type: 'marketplace', name: 'Thandalam Village Market', description: 'Traditional village produce market' },
  { lat: 13.0298, lng: 80.0298, type: 'farm', name: 'Saveetha Aquaculture Center', description: 'Fish farming and research facility' },
  { lat: 13.0323, lng: 80.0323, type: 'office', name: 'Thandalam Cooperative Bank', description: 'Agricultural cooperative banking services' },
  { lat: 13.0178, lng: 80.0178, type: 'farm', name: 'Thandalam Floriculture Unit', description: 'Commercial flower cultivation and export' },
];

// Type definitions
interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  cloudCover: number;
  address: string;
}

interface NearbyCount {
  farms: number;
  markets: number;
}

interface WeatherOverlay {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  opacity: number;
}

interface MockLocation {
  lat: number;
  lng: number;
  type: 'farm' | 'marketplace' | 'office';
  name: string;
  description: string;
}

interface FieldIntelligenceMapProps {
  className?: string;
}

export const FieldIntelligenceMap: React.FC<FieldIntelligenceMapProps> = ({ className }) => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('satellite');
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [nearbyCount, setNearbyCount] = useState<NearbyCount>({ farms: 0, markets: 0 });
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [weatherLayers, setWeatherLayers] = useState<WeatherOverlay[]>([
    { id: 'clouds', name: 'Cloud Cover', icon: Cloud, enabled: true, opacity: 0.6 },
    { id: 'precipitation', name: 'Precipitation', icon: CloudRain, enabled: true, opacity: 0.7 },
    { id: 'temperature', name: 'Temperature', icon: Thermometer, enabled: false, opacity: 0.5 },
    { id: 'wind', name: 'Wind Speed', icon: Wind, enabled: false, opacity: 0.5 },
  ]);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Find nearest locations of a specific type
  const findNearestLocations = (type: 'farm' | 'marketplace' | 'office', count: number = 5) => {
    if (!userLocation) return [];
    
    const locationsOfType = MOCK_LOCATIONS.filter(loc => loc.type === type);
    const locationsWithDistance = locationsOfType.map(loc => ({
      ...loc,
      distance: calculateDistance(userLocation.lat, userLocation.lng, loc.lat, loc.lng)
    }));
    
    return locationsWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, count);
  };

  // Navigation handlers for legend buttons - now focus on nearest locations to user
  const handleFarmsClick = () => {
    if (map && userLocation) {
      const nearestFarms = findNearestLocations('farm', 5);
      if (nearestFarms.length > 0) {
        // Calculate bounds to fit nearest farms
        const bounds = new mapboxgl.LngLatBounds();
        
        // Include user location in bounds
        bounds.extend([userLocation.lng, userLocation.lat]);
        
        // Include nearest farms
        nearestFarms.forEach(farm => {
          bounds.extend([farm.lng, farm.lat]);
        });
        
        map.fitBounds(bounds, { 
          padding: { top: 80, bottom: 80, left: 80, right: 80 },
          maxZoom: 13 
        });
      }
    } else if (map) {
      // Fallback to all farms if no user location
      const farmLocations = MOCK_LOCATIONS.filter(loc => loc.type === 'farm');
      const bounds = new mapboxgl.LngLatBounds();
      farmLocations.forEach(farm => bounds.extend([farm.lng, farm.lat]));
      map.fitBounds(bounds, { padding: { top: 50, bottom: 50, left: 50, right: 50 }, maxZoom: 12 });
    }
  };

  const handleMarketsClick = () => {
    if (map && userLocation) {
      const nearestMarkets = findNearestLocations('marketplace', 5);
      if (nearestMarkets.length > 0) {
        // Calculate bounds to fit nearest markets
        const bounds = new mapboxgl.LngLatBounds();
        
        // Include user location in bounds
        bounds.extend([userLocation.lng, userLocation.lat]);
        
        // Include nearest markets
        nearestMarkets.forEach(market => {
          bounds.extend([market.lng, market.lat]);
        });
        
        map.fitBounds(bounds, { 
          padding: { top: 80, bottom: 80, left: 80, right: 80 },
          maxZoom: 13 
        });
      }
    } else if (map) {
      // Fallback to all markets if no user location
      const marketLocations = MOCK_LOCATIONS.filter(loc => loc.type === 'marketplace');
      const bounds = new mapboxgl.LngLatBounds();
      marketLocations.forEach(market => bounds.extend([market.lng, market.lat]));
      map.fitBounds(bounds, { padding: { top: 50, bottom: 50, left: 50, right: 50 }, maxZoom: 12 });
    }
  };

  const handleOfficesClick = () => {
    if (map && userLocation) {
      const nearestOffices = findNearestLocations('office', 5);
      if (nearestOffices.length > 0) {
        // Calculate bounds to fit nearest offices
        const bounds = new mapboxgl.LngLatBounds();
        
        // Include user location in bounds
        bounds.extend([userLocation.lng, userLocation.lat]);
        
        // Include nearest offices
        nearestOffices.forEach(office => {
          bounds.extend([office.lng, office.lat]);
        });
        
        map.fitBounds(bounds, { 
          padding: { top: 80, bottom: 80, left: 80, right: 80 },
          maxZoom: 13 
        });
      }
    } else if (map) {
      // Fallback to all offices if no user location
      const officeLocations = MOCK_LOCATIONS.filter(loc => loc.type === 'office');
      const bounds = new mapboxgl.LngLatBounds();
      officeLocations.forEach(office => bounds.extend([office.lng, office.lat]));
      map.fitBounds(bounds, { padding: { top: 50, bottom: 50, left: 50, right: 50 }, maxZoom: 12 });
    }
  };

  // Initialize Mapbox with weather layers
  useEffect(() => {
    const initMap = async () => {
      try {
        if (!mapRef.current) return;

        // Mapbox access token
        mapboxgl.accessToken = MAPBOX_API_KEY;

        const styleUrl = mapType === 'satellite'
          ? 'mapbox://styles/mapbox/satellite-v9'
          : mapType === 'hybrid'
          ? 'mapbox://styles/mapbox/satellite-streets-v12'
          : 'mapbox://styles/mapbox/streets-v12';

        const mapboxMap = new mapboxgl.Map({
          container: mapRef.current,
          style: styleUrl,
          center: [PUNJAB_CENTER.lng, PUNJAB_CENTER.lat],
          zoom: 8,
        });

        mapboxMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
        mapboxMap.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }));

        // Add marker for user location
        const mapboxMarker = new mapboxgl.Marker({ color: '#10b981', draggable: false })
          .setLngLat([PUNJAB_CENTER.lng, PUNJAB_CENTER.lat])
          .addTo(mapboxMap);

        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude: lat, longitude: lng } = position.coords;
              
              // Store user location for distance calculations
              setUserLocation({ lat, lng });
              
              mapboxMap.flyTo({
                center: [lng, lat],
                zoom: 15,
                essential: true
              });
              mapboxMarker.setLngLat([lng, lat]);
              await updateLocationWeather(lat, lng, mapboxMarker);

              // Update nearby counts
              const userPos = { lat, lng };
              const nearby = MOCK_LOCATIONS.reduce(
                (acc, loc) => {
                  const distance = getDistance(userPos, loc);
                  if (distance <= 3000) { // 3km radius
                    if (loc.type === 'farm') acc.farms++;
                    if (loc.type === 'marketplace') acc.markets++;
                  }
                  return acc;
                },
                { farms: 0, markets: 0 }
              );
              setNearbyCount(nearby);
            },
            () => {
              console.log('Using default location');
              // Set default location for Chennai area
              const defaultLocation = { lat: 13.0827, lng: 80.2707 };
              setUserLocation(defaultLocation);
              updateLocationWeather(defaultLocation.lat, defaultLocation.lng, mapboxMarker);
            }
          );
        }

        mapboxMap.on('load', () => {
          setIsLoading(false);
        });

        setMap(mapboxMap);
        setMarker(mapboxMarker);

        // Add mock location markers
        MOCK_LOCATIONS.forEach((loc) => {
          const color = loc.type === 'farm' ? '#22c55e' : 
                      loc.type === 'marketplace' ? '#ef4444' : '#3b82f6';
          
          new mapboxgl.Marker({ color })
            .setLngLat([loc.lng, loc.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25, className: 'custom-popup' })
                .setHTML(`
                  <div class="custom-popup-header">
                    <div class="custom-popup-icon">${
                      loc.type === 'farm' ? '🌾' :
                      loc.type === 'marketplace' ? '🏪' : '🏢'
                    }</div>
                    <h3 class="custom-popup-title">${loc.name}</h3>
                    <p class="custom-popup-description">${loc.description}</p>
                  </div>
                  <div class="custom-popup-body">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                      <div style="height: 12px; width: 12px; border-radius: 50%; background-color: ${color}; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>
                      <span style="font-size: 14px; font-weight: 600; color: #374151; text-transform: capitalize;">${loc.type}</span>
                    </div>
                    <div class="custom-popup-weather">
                      <div class="custom-popup-weather-item">
                        <svg class="custom-popup-weather-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41"/>
                          <circle cx="12" cy="12" r="4"/>
                        </svg>
                        <div>
                          <div class="custom-popup-weather-text">Weather</div>
                          <div class="custom-popup-weather-value">Sunny, 28°C</div>
                        </div>
                      </div>
                      <div class="custom-popup-weather-item">
                        <svg class="custom-popup-weather-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        <div>
                          <div class="custom-popup-weather-text">Distance</div>
                          <div class="custom-popup-weather-value">${Math.floor(Math.random() * 5 + 1)}.${Math.floor(Math.random() * 9)} km</div>
                        </div>
                      </div>
                      <div class="custom-popup-weather-item">
                        <svg class="custom-popup-weather-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M12 22s8-4 8-11a8 8 0 0 0-16 0c0 7 8 11 8 11z"/>
                          <circle cx="12" cy="11" r="3"/>
                        </svg>
                        <div>
                          <div class="custom-popup-weather-text">Status</div>
                          <div class="custom-popup-weather-value">Active</div>
                        </div>
                      </div>
                      <div class="custom-popup-weather-item">
                        <svg class="custom-popup-weather-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        <div>
                          <div class="custom-popup-weather-text">Rating</div>
                          <div class="custom-popup-weather-value">⭐ ${(Math.random() * 1.5 + 3.5).toFixed(1)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                `)
            )
            .addTo(mapboxMap);
        });

        return () => {
          mapboxMap.remove();
        };
      } catch (error) {
        console.error('Error initializing map:', error);
        setIsLoading(false);
      }
    };

    initMap();
  }, [mapType]);

  // Update weather data for location
  const updateLocationWeather = async (
    lat: number,
    lng: number,
    mapMarker: mapboxgl.Marker
  ) => {
    setLoadingWeather(true);
    try {
      // Get address from coordinates
      let address = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      try {
        const resp = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_API_KEY}&types=address,poi,place,locality&limit=1`
        );
        const data = await resp.json();
        address = data.features?.[0]?.place_name || address;
      } catch (error) {
        console.error('Reverse geocoding error:', error);
      }

      // Get weather data
      const weatherResponse = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', {
        latitude: lat,
        longitude: lng,
        current: ['temperature_2m', 'weather_code', 'wind_speed_10m', 'relative_humidity_2m', 'cloud_cover'],
        hourly: ['temperature_2m', 'precipitation_probability', 'weather_code'],
        forecast_days: 3
      });

      const response = weatherResponse[0];
      const current = response.current()!;
      
      const weatherData: WeatherData = {
        temperature: Math.round(current.variables(0)!.value()),
        weatherCode: current.variables(1)!.value(),
        windSpeed: Math.round(current.variables(2)!.value()),
        humidity: Math.round(current.variables(3)!.value()),
        cloudCover: Math.round(current.variables(4)!.value()),
        address
      };

      setWeatherData(weatherData);

      // No popup - just update the weather data for the sidebar
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoadingWeather(false);
    }
  };

  // Map type toggle
  const changeMapType = (type: 'roadmap' | 'satellite' | 'hybrid') => {
    setMapType(type);
    if (map) {
      const styleUrl = type === 'satellite'
        ? 'mapbox://styles/mapbox/satellite-v9'
        : type === 'hybrid'
        ? 'mapbox://styles/mapbox/satellite-streets-v12'
        : 'mapbox://styles/mapbox/streets-v12';
      map.setStyle(styleUrl);
    }
  };

  // Toggle weather layer
  const toggleWeatherLayer = (layerId: string) => {
    setWeatherLayers(prev => 
      prev.map(layer => 
        layer.id === layerId 
          ? { ...layer, enabled: !layer.enabled }
          : layer
      )
    );
  };

  // Update layer opacity
  const updateLayerOpacity = (layerId: string, opacity: number) => {
    setWeatherLayers(prev => 
      prev.map(layer => 
        layer.id === layerId 
          ? { ...layer, opacity }
          : layer
      )
    );
  };

  // Helper function to calculate distance between two points
  const getDistance = (point1: { lat: number, lng: number }, point2: { lat: number, lng: number }) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = point1.lat * Math.PI/180;
    const φ2 = point2.lat * Math.PI/180;
    const Δφ = (point2.lat-point1.lat) * Math.PI/180;
    const Δλ = (point2.lng-point1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  // Helper function to get weather icon
  const getWeatherIcon = (weatherCode: number): string => {
    const iconMap: Record<number, string> = {
      0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
      45: '🌫️', 48: '🌫️',
      51: '🌦️', 53: '🌦️', 55: '🌦️', 56: '🌦️', 57: '🌦️',
      61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️',
      71: '🌨️', 73: '🌨️', 75: '🌨️', 77: '🌨️',
      80: '🌦️', 81: '🌦️', 82: '🌦️',
      85: '🌨️', 86: '🌨️',
      95: '⛈️', 96: '⛈️', 99: '⛈️'
    };
    return iconMap[weatherCode] || '🌥️';
  };

  // Helper function to get weather condition description
  const getWeatherCondition = (weatherCode: number): string => {
    const conditionMap: Record<number, string> = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Light freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Thunderstorm with heavy hail'
    };
    return conditionMap[weatherCode] || 'Unknown';
  };

  return (
    <Card className={`${className} shadow-lg border-0 overflow-hidden`}>
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Field Intelligence Map
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid lg:grid-cols-[1fr_320px] gap-0">
          <div className="relative h-[500px] lg:h-[600px] bg-muted/20 overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="text-center space-y-2">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                  <div>
                    <p className="text-lg font-medium">Loading Field Intelligence Map</p>
                    <p className="text-sm text-muted-foreground">Initializing satellite view and weather data...</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Map Controls - Top Left */}
            <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-md rounded-xl p-3 shadow-xl z-10 border">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={mapType === 'roadmap' ? 'default' : 'outline'}
                  onClick={() => changeMapType('roadmap')}
                  className="h-9 px-3 hover:bg-muted transition-all duration-200"
                  title="Road Map"
                >
                  <MapIcon className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Road</span>
                </Button>
                <Button
                  size="sm"
                  variant={mapType === 'satellite' ? 'default' : 'outline'}
                  onClick={() => changeMapType('satellite')}
                  className="h-9 px-3 hover:bg-muted transition-all duration-200"
                  title="Satellite View"
                >
                  <Satellite className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Satellite</span>
                </Button>
                <Button
                  size="sm"
                  variant={mapType === 'hybrid' ? 'default' : 'outline'}
                  onClick={() => changeMapType('hybrid')}
                  className="h-9 px-3 hover:bg-muted transition-all duration-200"
                  title="Hybrid View"
                >
                  <Layers className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Hybrid</span>
                </Button>
              </div>
            </div>

            {loadingWeather && (
              <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-md rounded-xl p-3 shadow-xl z-10 border">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm font-medium">Loading weather...</span>
                </div>
              </div>
            )}

            <div ref={mapRef} className="w-full h-full" />
          </div>

          {/* Weather Controls Sidebar */}
          <div className="lg:border-l border-border bg-muted/5">
            <div className="p-6 space-y-6 h-full overflow-y-auto">
              {/* Current Weather Section */}
              {weatherData && (
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 p-4 border border-primary/20">
                  <div className="absolute top-0 right-0 p-4 text-6xl opacity-10">
                    {getWeatherIcon(weatherData.weatherCode)}
                  </div>
                  <div className="relative space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{getWeatherIcon(weatherData.weatherCode)}</div>
                      <div className="flex-1">
                        <div className="text-3xl font-bold text-foreground">{weatherData.temperature}°C</div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {getWeatherCondition(weatherData.weatherCode)}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-background/60 p-3 border">
                        <div className="text-xs text-muted-foreground mb-1 font-medium">Wind Speed</div>
                        <div className="font-semibold flex items-center gap-1">
                          <Wind className="h-3 w-3 text-blue-600" />
                          {weatherData.windSpeed} km/h
                        </div>
                      </div>
                      <div className="rounded-lg bg-background/60 p-3 border">
                        <div className="text-xs text-muted-foreground mb-1 font-medium">Humidity</div>
                        <div className="font-semibold flex items-center gap-1">
                          <CloudRain className="h-3 w-3 text-blue-600" />
                          {weatherData.humidity}%
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground border-t border-border/50 pt-3 mt-3">
                      <MapPin className="h-3 w-3 inline-block mr-1" />
                      {weatherData.address}
                    </div>
                  </div>
                </div>
              )}

              {/* Weather Layers Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Weather Layers
                  </h3>
                </div>
                <div className="space-y-4">
                  {weatherLayers.map((layer) => {
                    const IconComponent = layer.icon;
                    return (
                      <div key={layer.id} className="space-y-3 p-3 rounded-lg border bg-background/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <Label className="text-sm font-semibold">{layer.name}</Label>
                              {layer.enabled && (
                                <div className="text-xs text-muted-foreground">
                                  {Math.round(layer.opacity * 100)}% opacity
                                </div>
                              )}
                            </div>
                          </div>
                          <Switch
                            checked={layer.enabled}
                            onCheckedChange={() => toggleWeatherLayer(layer.id)}
                          />
                        </div>
                        {layer.enabled && (
                          <div className="pl-13">
                            <input
                              type="range"
                              min="0.1"
                              max="1"
                              step="0.1"
                              value={layer.opacity}
                              onChange={(e) => updateLayerOpacity(layer.id, parseFloat(e.target.value))}
                              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border bg-background/80 p-4 text-center space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">Nearby Farms</div>
                  <div className="text-2xl font-bold text-green-600">{nearbyCount.farms}</div>
                  <div className="text-xs text-green-600/80">within 3km</div>
                </div>
                <div className="rounded-lg border bg-background/80 p-4 text-center space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">Local Markets</div>
                  <div className="text-2xl font-bold text-red-600">{nearbyCount.markets}</div>
                  <div className="text-xs text-red-600/80">within 3km</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Legend Section - Below the map */}
        <div className="border-t bg-muted/20 p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-muted-foreground">Find Nearest:</h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFarmsClick}
                    className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800 px-3 py-2 h-auto"
                  >
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2 inline-block" />
                    🌾 Farms ({MOCK_LOCATIONS.filter(loc => loc.type === 'farm').length})
                    <MapPin className="ml-2 h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarketsClick}
                    className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800 px-3 py-2 h-auto"
                  >
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2 inline-block" />
                    🏪 Markets ({MOCK_LOCATIONS.filter(loc => loc.type === 'marketplace').length})
                    <MapPin className="ml-2 h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOfficesClick}
                    className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-800 px-3 py-2 h-auto"
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 inline-block" />
                    🏢 Offices ({MOCK_LOCATIONS.filter(loc => loc.type === 'office').length})
                    <MapPin className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {userLocation ? 'Click to view nearest locations to you' : 'Covering Chennai, Thiruvallur & Kanchipuram regions'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};