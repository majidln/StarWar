import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator,
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
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return <Text>An error occurred</Text>;
  }
  if (!data) {
    return <Text>No data!</Text>;
  }

  const onViewableChanged = ({viewableItems, changed}) => {
    console.log('Visible items are', viewableItems);
    console.log('Changed in this iteration', changed);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemWrapper}>
        <Text style={styles.title}>{item.node.title}</Text>
        <Text style={styles.date}>{item.node.releaseDate}</Text>
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
        onViewableItemsChanged={onViewableChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  loadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemWrapper: {
    width: windowWidth - 80,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
