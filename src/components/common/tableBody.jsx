import React, { useState, useEffect } from "react";
import _ from "lodash";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

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
  return (
    <tbody>
      {data.map((item, index) => {
        return (
          <SortableItem
            item={item}
            columns={columns}
            index={index}
            key={`item-${item.title}`}
          />
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

// SortableComponent
const TableBody = ({ columns, data }) => {
  const [tasks, setTasks] = useState([
    {
      _id: "5b21ca3eeb7f6fbccd471815",
      title: "Email",
      description: "Responder email a cliente de China",
      range: { _id: "5b21ca3eeb7f6fbccd471818", name: "Corta" },
    },
    {
      _id: "5b21ca3eeb7f6fbccd471816",
      title: "Usuario",
      description: "Agregar nuevos usuario a la plataforma",
      range: { _id: "5b21ca3eeb7f6fbccd471818", name: "Corta" },
    },
    {
      _id: "5b21ca3eeb7f6fbccd471817",
      title: "Feature 1",
      description: "Resolver feature 1",
      range: { _id: "5b21ca3eeb7f6fbccd471820", name: "Larga" },
    },
  ]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log({ oldIndex, newIndex });
    let tasksCopy = [...tasks];
    tasksCopy = arrayMove(tasksCopy, oldIndex, newIndex);
    setTasks(tasksCopy);
  };

  console.log(tasks);

  return <SortableList data={tasks} columns={columns} onSortEnd={onSortEnd} />;
};

export default TableBody;
