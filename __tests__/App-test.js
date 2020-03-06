import 'react-native';
import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

// global.fetch = jest.fn(() => new Promise(resolve => resolve()));
// jest.mock('react-native-gesture-handler', () => {});


it('renders correctly', () => {
  const tree = renderer.create(
    <App />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});