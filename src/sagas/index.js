import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import plans from './plans';

export default function* root() {
  yield all([
      fork(auth),
      fork(plans),
  ]);
}