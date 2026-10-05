const EMPTY_VALUE = '--';
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const COMPASS_POINTS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const DEGREES_PER_POINT = 45;
const UV_LEVELS = [
  { max: 3, label: 'Low' },
  { max: 6, label: 'Moderate' },
  { max: 8, label: 'High' },
  { max: 11, label: 'Very high' },
];

const isMissing = value => value === null || value === undefined || Number.isNaN(value);

// Open-Meteo times look like "2026-10-05T14:00" (already in the location's timezone),
// so we read them as text instead of letting the device timezone change them.
const parseDate = isoString => {
  const [year, month, day] = isoString.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatTime = isoString => isoString.slice(11, 16);
export const formatWeekday = isoString => WEEKDAYS[parseDate(isoString).getDay()];
export const formatDate = isoString => {
  const date = parseDate(isoString);
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
};

export const formatTemperature = value => (isMissing(value) ? EMPTY_VALUE : `${Math.round(value)}°`);
export const formatPercent = value => (isMissing(value) ? EMPTY_VALUE : `${Math.round(value)}%`);
export const formatWindSpeed = value => (isMissing(value) ? EMPTY_VALUE : `${Math.round(value)} km/h`);
export const formatRain = value => (isMissing(value) ? EMPTY_VALUE : `${value.toFixed(1)} mm`);
export const formatUv = value => (isMissing(value) ? EMPTY_VALUE : value.toFixed(1));
export const formatCoordinates = (latitude, longitude) =>
  `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;

export const getWindDirection = degrees => {
  if (isMissing(degrees)) return EMPTY_VALUE;
  const index = Math.round(degrees / DEGREES_PER_POINT) % COMPASS_POINTS.length;
  return COMPASS_POINTS[index];
};

export const getUvLevel = value => {
  if (isMissing(value)) return '';
  const level = UV_LEVELS.find(item => value < item.max);
  return level ? level.label : 'Extreme';
};
