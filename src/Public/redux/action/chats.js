import { firebaseDatabase, firebaseTimestamp } from '../../config/firebase';
import { objectToArray } from '../../helper';

import { getUser } from './users';

const rootRef = firebaseDatabase.ref();

const actionGetChats = ({ senderId }) => {
  return {
    type: 'GET_CHATS',
    payload: rootRef
      .child('users')
      .child(senderId)
      .child('chats')
      .once('value')
      .then(result => {
        const data = result.val() !== null ? result.val() : {};
        return objectToArray(data);
      })
  };
};

const actionAddChat = ({ senderId, receiverId }) => {
  return {
    type: 'ADD_CHAT',
    payload: () => {
      return new Promise((resolve, reject) => {
        rootRef
          .child('users')
          .child(senderId)
          .child('chats')
          .orderByChild('receiverId')
          .equalTo(receiverId)
          .once('value', async chatRoom => {
            if (!chatRoom.val() && chatRoom.val() === null) {
              const newChatKey = rootRef.push().key;

              await getUser({ userId: receiverId }).then(user => {
                rootRef.update({
                  [`users/${senderId}/chats/${newChatKey}/_id`]: newChatKey,
                  [`users/${senderId}/chats/${newChatKey}/receiverId`]: receiverId,
                  [`users/${senderId}/chats/${newChatKey}/receiverPhotoURL`]: user.photoURL,
                  [`users/${senderId}/chats/${newChatKey}/receiverDisplayName`]: user.displayName
                });
              });

              await getUser({ userId: senderId }).then(user => {
                rootRef.update({
                  [`users/${receiverId}/chats/${newChatKey}/_id`]: newChatKey,
                  [`users/${receiverId}/chats/${newChatKey}/receiverId`]: senderId,
                  [`users/${receiverId}/chats/${newChatKey}/receiverPhotoURL`]: user.photoURL,
                  [`users/${receiverId}/chats/${newChatKey}/receiverDisplayName`]: user.displayName
                });
              });

              await rootRef.update({
                [`users/${senderId}/chats/${newChatKey}/updatedAt`]: firebaseTimestamp,
                [`users/${receiverId}/chats/${newChatKey}/updatedAt`]: firebaseTimestamp,
                [`chats/${newChatKey}/_id`]: newChatKey,
                [`chats/${newChatKey}/updatedAt`]: firebaseTimestamp
              });

              await rootRef
                .child('users')
                .child(receiverId)
                .once('value', receiver => {
                  console.log(receiver.val());
                  resolve({
                    code: 'CHAT_ADDED',
                    data: {
                      _id: newChatKey,
                      receiverId: receiver.val().uid,
                      receiverDisplayName: receiver.val().displayName,
                      receiverPhotoURL: receiver.val().photoURL
                    }
                  });
                });
            } else {
              // console.log(Object.values(chatRoom.val())[0]);
              resolve({
                code: 'CHAT_EXISTS',
                data:
                  Object.values(chatRoom.val()) &&
                  Object.values(chatRoom.val())[0]
              });
            }
          });
      });
    }
  };
};

export { actionGetChats, actionAddChat };
