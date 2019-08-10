import * as C from 'constants/auth';

const initialState = {
  fetching: false,
  registerFetching: false,
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
    case C.USER_REGISTER_PENDING:
        return {
          ...state,
          registerFetching: true,
      };
    case C.USER_AUTH_FULLFILLED:
      const { payload } = action;
      return {
          ...state,
          fetching: false,
          registerFetching: false,
          collection: payload,
      }
    default:
      return state;
  }
}

export default authReducer;
