import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { getTask, saveTask } from "../services/fakeTasksService";
import { getRanges } from "../services/fakeRangeService";
import Input from "./common/input";
import Select from "./common/select";

const TaskForm = ({ match, history }) => {
  const [data, setData] = useState({
    title: "",
    rangeId: "",
    description: "",
  });
  const [ranges, setRanges] = useState([]);
  const [errors, setErrors] = useState({});

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    rangeId: Joi.string().required().label("Range"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, { [name]: schema[name] });
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const changeErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) changeErrors[input.name] = errorMessage;
    else delete changeErrors[input.name];

    const changeData = { ...data };
    changeData[input.name] = input.value;

    setData(changeData);
    setErrors(changeErrors);
  };

  const renderButton = (label) => {
    return (
      <button disabled={validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  useEffect(() => {
    const ranges = getRanges();
    setRanges(ranges);

    const taskId = match.params.id;
    if (taskId === "new") return;

    const task = getTask(taskId);
    if (!task) return history.replace("/not-found");

    setData(mapToViewModel(task));
  }, []);

  const mapToViewModel = (task) => {
    return {
      _id: task._id,
      title: task.title,
      description: task.description,
      rangeId: task.range._id,
    };
  };

  const doSubmit = () => {
    saveTask(data);
    history.push("/tasks");
  };

  return (
    <div>
      <h1>Agregar tarea</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("title", "Título")}
        {renderInput("description", "Descripción")}
        {renderSelect("rangeId", "Rango de duración", ranges)}
        {renderButton("Save")}
      </form>
    </div>
  );
};

export default TaskForm;
