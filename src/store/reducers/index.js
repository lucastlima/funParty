import { combineReducers } from "redux";
import testReducer from "./test.reducer";
import authReducer from "./auth.reducer";
import quizReducer from "./quiz.reducer";
import uiReducer from "./ui.reducer";

export default combineReducers({
  test: testReducer,
  auth: authReducer,
  quiz: quizReducer,
  ui: uiReducer
});
