import React from 'react';
import {Image, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Container} from '@common-component';

const {height} = Dimensions.get('window');
const POSTER_HEIGHT = height * 0.68;

export default function Detail({route}) {
  const {movie} = route.params;
  return (
    <Container>
      <View style={styles.wrapper}>
        <Image source={movie.poster} style={styles.poster} />
        <Text style={styles.title}>{movie.node.title}</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    backgroundColor: 'red',
    height: POSTER_HEIGHT,
  },
  poster: {
    height: POSTER_HEIGHT,
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
});
