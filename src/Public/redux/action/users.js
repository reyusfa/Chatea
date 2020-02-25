import { firebaseDatabase, firebaseAuth } from '../../config/firebase';

const rootRef = firebaseDatabase.ref();

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
      rootRef
        .child('users')
        .child(userId)
        .child('about')
        .set(userAbout);
      resolve(userAbout);
    })
  };
};

const actionEditDisplayName = ({ userId, userDisplayName }) => {
  return {
    type: 'EDIT_USER_DISPLAY_NAME',
    payload: () => {
      firebaseAuth.currentUser.updateProfile({
        displayName: userDisplayName
      });
      rootRef
        .child('users')
        .child(userId)
        .child('displayName')
        .set(userDisplayName);
    }
  };
};

const actionEditPhotoURL = ({ userId, userPhotoURL }) => {
  return {
    type: 'EDIT_USER_PHOTO_URL',
    payload: () => {
      firebaseAuth.currentUser.updateProfile({
        displayName: userPhotoURL
      });
      rootRef
        .child('users')
        .child(userId)
        .child('photoURL')
        .set(userPhotoURL);
    }
  };
};

const actionEditPhoneNumber = ({ userId, userPhoneNumber }) => {
  return {
    type: 'EDIT_USER_PHONE_NUMBER',
    payload: () => {
      firebaseAuth.currentUser.updateProfile({
        displayName: userPhoneNumber
      });
      rootRef
        .child('users')
        .child(userId)
        .child('phoneNumber')
        .set(userPhoneNumber);
    }
  };
};

export {
  actionGetUser,
  actionEditAbout,
  actionEditDisplayName,
  actionEditPhotoURL,
  actionEditPhoneNumber
};
