import * as C from 'constants/app';

export const showError = (errorType, message) => ({
    type: C.SHOW_NOTIFCATION,
    data: {
        type: errorType,
        message,
    }
});