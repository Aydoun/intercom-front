import * as C from 'constants/repository';

const initialState = {
  fetching: false,
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.REPOSITORY_HISTORY_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case C.REPOSITORY_HISTORY_FULLFILLED:
      return {
        ...state,
        fetching: false,
        history: action.payload,
      };
    default:
      return state;
  }
}
