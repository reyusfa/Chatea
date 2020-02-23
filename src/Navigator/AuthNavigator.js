import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Login, Register } from '../Auth';

const Stack = createStackNavigator();

const hideHeader = () => ({
  screenOptions: {
    headerShown: false
  }
});

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" {...hideHeader()}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
