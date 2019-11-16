import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/repository';
import * as A from 'actions/repository';
import { notify } from 'actions/index';
import { endpoints } from 'config';
import request from 'utils/request';

// function* getHistory({ payload }) {
//   const options = {
//     method: 'GET',
//     url: `${endpoints.REPOSITORY}/${payload.repoName}/history?branch=master`,
//     data: payload
//   };

//   try {
//     const { response: res } = yield call(request, options);
//     yield put(A.saveHistory(res));
//   } catch (err) {
//     yield put(notify('error', 'Error While Loading History logs'));
//   }
// }

function* getTreeFiles({ payload }) {
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${payload.repoName}/tree?branch=${payload.branch}`,
  };

  try {
    yield put({ type: C.UPDATE_CURRENT_BRANCH, branch: payload.branch });
    const { response: res } = yield call(request, options);
    yield put(A.treeList.success(res));
  } catch (err) {
    yield put(A.treeList.failure(err.message));
    yield put(notify('error', 'Error While Loading Your Files'));
  }
}

// function* getSummary({ payload }) {
//   const options = {
//     method: 'GET',
//     url: `${endpoints.REPOSITORY}/${payload.repoName}/summary?repoId=${payload.id}`,
//   };

//   try {
//     const { response: res } = yield call(request, options);
//     yield put(A.saveSummary(res));
//   } catch (err) {
//     yield put(notify('error', 'Error While Loading Your Files'));
//   }
// }

function* getBranches({ payload }) {
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${payload.repoName}/branch`,
  };

  try {
    const { response: res } = yield call(request, options);
    yield put(A.getBranches.success(res));
  } catch (err) {
    yield put(A.getBranches.failure(err.message));
    yield put(notify('error', 'Error While Loading Your Drafts'));
  }
}

// function* getStatus({ payload }) {
//   const options = {
//     method: 'GET',
//     url: `${endpoints.REPOSITORY}/${payload.repoName}/status`,
//   };

//   try {
//     const { response: res } = yield call(request, options);
//     yield put(A.saveStatus(res));
//   } catch (err) {
//     yield put(notify('error', 'Error While Loading The Preview'));
//   }
// }

function* readFile({ payload }) {
  const { repoName, fileName, sha } = payload;
  const options = {
    method: 'GET',
    url: `${endpoints.REPOSITORY}/${repoName}/file?fileName=${fileName}&sha=${sha}&branch=master`,
  };

  try {
    const { response: res } = yield call(request, options);
    yield put(A.updateFileContent(res));
  } catch (err) {
    yield put(notify('error', 'Error While Loading File Content'));
  }
}

function* writeFile({ payload }) {
  const options = {
    method: 'PUT',
    url: `${endpoints.FILES}/writeFile`,
    data: payload
  };

  try {
    yield call(request, options);
    yield put(notify('info', 'File content successfully changed'));
  } catch (err) {
    yield put(notify('error', 'Error While Loading File Content'));
  }
}

function* commitChanges({ payload }) {
  const { repoName } = payload;
  const options = {
    method: 'POST',
    url: `${endpoints.REPOSITORY}/${repoName}/commit`,
    data: payload
  };

  try {
    yield call(request, options);
    yield put(notify('success', 'commit successfully submited'));
  } catch (err) {
    yield put(notify('info', 'There is nothing to commit yet'));
  }
}

function* createNewBranch({ payload }) {
  const { repoName, branchName } = payload;
  const options = {
    method: 'POST',
    url: `${endpoints.REPOSITORY}/${repoName}/branch?branchName=${branchName}`,
    data: payload
  };

  try {
    yield call(request, options);
    yield put(A.createBranch.success({ branchName }));
    yield put(notify('success', 'Draft Successfully added'));
  } catch (err) {
    yield put(A.createBranch.failure(err.message));
    yield put(notify('error', 'Error while creating your draft'));
  }
}

export default function* root() {
  yield all([
    takeLatest(A.treeList.TRIGGER, getTreeFiles),
    takeLatest(A.getBranches.TRIGGER, getBranches),
    takeLatest(C.REPOSITORY_READ_FILE_PENDING, readFile),
    takeLatest(C.REPOSITORY_WRITE_FILE_PENDING, writeFile),
    takeLatest(C.REPOSITORY_COMMIT_PENDING, commitChanges),
    takeLatest(A.createBranch.TRIGGER, createNewBranch),
  ]);
}
