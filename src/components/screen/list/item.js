import React from 'react';
import {StyleSheet, Dimensions, View, Animated, TouchableOpacity, Image, Text} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.72;
const SPACING = 10;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const posters = [
  require('./../../../../assets/poster/1.png'),
  require('./../../../../assets/poster/2.png'),
  require('./../../../../assets/poster/3.png'),
  require('./../../../../assets/poster/4.png'),
  require('./../../../../assets/poster/5.png'),
  require('./../../../../assets/poster/6.png'),
];

export default function ListItem ({item, index, scrollX, onSelect}){
  if (!item.node) {
    return <View style={styles.dummySpacer} />;
  }
  const inputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    (index + 2) * ITEM_SIZE,
  ];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [100, 50, 100],
  });

  return (
    <View style={styles.itemWrapper}>
      <Animated.View
        style={{...styles.itemInnerWrapper, transform: [{translateY}]}}>
        <TouchableOpacity
          style={styles.contentWrapper}
          onPress={() => onSelect()}>
          <SharedElement id={`item.${item.node.episodeID}.poster`}>
            <Image style={styles.poster} source={posters[index - 1]} />
          </SharedElement>
          <SharedElement id={`item.${item.node.episodeID}.title`}>
            <Text style={styles.title}>{item.node.title}</Text>
          </SharedElement>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    width: ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInnerWrapper: {
    width: ITEM_SIZE,
    marginHorizontal: SPACING,
    padding: SPACING * 2,
  },
  contentWrapper: {
    backgroundColor: 'white',
    borderRadius: 34,
    padding: 8,
  },
  poster: {
    resizeMode: 'cover',
    width: ITEM_SIZE - SPACING * 5 - 8,
    height: ITEM_SIZE - SPACING * 5 - 8,
    borderRadius: 34,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dummySpacer: {
    width: SPACER_ITEM_SIZE,
  },
})