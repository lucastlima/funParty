import { SET_USER } from "../actionTypes";

const initialSate = {
  userAuth: null,
  currentUser: null
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, userAuth: action.user };
    default:
      return state;
  }
};
