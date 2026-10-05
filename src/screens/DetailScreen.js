import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CurrentWeather from '../components/CurrentWeather';
import WeatherMetricsGrid from '../components/WeatherMetricsGrid';
import { getGradient, spacing } from '../constants/theme';

// `item` is an hourly or daily forecast item picked on the Home screen.
const DetailScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <LinearGradient colors={getGradient(item.isDay)} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <CurrentWeather weather={item} />
        <WeatherMetricsGrid weather={item} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.lg },
});

export default DetailScreen;
