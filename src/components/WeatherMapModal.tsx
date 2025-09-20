import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Search, 
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
  Zap
} from 'lucide-react';
import { fetchWeatherApi } from 'openmeteo';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface WeatherMapModalProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  currentLocation?: { lat: number; lng: number; address: string };
}

const MAPBOX_API_KEY = 'pk.eyJ1IjoiaGFyaXNod2FyYW4iLCJhIjoiY21hZHhwZGs2MDF4YzJxczh2aDd0cWg1MyJ9.qcu0lpqVlZlC2WFxhwb1Pg';

// Weather overlay types
interface WeatherOverlay {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  opacity: number;
}

export const WeatherMapModal: React.FC<WeatherMapModalProps> = ({ 
  onLocationSelect, 
  currentLocation 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [weatherLayers, setWeatherLayers] = useState<WeatherOverlay[]>([
    { id: 'clouds', name: 'Cloud Cover', icon: Cloud, enabled: true, opacity: 0.6 },
    { id: 'precipitation', name: 'Precipitation', icon: CloudRain, enabled: true, opacity: 0.7 },
    { id: 'temperature', name: 'Temperature', icon: Thermometer, enabled: false, opacity: 0.5 },
    { id: 'wind', name: 'Wind Speed', icon: Wind, enabled: false, opacity: 0.5 },
  ]);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('satellite');
  const [currentWeatherData, setCurrentWeatherData] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

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
          center: currentLocation
            ? [currentLocation.lng, currentLocation.lat]
            : [77.1025, 28.7041], // [lng, lat] Delhi
          zoom: 8,
        });

        mapboxMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
        mapboxMap.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }));

        const mapboxMarker = new mapboxgl.Marker({ draggable: true })
          .setLngLat(
            currentLocation
              ? [currentLocation.lng, currentLocation.lat]
              : [77.1025, 28.7041]
          )
          .addTo(mapboxMap);

        // Prepare popup
        popupRef.current = new mapboxgl.Popup({ closeOnClick: false, closeButton: true });

        // Handle map clicks
        mapboxMap.on('click', async (event) => {
          const { lng, lat } = event.lngLat;
          mapboxMarker.setLngLat([lng, lat]);
          await updateLocationWeather(lat, lng, mapboxMarker);
        });

        // Handle marker drag
        mapboxMarker.on('dragend', async () => {
          const { lng, lat } = mapboxMarker.getLngLat();
          await updateLocationWeather(lat, lng, mapboxMarker);
        });

        mapboxMap.on('load', async () => {
          setIsLoading(false);
          if (currentLocation) {
            await updateLocationWeather(currentLocation.lat, currentLocation.lng, mapboxMarker);
          }
        });

        setMap(mapboxMap);
        setMarker(mapboxMarker);
      } catch (error) {
        console.error('Error loading Mapbox:', error);
        setIsLoading(false);
      }
    };

    initMap();
  }, [currentLocation, mapType]);

  // Update weather data for location
  const updateLocationWeather = async (
    lat: number,
    lng: number,
    mapMarker: mapboxgl.Marker
  ) => {
    setLoadingWeather(true);
    try {
      // Get address from coordinates via Mapbox with high precision
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

      // Get weather data from OpenMeteo
      const weatherResponse = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', {
        latitude: lat,
        longitude: lng,
        current: ['temperature_2m', 'weather_code', 'wind_speed_10m', 'relative_humidity_2m', 'cloud_cover'],
        hourly: ['temperature_2m', 'precipitation_probability', 'weather_code'],
        forecast_days: 3
      });

      const response = weatherResponse[0];
      const current = response.current()!;
      
      const weatherData = {
        temperature: Math.round(current.variables(0)!.value()),
        weatherCode: current.variables(1)!.value(),
        windSpeed: Math.round(current.variables(2)!.value()),
        humidity: Math.round(current.variables(3)!.value()),
        cloudCover: Math.round(current.variables(4)!.value()),
        address
      };

      setCurrentWeatherData(weatherData);

      // Update popup
      const weatherIcon = getWeatherIcon(weatherData.weatherCode);
      const weatherCondition = getWeatherCondition(weatherData.weatherCode);
      const infoContent = `
        <div class="p-4 min-w-[200px]">
          <div class="flex items-center gap-2 mb-2">
            <div class="text-2xl">${weatherIcon}</div>
            <div>
              <div class="font-bold text-lg">${weatherData.temperature}°C</div>
              <div class="text-sm text-gray-600">${weatherCondition}</div>
            </div>
          </div>
          <div class="space-y-1 text-sm">
            <div>Wind: ${weatherData.windSpeed} km/h</div>
            <div>Humidity: ${weatherData.humidity}%</div>
            <div>Cloud Cover: ${weatherData.cloudCover}%</div>
          </div>
          <div class="mt-2 pt-2 border-t text-xs text-gray-500">
            ${address}
          </div>
        </div>
      `;

      if (!popupRef.current) {
        popupRef.current = new mapboxgl.Popup({ closeOnClick: false, closeButton: true });
      }

      popupRef.current
        .setLngLat([lng, lat])
        .setHTML(infoContent)
        .addTo(map!);

      // Notify parent
      onLocationSelect(lat, lng, address);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoadingWeather(false);
    }
  };

  // Handle search functionality
  const handleSearch = async () => {
    if (!searchValue.trim() || !map) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchValue)}.json?access_token=${MAPBOX_API_KEY}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        const address = data.features[0].place_name;

        map.setCenter([lng, lat]);
        map.setZoom(10);
        if (marker) {
          marker.setLngLat([lng, lat]);
          await updateLocationWeather(lat, lng, marker);
        }
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          if (map && marker) {
            map.setCenter([lng, lat]);
            map.setZoom(10);
            marker.setLngLat([lng, lat]);
            await updateLocationWeather(lat, lng, marker);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
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

  // Change map type
  const changeMapType = (newType: 'roadmap' | 'satellite' | 'hybrid') => {
    setMapType(newType);
    if (map) {
      const styleUrl = newType === 'satellite'
        ? 'mapbox://styles/mapbox/satellite-v9'
        : newType === 'hybrid'
        ? 'mapbox://styles/mapbox/satellite-streets-v12'
        : 'mapbox://styles/mapbox/streets-v12';
      map.setStyle(styleUrl);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Controls */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="Search for a location..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button onClick={handleSearch} variant="outline">
          Search
        </Button>
        <Button onClick={getCurrentLocation} variant="outline">
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-10">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Loading weather map...</p>
                    </div>
                  </div>
                )}
                <div ref={mapRef} className="w-full h-full" />
                
                {/* Map Type Controls */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-2 shadow-lg">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={mapType === 'roadmap' ? 'default' : 'outline'}
                      onClick={() => changeMapType('roadmap')}
                    >
                      <MapIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={mapType === 'satellite' ? 'default' : 'outline'}
                      onClick={() => changeMapType('satellite')}
                    >
                      <Satellite className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={mapType === 'hybrid' ? 'default' : 'outline'}
                      onClick={() => changeMapType('hybrid')}
                    >
                      <Layers className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Loading Weather Overlay */}
                {loadingWeather && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm">Loading weather...</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weather Controls Panel */}
        <div className="space-y-4">
          {/* Current Weather Info */}
          {currentWeatherData && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Current Weather</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getWeatherIcon(currentWeatherData.weatherCode)}</div>
                  <div>
                    <div className="text-2xl font-bold">{currentWeatherData.temperature}°C</div>
                    <div className="text-sm text-muted-foreground">
                      {getWeatherCondition(currentWeatherData.weatherCode)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Wind</div>
                    <div className="font-medium">{currentWeatherData.windSpeed} km/h</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Humidity</div>
                    <div className="font-medium">{currentWeatherData.humidity}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Weather Layer Controls */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Weather Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weatherLayers.map((layer) => {
                const IconComponent = layer.icon;
                return (
                  <div key={layer.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-primary" />
                        <Label className="text-sm font-medium">{layer.name}</Label>
                      </div>
                      <Switch
                        checked={layer.enabled}
                        onCheckedChange={() => toggleWeatherLayer(layer.id)}
                      />
                    </div>
                    {layer.enabled && (
                      <div className="ml-6">
                        <Label className="text-xs text-muted-foreground">
                          Opacity: {Math.round(layer.opacity * 100)}%
                        </Label>
                        <div className="mt-1">
                          <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.1"
                            value={layer.opacity}
                            onChange={(e) => updateLayerOpacity(layer.id, parseFloat(e.target.value))}
                            className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">How to Use</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-1">
              <p>• Click anywhere to get weather data</p>
              <p>• Drag the marker to fine-tune position</p>
              <p>• Toggle weather layers for insights</p>
              <p>• Use search or GPS for quick navigation</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Weather utilities
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

const getWeatherCondition = (weatherCode: number): string => {
  const conditionMap: Record<number, string> = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing rime fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    66: 'Light freezing rain', 67: 'Heavy freezing rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 77: 'Snow grains',
    80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    85: 'Slight snow showers', 86: 'Heavy snow showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
  };
  return conditionMap[weatherCode] || 'Unknown';
};