import React from 'react';
import {Image, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Container, Rank} from '@common-component';
import {SharedElement} from 'react-navigation-shared-element';

const {height} = Dimensions.get('window');
const POSTER_HEIGHT = height * 0.68;

export default function Detail({route}) {
  const {movie} = route.params;
  console.log('movie is', movie);
  return (
    <Container>
      <View style={styles.wrapper}>
        <SharedElement id={`item.${movie.node.episodeID}.poster`}>
          <Image source={movie.node.poster} style={styles.poster} />
        </SharedElement>
        <Text style={styles.title}>{movie.node.title}</Text>
        <Rank />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  poster: {
    height: POSTER_HEIGHT,
    width: '100%',
    resizeMode: 'cover',
  },
  title: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
