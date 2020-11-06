import 'react-native';
import React from 'react';
import App from '../src/App';
import {ApolloProvider} from '@apollo/client';
import {client} from '@services/apollo';
import renderer from 'react-test-renderer';

it('renders app correctly', () => {
  renderer.create(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  );
});
