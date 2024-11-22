// src/screens/MapScreen.js
import React, {useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  MapViewProps,
} from 'react-native-maps';
import {addPin} from '../../store/slice/mapPinSlice';
import {useDispatch, useSelector} from 'react-redux';
import {latlongIntoAddress} from '../../component/latlongIntoAddress';

const MapScreen = () => {
  const mapRef = React.createRef<MapViewProps>();

  const dispatch = useDispatch();
  const pins = useSelector(state => state.pins);

  const handleMapPress = useCallback(async event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    const latlong = {
      latitude,
      longitude,
    };
    const placeName = await latlongIntoAddress(latlong);

    dispatch(addPin({latitude, longitude}));
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}>
        {pins.map((pin, index) => (
          <Marker
            key={index}
            coordinate={{latitude: pin.latitude, longitude: pin.longitude}}
          />
        ))}
      </MapView>
      <View style={styles.listContainer}>
        <Text style={styles.header}>Pinned Locations:</Text>
        <FlatList
          data={pins}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Text style={styles.item}>
              Latitude: {item.latitude}, Longitude: {item.longitude}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 2},
  listContainer: {flex: 1, padding: 10},
  header: {fontWeight: 'bold', fontSize: 16, marginBottom: 10},
  item: {fontSize: 14, marginBottom: 5},
});

export default MapScreen;
