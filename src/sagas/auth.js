import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/auth';
import { showError } from 'actions/index';
import * as A from 'actions/auth';
import { endpoints } from 'config';
import { saveToken } from 'utils';

import request from 'utils/request';

export function* userLogin(userInfo) {
  const PostOptions = {
    method: 'POST',
    url: endpoints.LOGIN,
    data: userInfo.payload
  };

  try {
    const res = yield call(request, PostOptions);
    yield put(A.saveLogin(res));

    saveToken(res.token);
    window.location.href = '/';
  } catch (err) {
    yield put(showError('error', 'Wrong Login Information, please Try again!'));
    yield put(A.saveLogin(null));
  }
}

export default function* root() {
  yield all([
    takeLatest(C.USER_LOGIN_PENDING, userLogin),
  ]);
}
