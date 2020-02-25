import { firebaseDatabase, firebaseTimestamp } from '../../config/firebase';
import { objectToArray } from '../../helper';

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
          .once('value', chatRoom => {
            if (!chatRoom.val() && chatRoom.val() === null) {
              const newChatKey = rootRef.push().key;

              rootRef.update({
                [`users/${senderId}/chats/${newChatKey}/_id`]: newChatKey,
                [`users/${senderId}/chats/${newChatKey}/receiverId`]: receiverId,
                [`users/${senderId}/chats/${newChatKey}/updatedAt`]: firebaseTimestamp,

                [`users/${receiverId}/chats/${newChatKey}/_id`]: newChatKey,
                [`users/${receiverId}/chats/${newChatKey}/receiverId`]: senderId,
                [`users/${receiverId}/chats/${newChatKey}/updatedAt`]: firebaseTimestamp,

                [`chats/${newChatKey}/_id`]: newChatKey,
                [`chats/${newChatKey}/updatedAt`]: firebaseTimestamp
              });
              resolve({ chatId: newChatKey });
            } else {
              reject({ error: 'Chat ID already exits.' });
            }
          });
      });
    }
  };
};

export { actionGetChats, actionAddChat };
