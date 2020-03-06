import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import gql from 'graphql-tag';
import {ApolloProvider, Query} from 'react-apollo';
import Item from './item';
import {Container} from './../../components';
import theme from './../../services/theme';

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

    const {eposodeID} = this.props.route.params;
    const query = `
    query {
      film(filmID: ${eposodeID}) {
        title
        episodeID
        releaseDate
        
        characterConnection (first: 5){
          edges {
            node {
              name
              gender
              species {
                id
                name
              }
            }
          }
        }
      }
    }
  `;

    this.state = {
      query: query,
    };
  }

  render() {
    return (
      <Container>
        <ScrollView style={styles.wrapper}>
          <Query
            query={gql`
              ${this.state.query}
            `}>
            {({loading, error, data}) => {
              if (loading) {
                return <ActivityIndicator />;
              }
              if (error) {
                return <Text>An error ocurred</Text>;
              }
              if (data && data.film) {
                console.log('data is:', data);
                return this.renderDetail(data.film);
              }
            }}
          </Query>
        </ScrollView>
      </Container>
    );
  }

  renderDetail = film => {
    console.log('render film', this.props.route);
    return (
      <View>
        <Text style={[styles.title, styles.row]}>{film.title}</Text>
        <View style={styles.infoWrapper}>
          <Text style={[styles.episodeID]}>Episode: {film.episodeID}</Text>
          <Text style={[styles.release]}>{film.releaseDate}</Text>
        </View>
        <View>
          <Text style={styles.charactersTitle}>Characters</Text>
          {film.characterConnection.edges.map(character => {
            return this.renderCharacterConnection(character.node);
          })}
        </View>
      </View>
    );
  };

  renderCharacterConnection = character => {
    return (
      <View style={styles.charactersWrapper}>
        <Text style={styles.charactersName}>{character.name}</Text>
        <Text style={styles.charactersgender}>{character.gender}</Text>
        <Text style={styles.charactersSpecies}>
          Species: {character.species && character.species.name}
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  wrapper: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  episodeID: {
    fontSize: 14,
    color: 'white',
  },
  release: {
    fontSize: 14,
    color: 'white',
  },
  row: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  infoWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  charactersWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
  charactersTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
    backgroundColor: '#fed947',
    padding: 10,
    marginTop: 8,
    textAlign: 'center',
  },
  charactersName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
    paddingRight: 50,
  },
  charactersgender: {
    fontSize: 16,
    color: '#ff5370',
    padding: 10,
    marginTop: 8,
    paddingLeft: 5,
    position: 'absolute',
    right: 0,
    top: 5,
  },
  charactersSpecies: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 50,
  },
});

export default DetailScreen;
