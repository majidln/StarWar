import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// FontAwesome.loadFont();

export function Icon({name, color = 'black', size = 20, style = {}}) {
  return <FontAwesome name={name} color={color} size={size} style={style} />;
}
