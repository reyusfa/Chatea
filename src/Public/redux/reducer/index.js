import { combineReducers } from 'redux';

import auth from './auth';
// import chats from './chats';
import users from './users';

const reducer = combineReducers({
  auth,
  // chats,
  users
});

export default reducer;
