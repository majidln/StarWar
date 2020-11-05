import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import theme from '@themes';

export class Container extends Component {
  render() {
    return (
      <SafeAreaView style={[styles.wrapper, this.props.style]}>
        {this.props.children}
      </SafeAreaView>
    );
  }
}

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: theme.bg,
  },
};
