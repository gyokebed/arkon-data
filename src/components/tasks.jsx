import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks, deleteTask } from "../services/fakeTasksService";
import { getRanges } from "../services/fakeRangeService";
import ListGroup from "./common/listGroup";
import ClockContainer from "./timer";
import TasksTable from "./tasksTable";

const Tasks = ({ history }) => {
  const [tasks, setTasks] = useState(getTasks());
  const [ranges, setRanges] = useState([]);
  const [selectedRange, setSelectedRange] = useState({ name: "Todas" });

  useEffect(() => {
    setTasks(getTasks());
    setRanges([{ _id: "", name: "Todas" }, ...getRanges()]);
  }, []);

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
  };

  const getData = () => {
    let allTasks = tasks;
    let filtered = allTasks;

    if (selectedRange && selectedRange._id)
      filtered = allTasks.filter(
        (t) => t.range._id === selectedRange._id && !t.completed
      );
    else filtered = allTasks.filter((t) => !t.completed);

    return filtered;
  };

  const handleFinishTask = (items) => {
    setTasks(items);
  };
  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t._id !== task._id));

    deleteTask(task._id);
  };
  const handleEdit = (task) => {
    history.push(`/tasks/${task._id}`);
  };
  const handleSetTasks = (items) => {
    setTasks(items);
  };

  const filteredData = getData();

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-3 mt-3">
          <h3>Tareas pendientes</h3>
          <ListGroup
            items={ranges}
            selectedItem={selectedRange}
            onItemSelect={handleRangeSelect}
          />
        </div>
        <div className="col-sm-9 mt-3 mb-3">
          {filteredData.length > 0 ? (
            <ClockContainer
              data={filteredData}
              onFinishTask={handleFinishTask}
            />
          ) : (
            ""
          )}

          <Link
            to="/tasks/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Agregar Tarea
          </Link>
          <TasksTable
            tasks={filteredData}
            onDelete={handleDelete}
            onEdit={handleEdit}
            selectedRange={selectedRange}
            onSetTasks={handleSetTasks}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tasks;
