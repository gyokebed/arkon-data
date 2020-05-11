import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../services/fakeTasksService";
import { getRanges } from "../services/fakeRangeService";
import TasksTable from "./tasksTable";
import ListGroup from "./common/listGroup";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [ranges, setRanges] = useState([]);

  useEffect(() => {
    // console.log("useEffect has been called!");
    setTasks(getTasks());

    setRanges([{ _id: "", name: "Todas" }, ...getRanges()]);
  }, []);
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-3">
          <ListGroup ranges={ranges} />
        </div>
        <div className="col">
          <Link
            to="/tasks/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Agregar Tarea
          </Link>
          <TasksTable tasks={tasks} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tasks;
