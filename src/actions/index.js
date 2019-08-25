import * as C from 'constants/app';

export const showError = (errorType, message) => ({
  type: C.SHOW_NOTIFCATION,
  data: {
    type: errorType,
    message,
  }
});

export const updateBreadbrumb = ({ name, action, url }) => ({
  type: action === 'push' ? C.PUSH_NEW_BREADCRUMB : C.RESET_NEW_BREADCRUMB,
  payload: {
    name,
    url,
  }
});

export const clearBreadbrumb = () => ({
  type: C.CLEAR_BREADCRUMB,
});