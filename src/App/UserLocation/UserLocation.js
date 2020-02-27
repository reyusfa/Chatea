import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { firebaseDatabase } from '../../Public/config/firebase';

const UserLocation = props => {
  const { navigation, route } = props;
  const getUserLocation = useCallback(() => {}, []);

  navigation.setOptions({
    title: 'Location'
  });

  const { coordinate } = route.params;

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return (
    <MapView
      {...{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: -7.5591225,
        longitude: 110.7837924,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      }}>
      <Marker coordinate={coordinate} />
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
