import { GEOCODING_API_URL } from '../constants/config';

// Open-Meteo has no reverse geocoding, so we use BigDataCloud (free, no API key).
// Never throws: if it fails the app shows coordinates instead of a place name.
export const fetchPlaceName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${GEOCODING_API_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.city || data.locality || data.principalSubdivision || null;
  } catch (error) {
    return null;
  }
};
