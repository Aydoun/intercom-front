import { combineReducers } from 'redux';
import appReducer from './app';
import authReducer from './auth';
import planReducer from './plans';

const rootReducer = combineReducers({
  app : appReducer,
  auth: authReducer,
  plans: planReducer,
});

export default rootReducer;
