import React from 'react';
import {
  Animated,
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
import {Container} from '@common-component';

const width = Dimensions.get('window').width;
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

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

export default function List() {
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

  // add dummy

  const renderItem = ({item, index}) => {
    if (!item.node) {
      return <View style={styles.dummySpacer} />;
    }
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      (index + 2) * ITEM_SIZE,
    ];
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [0, -50, 0],
    });
    return (
      <View style={styles.itemWrapper}>
        <Animated.View
          style={{...styles.itemInnerWrapper, transform: [{translateY}]}}>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>{item.node.title}</Text>
            <Text style={styles.date}>{item.node.releaseDate}</Text>
          </View>
        </Animated.View>
      </View>
    );
  };
  console.log('scrollX', scrollX);
  return (
    <Container style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={[
          {key: 'left-spacer'},
          ...data.allFilms.edges,
          {key: 'right-spacer'},
        ]}
        renderItem={renderItem}
        keyExtractor={item => item.key || item.node.id}
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
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dummySpacer: {
    width: SPACER_ITEM_SIZE,
  },
});
