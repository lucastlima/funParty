import { SET_QUIZ_ROOMS_LIST, SET_QUIZ_CURRENT_SESSION } from "../actionTypes";

const initialSate = {
  roomsList: [],
  currentSession: null
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case SET_QUIZ_ROOMS_LIST:
      return { ...state, roomsList: action.list };
    case SET_QUIZ_CURRENT_SESSION:
      return { ...state, currentSession: action.session };
    default:
      return state;
  }
};
