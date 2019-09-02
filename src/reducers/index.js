import { combineReducers } from 'redux';
import appReducer from './app';
import authReducer from './auth';
import planReducer from './plans';
import userReducer from './user';
import repositoryReducer from './repository';

const rootReducer = combineReducers({
  app : appReducer,
  auth: authReducer,
  plans: planReducer,
  user: userReducer,
  repository: repositoryReducer,
});

export default rootReducer;
