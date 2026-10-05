import { useState, useEffect, useCallback } from 'react';
import { fetchWeather } from '../api/weatherApi';
import { fetchPlaceName } from '../api/geocodingApi';
import { parseWeatherData } from '../utils/weatherParser';
import { formatCoordinates } from '../utils/formatters';

// status: 'idle' | 'loading' | 'success' | 'empty' | 'error'
const useWeather = coords => {
  const [state, setState] = useState({ status: 'idle', data: null, error: null });
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    async (isRefresh = false) => {
      if (!coords) return;
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setState({ status: 'loading', data: null, error: null });
      }

      try {
        const { latitude, longitude, name } = coords;
        const [raw, placeName] = await Promise.all([
          fetchWeather(latitude, longitude),
          name ? Promise.resolve(name) : fetchPlaceName(latitude, longitude),
        ]);
        const data = parseWeatherData(raw, placeName || formatCoordinates(latitude, longitude));
        setState(
          data
            ? { status: 'success', data, error: null }
            : { status: 'empty', data: null, error: null },
        );
      } catch (error) {
        setState({ status: 'error', data: null, error: error.message });
      } finally {
        setRefreshing(false);
      }
    },
    [coords],
  );

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, refreshing, refresh: () => load(true), retry: () => load() };
};

export default useWeather;
