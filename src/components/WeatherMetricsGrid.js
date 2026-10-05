import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Thermometer, ThermometerSun, Droplets, Wind, Compass, Sun, CloudRain, Umbrella,
} from 'lucide-react-native';
import WeatherMetric from './WeatherMetric';
import {
  formatTemperature, formatPercent, formatWindSpeed, formatRain, formatUv,
  getWindDirection, getUvLevel,
} from '../utils/formatters';
import { colors, spacing, fontSize } from '../constants/theme';

const MAX_UV_INDEX = 11;
const PERCENT_MAX = 100;

const isNumber = value => typeof value === 'number';
const toProgress = (value, max) => (isNumber(value) ? value / max : undefined);

// `weather` can be the current weather, an hourly item or a daily item.
const WeatherMetricsGrid = ({ weather }) => {
  const isDaily = weather.temperatureMax !== undefined;
  const temperature = isDaily
    ? `${formatTemperature(weather.temperatureMax)} / ${formatTemperature(weather.temperatureMin)}`
    : formatTemperature(weather.temperature);

  return (
    <View>
      <Text style={styles.title}>Weather metrics</Text>
      <View style={styles.grid}>
        <WeatherMetric Icon={Thermometer} label={isDaily ? 'High / Low' : 'Temperature'} value={temperature} />
        <WeatherMetric
          Icon={ThermometerSun}
          label="Feels like"
          value={formatTemperature(weather.apparentTemperature)}
        />
        <WeatherMetric
          Icon={Droplets}
          label="Humidity"
          value={formatPercent(weather.humidity)}
          progress={toProgress(weather.humidity, PERCENT_MAX)}
        />
        <WeatherMetric Icon={Wind} label="Wind speed" value={formatWindSpeed(weather.windSpeed)} />
        <WeatherMetric
          Icon={Compass}
          label="Wind direction"
          value={getWindDirection(weather.windDirection)}
          caption={isNumber(weather.windDirection) ? `${Math.round(weather.windDirection)}°` : ''}
        />
        <WeatherMetric
          Icon={Sun}
          label="UV index"
          value={formatUv(weather.uvIndex)}
          caption={getUvLevel(weather.uvIndex)}
          progress={toProgress(weather.uvIndex, MAX_UV_INDEX)}
        />
        <WeatherMetric Icon={CloudRain} label="Rain" value={formatRain(weather.precipitation)} />
        <WeatherMetric
          Icon={Umbrella}
          label="Chance of rain"
          value={formatPercent(weather.precipitationProbability)}
          progress={toProgress(weather.precipitationProbability, PERCENT_MAX)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.md,
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: spacing.md },
});

export default WeatherMetricsGrid;
