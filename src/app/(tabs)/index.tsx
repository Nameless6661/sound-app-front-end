import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import TrackListItem from '@/src/components/TrackListItem';
import { gql, useQuery } from '@apollo/client';

const query = gql`
query MyQuery($genres: String!) {
  recommendations(seed_genres: $genres) {
    tracks {
      id
      name
      preview_url
      artists {
        id
        name
      }
      album {
        id
        name
        images {
          height
          url
          width
        }
      }
    }
  }
}
`;

const genresList = [
  { key: 'metalcore', label: 'Metalcore' },
  { key: 'black-metal', label: 'Black Metal' },
  { key: 'rock', label: 'Rock' },
  { key: 'pop', label: 'Pop' },
  { key: 'death-metal', label: 'Death-metal' },
  { key: 'emo', label: 'Emo' },
  // Agrega más géneros según sea necesario
];

export default function HomeScreen() {
  const [selectedGenre, setSelectedGenre] = useState('metalcore,black-metal');
  const [modalVisible, setModalVisible] = useState(false);
  
  const { data, loading, error, refetch } = useQuery(query, { 
    variables: { genres: selectedGenre },
  });

  const selectGenre = (genre) => {
    setSelectedGenre(genre);
    setModalVisible(false);
    refetch({ genres: genre });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <Text style={{ color: 'white' }}>Failed to fetch recommendations</Text>
    );
  }

  const tracks = data?.recommendations?.tracks || [];

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Button title="Select Genre" onPress={() => setModalVisible(true)} />
      
      <FlatList 
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select a Genre</Text>
          {genresList.map((genre) => (
            <TouchableOpacity
              key={genre.key}
              style={styles.genreButton}
              onPress={() => selectGenre(genre.key)}
            >
              <Text style={styles.genreText}>{genre.label}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  genreButton: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    width: '80%',
    alignItems: 'center',
  },
  genreText: {
    fontSize: 18,
  },
});
