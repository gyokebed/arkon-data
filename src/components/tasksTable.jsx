import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

const TasksTable = () => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (task) => <Link to={`/tasks/`}>{}</Link>,
    },
  ];

  return <Table />;
};

export default TasksTable;
