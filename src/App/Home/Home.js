import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { ListItem, Avatar } from 'react-native-elements';

import { firebaseDatabase } from '../../Public/config/firebase';

import { objectToArray } from '../../Public/helper';

import { color, fontFamily } from '../../Public/components/Styles';

const Home = props => {
  const { auth, navigation } = props;
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
      setRenderLoading(false);
    }
  }, [senderId, rootRef]);

  useEffect(() => {
    _getChats();
  }, [_getChats]);

  return renderLoading ? (
    <View {...{ style: { padding: 16 } }}>
      <ActivityIndicator size="large" color={color.Foreground} />
    </View>
  ) : (
    <View {...{ style: { backgroundColor: '#ffffff', flex: 1 } }}>
      <FlatList
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ListItem
            {...{
              title: item.receiverDisplayName,
              subtitle:
                (item.lastMessage &&
                item.lastMessage.user._id === item.receiverId
                  ? item.receiverDisplayName
                    ? `${item.receiverDisplayName}: `
                    : ''
                  : '') + (item.lastMessage ? item.lastMessage.text : ''),
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
                  title:
                    item.receiverDisplayName &&
                    item.receiverDisplayName[1].toUpperCase(),
                  ...(item.receiverPhotoURL
                    ? { source: { uri: item.receiverPhotoURL } }
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
                  size: 55
                }}
              />
            }
            onPress={() => navigation.navigate('Chat', { item })}
          />
        )}
      />
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
