import { all, takeLatest, take } from 'redux-saga/effects';
import * as C from '../constants/auth';
// import * as A from '../actions/auth';

export function* userLogin() {
  console.log('Begin Login')
  yield take();
}

/**
 * User Sagas
 */

export default function* root() {
  yield all([
    takeLatest(C.USER_LOGIN_PENDING, userLogin),
  ]);
}
