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
      },
    },
  },
});

const client = new ApolloClient({
  uri: API_URL,
  cache,
});

export {client};
