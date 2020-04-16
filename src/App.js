import React, { useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initAuthListener } from "./store/actions";
import Layout from "./components/Layout";
import Quiz from "./games/Quiz/Quiz";
import QuizRoom from "./games/Quiz/QuizRoom";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth.userAuth);

  useEffect(() => {
    dispatch(initAuthListener());
  }, [dispatch]);

  return auth ? (
    <Layout>
      <Switch>
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/quiz/:id" component={QuizRoom} />
        <Redirect to="/quiz" />
      </Switch>
    </Layout>
  ) : (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
