import React, { useState, useEffect } from "react";
import _ from "lodash";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import {
  saveTasks,
  setRanges,
  getTasks,
} from "../../services/fakeTasksService";

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
  // const [items, setItems] = useState([]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log({ oldIndex, newIndex });
    let itemsCopy = [...data];
    itemsCopy = arrayMove(itemsCopy, oldIndex, newIndex);
    // setItems(itemsCopy);
    saveTasks(itemsCopy);
  };

  // useEffect(() => {
  //   // console.log("useEffect has been called!");
  //   setItems(data);
  // });

  // saveTasks(data);
  console.log(data);

  return <SortableList data={data} columns={columns} onSortEnd={onSortEnd} />;
};

export default TableBody;
