import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/auth';
import { showError } from 'actions/index';
import * as A from 'actions/auth';
import { endpoints } from 'config';
import { saveToken } from 'utils';

import request from 'utils/request';

function* userLogin(userInfo) {
  const options = {
    method: 'POST',
    url: endpoints.LOGIN,
    data: userInfo.payload
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveAuth(res));

    saveToken(res.token);
    window.location.href = '/';
  } catch (err) {
    yield put(showError('error', 'Wrong Information, please Try again!'));
    yield put(A.saveAuth(null));
  }
}

function* userRegister(userInfo) {
  const options = {
    method: 'POST',
    url: endpoints.REGISTER,
    data: userInfo.payload
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveAuth(res));

    saveToken(res.token);
    window.location.href = '/';
  } catch (err) {
    yield put(showError('error', 'Wrong Information, please Try again!'));
    yield put(A.saveAuth(null));
  }
}

export default function* root() {
  yield all([
    takeLatest(C.USER_LOGIN_PENDING, userLogin),
    takeLatest(C.USER_REGISTER_PENDING, userRegister),
  ]);
}
