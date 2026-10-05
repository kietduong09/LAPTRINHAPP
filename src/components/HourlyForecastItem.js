import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Droplets } from 'lucide-react-native';
import WeatherIcon from './WeatherIcon';
import { formatTemperature, formatPercent } from '../utils/formatters';
import { colors, spacing, fontSize } from '../constants/theme';

const HourlyForecastItem = ({ item, onPress }) => (
  <Pressable style={styles.container} onPress={onPress}>
    <Text style={styles.time}>{item.label}</Text>
    <WeatherIcon code={item.weatherCode} isDay={item.isDay} />
    <Text style={styles.temperature}>{formatTemperature(item.temperature)}</Text>
    <View style={styles.rain}>
      <Droplets size={12} color={colors.textSecondary} />
      <Text style={styles.rainText}>{formatPercent(item.precipitationProbability)}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: 64, paddingVertical: spacing.sm, gap: spacing.sm },
  time: { fontSize: fontSize.sm, color: colors.textSecondary },
  temperature: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
  rain: { flexDirection: 'row', alignItems: 'center' },
  rainText: { marginLeft: 2, fontSize: fontSize.xs, color: colors.textSecondary },
});

export default HourlyForecastItem;
