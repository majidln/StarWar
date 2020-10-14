import {Dimensions} from 'react-native';

export const posters = {
  4: require('./../../assets/poster/4.png'),
  5: require('./../../assets/poster/5.png'),
  6: require('./../../assets/poster/3.png'),
  1: require('./../../assets/poster/4.png'),
  2: require('./../../assets/poster/5.png'),
  3: require('./../../assets/poster/6.png'),
};

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.72;
const SPACING = 10;
const BACKDROP_HEIGHT = height * 0.6;

export {width, height, ITEM_SIZE, SPACING, BACKDROP_HEIGHT};
