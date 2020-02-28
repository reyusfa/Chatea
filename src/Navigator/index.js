import React, { Fragment, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { PermissionsAndroid } from 'react-native';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

import { NotificationsListener } from '../Public/services/LocalPushController';

import { firebaseDatabase } from '../Public/config/firebase';

import Geolocation from 'react-native-geolocation-service';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This App needs access to your location ' +
          'so we can know where you are.'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use locations ');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const MainNavigator = props => {
  const { auth } = props;

  const rootRef = firebaseDatabase.ref();

  const setUserPosition = position => {
    rootRef.update({
      [`users/${auth.uid}/latitude`]: position.coords.latitude,
      [`users/${auth.uid}/longitude`]: position.coords.longitude
    });
    console.log(position);
  };

  const getCurrentPosition = useCallback(async () => {
    await requestLocationPermission();
    await Geolocation.getCurrentPosition(
      info => setUserPosition(info),
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  return auth && auth.isLogout ? (
    <AuthNavigator {...props} />
  ) : (
    <Fragment>
      <AppNavigator {...props} />
      <NotificationsListener userId={auth.uid} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavigator);
