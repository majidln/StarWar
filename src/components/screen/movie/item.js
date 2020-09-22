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
        <Text style={styles.release}>Release Date: {movie.releaseDate}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 35,
  },
  title: {
    fontSize: 20,
  },
  episodeID: {
    fontSize: 16,
    padding: 5,
    color: '#7d7d7d',
  },
  release: {
    textAlign: 'right',
    fontSize: 14,
  },
});

export default ItemScreen;
