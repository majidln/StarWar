import React from 'react';
import {StyleSheet, Text, FlatList, ActivityIndicator} from 'react-native';
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
                <FlatList
                  style={styles.listWrapper}
                  data={data.allFilms.edges}
                  keyExtractor={item => item.node.id.toString()}
                  renderItem={({item}) => {
                    return <Item movie={item.node} />;
                  }}
                />
              );
            }
          }}
        </Query>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
});

export default ListScreen;
