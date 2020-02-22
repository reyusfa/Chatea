import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const Register = props => {
  return (
    <View>
      <Text>Register</Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
