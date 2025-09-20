import { useState, useEffect } from 'react';
import { getWeatherData, getCurrentLocation, WeatherData, LocationData } from '@/services/weatherService';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat?: number, lng?: number, address?: string) => {
    try {
      setLoading(true);
      setError(null);

      let locationData: LocationData;
      
      if (lat && lng) {
        // Use provided coordinates and address if available
        if (address) {
          locationData = {
            latitude: lat,
            longitude: lng,
            address
          };
        } else {
          // Get address from coordinates using reverse geocoding for better accuracy
          try {
            const MAPBOX_API_KEY = 'pk.eyJ1IjoiaGFyaXNod2FyYW4iLCJhIjoiY21hZHhwZGs2MDF4YzJxczh2aDd0cWg1MyJ9.qcu0lpqVlZlC2WFxhwb1Pg';
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_API_KEY}`
            );
            const data = await response.json();
            const resolvedAddress = data.features?.[0]?.place_name || `${lat.toFixed(6)}°N, ${lng.toFixed(6)}°E`;
            
            locationData = {
              latitude: lat,
              longitude: lng,
              address: resolvedAddress
            };
          } catch (error) {
            console.error('Reverse geocoding failed:', error);
            locationData = {
              latitude: lat,
              longitude: lng,
              address: `${lat.toFixed(6)}°N, ${lng.toFixed(6)}°E`
            };
          }
        }
      } else {
        locationData = await getCurrentLocation();
      }

      setLocation(locationData);
      
      const weather = await getWeatherData(locationData.latitude, locationData.longitude);
      setWeatherData(weather);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return {
    weatherData,
    location,
    loading,
    error,
    refetch: (lat?: number, lng?: number, address?: string) => fetchWeather(lat, lng, address),
  };
};