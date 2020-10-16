import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
// import {createStackNavigator} from '@react-navigation/stack';

import ListScreen from '@screens/list';
import DetailScreen from '@screens/detail';

const Stack = createSharedElementStackNavigator();

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
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          header={null}
          sharedElementsConfig={(route, otherRoute, showing) => {
            const {movie} = route.params;
            return [
              `item.${movie.node.episodeID}.poster`,
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
