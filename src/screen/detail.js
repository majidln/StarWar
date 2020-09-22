import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Container} from './../components/common/index';
import theme from './../services/theme';

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

    const {id} = this.props.route.params;
    const query = `
    query {
      film(id: \"${id}\") {
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
                return this.renderDetail(data.film);
              }
            }}
          </Query>
        </ScrollView>
      </Container>
    );
  }

  renderDetail = film => {
    // render movie detail
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
    // render character detail in card
    return (
      <View style={styles.charactersWrapper}>
        <Text style={styles.charactersName}>{character.name}</Text>

        <Text style={styles.charactersSpecies}>
          Species: {character.species && character.species.name}
        </Text>
        <Text style={styles.charactersgender}>{character.gender}</Text>
      </View>
    );
  };

  // set screen navigation options
  static navigationOptions = ({navigation, route}) => ({
    title: '',
  });
}

const styles = StyleSheet.create({
  wrapper: {},
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  episodeID: {
    fontSize: 16,
    color: '#7d7d7d',
  },
  release: {
    fontSize: 14,
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
    margin: 10,
    paddingBottom: 10,
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 35,
  },
  charactersTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
    backgroundColor: '#854b69',
    padding: 10,
    marginTop: 8,
    textAlign: 'center',
  },
  charactersName: {
    fontSize: 22,
    fontWeight: 'bold',
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
    paddingLeft: 10,
    paddingRight: 50,
  },
  headerIcon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default DetailScreen;
