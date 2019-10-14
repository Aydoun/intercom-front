import * as C from 'constants/repository';

export const triggerHistory = payload => ({
    type: C.REPOSITORY_HISTORY_PENDING,
    payload,
});

export const saveHistory = payload => ({
    type: C.REPOSITORY_HISTORY_FULLFILLED,
    payload,
});

export const triggerFiles = payload => ({
  type: C.REPOSITORY_FILES_PENDING,
  payload,
});

export const saveFiles = payload => ({
  type: C.REPOSITORY_FILES_FULLFILLED,
  payload,
});

export const triggerSummary = payload => ({
  type: C.REPOSITORY_SUMMARY_PENDING,
  payload,
});

export const saveSummary = payload => ({
  type: C.REPOSITORY_SUMMARY_FULLFILLED,
  payload,
});

export const triggerBranchList = payload => ({
  type: C.REPOSITORY_BRANCHES_LIST_PENDING,
  payload,
});

export const saveBranchList = payload => ({
  type: C.REPOSITORY_BRANCHES_LIST_FULLFILLED,
  payload,
});

export const triggerStatus = payload => ({
  type: C.REPOSITORY_STATUS_LIST_PENDING,
  payload,
});

export const saveStatus = payload => ({
  type: C.REPOSITORY_STATUS_LIST_FULLFILLED,
  payload,
});