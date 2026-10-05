import React from 'react';
import { ScrollView, RefreshControl, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import useLocation from '../hooks/useLocation';
import useWeather from '../hooks/useWeather';
import WeatherHeader from '../components/WeatherHeader';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import WeatherMetricsGrid from '../components/WeatherMetricsGrid';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { getGradient, spacing } from '../constants/theme';

const HomeScreen = ({ navigation }) => {
  const location = useLocation();
  const weather = useWeather(location.coords);

  const openDetail = item => navigation.navigate('Detail', { item });
  const isDay = weather.data ? weather.data.current.isDay : true;

  const renderContent = () => {
    if (location.status === 'loading') return <LoadingState message="Getting your location..." />;

    if (location.status === 'denied') {
      return (
        <ErrorState
          title="Location permission needed"
          message="Allow location access to see the weather where you are. If the permission dialog no longer appears, enable it in Settings."
          actions={[
            { label: 'Try again', onPress: location.retry, primary: true },
            { label: 'Open Settings', onPress: () => Linking.openSettings() },
            { label: 'Use default location', onPress: location.selectDefaultLocation },
          ]}
        />
      );
    }

    if (location.status === 'error') {
      return (
        <ErrorState
          title="Location unavailable"
          message="We could not get your location. Make sure GPS is turned on and try again."
          actions={[
            { label: 'Try again', onPress: location.retry, primary: true },
            { label: 'Use default location', onPress: location.selectDefaultLocation },
          ]}
        />
      );
    }

    if (weather.status === 'error') {
      return (
        <ErrorState
          message={weather.error}
          actions={[{ label: 'Try again', onPress: weather.retry, primary: true }]}
        />
      );
    }

    if (weather.status === 'empty') return <EmptyState onRetry={weather.retry} />;
    if (weather.status !== 'success') return <LoadingState message="Loading weather..." />;

    const { locationName, current, hourly, daily } = weather.data;
    return (
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={weather.refreshing} onRefresh={weather.refresh} />
        }
      >
        <WeatherHeader locationName={locationName} />
        <CurrentWeather weather={current} />
        <HourlyForecast items={hourly} onSelect={openDetail} />
        <DailyForecast items={daily} onSelect={openDetail} />
        <WeatherMetricsGrid weather={current} />
      </ScrollView>
    );
  };

  return (
    <LinearGradient colors={getGradient(isDay)} style={styles.container}>
      <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.lg },
});

export default HomeScreen;
