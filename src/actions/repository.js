import { createRoutine } from 'redux-saga-routines';
import * as C from 'constants/repository';

export const treeList = createRoutine(C.REPOSITORY_TREE_LIST);

export const getBranches = createRoutine(C.REPOSITORY_BRANCH_LIST);

export const triggerFileRead = payload => ({
  type: C.REPOSITORY_READ_FILE_PENDING,
  payload,
});

export const updateFileContent = payload => ({
  type: C.REPOSITORY_READ_FILE_FULLFILLED,
  payload,
});

export const writeFileContent = payload => ({
  type: C.REPOSITORY_WRITE_FILE_PENDING,
  payload,
});

export const addCommit = payload => ({
  type: C.REPOSITORY_COMMIT_PENDING,
  payload,
});

export const createBranch = createRoutine(C.CREATE_BRANCH);