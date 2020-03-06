import React from 'react';
import {View, Text} from 'react-native';

class ListScreen extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text>List Screen</Text>
      </View>
    );
  }
}

const styles = {
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ListScreen;
