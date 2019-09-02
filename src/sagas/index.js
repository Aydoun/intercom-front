import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import plans from './plans';
import user from './user';
import repository from './repository';

export default function* root() {
  yield all([
      fork(auth),
      fork(plans),
      fork(user),
      fork(repository),
  ]);
}