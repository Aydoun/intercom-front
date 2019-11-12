import * as C from 'constants/user';

export const triggerFetchUser = payload => ({
    type: C.USER_FETCH_PENDING,
    payload,
});

export const triggerActivity = payload => ({
  type: C.USER_ACTIVITY_PENDING,
  payload,
});

export const saveUser = payload => ({
    type: C.USER_FETCH_FULLFILLED,
    payload,
});

export const saveActivityList = payload => ({
  type: C.USER_ACTIVITY_FULLFILLED,
  payload,
});

export const updateUser = payload => ({
  type: C.USER_UPDATE_PENDING,
  payload,
});

export const sendFeedback = payload => ({
    type: C.SEND_FEEDBACK,
    payload,
});
