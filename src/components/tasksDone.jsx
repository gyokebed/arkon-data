import React, { useState, useEffect } from "react";
import { getTasks, generateTasks } from "../services/fakeTasksService";
import Table from "./common/table";
import { useForm } from "react-hook-form";

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
  const [numberOfTasks, setNumberOfTasks] = useState(1);

  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    setTasks(getTasksCompleted());
  }, []);

  const getTasksCompleted = () => {
    let allTasks = getTasks();
    return allTasks.filter((t) => t.completed);
  };

  const handleChange = () => {
    setNumberOfTasks(watch("numberOfTasks"));
  };

  const onSubmit = () => {
    generateTasks(numberOfTasks);
    const completedTasks = getTasksCompleted();
    setTasks(completedTasks);
  };

  const form = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit" className="btn btn-primary mt-3 mb-3">
        Prellenar
      </button>
      <input
        className="form-control form-control-sm"
        type="number"
        onChange={handleChange}
        name="numberOfTasks"
        ref={register({ required: true, min: 1, max: 50 })}
        defaultValue={numberOfTasks}
      ></input>
    </form>
  );

  return (
    <React.Fragment>
      {!tasks.length ? form : null}
      {(numberOfTasks > 0 && numberOfTasks <= 50) || (
        <div className="alert alert-dark" role="alert">
          Valor debe de ser entre 1 y 50
        </div>
      )}

      {errors.numberOfTasks && (
        <div className="alert alert-danger" role="alert">
          Error: este campo es requerido
        </div>
      )}
      <Table data={tasks} columns={columns} />
    </React.Fragment>
  );
};

export default TaskDone;
