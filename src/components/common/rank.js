import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function Rank({rank = 4}) {
  return (
    <View>
      <Text style={styles.text}>
        Rank is: <Text style={styles.rank}>{rank}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'gray',
  },
  rank: {
    fontSize: 20,
    color: 'black',
    fontWeight: '900',
  },
});
