import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import gql from 'graphql-tag';
import {ApolloProvider, Query} from 'react-apollo';
import Item from './item';
import {Container} from './../../components';

const query = gql`
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

class ListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null,
    };
  }

  onSelect = movie => {
    console.log('movie: ', movie);
    this.props.navigation.navigate('Detail', {
      eposodeID: movie.episodeID,
      name: movie.title,
    });
  };

  render() {
    return (
      <Container style={styles.wrapper}>
        <Query query={query}>
          {({loading, error, data}) => {
            if (loading) {
              return <ActivityIndicator />;
            }
            if (error) {
              return <Text>An error ocurred</Text>;
            }
            if (data && data.allFilms) {
              return (
                <View style={styles.listWrapper}>
                  <Text style={styles.title}>Start War</Text>
                  <FlatList
                    style={styles.listWrapper}
                    data={data.allFilms.edges}
                    keyExtractor={item => item.node.id.toString()}
                    renderItem={({item}) => {
                      return (
                        <View style={styles.itemWrapper}>
                          <Item
                            movie={item.node}
                            onSelect={() => this.onSelect(item.node)}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
              );
            }
          }}
        </Query>
      </Container>
    );
  }

  static navigationOptions = ({navigation}) => ({
    title: '',
  });
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemWrapper: {
    padding: 10,
  },
});

export default ListScreen;
