import React from 'react';
import {View, Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';

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
    return <Text>Loading</Text>;
  }
  if (error) {
    return <Text>An error occurred</Text>;
  }
  if (!data) {
    return <Text>No data!</Text>;
  }

  console.log('list is', data);
  return (
    <View>
      <Text>In list component</Text>
    </View>
  );
}
