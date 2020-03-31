import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const getPresistentState = () => {
  let state;
  if ("funParty" in localStorage) {
    state = JSON.parse(localStorage.getItem("funParty"));
  }
  return state;
};

export const store = createStore(
  rootReducer,
  getPresistentState(),
  composeWithDevTools(applyMiddleware(thunk))
);
