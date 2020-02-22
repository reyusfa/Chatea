import React from 'react';
import { connect } from 'react-redux';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const MainNavigator = props => {
  const { auth } = props;
  return !auth.data.token ? <AppNavigator {...props} /> : <AuthNavigator />;
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(MainNavigator);
