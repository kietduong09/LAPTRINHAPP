import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { colors, spacing, fontSize } from '../constants/theme';

const WeatherHeader = ({ locationName }) => (
  <View style={styles.container}>
    <MapPin size={18} color={colors.textPrimary} />
    <Text style={styles.name} numberOfLines={1}>{locationName}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  name: { marginLeft: spacing.xs, fontSize: fontSize.lg, fontWeight: '600', color: colors.textPrimary },
});

export default WeatherHeader;
