import { SET_QUIZROOMSLIST } from "../actionTypes";

const initialSate = {
  roomsList: []
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case SET_QUIZROOMSLIST:
      return { ...state, roomsList: action.list };
    default:
      return state;
  }
};
