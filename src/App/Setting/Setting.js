import React, { Fragment, useEffect, useCallback } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Avatar } from 'react-native-elements';

import { color, fontFamily } from '../../Public/components/Styles';
import { Toast } from '../../Public/components';

import { actionGetUser, actionLogoutRequest } from '../../Public/redux/action';

const Setting = props => {
  const { auth, users, navigation, getUser, logoutRequest } = props;

  const userId = auth.uid;

  const _getUser = useCallback(async () => {
    await getUser({ userId });
  }, [getUser, userId]);

  useEffect(() => {
    _getUser();
  }, [_getUser]);

  return (
    <ScrollView>
      <ListItem
        {...{
          title: users && users.displayName ? users.displayName : 'User',
          subtitle: 'Name',
          titleStyle: { fontSize: 20, ...fontFamily.Bold },
          containerStyle: { elevation: 2 }
        }}
        leftAvatar={
          <Avatar
            {...{
              title: 'U',
              rounded: true,
              size: 60,
              titleStyle: { color: color.Foreground, fontWeight: 'bold' },
              overlayContainerStyle: {
                backgroundColor: color.Background,
                elevation: 2
              }
            }}
          />
        }
        rightIcon={
          <Avatar
            {...{
              activeOpacity: 0.8,
              icon: {
                type: 'entypo',
                name: 'camera',
                size: 25
              },
              containerStyle: {
                position: 'absolute',
                right: 16,
                bottom: -25,
                borderRadius: 55,
                overflow: 'hidden',
                width: 55,
                height: 55,
                elevation: 2
              },
              overlayContainerStyle: {
                backgroundColor: color.Foreground
              },
              onPress: () => Toast('Edit Image')
            }}
          />
        }
      />
      <ListItem
        {...{
          title: 'Account',
          titleStyle: {
            paddingHorizontal: 6 + 16,
            paddingTop: 3,
            paddingBottom: 3,
            ...fontFamily.Bold,
            color: color.Foreground
          },
          containerStyle: {
            borderBottomWidth: 1,
            borderColor: color.Accent2,
            paddingBottom: 0,
            paddingHorizontal: 0
          }
        }}
        subtitle={
          <Fragment>
            <ListItem
              {...{
                title: users && users.email ? users.email : '',
                titleStyle: {
                  ...fontFamily.Regular
                },
                subtitle: 'Email Address',
                subtitleStyle: { fontSize: 12 },
                containerStyle: {
                  borderBottomWidth: 1,
                  borderColor: color.Accent2,
                  paddingHorizontal: 6 + 16,
                  paddingVertical: 8
                }
              }}
            />
            <ListItem
              {...{
                title: users && users.phoneNumber ? users.phoneNumber : '',
                titleStyle: {
                  ...fontFamily.Regular
                },
                subtitle: 'Phone',
                subtitleStyle: { fontSize: 12 },
                containerStyle: {
                  borderBottomWidth: 1,
                  borderColor: color.Accent2,
                  paddingHorizontal: 6 + 16,
                  paddingVertical: 8
                },
                onPress: () => navigation.navigate('EditPhone')
              }}
            />
            <ListItem
              {...{
                title: users && users.about ? users.about : '',
                titleStyle: {
                  ...fontFamily.Regular
                },
                subtitle: 'Bio',
                subtitleStyle: { fontSize: 12 },
                containerStyle: {
                  borderBottomWidth: 1,
                  borderColor: color.Accent2,
                  paddingHorizontal: 6 + 16,
                  paddingVertical: 8
                },
                onPress: () => navigation.navigate('EditAbout')
              }}
            />
          </Fragment>
        }
      />
      <Text onPress={() => logoutRequest()}>Logout</Text>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  logoutRequest: () => dispatch(actionLogoutRequest()),
  getUser: payload => dispatch(actionGetUser(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
