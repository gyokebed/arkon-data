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
    setTasks(getTasks());
  }, []);

  const handleClick = () => {
    console.log("Button Clicked");
    let allTasks = generateTasks(50);
    let completedTasks = allTasks.filter((t) => t.completed);
    setTasks(completedTasks);
  };

  return (
    <React.Fragment>
      <button className="btn btn-primary mt-3 mb-3" onClick={handleClick}>
        Prellenar
      </button>
      <Table data={tasks} columns={columns} />
    </React.Fragment>
  );
};

export default TaskDone;
