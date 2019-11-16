import * as C from 'constants/repository';
import { createBranch } from 'actions/repository';

const initialState = {
  fetching: false,
  history: [],
  files: [],
  fileContent: [],
  summary: {
    fetching: false,
    contributors: {},
  },
  status: {
    fetching: false,
    collection: [],
  },
  branchList: [],
  currentBranch: 'master',
};

export default (state = initialState, action) => {
  const { payload } = action;
  
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
        history: payload,
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
        files: payload,
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
        summary: payload,
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
        branchList: payload,
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
    case C.REPOSITORY_READ_FILE_FULLFILLED:
      return {
        ...state,
        fileContent: payload,
      };
    case createBranch.SUCCESS:
      return {
        ...state,
        branchList: state.branchList.concat(payload.branchName),
        currentBranch: payload.branchName,
      };
    case createBranch.FAILURE:
      return state;
    case C.UPDATE_CURRENT_BRANCH:
      return {
        ...state,
        currentBranch: action.branch,
      };
    default:
      return state;
  }
}
