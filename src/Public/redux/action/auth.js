import { firebaseDatabase, firebaseAuth } from '../../config/firebase';

const actionRegisterRequest = ({ email, password }) => {
  return {
    type: 'REGISTER_REQUEST',
    payload: firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        firebaseDatabase
          .ref()
          .child('users')
          .child(user.uid)
          .set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
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
