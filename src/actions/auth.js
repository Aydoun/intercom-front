import * as C from 'constants/auth';

export const triggerLogin = payload => ({
    type: C.USER_LOGIN_PENDING,
    payload,
});

export const saveLogin = payload => ({
    type: C.USER_LOGIN_FULLFILLED,
    payload,
});
