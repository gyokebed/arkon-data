import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import SortableItem from "./sortableItem";

const SortableList = SortableContainer(({ data, columns, selectedRange }) => {
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

export default SortableList;
