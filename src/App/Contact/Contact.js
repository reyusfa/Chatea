import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const Contact = props => {
  return (
    <View>
      <Text>Contact</Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
