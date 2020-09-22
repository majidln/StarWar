import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ListScreen from '../screen/index';
import DetailScreen from '../screen/detail';

import theme from './../services/theme';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: theme.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: theme.secondary,
          headerBackTitleVisible: false,
        }}
        headerMode="float">
        <Stack.Screen
          name="Home"
          component={ListScreen}
          options={ListScreen.navigationOptions}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={DetailScreen.navigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
