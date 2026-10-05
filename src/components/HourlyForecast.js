import React from 'react';
import { FlatList } from 'react-native';
import { Clock } from 'lucide-react-native';
import Card from './Card';
import HourlyForecastItem from './HourlyForecastItem';

const HourlyForecast = ({ items, onSelect }) => (
  <Card title={`${items.length}-hour forecast`} Icon={Clock}>
    <FlatList
      horizontal
      data={items}
      keyExtractor={item => item.time}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <HourlyForecastItem item={item} onPress={() => onSelect(item)} />}
    />
  </Card>
);

export default HourlyForecast;
