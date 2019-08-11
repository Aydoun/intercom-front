import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/plans';
import { showError } from 'actions/index';
// import * as A from 'actions/plans';
import { endpoints } from 'config';
import request from 'utils/request';

export function* PersistPlan(userInfo) {
  const PostOptions = {
    method: 'POST',
    url: endpoints.PLANS,
    data: userInfo.payload
  };

  try {
    yield call(request, PostOptions);
    yield put({ type: C.PLAN_CREATE_FULLFILLED });
    
    yield put(showError('success', 'Plan Successfully Added'));
  } catch (err) {
    yield put(showError('error', 'Error While Saving Your changes'));
  }
}

export default function* root() {
  yield all([
    takeLatest(C.PLAN_CREATE_PENDING, PersistPlan),
  ]);
}
