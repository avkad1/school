import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import store from "store";

import history from "../history";
import Login from "../components/Login";
import Landing from "../components/Landing";

class App extends React.Component {
  componentDidMount() {
    this.redirect();
  }

  redirect() {
    if (!store.get("isLoggedIn")) {
      history.push("/login");
    }
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Landing} />
        </Switch>
      </Router>
    );
  }
}

export default App;
