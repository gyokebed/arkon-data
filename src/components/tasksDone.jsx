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

  useEffect(() => {
    setTasks(getTasksCompleted());
  }, []);

  const getTasksCompleted = () => {
    let allTasks = getTasks();
    return allTasks.filter((t) => t.completed);
  };

  const handleClick = () => {
    generateTasks(50);
    const completedTasks = getTasksCompleted();
    setTasks(completedTasks);
  };

  let button = (
    <button className="btn btn-primary mt-3 mb-3" onClick={handleClick}>
      Prellenar
    </button>
  );

  return (
    <React.Fragment>
      {tasks.length === 0 ? button : null}
      <Table data={tasks} columns={columns} />
    </React.Fragment>
  );
};

export default TaskDone;
