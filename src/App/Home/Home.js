import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const Home = props => {
  const { navigation } = props;
  return (
    <View>
      <Text>Home</Text>
      <Text onPress={() => navigation.navigate('Chat')}>Chat</Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
