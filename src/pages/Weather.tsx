import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow,
  Zap,
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  Calendar,
  MapPin,
  Bell,
  Leaf,
  Wheat,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  RefreshCw,
  Map,
  Gauge,
  Zap as Lightning,
  Waves,
  TreePine
} from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { getWeatherCondition } from "@/services/weatherService";
import { WeatherMapModal } from "@/components/WeatherMapModal";

export default function Weather() {
  const { weatherData, location, loading, error, refetch } = useWeather();
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, address: string} | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Icon mapping for weather conditions
  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'sun': return Sun;
      case 'cloud': return Cloud;
      case 'cloud-rain': return CloudRain;
      case 'cloud-snow': return CloudSnow;
      case 'zap': return Zap;
      default: return Cloud;
    }
  };

  // Process forecast data from hourly data (group by days)
  const forecastData = useMemo(() => {
    if (!weatherData) return [];
    
    const dailyData: any[] = [];
    const processedDays = new Set<string>();
    
    for (let i = 0; i < weatherData.hourly.time.length; i += 24) {
      if (dailyData.length >= 5) break;
      
      const date = weatherData.hourly.time[i];
      const dayKey = date.toDateString();
      
      if (processedDays.has(dayKey)) continue;
      processedDays.add(dayKey);
      
      // Calculate day's high/low temperatures from next 24 hours
      let high = -Infinity;
      let low = Infinity;
      let totalPrecipitation = 0;
      
      for (let j = i; j < Math.min(i + 24, weatherData.hourly.time.length); j++) {
        const temp = weatherData.hourly.temperature_2m[j];
        if (temp > high) high = temp;
        if (temp < low) low = temp;
        totalPrecipitation += weatherData.hourly.precipitation_probability[j];
      }
      
      const weatherCode = weatherData.hourly.weather_code[i];
      const weatherCondition = getWeatherCondition(weatherCode);
      const WeatherIcon = getWeatherIcon(weatherCondition.icon);
      
      dailyData.push({
        day: i === 0 ? "Today" : date.toLocaleDateString('en-US', { weekday: 'short' }),
        high: Math.round(high),
        low: Math.round(low),
        condition: weatherCondition.condition,
        icon: WeatherIcon,
        rainChance: Math.round(totalPrecipitation / 24)
      });
    }
    
    return dailyData;
  }, [weatherData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Getting weather data...</p>
        </div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">{error || "Failed to load weather data"}</p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const currentCondition = getWeatherCondition(weatherData.current.weather_code);
  const CurrentWeatherIcon = getWeatherIcon(currentCondition.icon);

  // Handle location selection from map
  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setSelectedLocation({ lat, lng, address });
    refetch(lat, lng, address);
    setIsMapOpen(false);
  };

  const currentWeather = {
    temperature: Math.round(weatherData.current.temperature_2m),
    condition: currentCondition.condition,
    humidity: Math.round(weatherData.current.relative_humidity_2m),
    windSpeed: Math.round(weatherData.current.wind_speed_10m),
    visibility: Math.round(weatherData.hourly.visibility[0] / 1000) || 10, // Convert to km
    uvIndex: Math.round(weatherData.hourly.uv_index[0] || 0),
    icon: CurrentWeatherIcon,
    location: selectedLocation?.address || location?.address || "Getting your precise location..."
  };

  // Advanced agricultural data
  const agriculturalData = {
    soilTemperature: Math.round(weatherData.hourly.soil_temperature_0cm[0] || 0),
    soilMoisture: Math.round((weatherData.hourly.soil_moisture_0_to_1cm[0] || 0) * 100),
    evapotranspiration: Math.round((weatherData.hourly.evapotranspiration[0] || 0) * 10) / 10,
    solarRadiation: Math.round(weatherData.hourly.shortwave_radiation[0] || 0),
    dewPoint: Math.round(weatherData.hourly.dew_point_2m[0] || 0),
    cape: Math.round(weatherData.hourly.cape[0] || 0),
    visibility: Math.round(weatherData.hourly.visibility[0] / 1000) || 10,
  };

  const farmingAlerts = [
    {
      type: "warning",
      title: "Heavy Rainfall Expected",
      description: "Protect your crops from waterlogging. Consider drainage measures.",
      time: "Next 2 days",
      action: "Take Action",
      icon: AlertTriangle
    },
    {
      type: "success",
      title: "Perfect Sowing Conditions",
      description: "Ideal weather for wheat sowing in your region.",
      time: "This week",
      action: "Start Sowing",
      icon: CheckCircle
    },
    {
      type: "info",
      title: "Pest Alert",
      description: "Current humidity levels may increase pest activity.",
      time: "Monitor crops",
      action: "Learn More",
      icon: Info
    }
  ];

  const cropRecommendations = [
    {
      crop: "Wheat",
      action: "Sow",
      reason: "Optimal temperature and moisture",
      timing: "Next 7 days",
      icon: Wheat,
      confidence: 95
    },
    {
      crop: "Rice",
      action: "Wait",
      reason: "Need more rainfall for transplanting",
      timing: "Wait 2 weeks",
      icon: Leaf,
      confidence: 80
    },
    {
      crop: "Sugarcane",
      action: "Harvest",
      reason: "Perfect weather for harvesting",
      timing: "This month",
      icon: Leaf,
      confidence: 90
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Weather & Farming Guide</h1>
            <p className="text-primary-foreground/90 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {currentWeather.location}
            </p>
          </div>
          <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Map className="h-4 w-4 mr-2" />
                Change Location
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Select Weather Location</DialogTitle>
              </DialogHeader>
              <WeatherMapModal 
                onLocationSelect={handleLocationSelect}
                currentLocation={selectedLocation || (location ? {
                  lat: location.latitude,
                  lng: location.longitude,
                  address: location.address
                } : undefined)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Current Weather */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Main Weather */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <CurrentWeatherIcon className="h-16 w-16 text-primary" />
                  <div>
                    <p className="text-4xl font-bold">{currentWeather.temperature}°C</p>
                    <p className="text-muted-foreground">{currentWeather.condition}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">{currentWeather.location}</span>
                </div>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                  <Droplets className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="font-semibold">{currentWeather.humidity}%</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                  <Wind className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Wind Speed</p>
                    <p className="font-semibold">{currentWeather.windSpeed} km/h</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                  <Eye className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Visibility</p>
                    <p className="font-semibold">{currentWeather.visibility} km</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                  <Sun className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">UV Index</p>
                    <p className="font-semibold">{currentWeather.uvIndex}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              5-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {forecastData.map((day, index) => {
                const IconComponent = day.icon;
                return (
                  <div key={index} className="text-center p-4 bg-accent/30 rounded-lg">
                    <p className="font-medium mb-2">{day.day}</p>
                    <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground mb-1">{day.condition}</p>
                    <div className="flex justify-center gap-2 text-sm">
                      <span className="font-semibold">{day.high}°</span>
                      <span className="text-muted-foreground">{day.low}°</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-2 text-xs">
                      <Droplets className="h-3 w-3 text-primary" />
                      <span>{day.rainChance}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Farming Alerts */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Farming Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farmingAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === "warning"
                      ? "border-warning bg-warning/5"
                      : alert.type === "success"
                      ? "border-success bg-success/5"
                      : "border-info bg-info/5"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <alert.icon
                        className={`h-5 w-5 mt-0.5 ${
                          alert.type === "warning"
                            ? "text-warning"
                            : alert.type === "success"
                            ? "text-success"
                            : "text-info"
                        }`}
                      />
                      <div>
                        <h4 className="font-semibold">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{alert.description}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={alert.type === "warning" ? "border-warning text-warning" : ""}
                    >
                      {alert.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Crop Recommendations */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              AI Crop Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {cropRecommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gradient-card rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <rec.icon className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">{rec.crop}</h4>
                      <Badge
                        variant={
                          rec.action === "Sow" || rec.action === "Harvest"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {rec.action}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                  <p className="text-sm font-medium mb-3">{rec.timing}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">AI Confidence</span>
                    <span className="text-sm font-bold text-primary">{rec.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Agricultural Data */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-primary" />
              Advanced Agricultural Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                <Thermometer className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Soil Temp</p>
                  <p className="font-semibold">{agriculturalData.soilTemperature}°C</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                <Droplets className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Soil Moisture</p>
                  <p className="font-semibold">{agriculturalData.soilMoisture}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                <Waves className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Evapotranspiration</p>
                  <p className="font-semibold">{agriculturalData.evapotranspiration} mm</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                <Sun className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Solar Radiation</p>
                  <p className="font-semibold">{agriculturalData.solarRadiation} W/m²</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                <Thermometer className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Dew Point</p>
                  <p className="font-semibold">{agriculturalData.dewPoint}°C</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                <Lightning className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">CAPE</p>
                  <p className="font-semibold">{agriculturalData.cape} J/kg</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                <Eye className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Visibility</p>
                  <p className="font-semibold">{agriculturalData.visibility} km</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
                <Gauge className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Pressure</p>
                  <p className="font-semibold">{Math.round(weatherData.current.pressure_msl)} hPa</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Weather Actions</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Map className="h-5 w-5" />
                    <span className="text-sm">Change Location</span>
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Bell className="h-5 w-5" />
                <span className="text-sm">Weather Alerts</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Crop Calendar</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Leaf className="h-5 w-5" />
                <span className="text-sm">Pest Forecast</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}