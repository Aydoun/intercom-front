import * as C from 'constants/repository';

const initialState = {
  fetching: false,
  history: [],
  files: [],
  summary: {
    fetching: false,
    contributors: {},
  },
  status: {
    fetching: false,
    collection: [],
  },
  branchList: [],
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
    case C.REPOSITORY_FILES_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case C.REPOSITORY_FILES_FULLFILLED:
      return {
        ...state,
        fetching: false,
        files: action.payload,
      };
    case C.REPOSITORY_SUMMARY_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case C.REPOSITORY_SUMMARY_FULLFILLED:
      return {
        ...state,
        fetching: false,
        summary: action.payload,
      };

    case C.REPOSITORY_BRANCHES_LIST_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case C.REPOSITORY_BRANCHES_LIST_FULLFILLED:
      return {
        ...state,
        fetching: false,
        branchList: action.payload,
      };
    case C.REPOSITORY_STATUS_LIST_PENDING:
      return {
        ...state,
        status: {
          fetching: true,
          collection: [],
        },
      };
    case C.REPOSITORY_STATUS_LIST_FULLFILLED:
      return {
        ...state,
        status: {
          fetching: false,
          collection: action.data,
        },
      };
    default:
      return state;
  }
}
