import {
  firebaseDatabase,
  firebaseAuth,
  firebaseTimestamp
} from '../../config/firebase';

const rootRef = firebaseDatabase.ref();

const actionRegisterRequest = ({ email, password }) => {
  return {
    type: 'REGISTER_REQUEST',
    payload: firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        rootRef.update({
          [`users/${user.uid}/uid`]: user.uid || null,
          [`users/${user.uid}/email`]: user.email || null,
          [`users/${user.uid}/displayName`]: user.displayName || null,
          [`users/${user.uid}/phoneNumber`]: user.phoneNumber || null,
          [`users/${user.uid}/photoURL`]: user.photoURL || null,
          [`users/${user.uid}/createdAt`]: firebaseTimestamp || null,
          [`peoples/${user.uid}/_id`]: user.uid || null,
          [`peoples/${user.uid}/email`]: user.email || null,
          [`peoples/${user.uid}/displayName`]: user.displayName || null,
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
