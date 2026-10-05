import React from 'react';
import { CloudSun } from 'lucide-react-native';
import StateMessage from './StateMessage';

const EmptyState = ({ onRetry }) => (
  <StateMessage
    Icon={CloudSun}
    title="No weather data"
    message="We could not find a forecast for this location."
    actions={[{ label: 'Try again', onPress: onRetry, primary: true }]}
  />
);

export default EmptyState;
