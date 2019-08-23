import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/repository';
import { showError } from 'actions/index';
import * as A from 'actions/repository';
import { endpoints } from 'config';
import request from 'utils/request';

export function* PersistHistory({ payload }) {
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${payload.repoName}/history?branch=master`,
    data: payload
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveHistory(res));
  } catch (err) {
    yield put(showError('error', 'Error While Loading History logs'));
  }
}

export default function* root() {
  yield all([
    takeLatest(C.REPOSITORY_HISTORY_PENDING, PersistHistory),
  ]);
}
