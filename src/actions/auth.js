import * as C from 'constants/auth';

export const triggerLogin = payload => ({
    type: C.USER_LOGIN_PENDING,
    payload,
});

export const triggerRegister = payload => ({
    type: C.USER_REGISTER_PENDING,
    payload,
});

export const saveAuth = payload => ({
    type: C.USER_AUTH_FULLFILLED,
    payload,
});
