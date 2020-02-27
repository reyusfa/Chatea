import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Avatar } from 'react-native-elements';

import { firebaseDatabase } from '../../Public/config/firebase';

import { objectToArray } from '../../Public/helper';

import { Button } from '../../Public/components';
import { color, fontFamily } from '../../Public/components/Styles';

import { actionAddChat } from '../../Public/redux/action';

const Contact = props => {
  const { auth, navigation, addChat } = props;
  const [contacts, setContacts] = useState([]);
  const [renderLoading, setRenderLoading] = useState(false);

  navigation.setOptions({
    title: 'Contacts'
  });

  const rootRef = firebaseDatabase.ref();
  const userId = auth.uid;

  const _getContacts = useCallback(async () => {
    setRenderLoading(true);
    try {
      await rootRef
        .child('contacts')
        .child(userId)
        .on('value', result => {
          const data = result.val() !== null ? result.val() : {};
          setContacts(objectToArray(data));
          setRenderLoading(false);
        });
    } catch (error) {
      // console.log(error);
      setRenderLoading(false);
    }
  }, [rootRef, userId]);

  useEffect(() => {
    _getContacts();
  }, [_getContacts]);

  const _addChat = async ({ receiverId }) => {
    try {
      await addChat({ senderId: userId, receiverId }).then(result => {
        // console.log(result);
        if (result.value.code === 'CHAT_ADDED') {
          navigation.navigate('Chat', { item: result.value.data });
        } else if (result.value.code === 'CHAT_EXISTS') {
          // console.log(result.value);
          navigation.navigate('Chat', { item: result.value.data });
        }
      });
    } catch (error) {
      // console.log(error);
    }
  };

  return renderLoading ? (
    <View {...{ style: { padding: 16 } }}>
      <ActivityIndicator size="large" color={color.Foreground} />
    </View>
  ) : (
    <View {...{ style: { backgroundColor: '#ffffff', flex: 1 } }}>
      <FlatList
        data={contacts}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ListItem
            {...{
              title: item.displayName || item.email,
              ...(item.email && item.displayName
                ? {
                    subtitle: item.email,
                    subtitleProps: {
                      onPress: () =>
                        navigation.navigate('ContactInfo', { contact: item })
                    }
                  }
                : {}),
              titleStyle: { ...fontFamily.Bold },
              titleProps: {
                numberOfLines: 1,
                onPress: () =>
                  navigation.navigate('ContactInfo', { contact: item })
              },
              containerStyle: {
                padding: 10,
                borderColor: color.Accent2,
                borderBottomWidth: 1
              },
              pad: 16
            }}
            leftAvatar={
              <Avatar
                {...{
                  title:
                    (item.displayName && item.displayName[0].toUpperCase()) ||
                    (item.email && item.email[0].toUpperCase()),
                  ...(item.photoURL ? { source: { uri: item.photoURL } } : {}),
                  titleStyle: { color: color.Foreground, ...fontFamily.Bold },
                  placeholderStyle: {
                    backgroundColor: color.Background
                  },
                  overlayContainerStyle: {
                    backgroundColor: color.Background,
                    elevation: 2
                  },
                  rounded: true,
                  size: 55,
                  activeOpacity: 0.7,
                  onPress: () =>
                    navigation.navigate('ContactInfo', { contact: item })
                }}
              />
            }
            rightIcon={
              <Button
                {...{ buttonStyle: { paddingVertical: 5 } }}
                title="Chat"
                onPress={() => _addChat({ receiverId: item._id })}
              />
            }
          />
        )}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  addChat: payload => dispatch(actionAddChat(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
