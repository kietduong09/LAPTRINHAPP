import {
  Sun, Moon, CloudSun, CloudMoon, Cloud, CloudFog,
  CloudDrizzle, CloudRain, CloudSnow, CloudLightning,
} from 'lucide-react-native';

// Open-Meteo WMO weather codes -> label + icon. The only place that knows about codes.
const WEATHER_CODES = {
  0: { label: 'Sunny', nightLabel: 'Clear', Icon: Sun, NightIcon: Moon },
  1: { label: 'Mostly clear', Icon: CloudSun, NightIcon: CloudMoon },
  2: { label: 'Partly cloudy', Icon: CloudSun, NightIcon: CloudMoon },
  3: { label: 'Cloudy', Icon: Cloud },
  45: { label: 'Fog', Icon: CloudFog },
  48: { label: 'Fog', Icon: CloudFog },
  51: { label: 'Light drizzle', Icon: CloudDrizzle },
  53: { label: 'Drizzle', Icon: CloudDrizzle },
  55: { label: 'Heavy drizzle', Icon: CloudDrizzle },
  56: { label: 'Freezing drizzle', Icon: CloudDrizzle },
  57: { label: 'Freezing drizzle', Icon: CloudDrizzle },
  61: { label: 'Light rain', Icon: CloudRain },
  63: { label: 'Rain', Icon: CloudRain },
  65: { label: 'Heavy rain', Icon: CloudRain },
  66: { label: 'Freezing rain', Icon: CloudRain },
  67: { label: 'Freezing rain', Icon: CloudRain },
  71: { label: 'Light snow', Icon: CloudSnow },
  73: { label: 'Snow', Icon: CloudSnow },
  75: { label: 'Heavy snow', Icon: CloudSnow },
  77: { label: 'Snow grains', Icon: CloudSnow },
  80: { label: 'Light showers', Icon: CloudRain },
  81: { label: 'Showers', Icon: CloudRain },
  82: { label: 'Heavy showers', Icon: CloudRain },
  85: { label: 'Snow showers', Icon: CloudSnow },
  86: { label: 'Snow showers', Icon: CloudSnow },
  95: { label: 'Thunderstorm', Icon: CloudLightning },
  96: { label: 'Thunderstorm with hail', Icon: CloudLightning },
  97: { label: 'Heavy thunderstorm', Icon: CloudLightning },
  99: { label: 'Thunderstorm with hail', Icon: CloudLightning },
};

const UNKNOWN_WEATHER = { label: 'Unknown', Icon: Cloud };

const findEntry = code => WEATHER_CODES[code] || UNKNOWN_WEATHER;

export const getWeatherDescription = (code, isDay = true) => {
  const entry = findEntry(code);
  return !isDay && entry.nightLabel ? entry.nightLabel : entry.label;
};

export const getWeatherIcon = (code, isDay = true) => {
  const entry = findEntry(code);
  return !isDay && entry.NightIcon ? entry.NightIcon : entry.Icon;
};
