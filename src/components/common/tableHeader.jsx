import React from "react";

const TableHeader = ({ columns }) => {
  console.log(columns);
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.path}>{column.label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
