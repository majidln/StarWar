import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ListScreen from '@screens/list';
// import DetailScreen from '@screens/detail';

import theme from '@services/theme';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}
        headerMode="float">
        <Stack.Screen
          name="Home"
          component={ListScreen}
          options={ListScreen.navigationOptions}
          header={null}
        />
        {/* <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={DetailScreen.navigationOptions}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
