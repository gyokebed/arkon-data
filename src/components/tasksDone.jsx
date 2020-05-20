import React, { useState, useEffect } from "react";
import { getTasks, generateTasks } from "../services/fakeTasksService";
import Table from "./common/table";

const TaskDone = () => {
  const columns = [
    {
      path: "title",
      label: "Titulo",
    },
    { path: "description", label: "Descripción" },
    { path: "range.name", label: "Rango de duración" },
    { path: "mins", label: "Minutos" },
    { path: "secs", label: "Segundos" },
    { path: "elapsedTime", label: "Tiempo en completar la tarea (segundos)" },
  ];

  const [tasks, setTasks] = useState([]);
  const [numberOfTasks, setNumberOfTasks] = useState(0);

  useEffect(() => {
    setTasks(getTasksCompleted());
  }, []);

  const getTasksCompleted = () => {
    let allTasks = getTasks();
    return allTasks.filter((t) => t.completed);
  };

  const handleChange = (e) => {
    setNumberOfTasks(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateTasks(numberOfTasks);
    const completedTasks = getTasksCompleted();
    setTasks(completedTasks);
  };

  let button = (
    <button type="submit" className="btn btn-primary mt-3 mb-3">
      Prellenar
    </button>
  );

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        {tasks.length === 0 ? button : null}

        <input
          className="form-control form-control-sm"
          type="text"
          onChange={handleChange}
        ></input>
      </form>
      <Table data={tasks} columns={columns} />
    </React.Fragment>
  );
};

export default TaskDone;
