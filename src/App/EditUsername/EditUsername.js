import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const EditUsername = props => {
  return (
    <View>
      <Text>EditUsername</Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUsername);
