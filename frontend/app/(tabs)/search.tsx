import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Toast } from "toastify-react-native";

export default function Search() {
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    }

    getCurrentLocation();
  }, []);

  if (!location || !location.latitude || !location.longitude) return

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: .1,
          longitudeDelta: .1
        }}
        onRegionChangeComplete={(region) => {
          setLocation({ latitude: region.latitude, longitude: region.longitude });
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});