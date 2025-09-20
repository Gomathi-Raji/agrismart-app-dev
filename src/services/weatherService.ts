import { fetchWeatherApi } from 'openmeteo';

export interface WeatherData {
  current: {
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    showers: number;
    weather_code: number;
    pressure_msl: number;
    surface_pressure: number;
    cloud_cover: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  };
  minutely_15: {
    time: Date[];
    temperature_2m: Float32Array;
    relative_humidity_2m: Float32Array;
    dew_point_2m: Float32Array;
    apparent_temperature: Float32Array;
    precipitation: Float32Array;
    wind_gusts_10m: Float32Array;
    visibility: Float32Array;
    cape: Float32Array;
    lightning_potential: Float32Array;
    is_day: Float32Array;
    shortwave_radiation: Float32Array;
    direct_radiation: Float32Array;
    diffuse_radiation: Float32Array;
    direct_normal_irradiance: Float32Array;
    global_tilted_irradiance: Float32Array;
    terrestrial_radiation: Float32Array;
    sunshine_duration: Float32Array;
    freezing_level_height: Float32Array;
    snowfall_height: Float32Array;
    snowfall: Float32Array;
    rain: Float32Array;
    weather_code: Float32Array;
    wind_speed_10m: Float32Array;
    wind_speed_80m: Float32Array;
    wind_direction_10m: Float32Array;
    wind_direction_80m: Float32Array;
  };
  hourly: {
    time: Date[];
    temperature_2m: Float32Array;
    weather_code: Float32Array;
    wind_speed_10m: Float32Array;
    relative_humidity_2m: Float32Array;
    pressure_msl: Float32Array;
    wind_speed_80m: Float32Array;
    dew_point_2m: Float32Array;
    apparent_temperature: Float32Array;
    precipitation_probability: Float32Array;
    precipitation: Float32Array;
    surface_pressure: Float32Array;
    cloud_cover: Float32Array;
    cloud_cover_low: Float32Array;
    cloud_cover_mid: Float32Array;
    cloud_cover_high: Float32Array;
    rain: Float32Array;
    showers: Float32Array;
    snowfall: Float32Array;
    snow_depth: Float32Array;
    visibility: Float32Array;
    evapotranspiration: Float32Array;
    et0_fao_evapotranspiration: Float32Array;
    vapour_pressure_deficit: Float32Array;
    temperature_180m: Float32Array;
    temperature_120m: Float32Array;
    temperature_80m: Float32Array;
    wind_gusts_10m: Float32Array;
    wind_direction_180m: Float32Array;
    wind_direction_120m: Float32Array;
    wind_direction_80m: Float32Array;
    wind_direction_10m: Float32Array;
    wind_speed_180m: Float32Array;
    wind_speed_120m: Float32Array;
    soil_temperature_0cm: Float32Array;
    soil_temperature_6cm: Float32Array;
    soil_temperature_18cm: Float32Array;
    soil_temperature_54cm: Float32Array;
    soil_moisture_0_to_1cm: Float32Array;
    soil_moisture_1_to_3cm: Float32Array;
    soil_moisture_3_to_9cm: Float32Array;
    soil_moisture_9_to_27cm: Float32Array;
    soil_moisture_27_to_81cm: Float32Array;
    uv_index: Float32Array;
    uv_index_clear_sky: Float32Array;
    is_day: Float32Array;
    sunshine_duration: Float32Array;
    wet_bulb_temperature_2m: Float32Array;
    cape: Float32Array;
    lifted_index: Float32Array;
    convective_inhibition: Float32Array;
    freezing_level_height: Float32Array;
    boundary_layer_height: Float32Array;
    total_column_integrated_water_vapour: Float32Array;
    shortwave_radiation: Float32Array;
    direct_radiation: Float32Array;
    direct_normal_irradiance: Float32Array;
    terrestrial_radiation: Float32Array;
    global_tilted_irradiance: Float32Array;
    diffuse_radiation: Float32Array;
    direct_radiation_instant: Float32Array;
    shortwave_radiation_instant: Float32Array;
    diffuse_radiation_instant: Float32Array;
    direct_normal_irradiance_instant: Float32Array;
    global_tilted_irradiance_instant: Float32Array;
    terrestrial_radiation_instant: Float32Array;
  };
  location: {
    latitude: number;
    longitude: number;
    elevation: number;
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use Mapbox reverse geocoding for better accuracy
          const MAPBOX_API_KEY = 'pk.eyJ1IjoiaGFyaXNod2FyYW4iLCJhIjoiY21hZHhwZGs2MDF4YzJxczh2aDd0cWg1MyJ9.qcu0lpqVlZlC2WFxhwb1Pg';
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_API_KEY}`
          );
          const data = await response.json();
          const address = data.features?.[0]?.place_name || `${latitude.toFixed(6)}°N, ${longitude.toFixed(6)}°E`;
          
          resolve({
            latitude,
            longitude,
            address
          });
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          resolve({
            latitude,
            longitude,
            address: `${latitude.toFixed(6)}°N, ${longitude.toFixed(6)}°E`
          });
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Fallback to Delhi coordinates
        resolve({
          latitude: 28.7041,
          longitude: 77.1025,
          address: 'New Delhi, India'
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

export const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const params = {
    latitude,
    longitude,
    hourly: ["temperature_2m", "weather_code", "wind_speed_10m", "relative_humidity_2m", "pressure_msl", "wind_speed_80m", "dew_point_2m", "apparent_temperature", "precipitation_probability", "precipitation", "surface_pressure", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high", "rain", "showers", "snowfall", "snow_depth", "visibility", "evapotranspiration", "et0_fao_evapotranspiration", "vapour_pressure_deficit", "temperature_180m", "temperature_120m", "temperature_80m", "wind_gusts_10m", "wind_direction_180m", "wind_direction_120m", "wind_direction_80m", "wind_direction_10m", "wind_speed_180m", "wind_speed_120m", "soil_temperature_0cm", "soil_temperature_6cm", "soil_temperature_18cm", "soil_temperature_54cm", "soil_moisture_0_to_1cm", "soil_moisture_1_to_3cm", "soil_moisture_3_to_9cm", "soil_moisture_9_to_27cm", "soil_moisture_27_to_81cm", "uv_index", "uv_index_clear_sky", "is_day", "sunshine_duration", "wet_bulb_temperature_2m", "cape", "lifted_index", "convective_inhibition", "freezing_level_height", "boundary_layer_height", "total_column_integrated_water_vapour", "shortwave_radiation", "direct_radiation", "direct_normal_irradiance", "terrestrial_radiation", "global_tilted_irradiance", "diffuse_radiation", "direct_radiation_instant", "shortwave_radiation_instant", "diffuse_radiation_instant", "direct_normal_irradiance_instant", "global_tilted_irradiance_instant", "terrestrial_radiation_instant"],
    current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "weather_code", "pressure_msl", "surface_pressure", "cloud_cover", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
    minutely_15: ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation", "wind_gusts_10m", "visibility", "cape", "lightning_potential", "is_day", "shortwave_radiation", "direct_radiation", "diffuse_radiation", "direct_normal_irradiance", "global_tilted_irradiance", "terrestrial_radiation", "global_tilted_irradiance_instant", "terrestrial_radiation_instant", "direct_normal_irradiance_instant", "diffuse_radiation_instant", "direct_radiation_instant", "shortwave_radiation_instant", "sunshine_duration", "freezing_level_height", "snowfall_height", "snowfall", "rain", "weather_code", "wind_speed_10m", "wind_speed_80m", "wind_direction_10m", "wind_direction_80m"],
    past_days: 92,
    forecast_hours: 120, // 5 days
    past_hours: 24,
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Process first location
  const response = responses[0];

  // Attributes for timezone and location
  const responseLatitude = response.latitude();
  const responseLongitude = response.longitude();
  const elevation = response.elevation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const minutely15 = response.minutely15()!;
  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData: WeatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      is_day: current.variables(3)!.value(),
      precipitation: current.variables(4)!.value(),
      rain: current.variables(5)!.value(),
      showers: current.variables(6)!.value(),
      weather_code: current.variables(7)!.value(),
      pressure_msl: current.variables(8)!.value(),
      surface_pressure: current.variables(9)!.value(),
      cloud_cover: current.variables(10)!.value(),
      wind_speed_10m: current.variables(11)!.value(),
      wind_direction_10m: current.variables(12)!.value(),
      wind_gusts_10m: current.variables(13)!.value(),
    },
    minutely_15: {
      time: [...Array((Number(minutely15.timeEnd()) - Number(minutely15.time())) / minutely15.interval())].map(
        (_, i) => new Date((Number(minutely15.time()) + i * minutely15.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m: minutely15.variables(0)!.valuesArray(),
      relative_humidity_2m: minutely15.variables(1)!.valuesArray(),
      dew_point_2m: minutely15.variables(2)!.valuesArray(),
      apparent_temperature: minutely15.variables(3)!.valuesArray(),
      precipitation: minutely15.variables(4)!.valuesArray(),
      wind_gusts_10m: minutely15.variables(5)!.valuesArray(),
      visibility: minutely15.variables(6)!.valuesArray(),
      cape: minutely15.variables(7)!.valuesArray(),
      lightning_potential: minutely15.variables(8)!.valuesArray(),
      is_day: minutely15.variables(9)!.valuesArray(),
      shortwave_radiation: minutely15.variables(10)!.valuesArray(),
      direct_radiation: minutely15.variables(11)!.valuesArray(),
      diffuse_radiation: minutely15.variables(12)!.valuesArray(),
      direct_normal_irradiance: minutely15.variables(13)!.valuesArray(),
      global_tilted_irradiance: minutely15.variables(14)!.valuesArray(),
      terrestrial_radiation: minutely15.variables(15)!.valuesArray(),
      sunshine_duration: minutely15.variables(22)!.valuesArray(),
      freezing_level_height: minutely15.variables(23)!.valuesArray(),
      snowfall_height: minutely15.variables(24)!.valuesArray(),
      snowfall: minutely15.variables(25)!.valuesArray(),
      rain: minutely15.variables(26)!.valuesArray(),
      weather_code: minutely15.variables(27)!.valuesArray(),
      wind_speed_10m: minutely15.variables(28)!.valuesArray(),
      wind_speed_80m: minutely15.variables(29)!.valuesArray(),
      wind_direction_10m: minutely15.variables(30)!.valuesArray(),
      wind_direction_80m: minutely15.variables(31)!.valuesArray(),
    },
    hourly: {
      time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      weather_code: hourly.variables(1)!.valuesArray(),
      wind_speed_10m: hourly.variables(2)!.valuesArray(),
      relative_humidity_2m: hourly.variables(3)!.valuesArray(),
      pressure_msl: hourly.variables(4)!.valuesArray(),
      wind_speed_80m: hourly.variables(5)!.valuesArray(),
      dew_point_2m: hourly.variables(6)!.valuesArray(),
      apparent_temperature: hourly.variables(7)!.valuesArray(),
      precipitation_probability: hourly.variables(8)!.valuesArray(),
      precipitation: hourly.variables(9)!.valuesArray(),
      surface_pressure: hourly.variables(10)!.valuesArray(),
      cloud_cover: hourly.variables(11)!.valuesArray(),
      cloud_cover_low: hourly.variables(12)!.valuesArray(),
      cloud_cover_mid: hourly.variables(13)!.valuesArray(),
      cloud_cover_high: hourly.variables(14)!.valuesArray(),
      rain: hourly.variables(15)!.valuesArray(),
      showers: hourly.variables(16)!.valuesArray(),
      snowfall: hourly.variables(17)!.valuesArray(),
      snow_depth: hourly.variables(18)!.valuesArray(),
      visibility: hourly.variables(19)!.valuesArray(),
      evapotranspiration: hourly.variables(20)!.valuesArray(),
      et0_fao_evapotranspiration: hourly.variables(21)!.valuesArray(),
      vapour_pressure_deficit: hourly.variables(22)!.valuesArray(),
      temperature_180m: hourly.variables(23)!.valuesArray(),
      temperature_120m: hourly.variables(24)!.valuesArray(),
      temperature_80m: hourly.variables(25)!.valuesArray(),
      wind_gusts_10m: hourly.variables(26)!.valuesArray(),
      wind_direction_180m: hourly.variables(27)!.valuesArray(),
      wind_direction_120m: hourly.variables(28)!.valuesArray(),
      wind_direction_80m: hourly.variables(29)!.valuesArray(),
      wind_direction_10m: hourly.variables(30)!.valuesArray(),
      wind_speed_180m: hourly.variables(31)!.valuesArray(),
      wind_speed_120m: hourly.variables(32)!.valuesArray(),
      soil_temperature_0cm: hourly.variables(33)!.valuesArray(),
      soil_temperature_6cm: hourly.variables(34)!.valuesArray(),
      soil_temperature_18cm: hourly.variables(35)!.valuesArray(),
      soil_temperature_54cm: hourly.variables(36)!.valuesArray(),
      soil_moisture_0_to_1cm: hourly.variables(37)!.valuesArray(),
      soil_moisture_1_to_3cm: hourly.variables(38)!.valuesArray(),
      soil_moisture_3_to_9cm: hourly.variables(39)!.valuesArray(),
      soil_moisture_9_to_27cm: hourly.variables(40)!.valuesArray(),
      soil_moisture_27_to_81cm: hourly.variables(41)!.valuesArray(),
      uv_index: hourly.variables(42)!.valuesArray(),
      uv_index_clear_sky: hourly.variables(43)!.valuesArray(),
      is_day: hourly.variables(44)!.valuesArray(),
      sunshine_duration: hourly.variables(45)!.valuesArray(),
      wet_bulb_temperature_2m: hourly.variables(46)!.valuesArray(),
      cape: hourly.variables(47)!.valuesArray(),
      lifted_index: hourly.variables(48)!.valuesArray(),
      convective_inhibition: hourly.variables(49)!.valuesArray(),
      freezing_level_height: hourly.variables(50)!.valuesArray(),
      boundary_layer_height: hourly.variables(51)!.valuesArray(),
      total_column_integrated_water_vapour: hourly.variables(52)!.valuesArray(),
      shortwave_radiation: hourly.variables(53)!.valuesArray(),
      direct_radiation: hourly.variables(54)!.valuesArray(),
      direct_normal_irradiance: hourly.variables(55)!.valuesArray(),
      terrestrial_radiation: hourly.variables(56)!.valuesArray(),
      global_tilted_irradiance: hourly.variables(57)!.valuesArray(),
      diffuse_radiation: hourly.variables(58)!.valuesArray(),
      direct_radiation_instant: hourly.variables(59)!.valuesArray(),
      shortwave_radiation_instant: hourly.variables(60)!.valuesArray(),
      diffuse_radiation_instant: hourly.variables(61)!.valuesArray(),
      direct_normal_irradiance_instant: hourly.variables(62)!.valuesArray(),
      global_tilted_irradiance_instant: hourly.variables(63)!.valuesArray(),
      terrestrial_radiation_instant: hourly.variables(64)!.valuesArray(),
    },
    location: {
      latitude: responseLatitude,
      longitude: responseLongitude,
      elevation: elevation,
    }
  };

  return weatherData;
};

// Weather code to condition mapping
export const getWeatherCondition = (code: number): { condition: string; icon: string } => {
  const weatherCodes: Record<number, { condition: string; icon: string }> = {
    0: { condition: "Clear sky", icon: "sun" },
    1: { condition: "Mainly clear", icon: "sun" },
    2: { condition: "Partly cloudy", icon: "cloud" },
    3: { condition: "Overcast", icon: "cloud" },
    45: { condition: "Fog", icon: "cloud" },
    48: { condition: "Depositing rime fog", icon: "cloud" },
    51: { condition: "Light drizzle", icon: "cloud-rain" },
    53: { condition: "Moderate drizzle", icon: "cloud-rain" },
    55: { condition: "Dense drizzle", icon: "cloud-rain" },
    56: { condition: "Light freezing drizzle", icon: "cloud-rain" },
    57: { condition: "Dense freezing drizzle", icon: "cloud-rain" },
    61: { condition: "Slight rain", icon: "cloud-rain" },
    63: { condition: "Moderate rain", icon: "cloud-rain" },
    65: { condition: "Heavy rain", icon: "cloud-rain" },
    66: { condition: "Light freezing rain", icon: "cloud-rain" },
    67: { condition: "Heavy freezing rain", icon: "cloud-rain" },
    71: { condition: "Slight snow fall", icon: "cloud-snow" },
    73: { condition: "Moderate snow fall", icon: "cloud-snow" },
    75: { condition: "Heavy snow fall", icon: "cloud-snow" },
    77: { condition: "Snow grains", icon: "cloud-snow" },
    80: { condition: "Slight rain showers", icon: "cloud-rain" },
    81: { condition: "Moderate rain showers", icon: "cloud-rain" },
    82: { condition: "Violent rain showers", icon: "cloud-rain" },
    85: { condition: "Slight snow showers", icon: "cloud-snow" },
    86: { condition: "Heavy snow showers", icon: "cloud-snow" },
    95: { condition: "Thunderstorm", icon: "zap" },
    96: { condition: "Thunderstorm with slight hail", icon: "zap" },
    99: { condition: "Thunderstorm with heavy hail", icon: "zap" },
  };

  return weatherCodes[code] || { condition: "Unknown", icon: "cloud" };
};