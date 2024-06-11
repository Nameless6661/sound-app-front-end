import { ActivityIndicator, FlatList } from 'react-native';
import TrackListItem from '@/src/components/TrackListItem';
import {gql, useQuery} from '@apollo/client';

const query = gql`
    query getFavorites($userId: String! ) {
    favoritesByUserid(userid: $userId) {
      id
      trackid
      userid
      track {
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

export default function FavoriteScreen() {
  const {data, loading, error} = useQuery(query, {
    variables: {userId: 'gus'},
  });

  if(loading){
    return <ActivityIndicator />;
  }
  if(error){
    console.log(error);
  }
  console.log(data);
  const tracks = (data?.favoritesByUserid || []).map((fav) => fav.track);

  return (
      <FlatList 
          data={tracks}
          renderItem={({ item }) => <TrackListItem track={item}/>}
          showsVerticalScrollIndicator={false}
      />
      
  );
}