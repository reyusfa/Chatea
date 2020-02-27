import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Avatar } from 'react-native-elements';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
  firebaseTimestamp,
  firebaseDatabase
} from '../../Public/config/firebase';

import { color, fontFamily } from '../../Public/components/Styles';

import { objectToArray } from '../../Public/helper';

const Chat = props => {
  const { auth, navigation, route } = props;
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  const rootRef = firebaseDatabase.ref();

  const chatData = route.params.item;

  navigation.setOptions({
    title: chatData.receiverDisplayName ? chatData.receiverDisplayName : 'Chat'
  });

  const sendMessage = async ({ message, chatId }) => {
    const newMessageKey = await rootRef.push().key;

    await rootRef.update({
      [`chats/${chatId}/messages/${newMessageKey}`]: {
        ...message[0],
        createdAt: firebaseTimestamp
      },
      [`users/${senderId}/chats/${chatId}/updatedAt`]: firebaseTimestamp,
      [`users/${senderId}/chats/${chatId}/lastMessage`]: message[0],
      [`users/${receiverId}/chats/${chatId}/updatedAt`]: firebaseTimestamp,
      [`users/${receiverId}/chats/${chatId}/lastMessage`]: message[0],
      [`chats/${chatId}/updatedAt`]: firebaseTimestamp,
      [`notifications/${receiverId}/${newMessageKey}/_id`]: newMessageKey,
      [`notifications/${receiverId}/${newMessageKey}/content`]: message[0],
      [`notifications/${receiverId}/${newMessageKey}/createdAt`]: firebaseTimestamp,
      [`notifications/${receiverId}/${newMessageKey}/delivered`]: false
    });
  };

  const getMessages = useCallback(async () => {
    try {
      await rootRef
        .child('chats')
        .child(chatData._id)
        .child('messages')
        .on('value', snap => {
          const data = snap.val() !== null ? snap.val() : {};
          setMessages(objectToArray(data));
        });
    } catch (error) {
      // console.log(error);
    }
  }, [rootRef, chatData]);

  const getSenderId = useCallback(() => {
    setSenderId(auth.uid);
  }, [auth]);

  const getReceiverId = useCallback(async () => {
    await rootRef
      .child(`users/${auth.uid}/chats/${chatData._id}`)
      .on('value', function(result) {
        setReceiverId(result.val().receiverId);
      });
  }, [auth, chatData, rootRef]);

  useEffect(() => {
    getMessages();
    getSenderId();
    getReceiverId();
  }, [getMessages, getSenderId, getReceiverId]);

  return (
    <GiftedChat
      renderAvatar={() => (
        <Avatar
          {...{
            title:
              chatData.receiverDisplayName &&
              chatData.receiverDisplayName[0].toUpperCase(),
            ...(chatData.receiverPhotoURL
              ? { source: { uri: chatData.receiverPhotoURL } }
              : {}),
            titleStyle: { color: color.Foreground, ...fontFamily.Bold },
            placeholderStyle: {
              backgroundColor: color.Background
            },
            overlayContainerStyle: {
              backgroundColor: color.Background,
              elevation: 2
            },
            rounded: true,
            size: 36
          }}
        />
      )}
      renderLoading={() => (
        <View {...{ style: { padding: 16 } }}>
          <ActivityIndicator size="large" color={color.Foreground} />
        </View>
      )}
      messages={messages}
      user={{
        _id: senderId
      }}
      onSend={message => sendMessage({ message, chatId: chatData._id })}
      renderBubble={bubbleProps => {
        return (
          <Bubble
            {...bubbleProps}
            textStyle={{
              right: {
                color: color.Accent1
              },
              left: {
                color: color.Accent2
              }
            }}
            wrapperStyle={{
              right: {
                backgroundColor: color.Background
              },
              left: {
                backgroundColor: color.Foreground
              }
            }}
            timeTextStyle={{
              right: {
                color: color.Foreground
              },
              left: {
                color: color.Background
              }
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
