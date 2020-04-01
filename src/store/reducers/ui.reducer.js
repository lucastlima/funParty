import { SET_MODAL } from "../actionTypes";

const initialSate = {
  modal: {
    quizNewGame: false,
    quizJoinGame: false
  }
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case SET_MODAL:
      const newModalObj = { ...state.modal };
      newModalObj[action.modal] = !newModalObj[action.modal];
      return { ...state, modal: newModalObj };
    default:
      return state;
  }
};
