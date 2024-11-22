// src/screens/MapScreen.js
import React, {useCallback} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  MapViewProps,
} from 'react-native-maps';
import {addPin, removePin} from '../../store/slice/mapPinSlice';
import {useDispatch, useSelector} from 'react-redux';
import {latlongIntoAddress} from '../../component/latlongIntoAddress';
import {useStyles} from './styles';

const MapScreen = () => {
  const mapRef = React.createRef<MapViewProps>();
  const styles = useStyles();
  const dispatch = useDispatch();
  const pins = useSelector(state => state.pins);
  console.log('pins', pins);
  const handleMapPress = useCallback(async event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    const latlong = {
      latitude,
      longitude,
    };
    const cityName = await latlongIntoAddress(latlong);
    console.log('placeName', cityName?.city);
    dispatch(addPin({latitude, longitude, city: cityName?.city}));
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
          contentContainerStyle={{marginTop: 4}}
          renderItem={({item, index}) => (
            <View style={{backgroundColor: 'lightgrey', padding: 6}}>
              <Text style={styles.item}>
                {item.city} (Lat: {item.latitude}, Lng: {item.longitude})
              </Text>
              <Button
                title="Remove"
                onPress={() => dispatch(removePin(index))}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MapScreen;
