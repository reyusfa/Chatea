import React, { Fragment } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Avatar } from 'react-native-elements';

import { color, fontFamily } from '../../Public/components/Styles';

const ContactInfo = props => {
  const { navigation, route } = props;
  const { contact } = route.params;

  navigation.setOptions({
    title: 'Contact Info'
  });

  const { item } = route.params;
  // console.log(item);

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
                type: 'entypo',
                name: 'chat',
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
              onPress: () => navigation.navigate('Chat', { item: {} })
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
    </ScrollView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInfo);
