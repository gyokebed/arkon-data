import React, { useState, useEffect } from "react";
import { getTasks } from "../services/fakeTasksService";
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
  });

  const getData = () => {
    let allTasks = tasks;
    return allTasks.filter((t) => t.completed);
  };

  const filteredData = getData();

  return <Table data={filteredData} columns={columns} />;
};

export default TaskDone;
