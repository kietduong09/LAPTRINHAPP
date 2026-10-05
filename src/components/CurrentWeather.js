import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeatherIcon from './WeatherIcon';
import { getWeatherDescription } from '../utils/weatherCode';
import { formatTemperature } from '../utils/formatters';
import { colors, spacing, fontSize } from '../constants/theme';

// Works for both the current weather and a daily item (high/low) or hourly item.
const CurrentWeather = ({ weather }) => {
  const high = weather.high ?? weather.temperatureMax;
  const low = weather.low ?? weather.temperatureMin;
  const temperature = weather.temperature ?? high;

  return (
    <View style={styles.container}>
      <WeatherIcon code={weather.weatherCode} isDay={weather.isDay} size={56} />
      <Text style={styles.temperature}>{formatTemperature(temperature)}</Text>
      <Text style={styles.condition}>{getWeatherDescription(weather.weatherCode, weather.isDay)}</Text>
      {high !== undefined && (
        <Text style={styles.detail}>H: {formatTemperature(high)}   L: {formatTemperature(low)}</Text>
      )}
      <Text style={styles.detail}>Feels like {formatTemperature(weather.apparentTemperature)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: spacing.xl },
  temperature: { fontSize: fontSize.hero, fontWeight: '300', color: colors.textPrimary },
  condition: { fontSize: fontSize.lg, fontWeight: '600', color: colors.textPrimary },
  detail: { marginTop: spacing.xs, fontSize: fontSize.md, color: colors.textSecondary },
});

export default CurrentWeather;
