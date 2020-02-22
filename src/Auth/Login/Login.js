import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const Login = props => {
  return (
    <View>
      <Text>Login</Text>
      <Text onPress={() => props.navigation.navigate('Register')}>
        Register
      </Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
