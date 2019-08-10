import * as C from 'constants/auth';

const initialState = {
  fetching: false,
  error: null,
  collection: {},
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case C.USER_LOGIN_PENDING:
      return {
          ...state,
          fetching: true,
      };
    case C.USER_LOGIN_FULLFILLED:
      const { payload } = action;
      return {
          ...state,
          fetching: false,
          collection: payload,
      }
    default:
      return state;
  }
}

export default authReducer;
