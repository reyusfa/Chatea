import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const AddChat = props => {
  return (
    <View>
      <Text>AddChat</Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddChat);
