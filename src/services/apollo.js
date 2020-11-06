import 'cross-fetch/polyfill';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {posters} from '@services/constants';

const API_URL = 'https://swapi.apis.guru/';

const cache = new InMemoryCache({
  typePolicies: {
    Film: {
      fields: {
        poster: {
          read(_, variables) {
            // map episodeID to local posters
            return posters[variables.readField('episodeID')];
          },
        },
        rank: {
          read() {
            // create random number between 4.1 to 5 for movie ranking
            return (Math.random() * (4.1 - 5) + 5).toFixed(1);
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: API_URL,
  cache,
});

export {client};
