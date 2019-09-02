import * as C from 'constants/app';

const initialState = {
  notificationKey: 0,
  notificationData: {
    type: 'success',
    message: '',
  },
  breadcrumb: [],
  issueDrawerVisible: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case C.SHOW_NOTIFCATION:
      return {
        ...state,
        notificationKey: state.notificationKey + 1,
        notificationData: action.data
      }
    case C.PUSH_NEW_BREADCRUMB:
      return {
        ...state,
        breadcrumb: state.breadcrumb.concat(action.payload),
      }
    case C.RESET_NEW_BREADCRUMB:
      return {
        ...state,
        breadcrumb: [action.payload]
      }
    case C.CLEAR_BREADCRUMB:
      return {
        ...state,
        breadcrumb: []
      }
    case C.TOGGLE_ISSUE_DRAWER:
      console.log('action.payload', action.payload);
      return {
        ...state,
        issueDrawerVisible: action.payload,
      }
    default:
      return state;
  }
}

export default appReducer;
