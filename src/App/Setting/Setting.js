import React, { Fragment, useEffect, useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Avatar } from 'react-native-elements';

import { color, fontFamily } from '../../Public/components/Styles';
import { Toast } from '../../Public/components';
import { launchImagePicker, uploadImage } from '../../Public/helper';
import path from 'react-native-path';

import {
  actionGetUser,
  actionEditPhotoURL,
  actionLogoutRequest
} from '../../Public/redux/action';

const Setting = props => {
  const {
    auth,
    users,
    navigation,
    getUser,
    editPhotoURL,
    logoutRequest
  } = props;
  const [image, setImage] = useState({});

  const userId = auth.uid;

  const _getUser = useCallback(async () => {
    await getUser({ userId });
  }, [getUser, userId]);

  useEffect(() => {
    _getUser();
  }, [_getUser]);

  const handleUpload = async data => {
    await setImage(data);
    await uploadImage(
      {
        path: 'images/profiles',
        data,
        fileName: `${auth.uid}${path.extname(data.fileName)}`
      },
      async result => {
        if (result.downloadURL) {
          await editPhotoURL({
            userId: auth.uid,
            userPhotoURL: result.downloadURL
          }).then(() => {
            Toast('Profile image has been updated.');
          });
        }
      }
    );
  };

  return (
    <ScrollView>
      <ListItem
        {...{
          title: users && users.displayName ? users.displayName : '',
          subtitle: 'Name',
          titleStyle: { fontSize: 20, ...fontFamily.Bold },
          containerStyle: { elevation: 2 },
          titleProps: {
            onPress: () => navigation.navigate('EditName')
          }
        }}
        leftAvatar={
          <Avatar
            {...{
              title:
                users && users.displayName
                  ? users.displayName[0].toUpperCase()
                  : '',
              source: image.uri
                ? { uri: image.uri }
                : users.photoURL
                ? { uri: users.photoURL }
                : null,
              rounded: true,
              size: 85,
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
        }
        rightIcon={
          <Avatar
            {...{
              activeOpacity: 0.8,
              icon: {
                type: 'feather',
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
              onPress: () => launchImagePicker(handleUpload)
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

      <ListItem
        {...{
          title: 'More',
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
            paddingHorizontal: 0,
            marginTop: 32
          }
        }}
        subtitle={
          <Fragment>
            <ListItem
              {...{
                title: 'Logout',
                titleStyle: {
                  ...fontFamily.Regular
                },
                subtitle: ': (',
                subtitleStyle: { fontSize: 12 },
                containerStyle: {
                  borderBottomWidth: 1,
                  borderColor: color.Accent2,
                  paddingHorizontal: 6 + 16,
                  paddingVertical: 8
                },
                leftIcon: {
                  type: 'feather',
                  name: 'log-out'
                },
                onPress: () => logoutRequest()
              }}
            />
          </Fragment>
        }
      />
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  logoutRequest: () => dispatch(actionLogoutRequest()),
  getUser: payload => dispatch(actionGetUser(payload)),
  editPhotoURL: payload => dispatch(actionEditPhotoURL(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
