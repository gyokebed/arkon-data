import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRanges } from "../services/fakeRangeService";
import TasksTable from "./tasksTable";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [ranges, setRanges] = useState([]);

  useEffect(() => {
    console.log("useEffect has been called!");

    setTasks([
      { name: "Limpiar la casa", tiempo: "1 hora" },
      { name: "Hacer ejercicio", tiempo: "1 hora y media" },
    ]);

    setRanges([{ _id: "", name: "Todas" }, ...getRanges()]);
  }, []);
  console.log(ranges);
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            {ranges.map((range) => (
              <li className="list-group-item">{range.name}</li>
            ))}
          </ul>
        </div>
        <div className="col">
          <Link
            to="/tasks/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Agregar Tarea
          </Link>
          <TasksTable />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tasks;
