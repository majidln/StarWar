import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';

const windowWidth = Dimensions.get('window').width;

const GET_ALL_FILMS = gql`
  query {
    allFilms {
      edges {
        node {
          id
          title
          episodeID
          releaseDate
        }
      }
    }
  }
`;

export default function list() {
  const {loading, data, error} = useQuery(GET_ALL_FILMS);

  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>An error occurred</Text>;
  }
  if (!data) {
    return <Text>No data!</Text>;
  }

  console.log('list is', data);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemWrapper}>
        <Text style={styles.title}>{item.node.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.allFilms.edges}
        renderItem={renderItem}
        keyExtractor={item => item.node.id}
        horizontal={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemWrapper: {
    width: windowWidth - 80,
    padding: 20,
    alignContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
});
