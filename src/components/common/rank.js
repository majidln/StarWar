import React from 'react';
import {View, Text} from 'react-native';

export function Rank({rank = 2}) {
  return (
    <View>
      <Text>{rank}</Text>
    </View>
  );
}
