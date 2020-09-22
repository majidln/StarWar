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

import {ApolloProvider} from 'react-apollo';

import {client} from '@services/apollo';
console.log('client is', client);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainStackNavigator />
    </ApolloProvider>
  );
}
