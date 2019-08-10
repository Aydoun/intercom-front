import { all, takeLatest, call, put } from 'redux-saga/effects';
import { BrowserRouter } from 'react-router-dom';
import * as C from 'constants/auth';
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
    console.log(err);
  }
}

export default function* root() {
  yield all([
    takeLatest(C.USER_LOGIN_PENDING, userLogin),
  ]);
}
