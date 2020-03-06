/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react'
import MainStackNavigator from './src/navigation';

import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({ uri: 'https://swapi-graphql.netlify.com/.netlify/functions/index' });

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainStackNavigator />
    </ApolloProvider>
  )
}
