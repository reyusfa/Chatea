import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const Setting = props => {
  return (
    <View>
      <Text>Setting</Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
