import { HOURS_TO_SHOW, DAYS_TO_SHOW } from '../constants/config';
import { formatTime, formatWeekday, formatDate } from './formatters';

// Index of the current hour inside hourly.time. API data starts at 00:00,
// so we must find "now" instead of taking the first 24 items.
const findCurrentHourIndex = (hourlyTimes, currentTime) => {
  const currentHour = currentTime.slice(0, 13); // "YYYY-MM-DDTHH"
  return hourlyTimes.findIndex(time => time.slice(0, 13) >= currentHour);
};

const getAverageHumidityByDate = hourly => {
  const totals = {};
  hourly.time.forEach((time, index) => {
    const date = time.slice(0, 10);
    const entry = totals[date] || (totals[date] = { sum: 0, count: 0 });
    entry.sum += hourly.relative_humidity_2m[index] || 0;
    entry.count += 1;
  });
  const averages = {};
  Object.keys(totals).forEach(date => {
    averages[date] = Math.round(totals[date].sum / totals[date].count);
  });
  return averages;
};

export const getCurrentWeather = (raw, hourIndex) => {
  const { current, hourly, daily } = raw;
  return {
    temperature: current.temperature_2m,
    apparentTemperature: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    windDirection: current.wind_direction_10m,
    precipitation: current.precipitation,
    weatherCode: current.weather_code,
    isDay: current.is_day === 1,
    // "current" has no UV / rain chance, so we take them from the current hour.
    uvIndex: hourly.uv_index[hourIndex],
    precipitationProbability: hourly.precipitation_probability[hourIndex],
    high: daily.temperature_2m_max[0],
    low: daily.temperature_2m_min[0],
  };
};

const toHourItem = (hourly, index, isNow) => {
  const time = hourly.time[index];
  return {
    time,
    label: isNow ? 'Now' : formatTime(time),
    title: `${formatWeekday(time)} ${formatTime(time)}`,
    weatherCode: hourly.weather_code[index],
    isDay: hourly.is_day[index] === 1,
    temperature: hourly.temperature_2m[index],
    apparentTemperature: hourly.apparent_temperature[index],
    precipitationProbability: hourly.precipitation_probability[index],
    precipitation: hourly.precipitation[index],
    humidity: hourly.relative_humidity_2m[index],
    windSpeed: hourly.wind_speed_10m[index],
    windDirection: hourly.wind_direction_10m[index],
    uvIndex: hourly.uv_index[index],
  };
};

export const getHourlyForecast = (hourly, startIndex) => {
  const endIndex = Math.min(startIndex + HOURS_TO_SHOW, hourly.time.length);
  const items = [];
  for (let index = startIndex; index < endIndex; index += 1) {
    items.push(toHourItem(hourly, index, index === startIndex));
  }
  return items;
};

export const getDailyForecast = (daily, hourly) => {
  const humidityByDate = getAverageHumidityByDate(hourly);
  return daily.time.slice(0, DAYS_TO_SHOW).map((date, index) => ({
    time: date,
    label: index === 0 ? 'Today' : formatWeekday(date),
    dateLabel: formatDate(date),
    title: `${formatWeekday(date)}, ${formatDate(date)}`,
    weatherCode: daily.weather_code[index],
    isDay: true,
    temperatureMax: daily.temperature_2m_max[index],
    temperatureMin: daily.temperature_2m_min[index],
    apparentTemperature: daily.apparent_temperature_max[index],
    precipitationProbability: daily.precipitation_probability_max[index],
    precipitation: daily.precipitation_sum[index],
    uvIndex: daily.uv_index_max[index],
    windSpeed: daily.wind_speed_10m_max[index],
    windDirection: daily.wind_direction_10m_dominant[index],
    humidity: humidityByDate[date],
  }));
};

// Returns null when the response has no usable forecast data (-> Empty state).
export const parseWeatherData = (raw, locationName) => {
  const { current, hourly, daily } = raw;
  if (!hourly?.time?.length || !daily?.time?.length) return null;

  const hourIndex = findCurrentHourIndex(hourly.time, current.time);
  if (hourIndex === -1) return null;

  return {
    locationName,
    current: getCurrentWeather(raw, hourIndex),
    hourly: getHourlyForecast(hourly, hourIndex),
    daily: getDailyForecast(daily, hourly),
  };
};
