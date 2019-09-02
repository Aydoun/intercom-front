import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/repository';
import { showError } from 'actions/index';
import * as A from 'actions/repository';
import { endpoints } from 'config';
import request from 'utils/request';

export function* getHistory({ payload }) {
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

export function* getFiles({ payload }) {
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${payload.repoName}/tree?branch=master`,
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveFiles(res));
  } catch (err) {
    yield put(showError('error', 'Error While Loading Your Files'));
  }
}

export function* getSummary({ payload }) {
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${payload.repoName}/summary?repoId=${payload.id}`,
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveSummary(res));
  } catch (err) {
    yield put(showError('error', 'Error While Loading Your Files'));
  }
}

function* getBranches({ payload }) {
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${payload.repoName}/branch`,
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveBranchList(res));
  } catch (err) {
    yield put(showError('error', 'Error While Loading Your Drafts'));
  }
}

export default function* root() {
  yield all([
    takeLatest(C.REPOSITORY_HISTORY_PENDING, getHistory),
    takeLatest(C.REPOSITORY_FILES_PENDING, getFiles),
    takeLatest(C.REPOSITORY_SUMMARY_PENDING, getSummary),
    takeLatest(C.REPOSITORY_BRANCHES_LIST_PENDING, getBranches),
  ]);
}
