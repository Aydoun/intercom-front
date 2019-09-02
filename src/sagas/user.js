import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/user';
import { showError } from 'actions/index';
import * as A from 'actions/user';
import { endpoints } from 'config';
import request from 'utils/request';

function* PersistUser(userInfo) {
  const options = {
    method: 'GET',
    url: endpoints.USER,
    data: userInfo.payload
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveUser(res))
  } catch (err) {
    yield put(showError('error', 'Couldn\'t Retrieve Your information'));
  }
}

function* PersistFeedback(payload) {
  const options = {
    method: 'POST',
    url: endpoints.FEEDBACK,
    data: payload
  };

  console.log('payload', payload);

  try {
    // const res = yield call(request, options);
  } catch (err) {
    yield put(showError('error', 'Couldn\'t send your feedback, please try later'));
  }
}

export default function* root() {
  yield all([
    takeLatest(C.USER_FETCH_PENDING, PersistUser),
    takeLatest(C.SEND_FEEDBACK, PersistFeedback),
  ]);
}
