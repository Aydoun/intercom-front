import * as C from 'constants/user';

const initialState = {
  fetching: false,
  collection: {},
  activity: {
    history: [],
  },
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
    case C.USER_ACTIVITY_FULLFILLED:
      return {
        ...state,
        activity: action.payload,
      };
    default:
      return state;
  }
}
