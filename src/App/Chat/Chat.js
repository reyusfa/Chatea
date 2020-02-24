import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
  firebaseTimestamp,
  firebaseDatabase
} from '../../Public/config/firebase';

import { color } from '../../Public/components/Styles';

const objectToArray = object => {
  return Object.entries(object)
    .map(([k, v]) => {
      return {
        ...v
      };
    })
    .reverse();
};
// chats/${chatId}/updatedAt
// users/${senderId}/chats/${chatId}/updatedAt
// users/${receiverId}/chats/${chatId}/updatedAt

const Chat = props => {
  const { auth, navigation, route } = props;
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  const rootRef = firebaseDatabase.ref();

  const sendMessage = async message => {
    const chatId = route.params.chatId;

    const newMessageKey = await rootRef.push().key;

    await rootRef.update({
      [`chats/${chatId}/messages/${newMessageKey}`]: {
        ...message[0],
        createdAt: firebaseTimestamp
      },
      [`users/${senderId}/chats/${chatId}/updatedAt`]: firebaseTimestamp,
      [`users/${receiverId}/chats/${chatId}/updatedAt`]: firebaseTimestamp,
      [`chats/${chatId}/updatedAt`]: firebaseTimestamp
    });
  };

  const getMessages = async () => {
    try {
      await rootRef
        .child('chats')
        .child(route.params.chatId)
        .child('messages')
        .limitToLast(15)
        .on('value', result => {
          const data = result.val() !== null ? result.val() : {};
          setMessages(objectToArray(data));
          // console.log(objectToArray(data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getSenderId = () => {
    setSenderId(auth.uid);
  };

  const getReceiverId = async () => {
    await rootRef
      .child(`users/${auth.uid}/chats/${route.params.chatId}`)
      .on('value', function(result) {
        // console.log(result.val().receiverId);
        setReceiverId(result.val().receiverId);
      });
  };

  useEffect(() => {
    getSenderId();
    getMessages();
    getReceiverId();
    // console.log(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      user={{
        _id: senderId
      }}
      onSend={message => sendMessage(message)}
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
