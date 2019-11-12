import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as C from 'constants/user';
import { notify } from 'actions/index';
import * as A from 'actions/user';
import { setFeedbackDrawerVisibility } from 'actions/app';
import { endpoints } from 'config';
import request from 'utils/request';

function* PersistUser(userInfo) {
  const options = {
    method: 'GET',
    url: endpoints.USER,
    data: userInfo.payload
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveUser(res))
  } catch (err) {
    yield put(notify('error', 'Couldn\'t Retrieve Your information'));
  }
}

function* PersistFeedback({ payload }) {
  const options = {
    method: 'POST',
    url: endpoints.FEEDBACK,
    data: payload
  };

  try {
    yield call(request, options);
    yield put(notify('success', 'Thank you for your feedback'));
    yield put(setFeedbackDrawerVisibility(false));
  } catch (err) {
    yield put(notify('error', 'Couldn\'t send your feedback, please try later'));
  }
}

function* UpdateUser({ payload }) {
  const options = {
    method: 'PUT',
    url: endpoints.USER,
    data: payload
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveUser(res));
    yield put(notify('success', 'Successfully updated your information'));
  } catch (err) {
    yield put(notify('error', 'Couldn\'t save your changes, please try again!'));
  }
}

function* getActivityList({ payload }) {
  const options = {
    method: 'GET',
    url: endpoints.ACTIVITY,
  };

  try {
    const res = yield call(request, options);
    yield put(A.saveActivityList(res));
  } catch (err) {
    yield put(notify('error', 'Sorry we Couldn\'t Retrieve The list, please try again!'));
  }
}

export default function* root() {
  yield all([
    takeLatest(C.USER_FETCH_PENDING, PersistUser),
    takeLatest(C.SEND_FEEDBACK, PersistFeedback),
    takeLatest(C.USER_UPDATE_PENDING, UpdateUser),
    takeLatest(C.USER_ACTIVITY_PENDING, getActivityList),
  ]);
}
