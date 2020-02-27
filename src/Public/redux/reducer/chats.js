const initialState = {
  data: [],
  isLoading: false
};

const chats = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHATS_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'GET_CHATS_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'GET_CHATS_FULFILLED':
      return {
        ...state,
        isLoading: false
      };
    case 'ADD_CHAT_PENDING':
      return {
        ...state,
        isLoading: true
      };
    case 'ADD_CHAT_REJECTED':
      return {
        ...state,
        isLoading: false
      };
    case 'ADD_CHAT_FULFILLED':
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default chats;
