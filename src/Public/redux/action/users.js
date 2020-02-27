import {
  firebaseDatabase,
  firebaseAuth,
  firebaseTimestamp
} from '../../config/firebase';

const rootRef = firebaseDatabase.ref();

const getUser = ({ userId }) => {
  return rootRef
    .child('users')
    .child(userId)
    .once('value')
    .then(result => {
      const data = result.val() !== null ? result.val() : {};
      return data;
    });
};

const actionGetUser = ({ userId }) => {
  return {
    type: 'GET_USER',
    payload: rootRef
      .child('users')
      .child(userId)
      .once('value')
      .then(result => {
        const data = result.val() !== null ? result.val() : {};
        return data;
      })
  };
};

const actionEditAbout = ({ userId, userAbout }) => {
  return {
    type: 'EDIT_USER_ABOUT',
    payload: new Promise((resolve, reject) => {
      rootRef.update({
        [`users/${userId}/about`]: userAbout,
        [`peoples/${userId}/about`]: userAbout
      });
      resolve(userAbout);
    })
  };
};

const actionEditDisplayName = ({ userId, userDisplayName }) => {
  return {
    type: 'EDIT_USER_DISPLAY_NAME',
    payload: new Promise((resolve, reject) => {
      firebaseAuth.currentUser.updateProfile({
        displayName: userDisplayName
      });
      rootRef.update({
        [`users/${userId}/displayName`]: userDisplayName,
        [`peoples/${userId}/displayName`]: userDisplayName
      });
      resolve(userDisplayName);
    })
  };
};

const actionEditPhotoURL = ({ userId, userPhotoURL }) => {
  return {
    type: 'EDIT_USER_PHOTO_URL',
    payload: new Promise((resolve, reject) => {
      firebaseAuth.currentUser.updateProfile({
        photoURL: userPhotoURL
      });
      rootRef.update({
        [`users/${userId}/photoURL`]: userPhotoURL,
        [`peoples/${userId}/photoURL`]: userPhotoURL
      });
      resolve(userPhotoURL);
    })
  };
};

const actionEditPhoneNumber = ({ userId, userPhoneNumber }) => {
  return {
    type: 'EDIT_USER_PHONE_NUMBER',
    payload: new Promise((resolve, reject) => {
      firebaseAuth.currentUser.updateProfile({
        phoneNumber: userPhoneNumber
      });
      rootRef.update({
        [`users/${userId}/phoneNumber`]: userPhoneNumber,
        [`peoples/${userId}/phoneNumber`]: userPhoneNumber
      });
      resolve(userPhoneNumber);
    })
  };
};

const actionAddContact = ({ userId, peopleId }) => {
  return {
    type: 'ADD_CONTACT',
    payload: () => {
      return new Promise((resolve, reject) => {
        rootRef
          .child('users')
          .child(userId)
          .child('contacts')
          .orderByChild('_id')
          .equalTo(peopleId)
          .once('value', async contact => {
            if (!contact.val() && contact.val() === null) {
              await getUser({ userId: peopleId }).then(user => {
                rootRef.update({
                  [`contacts/${userId}/${peopleId}/_id`]: peopleId,
                  [`contacts/${userId}/${peopleId}/email`]: user.email,
                  [`contacts/${userId}/${peopleId}/displayName`]: user.displayName,
                  [`contacts/${userId}/${peopleId}/photoURL`]: user.photoURL,
                  [`contacts/${userId}/${peopleId}/addedAt`]: firebaseTimestamp
                });
                resolve({ peopleId });
              });
            } else {
              reject({ error: 'Contact already added.' });
            }
          });
      });
    }
  };
};

export {
  getUser,
  actionGetUser,
  actionEditAbout,
  actionEditDisplayName,
  actionEditPhotoURL,
  actionEditPhoneNumber,
  actionAddContact
};
