export const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
export const GEOCODING_API_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export const HOURS_TO_SHOW = 24;
export const DAYS_TO_SHOW = 7;
export const REQUEST_TIMEOUT_MS = 15000;
export const LOCATION_TIMEOUT_MS = 15000;

// Only used when the user denies location permission AND taps "Use default location".
export const DEFAULT_LOCATION = { latitude: 21.0285, longitude: 105.8542, name: 'Hanoi' };
