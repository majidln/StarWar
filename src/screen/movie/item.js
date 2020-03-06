import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class ItemScreen extends React.Component {
  render() {
    const {movie} = this.props;
    return (
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => {
          this.props.onSelect && this.props.onSelect();
        }}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.episodeID}>Episode: {movie.episodeID}</Text>
        <Text style={styles.release}>{movie.releaseDate}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  episodeID: {
    fontSize: 14,
    padding: 5,
    color: 'white',
  },
  release: {
    textAlign: 'right',
    fontSize: 14,
    color: 'white',
  },
});

export default ItemScreen;
