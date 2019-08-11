import * as C from 'constants/user';

export const triggerFetchUser = payload => ({
    type: C.USER_FETCH_PENDING,
    payload,
});

export const saveUser = payload => ({
    type: C.USER_FETCH_FULLFILLED,
    payload,
});
