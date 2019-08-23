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
