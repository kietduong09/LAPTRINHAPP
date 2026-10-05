import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarDays } from 'lucide-react-native';
import Card from './Card';
import DailyForecastItem from './DailyForecastItem';
import { colors } from '../constants/theme';

// Plain map (not FlatList): the list is short and sits inside the screen's ScrollView.
const DailyForecast = ({ items, onSelect }) => (
  <Card title={`${items.length}-day forecast`} Icon={CalendarDays}>
    {items.map((item, index) => (
      <View key={item.time} style={index > 0 && styles.divider}>
        <DailyForecastItem item={item} onPress={() => onSelect(item)} />
      </View>
    ))}
  </Card>
);

const styles = StyleSheet.create({
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.divider },
});

export default DailyForecast;
