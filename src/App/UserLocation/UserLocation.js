import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { firebaseDatabase } from '../../Public/config/firebase';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from 'react-native-dotenv';

const UserLocation = props => {
  const { auth, navigation, route } = props;
  const [myCoords, setMyCoords] = useState({});
  const [contactCoords, setContactCoords] = useState({});

  const { coordinate } = route.params;

  const rootRef = firebaseDatabase.ref();

  const getContactLocation = useCallback(() => {
    rootRef
      .child('users')
      .child(coordinate._id)
      .on('value', snap => {
        console.log(snap.val());
        const latitude = snap.val().latitude ? snap.val().latitude : -7.5591225;
        const longitude = snap.val().longitude
          ? snap.val().longitude
          : 110.7837924;
        const image = snap.val().photoURL ? snap.val().photoURL : null;
        setContactCoords({ latitude, longitude, image });
        console.log(snap.val());
      });
  }, [rootRef, coordinate]);

  const getUserLocation = useCallback(() => {
    rootRef
      .child('users')
      .child(auth.uid)
      .on('value', snap => {
        console.log(snap.val());
        const latitude = snap.val().latitude ? snap.val().latitude : -7.5591225;
        const longitude = snap.val().longitude
          ? snap.val().longitude
          : 110.7837924;
        const image = snap.val().photoURL ? snap.val().photoURL : null;
        setMyCoords({ latitude, longitude, image });
        console.log(snap.val());
      });
  }, [rootRef, auth]);

  navigation.setOptions({
    title: 'Location'
  });

  useEffect(() => {
    getUserLocation();
    getContactLocation();
  }, [getUserLocation, getContactLocation]);

  return (
    <MapView
      {...{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: contactCoords.latitude || -7.5591225,
        longitude: contactCoords.longitude || 110.7837924,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      }}>
      <Marker
        coordinate={{
          latitude: contactCoords.latitude,
          longitude: contactCoords.longitude
        }}>
        <View
          {...{
            style: {
              height: 55,
              width: 55,
              borderRadius: 55,
              borderWidth: 3,
              borderColor: '#ffffff',
              overflow: 'hidden'
            }
          }}>
          <Image
            source={{
              uri: contactCoords.image
            }}
            {...{ style: { flex: 1 } }}
          />
        </View>
      </Marker>
      <Marker
        coordinate={{
          latitude: myCoords.latitude,
          longitude: myCoords.longitude
        }}>
        <View
          {...{
            style: {
              height: 55,
              width: 55,
              borderRadius: 55,
              borderWidth: 3,
              borderColor: '#ffffff',
              overflow: 'hidden'
            }
          }}>
          <Image
            source={{
              uri: myCoords.image
            }}
            {...{ style: { flex: 1 } }}
          />
        </View>
      </Marker>
    </MapView>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLocation);
