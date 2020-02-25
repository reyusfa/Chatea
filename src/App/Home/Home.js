import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Avatar } from 'react-native-elements';

import { firebaseDatabase } from '../../Public/config/firebase';

import { objectToArray } from '../../Public/helper';

import { Button } from '../../Public/components';
import { color, fontFamily } from '../../Public/components/Styles';

import { actionAddChat } from '../../Public/redux/action';

const Home = props => {
  const { auth, navigation, addChat } = props;
  const [chats, setChats] = useState([]);
  const [renderLoading, setRenderLoading] = useState(false);

  navigation.setOptions({
    title: 'Chatea'
  });

  const rootRef = firebaseDatabase.ref();
  const senderId = auth.uid;

  const _getChats = useCallback(async () => {
    setRenderLoading(true);
    try {
      await rootRef
        .child('users')
        .child(senderId)
        .child('chats')
        .on('value', result => {
          const data = result.val() !== null ? result.val() : {};
          setChats(objectToArray(data));
          setRenderLoading(false);
        });
    } catch (error) {
      // console.log(error);
      setRenderLoading(false);
    }
  }, [senderId, rootRef]);

  useEffect(() => {
    _getChats();
  }, [_getChats]);

  const _addChat = async () => {
    const receiverId = '8PCQDERsEWb4JQTtkyQvjjRKJlp1';
    // const receiverId = '1';

    try {
      await addChat({ senderId, receiverId });
      // await rootRef
      //   .child('users')
      //   .child(senderId)
      //   .child('chats')
      //   .orderByChild('receiverId')
      //   .equalTo(receiverId)
      //   .once('value', async chatRoom => {
      //     if (!chatRoom) {
      //       const newChatKey = await rootRef.push().key;

      //       await rootRef.update({
      //         [`users/${senderId}/chats/${newChatKey}/_id`]: newChatKey,
      //         [`users/${senderId}/chats/${newChatKey}/receiverId`]: receiverId,
      //         [`users/${senderId}/chats/${newChatKey}/updatedAt`]: firebaseTimestamp,

      //         [`users/${receiverId}/chats/${newChatKey}/_id`]: newChatKey,
      //         [`users/${receiverId}/chats/${newChatKey}/receiverId`]: senderId,
      //         [`users/${receiverId}/chats/${newChatKey}/updatedAt`]: firebaseTimestamp,

      //         [`chats/${newChatKey}/_id`]: newChatKey,
      //         [`chats/${newChatKey}/updatedAt`]: firebaseTimestamp
      //       });
      //     }
      //   });
    } catch (error) {
      // console.log(error);
    }
  };

  return renderLoading ? (
    <View {...{ style: { padding: 16 } }}>
      <ActivityIndicator size="large" color={color.Foreground} />
    </View>
  ) : (
    <View>
      <FlatList
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ListItem
            {...{
              title: item._id,
              subtitle: item._id,
              titleStyle: { paddingBottom: 8, ...fontFamily.Bold },
              subtitleStyle: { ...fontFamily.Regular },
              titleProps: { numberOfLines: 1 },
              subtitleProps: { numberOfLines: 1 },
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
                  titleStyle: { color: color.Foreground, ...fontFamily.Bold },
                  overlayContainerStyle: {
                    backgroundColor: color.Background,
                    elevation: 2
                  }
                }}
                title={item._id[8].toUpperCase()}
                rounded
                size={55}
              />
            }
            onPress={() => navigation.navigate('Chat', { chatId: item._id })}
          />
        )}
      />
      <Button title="Add Chat" onPress={() => _addChat()} />
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
)(Home);
