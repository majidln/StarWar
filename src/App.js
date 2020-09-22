/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react';
import MainStackNavigator from './navigation';
import {ApolloProvider} from '@apollo/client';
import {client} from '@services/apollo';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainStackNavigator />
    </ApolloProvider>
  );
}
