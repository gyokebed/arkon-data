import React from "react";
import _ from "lodash";
import { SortableElement } from "react-sortable-hoc";

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

export default SortableItem;
