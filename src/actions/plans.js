import * as C from 'constants/plans';

export const triggerPlanCreation = payload => ({
    type: C.PLAN_CREATE_PENDING,
    payload,
});

export const savePlan = payload => ({
    type: C.PLAN_CREATE_FULLFILLED,
    payload,
});
