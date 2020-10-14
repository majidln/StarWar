/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Animated,
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, {Rect} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const BACKDROP_HEIGHT = height * 0.6;

export default function Backdrop({movies, scrollX}) {
  return (
    <View style={styles.backdropWrapper}>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => 'backdrops_' + index.toString()}
        contentContainerStyle={styles.backdrop}
        renderItem={({item, index}) => {
          if (!item.node) {
            return <Text style={{height: 1}} />;
          }
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });
          return (
            <MaskedView
              style={styles.maskedViewWrapper}
              maskElement={
                <AnimatedSvg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{transform: [{translateX}]}}>
                  <Rect x="0" y="0" width={width} height={height} fill="red" />
                </AnimatedSvg>
              }>
              <Image
                style={{width, height: BACKDROP_HEIGHT}}
                resizeMode="cover"
                source={item.node.poster}
              />
            </MaskedView>
          );
        }}
      />
      <LinearGradient
        colors={['transparent', 'white']}
        style={styles.gradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    resizeMode: 'cover',
    width: ITEM_SIZE - SPACING * 5 - 8,
    height: ITEM_SIZE - SPACING * 5 - 8,
    borderRadius: 34,
  },
  backdropWrapper: {
    position: 'absolute',
    width,
    height: BACKDROP_HEIGHT,
  },
  backdrop: {
    position: 'absolute',
    width,
    height: BACKDROP_HEIGHT,
  },
  maskedViewWrapper: {position: 'absolute', backgroundColor: 'blue'},
  gradient: {
    width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
    bottom: 0,
  },
});
