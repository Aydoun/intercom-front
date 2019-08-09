import * as C from '../constants/app';

const initialState = {
  notificationKey: 0,
  notificationData: {
    type: 'success',
    message: '',
  },
  appBreadCrumb: []
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case C.UPDATE_NOTIFCATION:
      return {
          ...state,
          notificationKey: state.notificationKey + 1,
          notificationData: action.data
      }
    default:
      return state;
  }
}

export default appReducer;
