/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import {Container} from '@common-component';
import MovieItem from '@screen-component/list/item';
import Backdrop from '@screen-component/list/backdrop';
import {SPACING, ITEM_SIZE} from '@services/constants';

const GET_ALL_FILMS = gql`
  query {
    allFilms {
      edges {
        node {
          id
          title
          episodeID
          releaseDate
          director
          poster @client
        }
      }
    }
  }
`;

export default function List({navigation}) {
  let {loading, data, error} = useQuery(GET_ALL_FILMS, {});
  const scrollX = React.useRef(new Animated.Value(0)).current;

  if (loading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>An error occurred</Text>
      </View>
    );
  }
  if (!data) {
    return <Text>No data!</Text>;
  }

  const movies = [
    {key: 'left-spacer'},
    ...data.allFilms.edges,
    {key: 'right-spacer'},
  ];

  return (
    <Container style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        renderItem={({item, index}) => (
          <MovieItem
            item={item}
            index={index}
            scrollX={scrollX}
            onSelect={() =>
              navigation.push('Detail', {
                movie: {...item},
              })
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        snapToInterval={ITEM_SIZE}
        contentContainerStyle={styles.listContentContainer}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  loadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  errorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  listContentContainer: {},
  itemWrapper: {
    width: ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInnerWrapper: {
    width: ITEM_SIZE,
    marginHorizontal: SPACING,
    padding: SPACING * 2,
  },
  contentWrapper: {
    backgroundColor: 'white',
    borderRadius: 34,
    padding: 8,
  },
  poster: {
    resizeMode: 'cover',
    width: ITEM_SIZE - SPACING * 5 - 8,
    height: ITEM_SIZE - SPACING * 5 - 8,
    borderRadius: 34,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
