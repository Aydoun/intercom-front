import * as C from 'constants/plans';

const initialState = {
  fetching: false,
  listFetching: false,
  collection: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.PLAN_CREATE_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case C.PLAN_LIST_PENDING:
      return {
        ...state,
        listFetching: true,
      };
    case C.PLAN_CREATE_FULLFILLED:
      return {
        ...state,
        fetching: false,
        collection: state.collection.concat(action.payload),
      };
    case C.PLAN_LIST_FULLFILLED:
      const { docs, ...rest } = action.payload;
      return {
        ...state,
        listFetching: false,
        collection: docs,
        ...rest,
      };
    default:
      return state;
  }
}
