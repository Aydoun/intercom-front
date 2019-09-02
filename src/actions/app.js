import * as C from 'constants/app';

export const setIssueDrawerVisibility = payload => ({
    type: C.TOGGLE_ISSUE_DRAWER,
    payload,
});

export const setFeedbackDrawerVisibility = payload => ({
    type: C.TOGGLE_FEEDBACK_DRAWER,
    payload,
});

