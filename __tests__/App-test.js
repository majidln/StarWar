import 'react-native';
import React from 'react';
import App from '../src/App';

import renderer from 'react-test-renderer';

// render app test case
it('renders correctly', () => {
  jest.useFakeTimers();
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
