import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';

import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView
} from 'react-native';
import { Icon, ListItem, Avatar } from 'react-native-elements';

import {
  AddChat,
  Chat,
  Contact,
  EditAbout,
  EditName,
  EditPhone,
  Home,
  ContactInfo,
  Setting,
  People,
  UserLocation
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
  },
  drawerStyle: {
    width: 250
  }
});

const CustomDrawer = screenProps => {
  const users = useSelector(state => state.users);
  const { navigation } = screenProps;
  return (
    <ScrollView {...screenProps}>
      <View {...{ style: { backgroundColor: color.Background, padding: 8 } }}>
        <View {...{ style: { padding: 8 } }}>
          <Avatar
            {...{
              title:
                users && users.displayName
                  ? users.displayName[0].toUpperCase()
                  : '',
              source: users.photoURL ? { uri: users.photoURL } : null,
              rounded: true,
              size: 100,
              titleStyle: { color: color.Foreground, fontWeight: 'bold' },
              placeholderStyle: {
                backgroundColor: color.Background
              },
              overlayContainerStyle: {
                backgroundColor: color.Background,
                elevation: 2
              }
            }}
          />
        </View>
        <ListItem
          {...{
            title: users && users.displayName ? users.displayName : '',
            subtitle: users && users.email ? users.email : '',
            titleStyle: {
              fontSize: 20,
              ...fontFamily.Bold,
              color: color.Foreground
            },
            subtitleStyle: {
              color: color.Foreground
            },
            containerStyle: {
              backgroundColor: color.Background,
              paddingHorizontal: 8,
              paddingVertical: 0
            }
          }}
        />
      </View>
      <DrawerItem
        {...screenProps}
        label="Contact"
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('AppContact');
        }}
        icon={() => <Icon type="feather" name="users" color={color.Accent1} />}
      />
      <DrawerItem
        {...screenProps}
        label="People"
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('AppPeople');
        }}
        icon={() => <Icon type="feather" name="globe" color={color.Accent1} />}
      />
      <DrawerItem
        {...screenProps}
        label="Setting"
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('AppSetting');
        }}
        icon={() => (
          <Icon type="feather" name="settings" color={color.Accent1} />
        )}
      />
    </ScrollView>
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
    </Stack.Navigator>
  );
};

const AppChat = ({ navigation, route }) => {
  return (
    <Stack.Navigator initialRouteName="Chat" {...screenOptions()}>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
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

const AppUserLocation = ({ navigation, route }) => {
  return (
    <Stack.Navigator initialRouteName="UserLocation" {...screenOptions()}>
      <Stack.Screen
        name="UserLocation"
        component={UserLocation}
        options={{
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

const AppContact = ({ navigation, route }) => {
  return (
    <Stack.Navigator initialRouteName="Contact" {...screenOptions()}>
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
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
      <Stack.Screen name="ContactInfo" component={ContactInfo} />
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

const AppPeople = ({ navigation, route }) => {
  return (
    <Stack.Navigator initialRouteName="People" {...screenOptions()}>
      <Stack.Screen
        name="People"
        component={People}
        options={{
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

const AppSetting = ({ navigation, route }) => {
  return (
    <Stack.Navigator initialRouteName="Setting" {...screenOptions()}>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
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
      <Stack.Screen name="EditPhone" component={EditPhone} />
    </Stack.Navigator>
  );
};

const AppNavigator = screenProps => {
  return (
    <Stack.Navigator initialRouteName="AppHome" {...hideHeader()}>
      <Stack.Screen name="AppHome" component={AppHome} />
      <Stack.Screen name="AppUserLocation" component={AppUserLocation} />
      <Stack.Screen name="AppChat" component={AppChat} />
      <Stack.Screen name="AppContact" component={AppContact} />
      <Stack.Screen name="AppPeople" component={AppPeople} />
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
