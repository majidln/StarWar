import 'react-native';
import React from 'react';
import MovieList from '../src/screen/movie/index';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  jest.useFakeTimers()
  const tree = renderer.create(
    <MovieList />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});