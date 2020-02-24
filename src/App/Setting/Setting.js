import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { actionLogoutRequest } from '../../Public/redux/action';

const Setting = props => {
  const { logoutRequest } = props;
  return (
    <View>
      <Text>Setting</Text>
      <Text onPress={() => logoutRequest()}>Logout</Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  logoutRequest: () => dispatch(actionLogoutRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
