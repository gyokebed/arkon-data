import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import SortableBody from "./sortableBody";

const Table = ({ columns, data, sortable, selectedRange, onSetTasks }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <TableHeader columns={columns} />
        {sortable ? (
          <SortableBody
            data={data}
            columns={columns}
            selectedRange={selectedRange}
            onSetTasks={onSetTasks}
          />
        ) : (
          <TableBody data={data} columns={columns} />
        )}
      </table>
    </div>
  );
};

export default Table;
