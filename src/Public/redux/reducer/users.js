import { Toast } from '../../components';

const initialState = {
  about: '',
  displayName: '',
  email: '',
  phoneNumber: '',
  photoURL: '',
  isLoading: false
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_USER_ABOUT_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'EDIT_USER_ABOUT_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'EDIT_USER_ABOUT_FULFILLED':
      return {
        ...state,
        about: action.payload,
        isLoading: false
      };
    case 'EDIT_USER_PHONE_NUMBER_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'EDIT_USER_PHONE_NUMBER_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'EDIT_USER_PHONE_NUMBER_FULFILLED':
      return {
        ...state,
        phoneNumber: action.payload,
        isLoading: false
      };
    case 'GET_USER_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_USER_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        about: action.payload.about,
        displayName: action.payload.displayName,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        photoURL: action.payload.photoURL,
        isLoading: false
      };
    default:
      return state;
  }
};

export default users;
