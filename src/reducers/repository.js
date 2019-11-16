import * as C from 'constants/repository';
import * as A from 'actions/repository';

const initialState = {
  fetching: false,
  history: [],
  tree: {
    fetching: false,
    files: [],
    error: null,
  },
  fileContent: [],
  summary: {
    fetching: false,
    contributors: {},
  },
  status: {
    fetching: false,
    collection: [],
  },
  branches: {
    branchList: [],
    fetching: false,
    error: null,
    currentBranch: 'master',
  },
};

export default (state = initialState, action) => {
  const { payload } = action;
  
  switch (action.type) {
    case A.treeList.TRIGGER:
      return {
        ...state,
        tree: {
          ...initialState.tree,
          fetching: true,
        },
      };
    case A.treeList.SUCCESS:
      return {
        ...state,
        tree: {
          ...initialState.tree,
          files: payload,
        },
      };
    case A.treeList.FAILURE:
      return {
        ...state,
        tree: {
          ...initialState.tree,
          error: true,
        },
      };
    case A.getBranches.TRIGGER:
      return {
        ...state,
        branches: {
          ...initialState.branches,
          fetching: true,
        },
      };
    case A.getBranches.SUCCESS:
      return {
        ...state,
        branches: {
          ...initialState.branches,
          branchList: payload,
        },
      };
    case A.getBranches.FAILURE:
      return {
        ...state,
        branches: {
          ...initialState.branches,
          error: true,
        },
      };
    case C.REPOSITORY_READ_FILE_FULLFILLED:
      return {
        ...state,
        fileContent: payload,
      };
    case A.createBranch.SUCCESS:
      return {
        ...state,
        branchList: state.branchList.concat(payload.branchName),
        currentBranch: payload.branchName,
      };
    case A.createBranch.FAILURE:
      return state;
    case C.UPDATE_CURRENT_BRANCH:
      return {
        ...state,
        branches: {
          ...state.branches,
          currentBranch: action.branch,
        },
      };
    default:
      return state;
  }
}
