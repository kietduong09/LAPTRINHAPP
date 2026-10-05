import { useState, useEffect, useCallback } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { DEFAULT_LOCATION, LOCATION_TIMEOUT_MS } from '../constants/config';

const { PERMISSIONS, RESULTS } = PermissionsAndroid;

const requestLocationPermission = async () => {
  if (Platform.OS !== 'android') {
    return (await Geolocation.requestAuthorization('whenInUse')) === 'granted';
  }
  // Android 12+ lets the user pick "approximate", so accept either permission.
  const results = await PermissionsAndroid.requestMultiple([
    PERMISSIONS.ACCESS_FINE_LOCATION,
    PERMISSIONS.ACCESS_COARSE_LOCATION,
  ]);
  return Object.values(results).some(result => result === RESULTS.GRANTED);
};

const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position =>
        resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
      reject,
      { enableHighAccuracy: false, timeout: LOCATION_TIMEOUT_MS, maximumAge: 60000 },
    );
  });

// status: 'loading' | 'ready' | 'denied' | 'error'
const useLocation = () => {
  const [state, setState] = useState({ status: 'loading', coords: null });

  const locate = useCallback(async () => {
    setState({ status: 'loading', coords: null });
    try {
      const granted = await requestLocationPermission();
      if (!granted) {
        setState({ status: 'denied', coords: null });
        return;
      }
      const coords = await getCurrentPosition();
      setState({ status: 'ready', coords });
    } catch (error) {
      setState({ status: 'error', coords: null });
    }
  }, []);

  const selectDefaultLocation = useCallback(() => {
    setState({ status: 'ready', coords: DEFAULT_LOCATION });
  }, []);

  useEffect(() => {
    locate();
  }, [locate]);

  return { ...state, retry: locate, selectDefaultLocation };
};

export default useLocation;
