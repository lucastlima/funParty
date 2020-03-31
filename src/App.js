import React, { useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initAuthListener } from "./store/actions";
import Layout from "./components/Layout";
import Quiz from "./games/Quiz/Quiz";
import NewGame from "./games/Quiz/NewGame";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    const unsubscribe = dispatch(initAuthListener());
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return auth ? (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/quiz" component={Quiz} />
        <Redirect to="/" />
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
