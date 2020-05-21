import React from "react";
import _ from "lodash";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { reorderTasks } from "../../services/fakeTasksService";

const SortableBody = ({ columns, data, selectedRange, onSetTasks }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
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
              key={`item-${item._id}`}
              disabled={selectedRange.name !== "Todas"}
            />
          ) : (
            ""
          );
        })}
      </tbody>
    );
  });

  const SortableComponent = ({ columns, data }) => {
    const onSortEnd = ({ oldIndex, newIndex }) => {
      let itemsCopy = [...data];
      itemsCopy = arrayMove(itemsCopy, oldIndex, newIndex);
      // setTasks(itemsCopy);
      onSetTasks(itemsCopy);
      reorderTasks(itemsCopy);
    };

    return <SortableList data={data} columns={columns} onSortEnd={onSortEnd} />;
  };

  return <SortableComponent columns={columns} data={data} onSet />;
};

export default SortableBody;
