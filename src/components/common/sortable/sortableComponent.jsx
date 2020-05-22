import React from "react";
import arrayMove from "array-move";
import SortableList from "./sortableList";
import { reorderTasks } from "../../../services/fakeTasksService";

const SortableComponent = ({ columns, data, selectedRange, onSetData }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    let itemsCopy = [...data];
    itemsCopy = arrayMove(itemsCopy, oldIndex, newIndex);
    onSetData(itemsCopy);
    reorderTasks(itemsCopy);
  };

  return (
    <SortableList
      data={data}
      columns={columns}
      onSortEnd={onSortEnd}
      selectedRange={selectedRange}
    />
  );
};

export default SortableComponent;
