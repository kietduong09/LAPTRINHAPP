import React from 'react';
import { getWeatherIcon } from '../utils/weatherCode';
import { colors } from '../constants/theme';

const WeatherIcon = ({ code, isDay, size = 28 }) => {
  const Icon = getWeatherIcon(code, isDay);
  return <Icon size={size} color={colors.textPrimary} />;
};

export default WeatherIcon;
