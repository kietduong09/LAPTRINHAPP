import React from 'react';
import { CloudOff } from 'lucide-react-native';
import StateMessage from './StateMessage';

const ErrorState = ({ title = 'Something went wrong', message, actions }) => (
  <StateMessage Icon={CloudOff} title={title} message={message} actions={actions} />
);

export default ErrorState;
