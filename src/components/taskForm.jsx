import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import { getTask, saveTask } from "../services/fakeTasksService";
import { getRanges } from "../services/fakeRangeService";
import Input from "./common/input";
import Select from "./common/select";

const TaskForm = ({ match, history }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    mins: 15,
    secs: 0,
    rangeId: "5b21ca3eeb7f6fbccd471818",
  });
  const [ranges, setRanges] = useState([]);
  const [errors, setErrors] = useState({});
  const [userOption, setUserOption] = useState("default");

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    mins: Joi.number().min(0).max(120).label("Mins"),
    secs: Joi.number().min(0).max(60).label("Secs"),
    rangeId: Joi.string().label("Range"),
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

  useEffect(() => {
    const taskId = match.params.id;
    if (taskId === "new" || taskId === "done" || taskId === "chart") return;

    const ranges = getRanges();
    setRanges(ranges);

    const task = getTask(taskId);
    if (!task) return history.replace("/not-found");

    setData(mapToViewModel(task));
  }, [match.params.id, history]);

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

  const mapToViewModel = (task) => {
    return {
      _id: task._id,
      title: task.title,
      description: task.description,
      mins: task.mins,
      secs: task.secs,
      rangeId: task.range._id,
    };
  };

  const doSubmit = () => {
    console.log(userOption);
    const corta = "5b21ca3eeb7f6fbccd471818";
    const media = "5b21ca3eeb7f6fbccd471814";
    const larga = "5b21ca3eeb7f6fbccd471820";

    if (userOption === "default") {
      // Range "Corta"
      if (data.rangeId === corta) {
        data.mins = 15;
        data.secs = 0;
        // Range "Media"
      } else if (data.rangeId === media) {
        data.mins = 45;
        data.secs = 0;
        // Range "Larga"
      } else if (data.rangeId === larga) {
        data.mins = 60;
        data.secs = 0;
      }
    }

    if (userOption === "custom") {
      if (data.mins <= 30) {
        data.rangeId = corta;
      } else if (data.mins > 30 && data.mins <= 60) {
        data.rangeId = media;
      } else if (data.mins > 60) {
        data.rangeId = larga;
      }
    }

    saveTask(data);
    history.push("/tasks");
  };

  const handleOptionChange = (event) => {
    setUserOption(event.target.value);
  };

  return (
    <div>
      <h1>Agregar tarea</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("title", "Título")}
        {renderInput("description", "Descripción")}

        <div className="form-group">
          <label htmlFor="user-option">Duración</label>
          <select
            className="form-control"
            value={userOption}
            onChange={handleOptionChange}
            id="user-option"
          >
            <option value="default">
              Opciones prederteminadas (Rango de duración)
            </option>
            <option value="custom">Ingresar tiempo</option>
          </select>
        </div>

        {userOption === "custom"
          ? renderInput("mins", "Minutos", "number")
          : ""}
        {userOption === "custom"
          ? renderInput("secs", "Segundos", "number")
          : ""}
        {userOption === "default"
          ? renderSelect("rangeId", "Rango de duración", ranges)
          : ""}
        {renderButton("Guardar")}
      </form>
    </div>
  );
};

export default TaskForm;
