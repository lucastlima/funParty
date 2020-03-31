import { SET_USER } from "../actionTypes";

const initialSate = {
  user: null
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
