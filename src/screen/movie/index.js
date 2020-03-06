import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
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
      searching: false,
      searchName: '',
      ascendSort: true,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      startSearch: this.startSearch,
      startFilter: this.startFilter,
    });
  }

  onSelect = movie => {
    console.log('movie: ', movie);
    this.props.navigation.navigate('Detail', {
      id: movie.id,
      name: movie.title,
    });
  };

  startSearch = () => {
    // trigger when search icon press in toolbar
    if (this.state.searching) {
      // clear search content
      this.setState({searchName: ''});
    }
    // toggle search box
    this.setState({searching: !this.state.searching});
  };

  startFilter = () => {
    // trigger when filter icon press in toolbar
    this.setState({ascendSort: !this.state.ascendSort});

    // TODO add sort feature
  };

  render() {
    return (
      <Container style={styles.wrapper}>
        {this.renderSearchBox()}
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
                      // I could not find search feature in qraphql server, so I decided to filter movie localy
                      if (
                        item.node.title
                          .toLocaleLowerCase()
                          .includes(this.state.searchName.toLocaleLowerCase())
                      ) {
                        // show matched item with search box content
                        return (
                          <View style={styles.itemWrapper}>
                            <Item
                              movie={item.node}
                              onSelect={() => this.onSelect(item.node)}
                            />
                          </View>
                        );
                      } else {
                        // dont show matched item with search box content
                        return null;
                      }
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

  renderSearchBox = () => {
    // if search icon in toolbar clicked, show the serach box
    if (this.state.searching) {
      return (
        <View style={styles.searchBoxWrapper}>
          <TextInput
            style={styles.searchBox}
            onChangeText={text => this.setState({searchName: text})}
            value={this.state.searchName}
            placeholder="Enter part of movie name"
          />
          <TouchableOpacity
            style={styles.searchIconWrapper}
            onPress={() => this.startSearch()}>
            <Image style={styles.image} source={require('../../../assets/icons/close.png')} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  // set screen navigation options
  static navigationOptions = ({navigation, route}) => ({
    title: '',
    headerRight: () => (
      <TouchableOpacity
        onPress={() => route.params.startFilter && route.params.startFilter()}
        style={styles.headerIcon}>
        <Image style={styles.image} source={require('../../../assets/icons/sort.png')} />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => route.params.startSearch && route.params.startSearch()}
        style={styles.headerIcon}>
       <Image style={styles.image} source={require('../../../assets/icons/search.png')} />
      </TouchableOpacity>
    ),
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
  headerIcon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBoxWrapper: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: 45,
  },
  searchIconWrapper: {
    position: 'absolute',
    right: 10,
  },
  searchBox: {
    height: 45,
    fontSize: 18,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
  },
  image: {
    width: 20,
    height: 20
  }
});

export default ListScreen;
