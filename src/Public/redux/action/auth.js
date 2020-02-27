import {
  firebaseDatabase,
  firebaseAuth,
  firebaseTimestamp
} from '../../config/firebase';

const rootRef = firebaseDatabase.ref();

const actionRegisterRequest = ({ email, password, displayName }) => {
  return {
    type: 'REGISTER_REQUEST',
    payload: firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await firebaseAuth.currentUser.updateProfile({
          displayName
        });
        await rootRef.update({
          [`users/${user.uid}/uid`]: user.uid || null,
          [`users/${user.uid}/email`]: user.email || null,
          [`users/${user.uid}/displayName`]: displayName || null,
          [`users/${user.uid}/phoneNumber`]: user.phoneNumber || null,
          [`users/${user.uid}/photoURL`]: user.photoURL || null,
          [`users/${user.uid}/createdAt`]: firebaseTimestamp || null,
          [`peoples/${user.uid}/_id`]: user.uid || null,
          [`peoples/${user.uid}/email`]: user.email || null,
          [`peoples/${user.uid}/displayName`]: displayName || null,
          [`peoples/${user.uid}/phoneNumber`]: user.phoneNumber || null,
          [`peoples/${user.uid}/photoURL`]: user.photoURL || null,
          [`peoples/${user.uid}/createdAt`]: firebaseTimestamp || null
        });
      })
  };
};

const actionLoginRequest = ({ email, password }) => {
  return {
    type: 'LOGIN_REQUEST',
    payload: firebaseAuth.signInWithEmailAndPassword(email, password)
  };
};

const actionLogoutRequest = () => {
  return {
    type: 'LOGOUT_REQUEST',
    payload: firebaseAuth.signOut()
  };
};

export { actionRegisterRequest, actionLoginRequest, actionLogoutRequest };
