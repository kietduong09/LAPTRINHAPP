import { WEATHER_API_URL, DAYS_TO_SHOW, REQUEST_TIMEOUT_MS } from '../constants/config';

const CURRENT_FIELDS = [
  'temperature_2m', 'apparent_temperature', 'relative_humidity_2m', 'precipitation',
  'weather_code', 'wind_speed_10m', 'wind_direction_10m', 'is_day',
];
const HOURLY_FIELDS = [
  'temperature_2m', 'apparent_temperature', 'precipitation_probability', 'precipitation',
  'weather_code', 'relative_humidity_2m', 'wind_speed_10m', 'wind_direction_10m',
  'uv_index', 'is_day',
];
const DAILY_FIELDS = [
  'weather_code', 'temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_max',
  'precipitation_sum', 'precipitation_probability_max', 'uv_index_max',
  'wind_speed_10m_max', 'wind_direction_10m_dominant',
];

const buildUrl = (latitude, longitude) =>
  `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&timezone=auto` +
  `&forecast_days=${DAYS_TO_SHOW}` +
  `&current=${CURRENT_FIELDS.join(',')}` +
  `&hourly=${HOURLY_FIELDS.join(',')}` +
  `&daily=${DAILY_FIELDS.join(',')}`;

const toFriendlyError = error => {
  if (error.name === 'AbortError') return new Error('The request took too long. Please try again.');
  if (error.message === 'Network request failed') {
    return new Error('No internet connection. Check your network and try again.');
  }
  return error;
};

// Returns the raw Open-Meteo response. Parsing is done in utils/weatherParser.js.
export const fetchWeather = async (latitude, longitude) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(buildUrl(latitude, longitude), { signal: controller.signal });
    if (!response.ok) throw new Error(`Weather service error (${response.status}).`);

    const data = await response.json();
    if (!data || !data.current) throw new Error('The weather service returned invalid data.');
    return data;
  } catch (error) {
    throw toFriendlyError(error);
  } finally {
    clearTimeout(timer);
  }
};
