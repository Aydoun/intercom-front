import * as C from 'constants/user';

const initialState = {
  fetching: false,
  collection: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.USER_FETCH_PENDING:
      return {
          ...state,
          fetching: true,
      };
    case C.USER_FETCH_FULLFILLED:
      return {
          ...state,
          fetching: false,
          collection: {
            ...state.collection,
            ...action.payload,
          },
      }
    default:
      return state;
  }
}
