import React, {Component} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// FontAwesome.loadFont();

export class Icon extends Component {
  render() {
    const {name, color, size, style} = this.props;
    return (
      <FontAwesome
        name={name}
        color={color || 'black'}
        size={size || 20}
        style={style}
      />
    );
  }
}
