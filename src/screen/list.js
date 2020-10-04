import React from 'react';
import {
  Animated,
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import {Container} from '@common-component';
import MaskedView from '@react-native-community/masked-view';
import Svg, {Rect} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.6;

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

const posters = [
  require('./../../assets/poster/1.png'),
  require('./../../assets/poster/2.png'),
  require('./../../assets/poster/3.png'),
  require('./../../assets/poster/4.png'),
  require('./../../assets/poster/5.png'),
  require('./../../assets/poster/6.png'),
];

const Backdrop = ({movies, scrollX}) => {
  return (
    <View
      style={{
        position: 'absolute',
        width,
        height: BACKDROP_HEIGHT,
      }}>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => 'backdrops_' + index.toString()}
        contentContainerStyle={{
          position: 'absolute',
          width,
          height: BACKDROP_HEIGHT,
        }}
        renderItem={({item, index}) => {
          if (!item.node) {
            return <Text />;
          }
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });
          return (
            <MaskedView
              style={{position: 'absolute', backgroundColor: 'blue'}}
              maskElement={
                <AnimatedSvg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{transform: [{translateX}]}}>
                  <Rect x="0" y="0" width={width} height={height} fill="red" />
                </AnimatedSvg>
              }>
              <Image
                style={{width, height: BACKDROP_HEIGHT}}
                resizeMode="cover"
                source={posters[index - 1]}
              />
            </MaskedView>
          );
        }}
      />
      <LinearGradient
        colors={['transparent', 'white']}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};

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
      outputRange: [100, 50, 100],
    });
    return (
      <View style={styles.itemWrapper}>
        <Animated.View
          style={{...styles.itemInnerWrapper, transform: [{translateY}]}}>
          <View style={styles.contentWrapper}>
            <Image style={styles.poster} source={posters[index - 1]} />
            <Text style={styles.title}>{item.node.title}</Text>
            <Text style={styles.date}>{item.node.releaseDate}</Text>
          </View>
        </Animated.View>
      </View>
    );
  };
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
        renderItem={renderItem}
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
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dummySpacer: {
    width: SPACER_ITEM_SIZE,
  },
  backdropWrapper: {
    position: 'absolute',
    width,
    height: BACKDROP_HEIGHT,
  },
  maskedViewWrapper: {
    position: 'absolute',
    width,
    height: BACKDROP_HEIGHT,
  },
  backdropPoster: {
    width,
    height: BACKDROP_HEIGHT,
    resizeMode: 'cover',
  },
  gradient: {
    width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
