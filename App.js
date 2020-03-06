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

import { ApolloProvider } from "react-apollo";

import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'

const API_URL = 'https://swapi-graphql.netlify.com/.netlify/functions/index'

const client = new ApolloClient({
  link: createHttpLink({
    uri: API_URL,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainStackNavigator />
    </ApolloProvider>
  )
}
