import { CLICK_UPDATE_VALUE } from '../actions/actionTypes';

const initialState = {
  currentUser: {}
};

export const clickReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_UPDATE_VALUE:
      return {
        ...state,
        currentUser: action.currentUser
      };
    default:
      return state;
  }
}
