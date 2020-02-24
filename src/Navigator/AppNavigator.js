import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import {
  AddChat,
  Chat,
  Contact,
  EditAbout,
  EditName,
  EditUsername,
  Home,
  ReceiverInfo,
  Setting
} from '../App';

import { color, fontFamily } from '../Public/components/Styles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptions = () => ({
  screenOptions: {
    headerStyle: {
      backgroundColor: color.Background,
      elevation: 2,
      height: 50
    },
    headerTintColor: color.Foreground,
    headerTitleStyle: {
      ...fontFamily.Bold
    }
  }
});

const hideHeader = () => ({
  screenOptions: {
    headerShown: false
  }
});

const drawerContentOptions = () => ({
  drawerContentOptions: {
    labelStyle: { ...fontFamily.Bold },
    activeTintColor: color.Foreground,
    activeBackgroundColor: color.Background
  }
});

const CustomDrawer = screenProps => {
  const { navigation } = screenProps;
  return (
    <DrawerContentScrollView {...screenProps}>
      <DrawerItemList {...screenProps} />
      <DrawerItem
        {...screenProps}
        label="Contact"
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('AppContact');
        }}
      />
      <DrawerItem
        {...screenProps}
        label="Setting"
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('AppSetting');
        }}
      />
    </DrawerContentScrollView>
  );
};

const CustomHeaderButton = props => {
  return (
    <View style={styles.customHeaderButtonContainer}>
      <TouchableNativeFeedback
        onPress={props.onPress}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
        <View style={styles.customHeaderButtonContent}>
          <Icon
            type={props.iconType}
            name={props.iconName}
            color={color.Foreground}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const HomeScreen = screenProps => {
  return (
    <Stack.Navigator initialRouteName="Home" {...screenOptions()}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Chatea',
          headerLeftContainerStyle: {
            width: 50,
            alignItems: 'center',
            marginHorizontal: 3
          },
          headerLeft: () => (
            <CustomHeaderButton
              iconType="entypo"
              iconName="menu"
              onPress={() => screenProps.navigation.openDrawer()}
            />
          )
        }}
      />
      <Stack.Screen name="AddChat" component={AddChat} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ReceiverInfo" component={ReceiverInfo} />
    </Stack.Navigator>
  );
};

const AppContact = ({ navigation, route }) => {
  return (
    <Stack.Navigator initialRouteName="Contact" {...screenOptions()}>
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          title: 'Contact',
          headerLeftContainerStyle: {
            width: 50,
            alignItems: 'center',
            marginHorizontal: 3
          },
          headerLeft: () => (
            <CustomHeaderButton
              iconType="material-community-icons"
              iconName="arrow-back"
              onPress={() => navigation.goBack()}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
};

const AppHome = screenProps => {
  return screenProps.route.name === 'AppHome' ? (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      {...drawerContentOptions()}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  ) : (
    <HomeScreen />
  );
};

const AppSetting = ({ navigation, route }) => {
  return (
    <Stack.Navigator initialRouteName="Setting" {...screenOptions()}>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          title: 'Setting',
          headerLeftContainerStyle: {
            width: 50,
            alignItems: 'center',
            marginHorizontal: 3
          },
          headerLeft: () => (
            <CustomHeaderButton
              iconType="material-community-icons"
              iconName="arrow-back"
              onPress={() => navigation.goBack()}
            />
          )
        }}
      />
      <Stack.Screen name="EditAbout" component={EditAbout} />
      <Stack.Screen name="EditName" component={EditName} />
      <Stack.Screen name="EditUsername" component={EditUsername} />
    </Stack.Navigator>
  );
};

const AppNavigator = screenProps => {
  return (
    <Stack.Navigator initialRouteName="AppHome" {...hideHeader()}>
      <Stack.Screen name="AppContact" component={AppContact} />
      <Stack.Screen name="AppHome" component={AppHome} />
      <Stack.Screen name="AppSetting" component={AppSetting} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  customHeaderButtonContainer: {
    width: '87%',
    height: '87%',
    borderRadius: 180,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  customHeaderButtonContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  }
});
