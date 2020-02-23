import { Toast } from '../../components';

const initialState = {
  data: [],
  isLoading: false,
  isLogout: true
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST_PENDING':
      return {
        ...initialState,
        isLoading: true
      };
    case 'LOGIN_REQUEST_REJECTED':
      if (action.payload.code) {
        Toast('Email and password does not match!');
      }
      return {
        ...initialState,
        isLoading: false
      };
    case 'LOGIN_REQUEST_FULFILLED':
      return {
        ...state,
        data: action.payload,
        isLogout: false
      };
    case 'REGISTER_REQUEST_PENDING':
      return {
        ...initialState,
        isLoading: true
      };
    case 'REGISTER_REQUEST_REJECTED':
      if (action.payload.message) {
        Toast(action.payload.message);
      }
      return {
        ...initialState,
        isLoading: false
      };
    case 'REGISTER_REQUEST_FULFILLED':
      return {
        ...initialState,
        isLoading: false,
        registered: action.payload
      };
    default:
      return state;
  }
};

export default auth;
