/* eslint-disable react-native/no-inline-styles */
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
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {SharedElement} from 'react-navigation-shared-element';
import {gql} from '@apollo/client';
import {Container} from '@common-component';
import MovieItem from '@screen-component/list/item';
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
          isInCart @client
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
    <View style={styles.backdropWrapper}>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => 'backdrops_' + index.toString()}
        contentContainerStyle={styles.backdrop}
        renderItem={({item, index}) => {
          if (!item.node) {
            return <Text style={{height: 1}} />;
          }
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });
          return (
            <MaskedView
              style={styles.maskedViewWrapper}
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
        style={styles.gradient}
      />
    </View>
  );
};

export default function List({navigation}) {
  let {loading, data, error} = useQuery(GET_ALL_FILMS, {});
  const scrollX = React.useRef(new Animated.Value(0)).current;

  console.log('response', loading, data, error)
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
          <TouchableOpacity
            style={styles.contentWrapper}
            onPress={() => {
              navigation.push('Detail', {
                movie: {...item, poster: posters[index - 1]},
              });
            }}>
            <SharedElement id={`item.${item.node.episodeID}.poster`}>
              <Image style={styles.poster} source={posters[index - 1]} />
            </SharedElement>
            <SharedElement id={`item.${item.node.episodeID}.title`}>
              <Text style={styles.title}>{item.node.title}</Text>
            </SharedElement>
            {/* <Text style={styles.date}>{item.node.releaseDate}</Text> */}
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };
  const movies = [
    {key: 'left-spacer'},
    ...data.allFilms.edges,
    {key: 'right-spacer'},
  ];
  console.log('list is', data)
  return (
    <Container style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        renderItem={({item, index}) => <MovieItem item={item} index={index} scrollX={scrollX} onSelect={() => navigation.push('Detail', {
          movie: {...item, poster: posters[index - 1]},
        })}/>}
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
  dummySpacer: {
    width: SPACER_ITEM_SIZE,
  },
  backdropWrapper: {
    position: 'absolute',
    width,
    height: BACKDROP_HEIGHT,
  },
  backdrop: {
    position: 'absolute',
    width,
    height: BACKDROP_HEIGHT,
  },
  maskedViewWrapper: {position: 'absolute', backgroundColor: 'blue'},
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
  },
});
