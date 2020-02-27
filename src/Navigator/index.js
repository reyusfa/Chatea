import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

import { NotificationsListener } from '../Public/services/LocalPushController';

const MainNavigator = props => {
  const { auth } = props;

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
