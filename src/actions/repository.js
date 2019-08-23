import * as C from 'constants/repository';

export const triggerHistory = payload => ({
    type: C.REPOSITORY_HISTORY_PENDING,
    payload,
});

export const saveHistory = payload => ({
    type: C.REPOSITORY_HISTORY_FULLFILLED,
    payload,
});
