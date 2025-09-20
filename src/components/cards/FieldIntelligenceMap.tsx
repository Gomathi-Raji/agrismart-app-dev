import React, { useEffect, useRef, useState } from 'react';
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
  Zap
} from 'lucide-react';
import { fetchWeatherApi } from 'openmeteo';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Add custom styles for map popups
const customPopupStyles = `
  .mapboxgl-popup-content {
    padding: 0;
    border-radius: 0.5rem;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  }
  .mapboxgl-popup-close-button {
    padding: 4px 8px;
    color: rgba(107, 114, 128, 1);
  }
  .mapboxgl-popup-close-button:hover {
    background-color: rgba(0,0,0,0.05);
    color: rgba(17, 24, 39, 1);
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

// Custom mock locations
const MOCK_LOCATIONS: MockLocation[] = [
  { lat: 31.1571, lng: 75.3512, type: 'farm', name: 'Organic Farm', description: 'Sustainable farming practices' },
  { lat: 31.1371, lng: 75.3312, type: 'marketplace', name: 'Farmers Market', description: 'Local produce market' },
  { lat: 31.1471, lng: 75.3612, type: 'office', name: 'AgriSmart Office', description: 'Regional support center' },
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
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('satellite');
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [nearbyCount, setNearbyCount] = useState<NearbyCount>({ farms: 0, markets: 0 });
  const [weatherLayers, setWeatherLayers] = useState<WeatherOverlay[]>([
    { id: 'clouds', name: 'Cloud Cover', icon: Cloud, enabled: true, opacity: 0.6 },
    { id: 'precipitation', name: 'Precipitation', icon: CloudRain, enabled: true, opacity: 0.7 },
    { id: 'temperature', name: 'Temperature', icon: Thermometer, enabled: false, opacity: 0.5 },
    { id: 'wind', name: 'Wind Speed', icon: Wind, enabled: false, opacity: 0.5 },
  ]);

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
              mapboxMap.flyTo({
                center: [lng, lat],
                zoom: 10,
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
              updateLocationWeather(PUNJAB_CENTER.lat, PUNJAB_CENTER.lng, mapboxMarker);
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
                  <div class="p-3">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="h-8 w-8 rounded-full flex items-center justify-center ${
                        loc.type === 'farm' ? 'bg-green-100' :
                        loc.type === 'marketplace' ? 'bg-red-100' : 'bg-blue-100'
                      }">
                        ${
                          loc.type === 'farm' ? 
                          '<svg class="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 18h18M8 12l3-3 2 2 3-3 3 3M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/></svg>' :
                          loc.type === 'marketplace' ? 
                          '<svg class="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/><path d="m12 6 1-3 1 3M15 6l1-3 1 3"/></svg>' :
                          '<svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16M3 7h18M8 12h8M8 16h8"/></svg>'
                        }
                      </div>
                      <div>
                        <div class="font-bold text-sm">${loc.name}</div>
                        <div class="text-xs text-gray-500">${loc.type.charAt(0).toUpperCase() + loc.type.slice(1)}</div>
                      </div>
                    </div>
                    <div class="text-sm text-gray-600 bg-gray-50 rounded-md p-2">
                      ${loc.description}
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

      // Update popup
      const weatherIcon = getWeatherIcon(weatherData.weatherCode);
      const weatherCondition = getWeatherCondition(weatherData.weatherCode);
      const infoContent = `
        <div class="p-4 min-w-[280px] max-w-[320px]">
          <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-3 mb-3">
            <div class="flex items-center gap-3">
              <div class="text-3xl">${weatherIcon}</div>
              <div>
                <div class="font-bold text-xl">${weatherData.temperature}°C</div>
                <div class="text-sm text-gray-600">${weatherCondition}</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mb-3">
            <div class="bg-gray-50 rounded-md p-2">
              <div class="text-xs text-gray-500 mb-1">Wind Speed</div>
              <div class="font-medium flex items-center gap-1">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
                </svg>
                ${weatherData.windSpeed} km/h
              </div>
            </div>
            <div class="bg-gray-50 rounded-md p-2">
              <div class="text-xs text-gray-500 mb-1">Humidity</div>
              <div class="font-medium flex items-center gap-1">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 21a7 7 0 0 0 7-7c0-2.76-2.5-5.52-7-11-4.5 5.48-7 8.24-7 11a7 7 0 0 0 7 7Z"/>
                </svg>
                ${weatherData.humidity}%
              </div>
            </div>
            <div class="bg-gray-50 rounded-md p-2">
              <div class="text-xs text-gray-500 mb-1">Cloud Cover</div>
              <div class="font-medium flex items-center gap-1">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 15.5"/>
                </svg>
                ${weatherData.cloudCover}%
              </div>
            </div>
            <div class="bg-gray-50 rounded-md p-2">
              <div class="text-xs text-gray-500 mb-1">Time</div>
              <div class="font-medium flex items-center gap-1">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><path d="m12 6v6l4 2"/>
                </svg>
                ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1 text-xs text-gray-500 border-t border-gray-100 pt-2">
            <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
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
    <Card className={`${className} shadow-lg`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Field Intelligence Map
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid lg:grid-cols-[1fr_300px] gap-0">
          <div className="relative h-[60vh] lg:h-[70vh] rounded-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-10">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Loading map...</p>
                </div>
              </div>
            )}
            
            {/* Map Controls - Top Left */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-2 shadow-lg z-10">
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={mapType === 'roadmap' ? 'default' : 'outline'}
                  onClick={() => changeMapType('roadmap')}
                  className="h-8 px-2 hover:bg-muted transition-colors"
                  title="Road Map"
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={mapType === 'satellite' ? 'default' : 'outline'}
                  onClick={() => changeMapType('satellite')}
                  className="h-8 px-2 hover:bg-muted transition-colors"
                  title="Satellite View"
                >
                  <Satellite className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={mapType === 'hybrid' ? 'default' : 'outline'}
                  onClick={() => changeMapType('hybrid')}
                  className="h-8 px-2 hover:bg-muted transition-colors"
                  title="Hybrid View"
                >
                  <Layers className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Map Controls - Bottom Left */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-2 shadow-lg z-10">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="bg-green-500/10 text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1 inline-block" />
                  Farms
                </Badge>
                <Badge variant="outline" className="bg-red-500/10 text-red-600">
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-1 inline-block" />
                  Markets
                </Badge>
              </div>
            </div>

            {loadingWeather && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg z-10">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm">Loading weather...</span>
                </div>
              </div>
            )}

            <div ref={mapRef} className="w-full h-full" />
          </div>

          {/* Weather Controls Sidebar */}
          <div className="lg:border-l border-border">
            <div className="p-4 space-y-4">
              {/* Current Weather Section */}
              {weatherData && (
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-4">
                  <div className="absolute top-0 right-0 p-4 text-4xl opacity-20">
                    {getWeatherIcon(weatherData.weatherCode)}
                  </div>
                  <div className="relative space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{getWeatherIcon(weatherData.weatherCode)}</div>
                      <div>
                        <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                        <div className="text-sm text-muted-foreground">
                          {getWeatherCondition(weatherData.weatherCode)}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-md bg-background/50 p-2">
                        <div className="text-xs text-muted-foreground mb-1">Wind Speed</div>
                        <div className="font-medium flex items-center gap-1">
                          <Wind className="h-3 w-3" />
                          {weatherData.windSpeed} km/h
                        </div>
                      </div>
                      <div className="rounded-md bg-background/50 p-2">
                        <div className="text-xs text-muted-foreground mb-1">Humidity</div>
                        <div className="font-medium flex items-center gap-1">
                          <CloudRain className="h-3 w-3" />
                          {weatherData.humidity}%
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground border-t border-border/50 pt-2 mt-2">
                      <MapPin className="h-3 w-3 inline-block mr-1" />
                      {weatherData.address}
                    </div>
                  </div>
                </div>
              )}

              {/* Weather Layers Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" />
                    Weather Layers
                  </h3>
                </div>
                <div className="space-y-3">
                  {weatherLayers.map((layer) => {
                    const IconComponent = layer.icon;
                    return (
                      <div key={layer.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-primary/5 flex items-center justify-center">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <Label className="text-sm font-medium">{layer.name}</Label>
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
                          <div className="pl-10">
                            <input
                              type="range"
                              min="0.1"
                              max="1"
                              step="0.1"
                              value={layer.opacity}
                              onChange={(e) => updateLayerOpacity(layer.id, parseFloat(e.target.value))}
                              className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border bg-card p-2 text-card-foreground">
                  <div className="text-xs text-muted-foreground mb-1">Nearby Farms</div>
                  <div className="text-2xl font-bold text-green-600">{nearbyCount.farms}</div>
                </div>
                <div className="rounded-lg border bg-card p-2 text-card-foreground">
                  <div className="text-xs text-muted-foreground mb-1">Local Markets</div>
                  <div className="text-2xl font-bold text-green-600">{nearbyCount.markets}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};