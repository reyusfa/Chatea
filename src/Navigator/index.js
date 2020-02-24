import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { firebaseAuth } from '../Public/config/firebase';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

import { actionLogoutRequest } from '../Public/redux/action';

const MainNavigator = props => {
  const { auth, logoutRequest } = props;

  useEffect(() => {}, []);

  return auth && auth.isLogout ? (
    <AuthNavigator {...props} />
  ) : (
    <AppNavigator {...props} />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logoutRequest: () => dispatch(actionLogoutRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNavigator);
