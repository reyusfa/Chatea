const initialState = {
  data: [],
  isLoading: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST_PENDING':
      return {
        isLoading: true
      };
    case 'LOGIN_REQUEST_REJECTED':
      return {
        isLoading: false
      };
    case 'LOGIN_REQUEST_FULFILLED':
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
};

export default auth;
