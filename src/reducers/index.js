import { combineReducers } from 'redux';
import appReducer from './app';
import authReducer from './auth';
import planReducer from './plans';
import userReducer from './user';

const rootReducer = combineReducers({
  app : appReducer,
  auth: authReducer,
  plans: planReducer,
  user: userReducer,
});

export default rootReducer;
