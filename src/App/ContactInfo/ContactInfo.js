import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Avatar } from 'react-native-elements';

import { firebaseDatabase } from '../../Public/config/firebase';

import { color, fontFamily } from '../../Public/components/Styles';

const ContactInfo = props => {
  const { navigation, route, auth } = props;
  const [chat, setChat] = useState([]);
  const { contact } = route.params;

  navigation.setOptions({
    title: 'Contact Info'
  });

  const rootRef = firebaseDatabase.ref();
  const senderId = auth.uid;

  const getChat = useCallback(async () => {
    try {
      await rootRef
        .child('users')
        .child(senderId)
        .child('chats')
        .orderByChild('receiverId')
        .equalTo(contact._id)
        .on('value', result => {
          const data = result.val() !== null ? result.val() : {};
          setChat(Object.values(data)[0]);
        });
    } catch (error) {}
  }, [senderId, rootRef, contact]);

  useEffect(() => {
    getChat();
  }, [getChat]);

  return (
    <ScrollView>
      <ListItem
        {...{
          title: contact && contact.displayName ? contact.displayName : '',
          subtitle: 'Name',
          titleStyle: { fontSize: 20, ...fontFamily.Bold },
          containerStyle: { elevation: 2 }
        }}
        leftAvatar={
          <Avatar
            {...{
              title:
                contact && contact.displayName
                  ? contact.displayName[0].toUpperCase()
                  : '',
              source: contact.photoURL ? { uri: contact.photoURL } : null,
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
                name: 'message-circle',
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
              onPress: () =>
                navigation.navigate('AppChat', {
                  screen: 'Chat',
                  params: { item: chat }
                })
            }}
          />
        }
      />
      <ListItem
        {...{
          title: 'Info',
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
                title: contact && contact.email ? contact.email : '',
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
                title:
                  contact && contact.phoneNumber ? contact.phoneNumber : '',
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
                }
              }}
            />
            <ListItem
              {...{
                title: contact && contact.about ? contact.about : '',
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
                }
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
          <ListItem
            {...{
              title: 'Location',
              titleStyle: {
                ...fontFamily.Regular
              },
              subtitle: 'Show user location',
              subtitleStyle: { fontSize: 12 },
              containerStyle: {
                borderBottomWidth: 1,
                borderColor: color.Accent2,
                paddingHorizontal: 6 + 16,
                paddingVertical: 8
              },
              leftIcon: {
                type: 'feather',
                name: 'map-pin'
              },
              onPress: () =>
                navigation.navigate('AppUserLocation', {
                  screen: 'UserLocation',
                  params: {
                    coordinate: {
                      latitude: -7.5591225,
                      longitude: 110.7837924
                    }
                  }
                })
            }}
          />
        }
      />
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInfo);
