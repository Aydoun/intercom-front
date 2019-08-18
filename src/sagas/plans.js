import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/plans';
import { showError } from 'actions/index';
import * as A from 'actions/plans';
import { endpoints } from 'config';
import request from 'utils/request';

export function* PersistPlan({ payload }) {
  const options = {
    method: 'POST',
    url: endpoints.PLANS,
    data: payload
  };

  try {
    const res = yield call(request, options);
    yield put(A.createPlan(res));
    
    yield put(showError('success', 'Plan Successfully Added'));
  } catch (err) {
    yield put(showError('error', 'Error While Saving Your changes'));
  }
}

export function* ListPlans() {
  const options = {
    method: 'GET',
    url: `${endpoints.USER}/plans`,
  };

  try {
    const res = yield call(request, options);
    yield put(A.savePlanList(res));
    
  } catch (err) {
    yield put(showError('error', 'Server Error, please try again!'));
    yield put(A.savePlanList([]));
  }
}

export default function* root() {
  yield all([
    takeLatest(C.PLAN_CREATE_PENDING, PersistPlan),
    takeLatest(C.PLAN_LIST_PENDING, ListPlans),
  ]);
}
