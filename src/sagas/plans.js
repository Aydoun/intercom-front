import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import * as C from 'constants/plans';
import { notify } from 'actions/index';
import * as A from 'actions/plans';
import { endpoints } from 'config';
import request from 'utils/request';

function* PersistPlan({ payload }) {
  const options = {
    method: 'POST',
    url: endpoints.PLANS,
    data: payload
  };

  try {
    const res = yield call(request, options);
    yield put(A.createPlan(res));
    
    yield put(notify('success', 'Plan Successfully Added'));
  } catch (err) {
    yield put(notify('error', 'Error While Saving Your changes'));
  }
}

function* ListPlans() {
  const options = {
    method: 'GET',
    url: `${endpoints.USER}/plans`,
  };

  try {
    const res = yield call(request, options);
    yield put(A.savePlanList(res));
    
  } catch (err) {
    yield put(notify('error', 'Server Error, please try again'));
    yield put(A.savePlanList([]));
  }
}


function* like({ payload: planId }) {
  const options = {
    method: 'PUT',
    url: `${endpoints.PLANS}/${planId}/like`,
  };

  try {
    const res = yield call(request, options);
    
    const stateCollection = yield select(state => state.plans.collection);
    const newCollection = stateCollection.slice();
    const planIndex = newCollection.findIndex(item => item._id === planId);

    if (planIndex > -1 && res.likes) {
      let plan = newCollection[planIndex];
      plan.likes = res.likes;
      newCollection.splice(planIndex, 1, plan);

      yield put(A.updatePlan({ newCollection }));
      yield put(notify('success', 'Successfully updated your information'));
    }
  } catch (err) {
    yield put(notify('info', 'Your like is already been registred'));
  } 
}

function* addFile({ payload }) {
  const options = {
    method: 'POST',
    url: `${endpoints.FILES}/${payload.type === 'file' ? 'addFile' : 'addDir'}`,
    data: payload,
  };

  try {
    yield call(request, options);
  } catch (err) {
    yield put(notify('error', 'Unexpected Error, please try again'));
  } 
}

function* deleteFile({ payload }) {
  const options = {
    method: 'DELETE',
    url: `${endpoints.FILES}/deleteFile`,
    data: payload,
  };

  try {
    yield call(request, options);
  } catch (err) {
    yield put(notify('error', 'Unexpected Error, please try again'));
  } 
}

function* updatePlan({ payload }) {
  const options = {
    method: 'PUT',
    url: `${endpoints.PLANS}/${payload.id}`,
    data: payload.data,
  };

  try {
    const res = yield call(request, options);

    const stateCollection = yield select(state => state.plans.collection);
    const newCollection = stateCollection.slice();
    const currentPlanIndex = newCollection.findIndex(item => item._id === payload.id);
    if (currentPlanIndex > -1) {
      let plan = {
        ...newCollection[currentPlanIndex],
        ...res,
      };      
      newCollection.splice(currentPlanIndex, 1, plan);
      yield put(A.updatePlan({ newCollection }));
      yield put(notify('success', 'Successfully updated your information'));
    } 
  } catch (err) {
    yield put(notify('error', 'Coudn\'t save your changes, please try again'));
  } 
}

export default function* root() {
  yield all([
    takeLatest(C.PLAN_CREATE_PENDING, PersistPlan),
    takeLatest(C.PLAN_LIST_PENDING, ListPlans),
    takeLatest(C.PLAN_LIKE_PENDING, like),
    takeLatest(C.PLAN_ADD_FILE_PENDING, addFile),
    takeLatest(C.PLAN_DELETE_FILE_PENDING, deleteFile),
    takeLatest(C.PLAN_UPDATE_PENDING, updatePlan),
  ]);
}
