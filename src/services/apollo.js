import {ApolloClient, InMemoryCache} from '@apollo/client';

const API_URL = 'https://swapi.apis.guru/';

const cache = new InMemoryCache({
  typePolicies: { // Type policy map
    Film: {
      fields: { // Field policy map for the Product type
        isInCart: { // Field policy for the isInCart field
          read(_, { variables }) { // The read function for the isInCart field
            return Math.random()
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: API_URL,
  cache,
});

export {client};
