import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

const TasksTable = ({ tasks }) => {
  const columns = [
    {
      path: "title",
      label: "Titulo",
      content: (task) => <Link to={`/tasks/${task._id}`}>{task.title}</Link>,
    },
    { path: "description", label: "Descripción" },
    { path: "range.name", label: "Rango de duración" },
  ];

  return <Table columns={columns} data={tasks} />;
};

export default TasksTable;
