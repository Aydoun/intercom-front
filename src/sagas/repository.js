import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/repository';
import { notify } from 'actions/index';
import * as A from 'actions/repository';
import { endpoints } from 'config';
import request from 'utils/request';

function* getHistory({ payload }) {
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${payload.repoName}/history?branch=master`,
    data: payload
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveHistory(res));
  } catch (err) {
    yield put(notify('error', 'Error While Loading History logs'));
  }
}

function* getFiles({ payload }) {
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${payload.repoName}/tree?branch=master`,
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveFiles(res));
  } catch (err) {
    yield put(notify('error', 'Error While Loading Your Files'));
  }
}

function* getSummary({ payload }) {
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${payload.repoName}/summary?repoId=${payload.id}`,
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveSummary(res));
  } catch (err) {
    yield put(notify('error', 'Error While Loading Your Files'));
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
    yield put(notify('error', 'Error While Loading Your Drafts'));
  }
}

function* getStatus({ payload }) {
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${payload.repoName}/status`,
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveStatus(res));
  } catch (err) {
    yield put(notify('error', 'Error While Loading The Preview'));
  }
}

export default function* root() {
  yield all([
    takeLatest(C.REPOSITORY_HISTORY_PENDING, getHistory),
    takeLatest(C.REPOSITORY_FILES_PENDING, getFiles),
    takeLatest(C.REPOSITORY_SUMMARY_PENDING, getSummary),
    takeLatest(C.REPOSITORY_BRANCHES_LIST_PENDING, getBranches),
    takeLatest(C.REPOSITORY_STATUS_LIST_PENDING, getStatus),
  ]);
}
