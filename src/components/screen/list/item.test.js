import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MovieItem from '@screen-component/list/item';

it('should render without error', () => {
  renderer.create(<MovieItem item={{}} />);
});
