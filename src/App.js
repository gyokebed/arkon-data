import React from "react";
import NavBar from "./components/navBar";
import Tasks from "./components/tasks";
import TasksDone from "./components/tasksDone";
import TaskForm from "./components/taskForm";
import NotFound from "./components/notFound";
import { Route, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/tasks/done" component={TasksDone} />
          <Route path="/tasks/:id" component={TaskForm} />
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
