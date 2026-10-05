import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Droplets } from 'lucide-react-native';
import WeatherIcon from './WeatherIcon';
import { getWeatherDescription } from '../utils/weatherCode';
import { formatTemperature, formatPercent } from '../utils/formatters';
import { colors, spacing, fontSize } from '../constants/theme';

const DailyForecastItem = ({ item, onPress }) => (
  <Pressable style={styles.row} onPress={onPress}>
    <View style={styles.day}>
      <Text style={styles.dayName}>{item.label}</Text>
      <Text style={styles.date}>{item.dateLabel}</Text>
    </View>
    <WeatherIcon code={item.weatherCode} isDay />
    <View style={styles.condition}>
      <Text style={styles.conditionText} numberOfLines={1}>
        {getWeatherDescription(item.weatherCode)}
      </Text>
      <View style={styles.rain}>
        <Droplets size={12} color={colors.textSecondary} />
        <Text style={styles.rainText}>{formatPercent(item.precipitationProbability)}</Text>
      </View>
    </View>
    <Text style={styles.temperature}>
      {formatTemperature(item.temperatureMax)}
      <Text style={styles.min}>  {formatTemperature(item.temperatureMin)}</Text>
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, gap: spacing.md },
  day: { width: 56 },
  dayName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
  date: { fontSize: fontSize.xs, color: colors.textSecondary },
  condition: { flex: 1 },
  conditionText: { fontSize: fontSize.sm, color: colors.textPrimary },
  rain: { flexDirection: 'row', alignItems: 'center' },
  rainText: { marginLeft: 2, fontSize: fontSize.xs, color: colors.textSecondary },
  temperature: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
  min: { fontWeight: '400', color: colors.textSecondary },
});

export default DailyForecastItem;
