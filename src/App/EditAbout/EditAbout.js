import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const EditAbout = props => {
  return (
    <View>
      <Text>EditAbout</Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAbout);
