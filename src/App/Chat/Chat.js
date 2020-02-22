import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { db } from '../../Public/config/firebase';

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

const Chat = props => {
  const [messages, setMessages] = useState([]);

  const sendMessages = message => {
    try {
      const messageData = {
        ...message[0]
      };

      const newMessageKey = db.ref().push().key;

      let updates = {};
      updates['/messages/' + newMessageKey] = messageData;

      db.ref().update(updates);
    } catch (error) {
      // console.log(error);
    }
  };

  const getMessages = () => {
    try {
      db.ref()
        .child('messages')
        .limitToLast(15)
        .on('value', result => {
          const data = result.val();
          setMessages(objectToArray(data));
          // console.log(objectToArray(data));
        });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <GiftedChat
      messages={messages}
      user={{
        _id: 1
      }}
      onSend={message => sendMessages(message)}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
