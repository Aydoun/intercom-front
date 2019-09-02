import * as C from 'constants/app';

export const setIssueDrawerVisibility = payload => ({
    type: C.TOGGLE_ISSUE_DRAWER,
    payload,
});

