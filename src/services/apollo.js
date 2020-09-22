import {ApolloClient, InMemoryCache} from '@apollo/client';

const API_URL = 'https://swapi.apis.guru/';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: API_URL,
  cache,
});

export {client};
