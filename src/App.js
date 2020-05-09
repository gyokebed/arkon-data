import React from "react";
import NavBar from "./components/navBar";
import Tasks from "./components/tasks";
import NotFound from "./components/notFound";
import { Route, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/tasks" component={Tasks} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/tasks" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
