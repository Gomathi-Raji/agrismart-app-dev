import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Loader2, MapPin, Thermometer, Droplets, Wind } from "lucide-react";
import { fetchWeatherApi } from 'openmeteo';

export function WeatherWidget() {
  const [weather, setWeather] = useState<{
    temperature: number;
    condition: string;
    icon: string;
    humidity?: number;
    windSpeed?: number;
    location?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const getWeather = async () => {
      try {
        // Get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                const weatherResponse = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', {
                  latitude: lat,
                  longitude: lng,
                  current: ['temperature_2m', 'weather_code', 'relative_humidity_2m', 'wind_speed_10m'],
                  forecast_days: 1
                });

                const response = weatherResponse[0];
                const current = response.current()!;
                
                const temperature = Math.round(current.variables(0)!.value());
                const weatherCode = current.variables(1)!.value();
                const humidity = Math.round(current.variables(2)!.value());
                const windSpeed = Math.round(current.variables(3)!.value());
                
                // Get location name (simplified - in production you'd use reverse geocoding)
                const locationName = "Current Location";
                
                setWeather({
                  temperature,
                  condition: getWeatherCondition(weatherCode),
                  icon: getWeatherIcon(weatherCode),
                  humidity,
                  windSpeed,
                  location: locationName
                });
                setLoading(false);
              } catch (error) {
                console.error('Weather fetch error:', error);
                setLoading(false);
              }
            },
            () => {
              // Fallback to default location (Delhi)
              setLoading(false);
            }
          );
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Weather error:', error);
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  const getWeatherIcon = (weatherCode: number): string => {
    if (weatherCode === 0) return '☀️';
    if (weatherCode >= 1 && weatherCode <= 3) return '⛅';
    if (weatherCode >= 45 && weatherCode <= 48) return '🌫️';
    if (weatherCode >= 51 && weatherCode <= 67) return '🌧️';
    if (weatherCode >= 71 && weatherCode <= 77) return '🌨️';
    if (weatherCode >= 80 && weatherCode <= 82) return '🌦️';
    if (weatherCode >= 95 && weatherCode <= 99) return '⛈️';
    return '🌤️';
  };

  const getWeatherCondition = (weatherCode: number): string => {
    if (weatherCode === 0) return 'Clear';
    if (weatherCode >= 1 && weatherCode <= 3) return 'Cloudy';
    if (weatherCode >= 45 && weatherCode <= 48) return 'Foggy';
    if (weatherCode >= 51 && weatherCode <= 67) return 'Rainy';
    if (weatherCode >= 71 && weatherCode <= 77) return 'Snowy';
    if (weatherCode >= 80 && weatherCode <= 82) return 'Showers';
    if (weatherCode >= 95 && weatherCode <= 99) return 'Thunderstorm';
    return 'Partly Cloudy';
  };

  if (loading) {
    return (
      <Button variant="ghost" size="sm" className="h-9 px-2 text-xs">
        <Loader2 className="h-3 w-3 animate-spin mr-1" />
        <span className="hidden sm:inline">Loading...</span>
      </Button>
    );
  }

  if (!weather) {
    return (
      <Button variant="ghost" size="sm" className="h-9 px-2 text-xs">
        <Cloud className="h-3 w-3 mr-1" />
        <span className="hidden sm:inline">N/A</span>
      </Button>
    );
  }

  return (
    <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-2 text-xs hover:bg-accent/50">
          <span className="mr-1" style={{ fontSize: '12px' }}>{weather.icon}</span>
          <span className="font-medium">{weather.temperature}°</span>
          <span className="hidden sm:inline ml-1 text-muted-foreground">{weather.condition}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Weather Details
          </DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">{weather.icon}</div>
              <div className="text-3xl font-bold">{weather.temperature}°C</div>
              <div className="text-muted-foreground">{weather.condition}</div>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                {weather.location}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {weather.humidity && (
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium">{weather.humidity}%</div>
                    <div className="text-xs text-muted-foreground">Humidity</div>
                  </div>
                </div>
              )}
              
              {weather.windSpeed && (
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Wind className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="text-sm font-medium">{weather.windSpeed} km/h</div>
                    <div className="text-xs text-muted-foreground">Wind</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground text-center mt-4">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}