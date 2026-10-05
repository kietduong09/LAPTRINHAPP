import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import { getGradient, colors } from '../constants/theme';

const Stack = createNativeStackNavigator();

const getDetailOptions = ({ route }) => ({
  title: route.params.item.title,
  headerTintColor: colors.textPrimary,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: getGradient(route.params.item.isDay)[0] },
});

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={getDetailOptions} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
