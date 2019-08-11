import * as C from 'constants/plans';

const initialState = {
  fetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.PLAN_CREATE_PENDING:
      return {
          ...state,
          fetching: true,
      };
    case C.PLAN_CREATE_FULLFILLED:
      return {
          ...state,
          fetching: false,
      }
    default:
      return state;
  }
}
