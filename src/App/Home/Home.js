import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Avatar } from 'react-native-elements';

import {
  firebaseTimestamp,
  firebaseDatabase
} from '../../Public/config/firebase';

import { Button } from '../../Public/components';
import { color } from '../../Public/components/Styles';

const objectToArray = object => {
  if (object) {
    return Object.entries(object)
      .map(([k, v]) => {
        return {
          ...v
        };
      })
      .reverse();
  }
};

const Home = props => {
  const { auth, navigation } = props;
  const [chats, setChats] = useState([]);

  const rootRef = firebaseDatabase.ref();

  const getChats = () => {
    const senderId = auth.uid;
    try {
      rootRef
        .child('users')
        .child(senderId)
        .child('chats')
        .on('value', result => {
          const data = result.val() !== null ? result.val() : {};
          setChats(objectToArray(data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addChat = async () => {
    const senderId = auth.uid;
    const receiverId = '8PCQDERsEWb4JQTtkyQvjjRKJlp1';

    try {
      await rootRef
        .child('users')
        .child(senderId)
        .child('chats')
        .orderByChild('receiverId')
        .equalTo(receiverId)
        .once('value', async chatRoom => {
          if (!chatRoom) {
            const newChatKey = await rootRef.push().key;

            await rootRef.update({
              [`users/${senderId}/chats/${newChatKey}/_id`]: newChatKey,
              [`users/${senderId}/chats/${newChatKey}/receiverId`]: receiverId,
              [`users/${senderId}/chats/${newChatKey}/updatedAt`]: firebaseTimestamp,

              [`users/${receiverId}/chats/${newChatKey}/_id`]: newChatKey,
              [`users/${receiverId}/chats/${newChatKey}/receiverId`]: senderId,
              [`users/${receiverId}/chats/${newChatKey}/updatedAt`]: firebaseTimestamp,

              [`chats/${newChatKey}/_id`]: newChatKey,
              [`chats/${newChatKey}/updatedAt`]: firebaseTimestamp
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <View>
      <FlatList
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ListItem
            title={item._id}
            subtitle={item._id}
            titleStyle={{
              paddingBottom: 8,
              fontWeight: 'bold'
            }}
            titleProps={{ numberOfLines: 1 }}
            pad={16}
            containerStyle={{
              padding: 10,
              borderColor: color.Accent2,
              borderBottomWidth: 1
            }}
            leftAvatar={
              <Avatar
                title={item._id[8].toUpperCase()}
                rounded
                size={55}
                titleStyle={{
                  color: color.Foreground,
                  fontWeight: 'bold'
                }}
                overlayContainerStyle={{
                  backgroundColor: color.Background,
                  elevation: 2
                }}
              />
            }
            onPress={() => navigation.navigate('Chat', { chatId: item._id })}
          />
        )}
      />
      <Button title="Add Chat" onPress={() => addChat()} />
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
