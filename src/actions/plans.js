import * as C from 'constants/plans';

export const triggerPlanCreation = payload => ({
    type: C.PLAN_CREATE_PENDING,
    payload,
});

export const triggerPlanList = payload => ({
    type: C.PLAN_LIST_PENDING,
    payload,
});

export const triggerLike = payload => ({
    type: C.PLAN_LIKE_PENDING,
    payload,
});

export const triggerFileAddition = payload => ({
  type: C.PLAN_ADD_FILE_PENDING,
  payload,
});

export const triggerFileDeletion = payload => ({
  type: C.PLAN_DELETE_FILE_PENDING,
  payload,
});

export const createPlan = payload => ({
    type: C.PLAN_CREATE_FULLFILLED,
    payload,
});

export const savePlanList = payload => ({
    type: C.PLAN_LIST_FULLFILLED,
    payload,
});

export const triggerUpdatePlan = payload => ({
  type: C.PLAN_UPDATE_PENDING,
  payload,
});

export const updatePlan = payload => ({
  type: C.PLAN_UPDATE_FULLFILLED,
  payload,
});
