import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks } from "../services/fakeTasksService";
import { getRanges } from "../services/fakeRangeService";
import TasksTable from "./tasksTable";
import ListGroup from "./common/listGroup";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [ranges, setRanges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRange, setSelectedRange] = useState(null);

  useEffect(() => {
    // console.log("useEffect has been called!");
    setTasks(getTasks());

    setRanges([{ _id: "", name: "Todas" }, ...getRanges()]);
  }, []);

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedRange(null);
  };

  const getData = () => {
    let allTasks = tasks;
    let filtered = allTasks;
    if (searchQuery)
      filtered = allTasks.filter((t) =>
        t.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );
    else if (selectedRange && selectedRange._id)
      filtered = allTasks.filter((t) => t.range._id === selectedRange._id);

    return filtered;
  };

  const filteredData = getData();

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={ranges}
            selectedItem={selectedRange}
            onItemSelect={handleRangeSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/tasks/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Agregar Tarea
          </Link>
          <TasksTable tasks={filteredData} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tasks;
