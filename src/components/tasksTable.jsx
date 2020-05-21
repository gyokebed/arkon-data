import React from "react";
import Table from "./common/table";

const TasksTable = ({ tasks, onDelete, onEdit, selectedRange, onSetTasks }) => {
  const columns = [
    {
      path: "title",
      label: "Título",
    },
    { path: "description", label: "Descripción" },
    { path: "range.name", label: "Rango de duración" },
    { path: "mins", label: "Minutos" },
    { path: "secs", label: "Segundos" },
    {
      key: "editar",
      content: (task) => (
        <button onClick={() => onEdit(task)} className="btn btn-primary btn-sm">
          Editar
        </button>
      ),
    },
    {
      key: "delete",
      content: (task) => (
        <button
          onClick={() => onDelete(task)}
          className="btn btn-danger btn-sm"
        >
          Eliminar
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={tasks}
      sortable={true}
      selectedRange={selectedRange}
      onSetTasks={onSetTasks}
    />
  );
};

export default TasksTable;
