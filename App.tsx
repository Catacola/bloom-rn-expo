/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 * @strict
 */

import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

interface APIGetPhotosResponse {
  id?: string;
  memberId: string;
  photos: APIPhoto[];
}

interface APIPhoto {
  id: string;
  url: string;
  width: number;
  height: number;
}

////////////////////////////////////////////////////////////////////////////////
// INTERVIEW NOTES: START WITH THIS COMPONENT FOR YOUR IMPLEMENTATION
////////////////////////////////////////////////////////////////////////////////
const App = () => {
  const [photos, setPhotos] = useState<APIGetPhotosResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const picResp = await fetch(
          'http://192.168.1.154:3000/member/1/photos'
        );
        const picData = await picResp.json();
        setPhotos(picData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  const renderPhotoRow = (row: APIPhoto[]) => {
    console.log('row:', row);
    return (
      <View style={styles.photoRow}>
        {row.map((p) => (
          <Image source={{ uri: p.url }} style={styles.photo} key={p.id} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.photoContainer}>
      {photos.map((row: APIGetPhotosResponse) => renderPhotoRow(row.photos))}
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'center',
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
  },
  photo: { width: 100, height: 200, margin: 10 },
});

export default App;
