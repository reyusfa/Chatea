import { Toast } from '../../components';

const initialState = {
  data: [],
  isLoading: false,
  isLogout: true,
  uid: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'LOGIN_REQUEST_REJECTED':
      if (action.payload.code) {
        Toast(action.payload.message);
      }
      return {
        ...state,
        isLoading: false
      };
    case 'LOGIN_REQUEST_FULFILLED':
      return {
        ...state,
        data: action.payload,
        isLogout: false,
        uid: action.payload.user.uid
      };
    case 'REGISTER_REQUEST_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'REGISTER_REQUEST_REJECTED':
      if (action.payload.message) {
        Toast(action.payload.message);
      }
      return {
        ...state,
        isLoading: false
      };
    case 'REGISTER_REQUEST_FULFILLED':
      return {
        ...state,
        isLoading: false
      };
    case 'LOGOUT_REQUEST_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'LOGOUT_REQUEST_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'LOGOUT_REQUEST_FULFILLED':
      return initialState;
    default:
      return state;
  }
};

export default auth;
