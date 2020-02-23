import { auth } from '../../config/firebase';

const actionRegisterRequest = ({ email, password }) => {
  return {
    type: 'REGISTER_REQUEST',
    payload: auth.createUserWithEmailAndPassword(email, password)
  };
};

const actionLoginRequest = ({ email, password }) => {
  return {
    type: 'LOGIN_REQUEST',
    payload: auth.signInWithEmailAndPassword(email, password)
  };
};

const actionLogoutRequest = () => {
  return {
    type: 'LOGOUT_REQUEST'
  };
};

export { actionRegisterRequest, actionLoginRequest, actionLogoutRequest };
