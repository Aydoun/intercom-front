import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/user';
import { showError } from 'actions/index';
import * as A from 'actions/user';
import { endpoints } from 'config';
import request from 'utils/request';

export function* PersistUser(userInfo) {
  const PostOptions = {
    method: 'GET',
    url: endpoints.USER,
    data: userInfo.payload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(A.saveUser(res))
  } catch (err) {
    yield put(showError('error', 'Couldn\'t Retrieve Your information'));
  }
}

export default function* root() {
  yield all([
    takeLatest(C.USER_FETCH_PENDING, PersistUser),
  ]);
}
