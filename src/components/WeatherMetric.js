import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize } from '../constants/theme';

// progress: optional number from 0 to 1 that draws a small bar under the value.
const WeatherMetric = ({ Icon, label, value, caption, progress }) => (
  <View style={styles.tile}>
    <View style={styles.header}>
      <Icon size={16} color={colors.textSecondary} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
    {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    {progress !== undefined && (
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }]} />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  tile: {
    width: '48%',
    minHeight: 110,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  label: { marginLeft: spacing.sm, fontSize: fontSize.sm, color: colors.textSecondary },
  value: { marginTop: spacing.sm, fontSize: fontSize.xl, fontWeight: '600', color: colors.textPrimary },
  caption: { fontSize: fontSize.sm, color: colors.textSecondary },
  track: { height: 4, marginTop: spacing.sm, borderRadius: 2, backgroundColor: colors.track },
  fill: { height: 4, borderRadius: 2, backgroundColor: colors.textPrimary },
});

export default WeatherMetric;
