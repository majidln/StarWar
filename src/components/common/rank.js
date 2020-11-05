import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from './icon';
import theme from '@themes';

export function Rank({rank = 4.0}) {
  const truncPart = Math.trunc(rank);
  let stars = [];
  for (let i = 0; i < truncPart; i++) {
    stars.push(<Icon key={i} name="star" color={theme.primary} />);
  }
  const reminderPart = rank % 1;
  if (reminderPart > 0) {
    stars.push(<Icon name="star-half-empty" color={theme.primary} />);
  }
  return (
    <View style={styles.wrapper}>
      {stars}
      <Text style={styles.rank}> ({rank})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  rank: {
    fontSize: 12,
    color: 'black',
    fontWeight: '900',
  },
});
