import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getTasks,
  deleteTask,
  reorderTasks,
} from "../services/fakeTasksService";
import { getRanges } from "../services/fakeRangeService";
import ListGroup from "./common/listGroup";
import TableHeader from "./common/tableHeader";
import _ from "lodash";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import ClockContainer from "./timer";

const Tasks = ({ history }) => {
  const [tasks, setTasks] = useState(getTasks());
  const [ranges, setRanges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRange, setSelectedRange] = useState(null);

  const columns = [
    {
      path: "title",
      label: "Titulo",
    },
    { path: "description", label: "Descripción" },
    { path: "range.name", label: "Rango de duración" },
    { path: "mins", label: "Minutos" },
    { path: "secs", label: "Segundos" },
    {
      key: "editar",
      content: (task) => (
        <button onClick={() => handleEdit(task)} className="btn btn-sm">
          Editar
        </button>
      ),
    },
    {
      key: "delete",
      content: (task) => (
        <button
          onClick={() => handleDelete(task)}
          className="btn btn-danger btn-sm"
        >
          Eliminar
        </button>
      ),
    },
  ];

  useEffect(() => {
    // console.log("useEffect has been called!");
    setTasks(getTasks());

    setRanges([{ _id: "", name: "Todas" }, ...getRanges()]);
  }, []);

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    setSearchQuery("");
  };

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  //   setSelectedRange(null);
  // };

  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t._id !== task._id));

    deleteTask(task._id);
  };

  const handleEdit = (task) => {
    history.push(`/tasks/${task._id}`);
  };

  const getData = () => {
    let allTasks = tasks;
    let filtered = allTasks;
    if (searchQuery)
      filtered = allTasks.filter((t) =>
        t.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );
    else if (selectedRange && selectedRange._id)
      filtered = allTasks.filter(
        (t) => t.range._id === selectedRange._id && !t.completed
      );
    else filtered = allTasks.filter((t) => !t.completed);

    return filtered;
  };

  const SortableItem = SortableElement(({ item, columns }) => {
    return (
      <tr key={item._id}>
        {columns.map((column) => {
          return (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          );
        })}
      </tr>
    );
  });

  const SortableList = SortableContainer(({ data, columns }) => {
    // Returns the task if is not finished or in progress
    return (
      <tbody>
        {data.map((item, index) => {
          return !item.completed ? (
            <SortableItem
              item={item}
              columns={columns}
              index={index}
              key={`item-${item.title}`}
            />
          ) : (
            ""
          );
        })}
      </tbody>
    );
  });

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  const SortableComponent = ({ columns, data }) => {
    const onSortEnd = ({ oldIndex, newIndex }) => {
      let itemsCopy = [...data];
      itemsCopy = arrayMove(itemsCopy, oldIndex, newIndex);
      setTasks(itemsCopy);
      reorderTasks(itemsCopy);
    };

    return <SortableList data={data} columns={columns} onSortEnd={onSortEnd} />;
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
          <ClockContainer data={filteredData} />

          <Link
            to="/tasks/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Agregar Tarea
          </Link>

          <table className="table">
            <TableHeader columns={columns} />
            <SortableComponent columns={columns} data={filteredData} />
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tasks;
